import {ChangeDetectorRef, Component, Input, ViewEncapsulation} from '@angular/core';
import {FoodAddedFromUser} from '../../interfaces/foodAddedFromUser';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';

@Component({
  selector: 'calories-food-info',
  templateUrl: './food-info.component.html',
  styleUrl: './food-info.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FoodInfoComponent {
  @Input() history: FoodHistory[] = [];
  @Input() selectedDate: string = '';
  constructor() {
  }
  displayModal: boolean = false;

  // Datos de ejemplo
  meals = [
    { name: 'Desayuno', foods: ['Pan', 'Leche', 'Fruta', 'Café'] },
    { name: 'Almuerzo', foods: ['Arroz', 'Pollo', 'Ensalada'] },
    { name: 'Comida', foods: ['Arroz', 'Pollo', 'Ensalada'] },
    { name: 'Cena', foods: ['Pasta', 'Carne', 'Verduras'] }
  ];

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
