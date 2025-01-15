import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FoodService} from '../../../shared/services/food.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FoodInfo} from '../../../shared/interfaces/FoodInfo';
import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';
import {v4 as uuid} from 'uuid';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'search-food',
  templateUrl: './search-food.component.html',
  styleUrl: './search-food.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SearchFoodComponent{

  // Atributos que recibimos del componente padre y que enviamos al componente padre
  @Input() visible: boolean = false; // Vincula displayModal
  @Input() selectedMeal: any; // Vincula selectedMeal
  @Input() history: FoodHistory[] = [];
  @Input() selectedDate:string = '';
  @Output() visibleChange = new EventEmitter<boolean>();

  // Otros atributos del componente
  proteinColor:string = 'rgb(60,50,140)';
  carbsColor:string = 'rgb(60,152,80)';
  fatColor:string = 'rgb(169,54,79)';
  caloriesColor:string = 'rgb(147,151,17)';
  private _foodsSearched:FoodInfo[] = [];
  private _foodAdded:FoodHistory[] = [];
  private originalValues: { [key: string]: FoodInfo } = {};
  private _foodDeleted:FoodHistory[] = [];

  // Formularios reactivos
  public foodForm: FormGroup = this.formBuilder.group({
    quantity: [100, [Validators.required, Validators.min(1)]]
  })

  public searchForm: FormGroup = this.formBuilder.group({
    searchTerm: ['']
  })

  // Constructor de la clase donde inyectamos los servicios
  constructor(
    public foodService: FoodService,
    private formBuilder: FormBuilder,
    private foodHistoryService:FoodHistoryService,
    private userService:UserService
  ) {
  }

  // Getter para obtener el objetivo del usuario
  get userObjective():string{
    return this.userService.userObjective();
  }

  // Metodo para buscar alimentos
  searchFoods():void {
    this.foodService.getFoods(this.searchForm.get('searchTerm')?.value);
    this.foodForm.patchValue(
      {
        quantity: 100
      }
    );
  }

  // Metodo para cerrar el modal
  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.foodForm.patchValue(
      {
        quantity: 100
      }
    );
    this.searchForm.patchValue(
      {
        searchTerm: ''
      }
    );
  }

  // Getter para obtener los alimentos buscados
  get foodsSearched(): FoodInfo[] {
    this._foodsSearched = this.foodService.foodsInfo();
    return this._foodsSearched;
  }

  // Metodo para añadir un alimento a una comida
  addFoodToMeal(meal:string, food:FoodInfo): void {
    this._foodAdded.push(
      {
        logId:uuid(),
        username:localStorage.getItem('userLogged')!,
        logDate: this.foodHistoryService.date,
        foodId:parseInt(food.id),
        meal:meal,
        foodName:food.name,
        quantity: this.foodForm.controls['quantity'].value,
        calories:parseFloat(food.calories),
        carbohydrates:parseFloat(food.carbohydrate),
        proteins:parseFloat(food.protein),
        fats:parseFloat(food.fat),
        units:food.serving_description
      });
    setTimeout(() => {
      const element = document.getElementsByClassName('scroll')[0];
      element.scrollIntoView({ behavior: 'smooth',block: 'center' });
    },0)
  }

  // Metodo para obtener el historial de alimentos por comida
  getuserHistoryByMeal(meal:string):FoodHistory[]{
    const historyService = this.history.filter(item => item.meal == meal);
    const localHistory = this._foodAdded.filter(item => item.meal == meal);
    return [...historyService, ...localHistory];
  }

  // Metodo para eliminar un alimento de una comida
  deleteFoodFromMeal(foodHistory:FoodHistory): void {
    this._foodDeleted.push(foodHistory);
    this._foodAdded = this._foodAdded.filter( food =>{
      return food.logId !== foodHistory.logId
    });
    this.history = this.history.filter( food =>{
      return food.logId !== foodHistory.logId
    });
  }

  // Getter para saber si se estan buscando alimentos
  get isSearching():boolean{
    return this.foodService.searching;
  }

  // Metodo para calcular dinamicamente los macronutrientes
  calculate(id: number): void {
    // Encuentra el alimento en la lista según el id
    let element = this._foodsSearched.find(item => item.id == `${id}`);

    if (element) {
      // Si nunca se han guardado los valores originales, los almacenamos
      if (!this.originalValues[element.id]) {
        // Creamos una copia de los valores originales de las macros
        this.originalValues[element.id] = {
          ...element, // Hacemos una copia completa de element
          protein: element.protein,
          carbohydrate: element.carbohydrate,
          fat: element.fat,
          calories: element.calories,
        };
      }

      // Usamos los valores originales para hacer los cálculos
      const originalProtein = parseFloat(this.originalValues[element.id].protein);
      const originalCarbs = parseFloat(this.originalValues[element.id].carbohydrate);
      const originalFat = parseFloat(this.originalValues[element.id].fat);
      const originalCalories = parseFloat(this.originalValues[element.id].calories);

      // Obtén la cantidad que el usuario ha ingresado en el formulario
      const quantity = this.foodForm.controls['quantity'].value;

      // Si la cantidad ingresada es válida
      if (!isNaN(quantity) && quantity > 0) {
        // Realiza los cálculos según la cantidad ingresada
        const newProtein = (originalProtein / 100) * quantity;
        const newCarbs = (originalCarbs / 100) * quantity;
        const newFat = (originalFat / 100) * quantity;
        const newCalories = (originalCalories / 100) * quantity;

        // Actualiza solo las macros calculadas en el objeto `element`
        element.protein = newProtein.toFixed(2);  // Guardamos como string
        element.carbohydrate = newCarbs.toFixed(2);  // Guardamos como string
        element.fat = newFat.toFixed(2);  // Guardamos como string
        element.calories = newCalories.toFixed(2);  // Guardamos como string
      } else {
        console.error('Cantidad no válida');
      }
    }
  }

  saveMeal() {
    if(this._foodAdded.length > 0 ){
      this.foodHistoryService.insertIntoHistory(this._foodAdded);
      this._foodAdded = [];
    }
    if (this._foodDeleted.length > 0){
      this.foodHistoryService.deleteFromHistory(this._foodDeleted);
      this._foodDeleted = [];
    }


    this.closeModal();
  }
}
