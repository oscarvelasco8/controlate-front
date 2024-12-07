import { Injectable } from '@angular/core';
import {FoodAddedFromUser} from '../../calories/interfaces/foodAddedFromUser';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {Observable} from 'rxjs';
import {FoodHistory} from '../interfaces/foodHistory';

@Injectable({
  providedIn: 'root'
})
export class FoodHistoryService {

  private BASE_URL = 'http://localhost:8080/api/user-calories-history';
  private _totalCalories: number = 0;
  constructor(private httpClient:HttpClient, private messageService: MessageService) { }

  insertIntoHistory(foodAddedFromUser:FoodHistory[]) {
    foodAddedFromUser.forEach(foodAddedFromUser =>{
      const username = localStorage.getItem('userLogged');
      const logDate = new Date().toLocaleDateString();

      this.httpClient.post(this.BASE_URL, {username, logDate, ...foodAddedFromUser})
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: '¡Registro completado con éxito!' });
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el registro' });
          }
        });
    });
  }

  getHistoryByDate(date:String):Observable<FoodHistory[]>{
    const username = localStorage.getItem('userLogged');
    return this.httpClient.get<FoodHistory[]>(`${this.BASE_URL}/by-date?username=${username}&logDate=${date}`);
  }

  addCalories(calories:number) {
    this._totalCalories += calories;
  }

  get totalCalories(): number {
    return this._totalCalories;
  }
}
