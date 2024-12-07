import {Component, OnInit} from '@angular/core';

import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {FoodAddedFromUser} from '../../interfaces/foodAddedFromUser';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';

@Component({
  selector: 'app-calories-page',
  templateUrl: './calories-page.component.html',
  styleUrl: './calories-page.component.css'
})
export class CaloriesPageComponent implements OnInit{
  date:string = '';
  private _history:FoodHistory[] = [];

  constructor(private foodHistoryService:FoodHistoryService) {
  }

  onDateChange($event: string) {
    this.date = $event;
    this.foodHistoryService.getHistoryByDate(this.date).subscribe(data => this._history = data);
  }

  ngOnInit(): void {
    this.foodHistoryService.getHistoryByDate(new Date().toLocaleDateString()).subscribe(data =>{
      this._history = data;
      this._history.forEach(item => this.foodHistoryService.addCalories(item.calories));
    } );

  }
  get history():FoodHistory[]{
    return this._history;
  }

}
