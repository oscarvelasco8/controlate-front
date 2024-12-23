import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {DiabetesHistoryService} from '../../../shared/services/diabetes-history.service';
import {Router} from '@angular/router';

@Component({
  selector: 'calories-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  /*@Output() selectedDateChange = new EventEmitter<string>();*/
  selectedDate!: Date;
  currentRoute = '';
  constructor(
    private primengConfig: PrimeNGConfig,
    private foodHistoryService: FoodHistoryService,
    private diabetesHistoryService: DiabetesHistoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentRoute = this.router.url;
    if (!this.selectedDate) {
      if (this.currentRoute === '/calories'){
        this.foodHistoryService.date = new Date().toISOString().split('T')[0];
        this.foodHistoryService.getHistoryByDate();
        this.foodHistoryService.getTotalCaloriesWeek();
      }else{
        this.diabetesHistoryService.date = new Date().toISOString().split('T')[0];
        this.diabetesHistoryService.getHistoryByDate();
        this.diabetesHistoryService.getTotalPortionsWeek();
      }
    }
    this.primengConfig.setTranslation({
      dayNames: [
        "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"
      ],
      dayNamesShort: [
        "DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"
      ],
      dayNamesMin: [
        "D", "L", "M", "X", "J", "V", "S"
      ],
      monthNames: [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO",
        "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
      ],
      monthNamesShort: [
        "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
      ],
      today: "Hoy",
      clear: "Limpiar",
      firstDayOfWeek: 1
    });
  }

  onDateSelect() {
    this.currentRoute = this.router.url;
    if (this.currentRoute === '/calories'){
      this.foodHistoryService.date = `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth() + 1}-${this.selectedDate.getDate()}`;
      this.foodHistoryService.getHistoryByDate();
      this.foodHistoryService.getTotalCaloriesWeek();
    }else{
      this.diabetesHistoryService.date = `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth() + 1}-${this.selectedDate.getDate()}`;
      this.diabetesHistoryService.getHistoryByDate();
      this.diabetesHistoryService.getTotalPortionsWeek();
    }
  }

}
