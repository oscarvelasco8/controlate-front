import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {UserService} from '../../../shared/services/user.service';
import {MessageService} from 'primeng/api';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';
import {DiabetesHistory} from '../../../shared/interfaces/DiabetesHistory';
import {DiabetesHistoryService} from '../../../shared/services/diabetes-history.service';

@Component({
  selector: 'app-diabetes-page',
  templateUrl: './diabetes-page.component.html',
  styleUrl: './diabetes-page.component.css'
})
export class DiabetesPageComponent implements OnInit{

  date:string = '';

  constructor(
    private diabetesHistoryService:DiabetesHistoryService
  ) {
  }

  onDateChange($event: string) {
    /*console.log("llamada 2")*/
    this.date = $event;
    this.diabetesHistoryService.getHistoryByDate(this.date);
    this.diabetesHistoryService.getTotalPortionsWeek(this.date);/*  --> cambiar por total de raciones de insulina diarias*/

  }

  ngOnInit(): void {
    this.date = new Date().toLocaleDateString();
    this.diabetesHistoryService.getHistoryByDate(this.date);
  }

  get history():DiabetesHistory[]{
    return this.diabetesHistoryService.history;
  }
}
