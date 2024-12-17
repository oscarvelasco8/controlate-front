import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {FoodHistory} from '../interfaces/foodHistory';

@Injectable({
  providedIn: 'root'
})
export class FoodHistoryService {

  private BASE_URL = 'https://wet-chelsy-controlat-2005cbe5.koyeb.app/api/user-calories-history';
  //private BASE_URL = 'http://localhost:8080/api/user-calories-history';

  private _totalCalories = signal(0);
  public totalProtein = signal(0);
  public totalCarbs = signal(0);
  public totalFat = signal(0);
  private _history:FoodHistory[] = [];
  private selectedDate!:string;
  public caloriesGraphicWeek: WritableSignal<{ date: string, calories: number }[]> = signal([]);
  public foodByMeal:WritableSignal<{name:string, foods:string[]}[]> = signal([]);

  constructor(private httpClient:HttpClient, private messageService: MessageService) { }

  public set date(date:string){
    this.selectedDate = date;
  }

  public get date(){
    return this.selectedDate;
  }

  insertIntoHistory(foodAddedFromUser:FoodHistory[]) {
    this.httpClient.post(this.BASE_URL, foodAddedFromUser)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: '¡Alimentos guardados con éxito!' });
          this.getHistoryByDate();
          this.getTotalCaloriesWeek();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar los nuevos alimentos' });
        }
      });
  }

  deleteFromHistory(foodDeletedFromUser:FoodHistory[]) {
    const ids = foodDeletedFromUser.map(food => food.logId).join(',');
    this.httpClient.delete(`${this.BASE_URL}?ids=${ids}`).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Datos borrados', detail: '¡Registros borrados con éxito!' });
        this.getHistoryByDate();
        this.getTotalCaloriesWeek();
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
    this.httpClient.get<FoodHistory[]>(`${this.BASE_URL}/by-date?username=${username}&logDate=${this.selectedDate}`).subscribe({
      next: (data) => {
        this._history = data;
        this.resetCalories();
        this.totalProtein.set(0);
        this.totalCarbs.set(0);
        this.totalFat.set(0);

        // Recalcular calorías y macronutrientes
        this._history.forEach(item => {
          this.addCalories(item.calories);
          this.totalProtein.set(this.totalProtein() + item.proteins);
          this.totalCarbs.set(this.totalCarbs() + item.carbohydrates);
          this.totalFat.set(this.totalFat() + item.fats);
        });

        this.foodByMeal.set(meals.map(meal => ({
          name: meal,
          foods: this._history
            .filter(item => item.meal === meal)
            .map(item => item.foodName) // Asumimos que cada item tiene un campo `name` para el nombre de la comida
        })));


      }
    });
  }


  getTotalCaloriesWeek(): void {
    this.caloriesGraphicWeek.set([]); // Limpiar los datos anteriores

    const username = localStorage.getItem('userLogged');

    this.httpClient.get<{ [key: string]: number }>(`${this.BASE_URL}/last-7days?username=${username}&startDate=${this.selectedDate}`).subscribe({
      next: (data) => {

        // Convertir el objeto recibido en un array con el formato adecuado
        const transformedData = Object.entries(data).map(([date, calories]) => ({
          date: date,
          calories: calories // Asegúrate de que `calories` es un número, no un objeto
        }));

        // Asignar los datos transformados
        this.caloriesGraphicWeek.set(transformedData);

      },
      error: (err) => {
        console.error('Error al obtener las calorías:', err);
      }
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
