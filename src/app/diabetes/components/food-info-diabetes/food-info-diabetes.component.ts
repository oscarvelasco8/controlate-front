import {Component, effect, Input, ViewEncapsulation} from '@angular/core';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';
import {DiabetesHistoryService} from '../../../shared/services/diabetes-history.service';
import {DiabetesHistory} from '../../../shared/interfaces/DiabetesHistory';

@Component({
  selector: 'food-info-diabetes',
  templateUrl: './food-info-diabetes.component.html',
  styleUrl: './food-info-diabetes.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FoodInfoDiabetesComponent {

  // Atributos de clase
  @Input() history: DiabetesHistory[] = [];
  meals: {name:string, foods: string[]}[] = []
  displayModal: boolean = false;
  selectedMeal:string = '';

  //Constructor de clase
  constructor(private diabetesHistoryService: DiabetesHistoryService) {
    // Se utiliza effect para que los datos se actualicen cuando cambien las señales
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
