import {Component, OnInit} from '@angular/core';

import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-calories-page',
  templateUrl: './calories-page.component.html',
  styleUrl: './calories-page.component.css'
})
export class CaloriesPageComponent implements OnInit{
  date:string = '';
  userTmb:number = 0;

  constructor(private foodHistoryService:FoodHistoryService, private userService:UserService) {
  }

  onDateChange($event: string) {
    /*console.log("llamada 2")*/
    this.date = $event;
    this.foodHistoryService.getHistoryByDate(this.date);
    this.foodHistoryService.getTotalCaloriesWeek(this.date);

  }

  ngOnInit(): void {
    /*console.log("llamada 1")*/
    this.date = new Date().toLocaleDateString();
    this.foodHistoryService.getHistoryByDate(this.date);
    this.userService.tmb.subscribe({
      next: (data) => {
        this.userTmb = data;
      }
    })

  }
  get history():FoodHistory[]{
    return this.foodHistoryService.history;
  }

}
