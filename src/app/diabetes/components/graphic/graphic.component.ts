import {ChangeDetectorRef, Component, effect, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {isPlatformBrowser} from '@angular/common';
import {DiabetesHistoryService} from '../../../shared/services/diabetes-history.service';

@Component({
  selector: 'diabetes-graphic',
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.css'
})
export class GraphicComponent implements OnInit{

  // Atributos de clase
  data: any;
  options: any;
  @ViewChild('chart') chart: any; // Referencia al gráfico
  days: string[] = [];
  portions: number[] = [];

  // Constructor de la clase
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef,
    private diabetesHistoryService: DiabetesHistoryService,
    private localStorageService: LocalStorageService
  ) {
    // Uso del 'effect' para actualizar los datos cuando cambian
    effect(() => {
      const updatedPortionsWeek = this.diabetesHistoryService.portionsGraphicWeek();

      // Asegurarse de que las arrays de días y calorías se actualicen correctamente
      this.days = updatedPortionsWeek.map(item => item.date);
      this.portions = updatedPortionsWeek.map(item => item.portions);

      // Actualizar el gráfico con los datos nuevos
      this.updateChartData(this.portions, this.days);
    });
  }

  // Método de inicialización del componente
  ngOnInit() {
    this.initChart();
  }

  // Inicializar el gráfico
  initChart() {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      // Inicializar los datos para el gráfico
      this.data = {
        labels: this.diabetesHistoryService.portionsGraphicWeek().map(item => item.date),
        datasets: [
          {
            label: 'Unidades de insulina administradas',
            data: this.diabetesHistoryService.portionsGraphicWeek().map(item => item.portions),
            fill: true,
            tension: 0.4
          }
        ]
      };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
    }

  // Método para actualizar los datos del gráfico
  updateChartData(calories: number[], days: string[]) {
    // Actualizar los datos del gráfico
    this.data.datasets[0].data = calories;
    this.data.labels = days;

    // Si el gráfico ya está inicializado, actualizamos los datos
    if (this.chart && this.chart.chart) {
      this.chart.chart.update();
    }

    // Forzar la detección de cambios
    this.cd.detectChanges();
  }

}
