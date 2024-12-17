import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {DiabetesHistory} from '../interfaces/DiabetesHistory';

@Injectable({
  providedIn: 'root'
})
export class DiabetesHistoryService {

  private BASE_URL = 'https://wet-chelsy-controlat-2005cbe5.koyeb.app/api/user-diabetes-history';
  //private BASE_URL = 'http://localhost:8080/api/user-diabetes-history';
  public totalCarbs = signal(0);
  private _history:DiabetesHistory[] = [];
  private selectedDate:string = '';
  public portionsGraphicWeek: WritableSignal<{ date: string, portions: number }[]> = signal([]);
  public foodByMeal:WritableSignal<{name:string, foods:string[]}[]> = signal([]);
  public portionsByMeal:WritableSignal<number[]> = signal([]);
  private _totalPortions = signal(0);

  public set date(date:string){
    this.selectedDate = date;
  }

  public get date():string{
    return this.selectedDate;
  }

  constructor(private httpClient:HttpClient, private messageService: MessageService) { }

  insertIntoHistory(foodAddedFromUser:DiabetesHistory[]) {

    this.httpClient.post(this.BASE_URL, foodAddedFromUser)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: '¡Registro añadido con éxito!' });
          this.getHistoryByDate();
          this.getTotalPortionsWeek();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el registro' });
        }
      });
  }

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


  getTotalPortionsWeek(): void {

    /*this.portionsGraphicWeek.set([]);

    const initialDate = new Date(date.split("/")[1] + "/" + date.split("/")[0] + "/" + date.split("/")[2]);
    const username = localStorage.getItem('userLogged');

    let completedRequests = 0; // Contador para verificar si hemos recibido todas las respuestas

    for (let i = 0; i < 7; i++) {
      let portions = 0;
      let date;

      if (i === 0) {
        date = initialDate.toLocaleDateString();
      } else {
        date = new Date(initialDate.setDate(initialDate.getDate() - 1)).toLocaleDateString();
      }

      this.httpClient.get<DiabetesHistory[]>(`${this.BASE_URL}/by-date?username=${username}&logDate=${date}`).subscribe({
        next: (data) => {
          /!*this.daysGraphic().push(date); // Agregar la fecha*!/
          data.forEach(item => {
            portions = portions + item.portions; // Sumar las calorías del día
          });

          /!*this.caloriesGraphic().push(calories); // Agregar las calorías al gráfico*!/
          if (!this.portionsGraphicWeek().find(item => item.date === date)) {
            this.portionsGraphicWeek.set([...this.portionsGraphicWeek(), { date: date, portions: portions }]);
          }
          completedRequests++; // Incrementar el contador de solicitudes completadas

          // Si todas las solicitudes han finalizado, ordenamos los datos
          if (completedRequests === 7) {
            this.sortData(); // Llamar a la función de ordenación
          }
        },
        error: (err) => {
          console.error('Error fetching data', err);
        }
      });
    }*/
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

  sortData() {
    // Ordenar los datos de caloriesGraphicWeek por la fecha
    this.portionsGraphicWeek().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateA.getTime() - dateB.getTime(); // Orden ascendente
    });
  }


  addPortions(portions:number) {
    this._totalPortions.set(this._totalPortions() + portions);
  }

  get totalPortions(): number {
    return this._totalPortions();
  }

  resetPortions() {
    this._totalPortions.set(0);
  }


  get history():DiabetesHistory[]{
    return this._history;
  }
}
