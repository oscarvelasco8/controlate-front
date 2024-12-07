import {Component, Input, OnInit} from '@angular/core';
import {color} from 'chart.js/helpers';
import {FoodHistoryService} from '../../../shared/services/food-history.service';

@Component({
  selector: 'calories-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent implements OnInit{
  @Input() value: number = 0;
  @Input() color: string = '';
  private _totalCalories: number = this.foodHistoryService.totalCalories;

  constructor(private foodHistoryService:FoodHistoryService) {
  }

  ngOnInit(): void {
    this._totalCalories = this.foodHistoryService.totalCalories;
    console.log(this.totalCalories);
  }
  get totalCalories(): number {
    return this._totalCalories;
  }
}
