import {computed, Injectable, signal, WritableSignal} from '@angular/core';
import {firstValueFrom, map} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Food, FoodElement} from '../interfaces/food';
import {MessageService} from 'primeng/api';
import {FoodInfo} from '../interfaces/FoodInfo';

@Injectable({
  providedIn: 'root'
})
export class FoodService{
  //URLs de la API, local y de producción
  private BASE_URL = 'https://controlate-back.koyeb.app/api';
  //private BASE_URL = 'http://localhost:8080/api';

  //Signals del servicio
  private _foodsInfo:WritableSignal<FoodInfo[]>= signal([]);
  public readonly foodsInfo = computed(() => this._foodsInfo());

  //Otros atributos de la clase
  private _searching: boolean = false;

  //Constructor de la clase, donde se inyectan los servicios
  constructor(private httpClient:HttpClient, private messageService: MessageService) { }

  //Metodo para buscar alimentos en la API
  getFoods(searchTerm: string): void {
    this.resetFoodsInfo();
    this._searching = true;

    this.httpClient.get<Food>(`${this.BASE_URL}/search-food-by-name?searchTerm=${searchTerm}&maxResults=10`).pipe(
      map(response => response.foods.food)
    ).subscribe({
      next: async (response) => {
        if (!response || response.length === 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La búsqueda no arrojó ningún resultado' });
          this._searching = false;
          return;
        }

        // Procesamos los alimentos en paralelo sin detener todo si uno falla
        const results = await Promise.allSettled(response.map(food => this.mapToFoodInfo(food)));

        // Filtramos los elementos exitosos y que no sean null
        const validElements = results
          .filter(result => result.status === 'fulfilled' && result.value !== null)
          .map(result => (result as PromiseFulfilledResult<any>).value);

        // Verificamos si después de filtrar quedan elementos válidos
        if (validElements.length > 0) {
          this._foodsInfo.update(arr => [...arr, ...validElements]);
          this.messageService.add({ severity: 'success', summary: 'Búsqueda exitosa', detail: '¡Resultados encontrados!' });
        } else {
          // Aquí se maneja el caso donde todos los alimentos fueron filtrados
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontraron alimentos válidos' });
        }

        this._searching = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener los datos del servidor' });
        this._searching = false;
      }
    });
  }



  // Metodo para resetear la informacion de alimentos
  resetFoodsInfo() {
    this._foodsInfo.set([]);
  }

  // Metodo para traducir de ingles a español
  translateEnToEs(englishName: string): Promise<string> {
    return firstValueFrom(

      this.httpClient.get<string>(`${this.BASE_URL}/translate?text=${englishName}&sourceLanguage=en&targetLanguage=es`, {responseType: 'text' as 'json'})
    );
  }

  // Getter que nos indica si se está buscando o no
  get searching():boolean{
    return this._searching;
  }

  // Metodo asincrono para mapear la informacion de alimentos
  private async mapToFoodInfo(data: FoodElement): Promise<FoodInfo | null> {
    // Divide la cadena de "food_description" para obtener los valores nutricionales
    const descriptionParts = data.food_description.split('|').map(part => part.trim());

    // Expresión regular para extraer el tamaño de la porción con unidad
    const servingSizeMatch = descriptionParts[0].match(/Per (\d+(?:\.\d+)?)\s*([a-zA-Z]+)/);
    if (!servingSizeMatch) {
      return null;
    }
    // Extrae el tamaño de la porción y su unidad
    const servingSize = parseFloat(servingSizeMatch[1]);
    const servingUnit = servingSizeMatch[2].toLowerCase();

    // Mapa de conversión de unidades a gramos o mililitros
    const unitConversionToBase: { [key: string]: { base: 'g' | 'ml'; factor: number } } = {
      // Sólidos (base en gramos)
      g: { base: 'g', factor: 1 },
      oz: { base: 'g', factor: 28.3495 },
      lb: { base: 'g', factor: 453.592 },
      kg: { base: 'g', factor: 1000 },
      mg: { base: 'g', factor: 0.001 },
      // Líquidos (base en mililitros)
      ml: { base: 'ml', factor: 1 },
      l: { base: 'ml', factor: 1000 },
      'fl': { base: 'ml', factor: 29.5735 },
      'pt': { base: 'ml', factor: 473.176 },
      'qt': { base: 'ml', factor: 946.353 },
      'gal': { base: 'ml', factor: 3785.41 },
    };

    // Si la unidad no está en el mapa, excluye el alimento devolviendo null
    if (!(servingUnit in unitConversionToBase)) {
      /*console.warn(`Unidad desconocida: ${servingUnit}. Excluyendo el alimento: ${data.food_name}`);*/
      return null;
    }

    // Determina la unidad base a partir del mapa
    const { base, factor } = unitConversionToBase[servingUnit];

    // Validación: si un alimento se describe en gramos pero tiene un valor líquido, fuerza base a 'g'
    const isSolid = ['g', 'oz', 'lb', 'kg', 'mg'].includes(servingUnit);
    const isLiquid = ['ml', 'l', 'fl oz', 'pt', 'qt', 'gal'].includes(servingUnit);

    // Si la unidad es inconsistente (como un sólido con `ml`), ajusta la base
    const adjustedBase = isSolid ? 'g' : isLiquid ? 'ml' : base;

    // Convierte el tamaño de la porción a la unidad base correspondiente
    const servingSizeInBase = servingSize * factor;

    // Escala los valores nutricionales a 100 gramos o 100 mililitros
    const scalingFactor = 100 / servingSizeInBase;

    // Extrae los valores nutricionales
    const calories = parseFloat(descriptionParts[0].split(':')[1].replace('kcal', '').trim());
    const fat = parseFloat(descriptionParts[1].split(':')[1].replace('g', '').trim());
    const carbs = parseFloat(descriptionParts[2].split(':')[1].replace('g', '').trim());
    const protein = parseFloat(descriptionParts[3].split(':')[1].replace('g', '').trim());

    const foodName = await this.translateEnToEs(data.food_name);

    return {
      name: foodName,
      id: data.food_id,
      calories: (calories * scalingFactor).toFixed(2),
      protein: (protein * scalingFactor).toFixed(2),
      carbohydrate: (carbs * scalingFactor).toFixed(2),
      fat: (fat * scalingFactor).toFixed(2),
      serving_description: `${adjustedBase}`,
    };
  }

