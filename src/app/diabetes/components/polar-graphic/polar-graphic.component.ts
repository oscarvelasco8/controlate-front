import {ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {DiabetesHistoryService} from '../../../shared/services/diabetes-history.service';

@Component({
  selector: 'diabetes-polar-graphic',
  templateUrl: './polar-graphic.component.html',
  styleUrl: './polar-graphic.component.css',
})
export class PolarGraphicComponent implements OnInit {
  data: any;
  options: any;


  constructor(private cd: ChangeDetectorRef, private diabetesHistoryService:DiabetesHistoryService) {}

  themeEffect = effect(() => {
    this.initChart();
    this.diabetesHistoryService.portionsByMeal();
  });

  ngOnInit() {
    this.initChart();
  }

  initChart() {
      /*const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');*/

      this.data = {
        datasets: [
          {
            data: this.diabetesHistoryService.portionsByMeal(),
            backgroundColor: [
              "pink",
              "orange",
              "purple",
              "cyan"
            ],
            label: 'Raciones de insulina'
          }
        ],
        labels: ['Desayuno', 'Almuerzo', 'Comida', 'Cena']
      };
      this.options = {
        plugins: {
          legend: {
            /*labels: {
              color: textColor
            }*/
          }
        },
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
