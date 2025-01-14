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

  //Atributos de la clase
  doughtsData: any[] = [];
  options: any;
  data: number = 0;

  // Constructor de la clase. Se inyectan los servicios necesarios
  constructor(private foodHistoryService: FoodHistoryService, private userService:UserService) {
    // Se utiliza effect para que los datos se actualicen cuando cambien las señales
    effect(() => {
      const totalProtein = this.foodHistoryService.totalProtein();
      const totalCarbs = this.foodHistoryService.totalCarbs();
      const totalFat = this.foodHistoryService.totalFat();
      this.data = this.userService.caloriesObjective();

      this.doughtsData = [
        {
          labels: ['PROTEÍNAS CONSUMIDAS', 'CARBOHIDRATOS CONSUMIDOS', 'GRASAS CONSUMIDAS'],
          datasets: [
            {
              data: totalProtein > 0 || totalCarbs > 0 || totalFat > 0 ? [totalProtein, totalCarbs, totalFat] : [100, 100, 100],
              backgroundColor: [
                'rgb(60,50,140)',
                'rgb(60,152,80)',
                'rgb(169,54,79)'
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
                'rgb(60,152,80)',
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
                'rgb(169,54,79)',
                'rgb(54, 162, 235)'
              ],
              hoverOffset: 4
            }
          ]
        }
      ];
    });
  }

  // Método que se ejecuta al iniciar el componente

  ngOnInit() {
    console.log(this.data)
    const documentStyle = getComputedStyle(document.documentElement);
    this.options = {
      cutout: '60%'
    };
  }
}
