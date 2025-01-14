import {ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {DiabetesHistoryService} from '../../../shared/services/diabetes-history.service';

@Component({
  selector: 'diabetes-polar-graphic',
  templateUrl: './polar-graphic.component.html',
  styleUrl: './polar-graphic.component.css',
})
export class PolarGraphicComponent implements OnInit {

  //Atributos de clase
  data: any;
  options: any;

  // Constructor de la clase donde inyectamos los servicios
  constructor(private cd: ChangeDetectorRef, private diabetesHistoryService:DiabetesHistoryService) {}

  // Se utiliza effect para que los datos se actualicen cuando cambien las señales
  themeEffect = effect(() => {
    this.initChart();
    this.diabetesHistoryService.portionsByMeal();
  });

  // Método que se ejecuta al iniciar el componente
  ngOnInit() {
    this.initChart();
  }

  // Método para inicializar el gráfico
  initChart() {

      this.data = {
        datasets: [
          {
            data: this.diabetesHistoryService.portionsByMeal().reduce((total, item) => total + item, 0) != 0 ? this.diabetesHistoryService.portionsByMeal() : [100,100,100,100],
            backgroundColor: [
              "pink",
              "orange",
              "purple",
              "cyan"
            ],
            label: 'Unidades de insulina'
          }
        ],
        labels: ['Desayuno', 'Almuerzo', 'Comida', 'Cena']
      };
      this.options = {
        scales: {
          r: {
            grid: {
              color: 'grey'
            }
          }
        }
      };
  }

}
