import {Injectable} from '@angular/core';
import {firstValueFrom, map} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Food, FoodElement} from '../interfaces/food';
import {MessageService} from 'primeng/api';
import {FoodInfo} from '../interfaces/FoodInfo';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private BASE_URL = 'http://localhost:8080/api';
  private _foodsInfo: FoodInfo[] = [
    {
    name:'pollo',
    id:'1',
    calories:'500',
    protein:'80',
    carbohydrate:'0',
    fat:'10',
    serving_description:'x 100gr'
  },
  {
    name:'arroz',
    id:'2',
    calories:'800',
    protein:'10',
    carbohydrate:'90',
    fat:'20',
    serving_description:'x 100gr'
  }
  ];
  private _searching: boolean = false;

  constructor(private httpClient:HttpClient, private messageService: MessageService) { }

  getFoods(searchTerm:string):void {
    this._searching = true;
    this.httpClient.get<Food>(this.BASE_URL + '/search-food-by-name?searchTerm=' + searchTerm).pipe(
      map(response => response.foods.food)
    ).subscribe({
      next: (response) => {
        response.forEach(async (food)=>{
          const element = await this.mapToFoodInfo(food);
          this._foodsInfo.push(element);
        })
        this.messageService.add({ severity: 'success', summary: 'Busqueda exitosa', detail: '¡Resultados encontrados!' });
        this._searching = false;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La busqueda no arrojo ningun resultado' });
        this._searching = false;
      }
    });
  }

  get foodsInfo():FoodInfo[]{
    return this._foodsInfo;
  }

  set foodsInfo(foodsInfo:FoodInfo[]) {
    this._foodsInfo = foodsInfo;
  }

  translateEnToEs(englishName: string): Promise<string> {
    return firstValueFrom(
      this.httpClient.get<string>(`${this.BASE_URL}/translate?text=${englishName}&sourceLanguage=en&targetLanguage=es`, {responseType: 'text' as 'json'})
    );
  }



  get searching():boolean{
    return this._searching;
  }

  private async mapToFoodInfo(data: FoodElement): Promise<FoodInfo> {
    // Divide la cadena de "food_description" para obtener los valores nutricionales
    const descriptionParts = data.food_description.split('|').map(part => part.trim());
    const servingSizeMatch = descriptionParts[0].match(/Per (\d+)g/); // Extrae el tamaño de la porción en gramos

    const servingSize = servingSizeMatch ? parseFloat(servingSizeMatch[1]) : 100; // Por defecto 100 si no se encuentra
    const calories = parseFloat(descriptionParts[0].split(':')[1].replace('kcal', '').trim());
    const fat = parseFloat(descriptionParts[1].split(':')[1].replace('g', '').trim());
    const carbs = parseFloat(descriptionParts[2].split(':')[1].replace('g', '').trim());
    const protein = parseFloat(descriptionParts[3].split(':')[1].replace('g', '').trim());

    // Ajusta los valores para 100 gramos
    const scalingFactor = 100 / servingSize;
    const foodName = await this.translateEnToEs(data.food_name);

    let element = {
      name: foodName,
      id: data.food_id,
      calories: (calories * scalingFactor).toFixed(2),
      protein: (protein * scalingFactor).toFixed(2),
      carbohydrate: (carbs * scalingFactor).toFixed(2),
      fat: (fat * scalingFactor).toFixed(2),
      serving_description: 'Por 100g', // Establece la descripción para 100g
    };
    console.log(element);
    return element;
  }


}