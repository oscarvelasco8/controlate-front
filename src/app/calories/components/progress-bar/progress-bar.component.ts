import {Component, Input} from '@angular/core';
import {color} from 'chart.js/helpers';

@Component({
  selector: 'calories-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  @Input() value: number = 0;
  @Input() color: string = '';
}
