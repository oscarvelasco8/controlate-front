import {Component, effect, ViewEncapsulation} from '@angular/core';
import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'calories-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent{

  // Atributos de la clase
  color = "";
  dailyCalories: number = 0;

  // Constructor de la clase. Se inyectan los servicios necesarios
  constructor(private foodHistoryService: FoodHistoryService, private userService:UserService) {

    // Se utiliza effect para que los datos se actualicen cuando cambien las señales
    effect(() => {
      this.dailyCalories = this.userService.caloriesObjective();
    });
  }

  // Método para obtener el porcentaje de calorías consumidas
  get totalCaloriesHistory(){
    return this.foodHistoryService.totalCalories;
  }



}
