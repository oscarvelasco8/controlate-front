import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {UserService} from '../../../shared/services/user.service';
import {MessageService} from 'primeng/api';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';

@Component({
  selector: 'app-diabetes-page',
  templateUrl: './diabetes-page.component.html',
  styleUrl: './diabetes-page.component.css'
})
export class DiabetesPageComponent implements OnInit{

  date:string = '';

  constructor(
    private foodHistoryService:FoodHistoryService,
    private userService:UserService,
    private formBuilder:FormBuilder,
    private messageService:MessageService
  ) {
  }

  onDateChange($event: string) {
    /*console.log("llamada 2")*/
    this.date = $event;
    this.foodHistoryService.getHistoryByDate(this.date);
    this.foodHistoryService.getTotalCaloriesWeek(this.date);/*  --> cambiar por total de raciones de insulina diarias*/

  }

  ngOnInit(): void {
    this.date = new Date().toLocaleDateString();
    this.foodHistoryService.getHistoryByDate(this.date);
  }

  get history():FoodHistory[]{
    return this.foodHistoryService.history;
  }
}
