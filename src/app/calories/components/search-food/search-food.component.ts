import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FoodService} from '../../../shared/services/food.service';
import {FoodAddedFromUser} from '../../interfaces/foodAddedFromUser';
import {Nullable} from 'primeng/ts-helpers';
import {doughtData} from '../../interfaces/doughtData';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';

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

  public foodForm: FormGroup = this.formBuilder.group({
    quantity: [null, [Validators.required, Validators.min(1)]],
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
  get foods(){
    return this.foodService.foodsName;
  }

  addFoodToMeal(meal:string, food:string, formGroup: FormGroup): void {
    this.userService.addtoUserHistory(meal, food, formGroup);
    console.log({history: this.userService.userHistory});
  }

  getuserHistoryByMeal(meal:string):FoodAddedFromUser[]{
    console.log({meal: this.userService.userHistory.filter(food => food.meal == meal)})
    return this.userService.userHistory.filter(food => food.meal == meal);
  }

  deleteFoodFromMeal(food:FoodAddedFromUser): void {
    let index = this.userService.userHistory.indexOf(food);
    this.userService.userHistory.splice(index, 1);
    console.log({history: this.userService.userHistory});
  }

  deleteSearch():void{
    this.foodService.foodsName = [];
  }

  get isSearching():boolean{
    return this.foodService.searching;
  }
}
