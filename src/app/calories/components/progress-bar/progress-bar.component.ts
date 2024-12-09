import {ChangeDetectorRef, Component, effect, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {color} from 'chart.js/helpers';
import {FoodHistoryService} from '../../../shared/services/food-history.service';

@Component({
  selector: 'calories-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent{
  @Input() color: string = '';
  totalCaloriesDiary: number = 2000;
  constructor(private foodHistoryService: FoodHistoryService) {

  }

  get totalCaloriesHistory(){
    return this.foodHistoryService.totalCalories;
  }


}
