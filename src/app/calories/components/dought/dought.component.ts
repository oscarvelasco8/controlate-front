import {Component, Input} from '@angular/core';
import {doughtData} from '../../interfaces/doughtData';

@Component({
  selector: 'calories-dought',
  templateUrl: './dought.component.html',
  styleUrl: './dought.component.css'
})
export class DoughtComponent {
  @Input() data!: doughtData;

  options: any;

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
