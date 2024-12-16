import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {FoodHistoryService} from '../../../shared/services/food-history.service';

@Component({
  selector: 'calories-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  @Output() selectedDateChange = new EventEmitter<string>();
  selectedDate!: Date;

  constructor(private primengConfig: PrimeNGConfig, private foodHistoryService: FoodHistoryService) {}

  ngOnInit() {
    if (!this.selectedDate) {
      this.selectedDateChange.emit(new Date().toISOString().split('T')[0]);
      this.foodHistoryService.date = new Date().toISOString().split('T')[0];
      this.foodHistoryService.getHistoryByDate();
      this.foodHistoryService.getTotalCaloriesWeek();
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

    this.foodHistoryService.date = this.selectedDate.toISOString().split('T')[0];
    this.foodHistoryService.getHistoryByDate();
    this.foodHistoryService.getTotalCaloriesWeek();
  }

}
