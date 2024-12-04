import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FoodService} from '../../../shared/services/food.service';
import {FoodAddedFromUser} from '../../interfaces/foodAddedFromUser';
import {Nullable} from 'primeng/ts-helpers';

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
  selectUnitOptions: any[] = [{ label: 'gr', value: 'gr' },{ label: 'ml', value: 'ml' }];
  unitValue: string = 'off';

  foodsAdded: FoodAddedFromUser[] = [{ food: 'Pollo', quantity: 100, unit: 'gr' }];
  constructor(private foodService: FoodService) {
  }

  searchFoods(searchTerm:string):void {
    this.foodService.getFoods(searchTerm);
  }
  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  get foods(){
    return this.foodService.foodsName;
  }

  addFoodToMeal(food: string, quantity: Nullable<number>, unit: string): void {
    this.foodsAdded.push({ food: food, quantity: quantity!, unit: unit });
  }

  deleteFoodFromMeal(index:number): void {
    this.foodsAdded.splice(index, 1);
  }

  deleteSearch():void{
    console.log("pasa");
    this.foodService.foodsName = [];
  }

  get isSearching():boolean{
    return this.foodService.searching;
  }
}
