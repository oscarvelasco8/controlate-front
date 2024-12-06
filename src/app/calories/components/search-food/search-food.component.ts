import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FoodService} from '../../../shared/services/food.service';
import {FoodAddedFromUser} from '../../interfaces/foodAddedFromUser';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {FoodInfo} from '../../../shared/interfaces/FoodInfo';

@Component({
  selector: 'search-food',
  templateUrl: './search-food.component.html',
  styleUrl: './search-food.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SearchFoodComponent{
  @Input() visible: boolean = false; // Vincula displayModal
  @Input() selectedMeal: any; // Vincula selectedMeal
  @Output() visibleChange = new EventEmitter<boolean>();
  selectUnitOptions: ({ label: string; value: string })[] = [{ label: 'gr', value: 'gr' },{ label: 'ml', value: 'ml' }];
  options:any;
  proteinColor:string = 'rgb(60,50,140)';
  carbsColor:string = 'rgb(114,234,142)';
  fatColor:string = 'rgb(255, 99, 132)';
  caloriesColor:string = 'rgb(228,234,60)';
  private _foodsSearched:FoodInfo[] = structuredClone(this.foodService.foodsInfo);
  private selectedElement: FoodInfo | undefined;

  public foodForm: FormGroup = this.formBuilder.group({
    quantity: [0, [Validators.required, Validators.min(1)]],
    units: ['gr',[Validators.required]]
  })

  constructor(
    private foodService: FoodService,
    private formBuilder: FormBuilder,
    private userService:UserService
  ) {
  }

  searchFoods(searchTerm:string):void {
    this.foodService.getFoods(searchTerm);
  }
  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.foodForm.reset();
  }
  get foodsSearched(){
    return this._foodsSearched;
  }

  addFoodToMeal(meal:string, food:string, formGroup: FormGroup): void {
    this.userService.addtoUserHistory(meal, food, formGroup);
    /*console.log({history: this.userService.userHistory});*/
  }

  getuserHistoryByMeal(meal:string):FoodAddedFromUser[]{
    /*console.log({meal: this.userService.userHistory.filter(food => food.meal == meal)})*/
    return this.userService.userHistory.filter(food => food.meal == meal);
  }

  deleteFoodFromMeal(food:FoodAddedFromUser): void {
    let index = this.userService.userHistory.indexOf(food);
    this.userService.userHistory.splice(index, 1);
    /*console.log({history: this.userService.userHistory});*/
  }

  deleteSearch():void{
    this.foodService.foodsInfo = [];
  }

  get isSearching():boolean{
    return this.foodService.searching;
  }
  calculate(id: number): void {
    let element: FoodInfo | undefined = this._foodsSearched.find(item => item.id == `${id}`);
    const quantity = this.foodForm.controls['quantity'].value;

    if (element) {
      if (!this.selectedElement) {
        this.selectedElement = {...element};
      }
      const protein = parseFloat(this.selectedElement.protein);
      const carbs = parseFloat(this.selectedElement.carbohydrate);
      const fat = parseFloat(this.selectedElement.fat);
      const calories = parseFloat(this.selectedElement.calories);
      // Realiza los cálculos
      const newProtein = (protein / 100) * quantity;
      const newCarbs = (carbs / 100) * quantity;
      const newFat = (fat / 100) * quantity;
      const newCalories = (calories / 100) * quantity;

      // Actualiza los valores con precisión
      const index = this._foodsSearched.findIndex(element => element.id == `${id}`);
      element.calories = newCalories.toFixed(2);
      element.carbohydrate = newCarbs.toFixed(2);
      element.fat = newFat.toFixed(2);
      element.protein = newProtein.toFixed(2);
      element.calories = newCalories.toFixed(2);
      this._foodsSearched[index] = element;
    }
  }

}
