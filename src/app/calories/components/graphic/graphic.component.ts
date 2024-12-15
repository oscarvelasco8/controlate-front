import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FoodHistoryService } from '../../../shared/services/food-history.service';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { effect } from '@angular/core';
import {LocalStorageService} from '../../../shared/services/local-storage.service';

@Component({
  selector: 'calories-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
})
export class GraphicComponent implements OnInit {
  data: any;
  options: any;

  @ViewChild('chart') chart: any; // Referencia al gráfico
  days: string[] = [];
  calories: number[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef,
    private foodHistoryService: FoodHistoryService,
    private localStorageService: LocalStorageService
  ) {
    // Uso del 'effect' para actualizar los datos cuando cambian
    effect(() => {
      const updatedCaloriesWeek = this.foodHistoryService.caloriesGraphicWeek();

      // Asegurarse de que las arrays de días y calorías se actualicen correctamente
      this.days = updatedCaloriesWeek.map(item => item.date);
      this.calories = updatedCaloriesWeek.map(item => item.calories);

      // Actualizar el gráfico con los datos nuevos
      this.updateChartData(this.calories, this.days);
    });
  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);

      // Inicializar los datos para el gráfico
      this.data = {
        labels: this.foodHistoryService.caloriesGraphicWeek().map(item => item.date),
        datasets: [
          {
            label: 'Calorías consumidas en una semana',
            data: this.foodHistoryService.caloriesGraphicWeek().map(item => item.calories),
            fill: true,
            tension: 0.4
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
      }
    }
  }

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

  get isLightTheme():boolean{
    return this.localStorageService.darkTheme;
  }
}
