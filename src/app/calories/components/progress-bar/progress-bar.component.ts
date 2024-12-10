import {ChangeDetectorRef, Component, effect, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {color} from 'chart.js/helpers';
import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'calories-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent implements OnInit{
  @Input() color: string = '';
  totalCaloriesDiary: number = 0;

  constructor(private foodHistoryService: FoodHistoryService, private userService:UserService) {
    effect(() => {
      this.totalCaloriesDiary = this.userService.tmbAdjusted();
    });
  }

  get totalCaloriesHistory(){
    return this.foodHistoryService.totalCalories;
  }

  ngOnInit(): void {
    console.log(this.totalCaloriesDiary, this.userService.tmbAdjusted());
  }


}
