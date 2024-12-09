import {Component, effect, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FoodHistoryService } from '../../../shared/services/food-history.service';// Importar effect

@Component({
  selector: 'calories-dought',
  templateUrl: './dought.component.html',
  styleUrls: ['./dought.component.css']
})
export class DoughtComponent implements OnInit{
  doughtsData: any[] = [];
  options: any;

  constructor(private foodHistoryService: FoodHistoryService) {
    // Aquí se coloca el effect dentro del constructor
    effect(() => {
      const totalProtein = this.foodHistoryService.totalProtein();
      const totalCarbs = this.foodHistoryService.totalCarbs();
      const totalFat = this.foodHistoryService.totalFat();

      // Actualizar los datos cuando las signals cambien
      this.doughtsData = [
        {
          labels: ['Proteinas', 'Carbohidratos', 'Grasas'],
          datasets: [
            {
              data: [totalProtein | 100, totalCarbs | 100, totalFat | 100],
              backgroundColor: [
                'rgb(60,50,140)',
                'rgb(114,234,142)',
                'rgb(255, 99, 132)'
              ],
              hoverOffset: 4
            }
          ]
        },
        {
          labels: ['Proteinas', 'Total'],
          datasets: [
            {
              data: [totalProtein, 200],
              backgroundColor: [
                'rgb(60,50,140)',
                'rgb(54, 162, 235)'
              ],
              hoverOffset: 4
            }
          ]
        },
        {
          labels: ['Carbohidratos', 'Total'],
          datasets: [
            {
              data: [totalCarbs, 200],
              backgroundColor: [
                'rgb(114,234,142)',
                'rgb(54, 162, 235)'
              ],
              hoverOffset: 4
            }
          ]
        },
        {
          labels: ['Grasas', 'Total'],
          datasets: [
            {
              data: [totalFat, 200],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
              ],
              hoverOffset: 4
            }
          ]
        }
      ];
    });
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }
}
