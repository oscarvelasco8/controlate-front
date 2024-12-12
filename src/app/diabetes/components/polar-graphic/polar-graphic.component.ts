import {ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'diabetes-polar-graphic',
  templateUrl: './polar-graphic.component.html',
  styleUrl: './polar-graphic.component.css'
})
export class PolarGraphicComponent implements OnInit {
  data: any;

  options: any;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {}

  themeEffect = effect(() => {
    this.initChart();
  });

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.data = {
        datasets: [
          {
            data: [11, 16, 7, 3],
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
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          r: {
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
      this.cd.markForCheck()
    }
  }
}
