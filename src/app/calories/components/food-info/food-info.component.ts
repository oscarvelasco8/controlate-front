import {ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'calories-food-info',
  templateUrl: './food-info.component.html',
  styleUrl: './food-info.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FoodInfoComponent {
  constructor(private cdr: ChangeDetectorRef) {
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
    this.cdr.detectChanges();
  }
  addMeal(){
    this.meals.push(
      { name: 'Nueva comida', foods: [] }
    )
  }
}
