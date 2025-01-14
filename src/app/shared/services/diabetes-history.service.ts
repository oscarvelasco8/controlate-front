import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {DiabetesHistory} from '../interfaces/DiabetesHistory';

@Injectable({
  providedIn: 'root'
})
export class DiabetesHistoryService {
  //URLs de la API, local y de producción
  private BASE_URL = 'https://controlate-back.koyeb.app/api/user-diabetes-history';
  //private BASE_URL = 'http://localhost:8080/api/user-diabetes-history';

  //Signals del servicio
  public totalCarbs = signal(0);
  public portionsGraphicWeek: WritableSignal<{ date: string, portions: number }[]> = signal([]);
  public foodByMeal:WritableSignal<{name:string, foods:string[]}[]> = signal([]);
  public portionsByMeal:WritableSignal<number[]> = signal([]);
  private _totalPortions = signal(0);

  //Otros atributos de la clase
  private _history:DiabetesHistory[] = [];
  private selectedDate:string = '';

  //Constructor de la clase, donde se inyectan los servicios
  constructor(private httpClient:HttpClient, private messageService: MessageService) { }

  //Setter y getter del atributo selectedDate
  public set date(date:string){
    this.selectedDate = date;
  }
  public get date():string{
    return this.selectedDate;
  }

  //Metodo para insertar un registro de historial de usuario en la base de datos

  insertIntoHistory(foodAddedFromUser:DiabetesHistory[]) {

    this.httpClient.post(this.BASE_URL, foodAddedFromUser)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: '¡Registro añadido con éxito!' });
          this.getHistoryByDate();
          this.getTotalPortionsWeek();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el registro' });
        }
      });
  }

  // Metodo para eliminar un registro de historial de usuario de la base de datos

  deleteFromHistory(foodDeletedFromUser:DiabetesHistory[]) {
    const ids = foodDeletedFromUser.map(food => food.logId).join(',');
    this.httpClient.delete(`${this.BASE_URL}?ids=${ids}`).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Datos borrados', detail: '¡Registros borrados con éxito!' });
        this.getHistoryByDate();
        this.getTotalPortionsWeek();
      },
      error: (err) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar los registros' });
      }
    });
  }

  // Metodo para obtener el historial de un usuario en una determinada fecha

  getHistoryByDate(): void {
    const username = localStorage.getItem('userLogged');
    const meals = ['Desayuno', 'Almuerzo', 'Comida', 'Cena'];
    this.httpClient.get<DiabetesHistory[]>(`${this.BASE_URL}/by-date?username=${username}&logDate=${this.selectedDate}`).subscribe({
      next: (data) => {
        this._history = data;
        this.totalCarbs.set(0);
        this.resetPortions();
        this._history.forEach(item => {
          this.addPortions(item.portions);
          this.totalCarbs.set(this.totalCarbs() + item.carbohydrates);
        });

        this.foodByMeal.set(meals.map(meal => ({
          name: meal,
          foods: this._history
            .filter(item => item.meal === meal)
            .map(item => item.foodName) // Asumimos que cada item tiene un campo `name` para el nombre de la comida
        })));
        this.portionsByMeal.set(meals.map(meal => this._history.filter(item => item.meal === meal).reduce((total, item) => total + item.portions, 0)));
      }
    });
  }

  // Metodo para obtener las unidades de insulina que ha consumido un usuario en la última semana
  getTotalPortionsWeek(): void {

    this.portionsGraphicWeek.set([]); // Limpiar los datos anteriores

    const username = localStorage.getItem('userLogged');

    this.httpClient.get<{ [key: string]: number }>(`${this.BASE_URL}/last-7days?username=${username}&startDate=${this.selectedDate}`).subscribe({
      next: (data) => {
        // Convertir el objeto recibido en un array con el formato adecuado
        const transformedData = Object.entries(data).map(([date, portions]) => ({
          date: date,
          portions: portions // Asegúrate de que `calories` es un número, no un objeto
        }));

        // Asignar los datos transformados
        this.portionsGraphicWeek.set(transformedData);

      },
      error: (err) => {
        console.error('Error al obtener las calorías:', err);
      }
    });
  }

  // Metodo que añade unidades de insulina
  addPortions(portions:number) {
    this._totalPortions.set(this._totalPortions() + portions);
  }

  // Metodo para resetear las unidades de insulina

  resetPortions() {
    this._totalPortions.set(0);
  }

  // Getter para obtener el historial de diabetes
  get history():DiabetesHistory[]{
    return this._history;
  }
}
