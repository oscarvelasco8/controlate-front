import {Component, effect, Input} from '@angular/core';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';
import {DiabetesHistoryService} from '../../../shared/services/diabetes-history.service';
import {DiabetesHistory} from '../../../shared/interfaces/DiabetesHistory';

@Component({
  selector: 'food-info-diabetes',
  templateUrl: './food-info-diabetes.component.html',
  styleUrl: './food-info-diabetes.component.css'
})
export class FoodInfoDiabetesComponent {
  @Input() history: DiabetesHistory[] = [];
/*  @Input() selectedDate: string = '';*/
  meals: {name:string, foods: string[]}[] = []
  displayModal: boolean = false;
  selectedMeal:string = '';
  constructor(private diabetesHistoryService: DiabetesHistoryService) {
    effect(() => {
      this.meals = this.diabetesHistoryService.foodByMeal();

    });
  }


  // Abrir modal para una comida específica

  openModal(meal: any) {
    this.selectedMeal = meal;
    this.displayModal = true;
  }
}
