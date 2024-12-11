import {Component, effect, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';
import {FoodHistoryService} from '../../../shared/services/food-history.service';

@Component({
  selector: 'calories-food-info',
  templateUrl: './food-info.component.html',
  styleUrl: './food-info.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FoodInfoComponent{
  @Input() history: FoodHistory[] = [];
  @Input() selectedDate: string = '';
  meals: {name:string, foods: string[]}[] = []
  constructor(private foodHistoryService: FoodHistoryService) {
    effect(() => {
      this.meals = this.foodHistoryService.foodByMeal();
    });
  }
  displayModal: boolean = false;


  selectedMeal:string = '';

  // Abrir modal para una comida específica
  openModal(meal: any) {
    this.selectedMeal = meal;
    this.displayModal = true;
  }
  /*addMeal(){
    this.meals.push(
      { name: 'Nueva comida', foods: [] }
    )
  }*/
}
