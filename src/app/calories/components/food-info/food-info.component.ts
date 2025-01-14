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
  // Historial de comidas recibido desde el componente padre
  @Input() history: FoodHistory[] = [];

  // Atributos de la clase
  meals: {name:string, foods: string[]}[] = []
  displayModal: boolean = false;
  selectedMeal:string = '';

  // Constructor de la clase. Se inyecta el servicio necesario
  constructor(private foodHistoryService: FoodHistoryService) {

    // Se utiliza effect para que los datos se actualicen cuando cambien las señales
    effect(() => {
      this.meals = this.foodHistoryService.foodByMeal();
    });
  }


  // Abrir modal para una comida específica
  openModal(meal: any) {
    this.selectedMeal = meal;
    this.displayModal = true;
  }
}