  /*private async mapToFoodInfo(data: FoodElement): Promise<FoodInfo | null> {
    // Divide la cadena y verifica que tenga suficientes elementos
    const descriptionParts = data.food_description?.split('|').map(part => part.trim()) || [];
    if (descriptionParts.length < 4) {
      console.warn(`Formato incorrecto de food_description: ${data.food_description}. Excluyendo alimento.`);
      return null;
    }

    // Extrae el tamaño de la porción con una regex más robusta
    const servingSizeMatch = descriptionParts[0].match(/(?:Per\s*)?(\d+(?:\.\d+)?)\s*([a-zA-Z]+)/);
    if (!servingSizeMatch) {
      console.warn(`No se pudo extraer el tamaño de la porción de: ${descriptionParts[0]}`);
      return null;
    }

    const servingSize = parseFloat(servingSizeMatch[1]);
    const servingUnit = servingSizeMatch[2].toLowerCase();

    // Mapa de conversión de unidades
    const unitConversionToBase: { [key: string]: { base: 'g' | 'ml'; factor: number } } = {
      g: { base: 'g', factor: 1 }, oz: { base: 'g', factor: 28.3495 }, lb: { base: 'g', factor: 453.592 },
      kg: { base: 'g', factor: 1000 }, mg: { base: 'g', factor: 0.001 }, ml: { base: 'ml', factor: 1 },
      l: { base: 'ml', factor: 1000 }, fl: { base: 'ml', factor: 29.5735 }, pt: { base: 'ml', factor: 473.176 },
      qt: { base: 'ml', factor: 946.353 }, gal: { base: 'ml', factor: 3785.41 },
    };

    // Si la unidad no está en el mapa, excluir el alimento
    if (!unitConversionToBase[servingUnit]) {
      console.warn(`Unidad desconocida: ${servingUnit}. Excluyendo alimento: ${data.food_name}`);
      return null;
    }

    const { base, factor } = unitConversionToBase[servingUnit];
    const servingSizeInBase = servingSize * factor;
    const scalingFactor = 100 / servingSizeInBase;

    // Función para extraer números de los valores nutricionales
    const extractNumber = (str: string) => {
      const num = parseFloat(str.replace(/[^0-9.]/g, ''));
      return isNaN(num) ? 0 : num;
    };

    const calories = extractNumber(descriptionParts[0].split(':')[1]);
    const fat = extractNumber(descriptionParts[1].split(':')[1]);
    const carbs = extractNumber(descriptionParts[2].split(':')[1]);
    const protein = extractNumber(descriptionParts[3].split(':')[1]);

    let foodName: string;
    try {
      foodName = await this.translateEnToEs(data.food_name);
    } catch (error) {
      console.warn(`Error al traducir ${data.food_name}:`, error);
      foodName = data.food_name;
    }

    return {
      name: foodName,
      id: data.food_id,
      calories: (calories * scalingFactor).toFixed(2),
      protein: (protein * scalingFactor).toFixed(2),
      carbohydrate: (carbs * scalingFactor).toFixed(2),
      fat: (fat * scalingFactor).toFixed(2),
      serving_description: base,
    };
  }*/

}
