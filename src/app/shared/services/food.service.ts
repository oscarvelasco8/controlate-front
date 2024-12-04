import { Injectable } from '@angular/core';
import {map} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Food} from '../interfaces/food';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private BASE_URL = 'http://localhost:8080/api';
  private _foodsName: string[] = ['Test'];
  private _searching: boolean = false;

  constructor(private httpClient:HttpClient, private messageService: MessageService) { }

  getFoods(searchTerm:string):void {
    this._searching = true;
    this.httpClient.get<Food>(this.BASE_URL + '/search-food-by-name?searchTerm=' + searchTerm).pipe(
      map(response => response.foods.food)
    ).subscribe({
      next: (response) => {
        this.translateEnToEs(response[0].food_name);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La busqueda no arrojo ningun resultado' });
        this.setSearching = false;
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Busqueda exitosa', detail: '¡Resultados encontrados!' });
        this.setSearching = false;
      }
    });
  }

  get foodsName():string[]{
    return this._foodsName;
  }

  set foodsName(value:string[]){
    this._foodsName = value;
  }

  translateEnToEs(englishName:string):void{
    this.httpClient.get<string>(`${this.BASE_URL}/translate?text=${englishName}&sourceLanguage=en&targetLanguage=es`, { responseType: 'text' as 'json' }).subscribe(food=> this._foodsName.push(food));
  }

  get searching():boolean{
    return this._searching;
  }

  set setSearching(value:boolean){
    this._searching = value;
  }

}
