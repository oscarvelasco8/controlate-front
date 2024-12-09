import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {FoodHistory} from '../interfaces/foodHistory';

@Injectable({
  providedIn: 'root'
})
export class FoodHistoryService {

  private BASE_URL = 'http://localhost:8080/api/user-calories-history';
  private _totalCalories = signal(0);
  public totalProtein = signal(0);
  public totalCarbs = signal(0);
  public totalFat = signal(0);
  private _history:FoodHistory[] = [];
  private selectedDate:string = '';
  public caloriesGraphicWeek: WritableSignal<{ date: string, calories: number }[]> = signal([]);

  constructor(private httpClient:HttpClient, private messageService: MessageService) { }

  insertIntoHistory(foodAddedFromUser:FoodHistory[], date:string) {
    this.selectedDate = date;
    foodAddedFromUser.forEach(foodAddedFromUser =>{

      this.httpClient.post(this.BASE_URL, foodAddedFromUser)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: '¡Registro añadido con éxito!' });
              this.getHistoryByDate(this.selectedDate);
              this.getTotalCaloriesWeek(this.selectedDate);
            },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el registro' });
          }
        });
    });
  }

  deleteFromHistory(foodDeletedFromUser:FoodHistory[], date:string) {
    foodDeletedFromUser.forEach(food => {
      this.selectedDate = date;
      this.httpClient.delete(`${this.BASE_URL}/${food.logId}`).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Datos borrados', detail: '¡Registro borrado con éxito!' });
          this.getHistoryByDate(this.selectedDate);
          this.getTotalCaloriesWeek(this.selectedDate);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar el registro' });
        }
      })
    });
  }

  getHistoryByDate(date:string):void{
    const username = localStorage.getItem('userLogged');
    this.httpClient.get<FoodHistory[]>(`${this.BASE_URL}/by-date?username=${username}&logDate=${date}`).subscribe({
      next: (data) => {
        this._history = data;
        this.resetCalories();
        this.totalProtein.set(0);
        this.totalCarbs.set(0);
        this.totalFat.set(0);
        this._history.forEach(item =>{
          this.addCalories(item.calories);
          this.totalProtein.set(this.totalProtein() + item.proteins);
          this.totalCarbs.set(this.totalCarbs() + item.carbohydrates);
          this.totalFat.set(this.totalFat() + item.fats);
        });

      }
    });
  }

  getTotalCaloriesWeek(date: string): void {

    this.caloriesGraphicWeek.set([]);

    const initialDate = new Date(date.split("/")[1] + "/" + date.split("/")[0] + "/" + date.split("/")[2]);
    const username = localStorage.getItem('userLogged');

    let completedRequests = 0; // Contador para verificar si hemos recibido todas las respuestas

    for (let i = 0; i < 7; i++) {
      let calories = 0;
      let date;

      if (i === 0) {
        date = initialDate.toLocaleDateString();
      } else {
        date = new Date(initialDate.setDate(initialDate.getDate() - 1)).toLocaleDateString();
      }

      this.httpClient.get<FoodHistory[]>(`${this.BASE_URL}/by-date?username=${username}&logDate=${date}`).subscribe({
        next: (data) => {
          /*this.daysGraphic().push(date); // Agregar la fecha*/
          data.forEach(item => {
            calories = calories + item.calories; // Sumar las calorías del día
          });

          /*this.caloriesGraphic().push(calories); // Agregar las calorías al gráfico*/
          if (!this.caloriesGraphicWeek().find(item => item.date === date)) {
            this.caloriesGraphicWeek.set([...this.caloriesGraphicWeek(), { date: date, calories: calories }]);
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
    }
  }

  sortData() {
    // Ordenar los datos de caloriesGraphicWeek por la fecha
    this.caloriesGraphicWeek().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateA.getTime() - dateB.getTime(); // Orden ascendente
    });
  }


  addCalories(calories:number) {
    this._totalCalories.set(this._totalCalories() + calories);
  }

  get totalCalories(): number {
    return this._totalCalories();
  }

  resetCalories() {
    this._totalCalories.set(0);
  }


  get history():FoodHistory[]{
    return this._history;
  }

}
