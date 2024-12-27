import {Component, effect, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FoodHistoryService } from '../../../shared/services/food-history.service';
import {UserService} from '../../../shared/services/user.service';

// Importar effect

@Component({
  selector: 'calories-dought',
  templateUrl: './dought.component.html',
  styleUrls: ['./dought.component.css']
})
export class DoughtComponent implements OnInit{
  doughtsData: any[] = [];
  options: any;
  data: number = 0;

  constructor(private foodHistoryService: FoodHistoryService, private userService:UserService) {
    // Aquí se coloca el effect dentro del constructor
    effect(() => {
      const totalProtein = this.foodHistoryService.totalProtein();
      const totalCarbs = this.foodHistoryService.totalCarbs();
      const totalFat = this.foodHistoryService.totalFat();
      this.data = this.userService.proteinesObjective() | this.userService.caloriesObjective() | this.userService.fatsObjective();

      // Actualizar los datos cuando las signals cambien
      this.doughtsData = [
        {
          labels: ['PROTEÍNAS CONSUMIDAS', 'CARBOHIDRATOS CONSUMIDOS', 'GRASAS CONSUMIDAS'],
          datasets: [
            {
              data: totalProtein > 0 || totalCarbs > 0 || totalFat > 0 ? [totalProtein, totalCarbs, totalFat] : [100, 100, 100],
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
          labels: ['PROTEÍNAS DIARIAS CONSUMIDAS', 'PROTEÍNAS RESTANTES'],
          datasets: [
            {
              data: [totalProtein, this.userService.proteinesObjective()-totalProtein <= 0 ? 0 : this.userService.proteinesObjective()-totalProtein ],
              backgroundColor: [
                'rgb(60,50,140)',
                'rgb(54, 162, 235)'
              ],
              hoverOffset: 4
            }
          ]
        },
        {
          labels: ['CARBOHIDRATOS DIARIOS CONSUMIDOS', 'CARBOHIDRATOS RESTANTES'],
          datasets: [
            {
              data: [totalCarbs, this.userService.carbohydratesObjective()-totalCarbs <= 0 ? 0 : this.userService.carbohydratesObjective()-totalCarbs],
              backgroundColor: [
                'rgb(114,234,142)',
                'rgb(54, 162, 235)'
              ],
              hoverOffset: 4
            }
          ]
        },
        {
          labels: ['GRASAS DIARIAS CONSUMIDAS', 'GRASAS RESTANTES'],
          datasets: [
            {
              data: [totalFat, this.userService.fatsObjective() - totalFat <= 0 ? 0 : this.userService.fatsObjective()-totalFat],
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
          /*labels: {
            color: textColor
          }*/
        }
      }
    };
  }
}
