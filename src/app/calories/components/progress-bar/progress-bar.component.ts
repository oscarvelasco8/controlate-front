import {Component, effect, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'calories-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent implements OnInit{
  //color = "rgb(34, 197, 94)";
  color = "";
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
