import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'calories-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  @Output() selectedDateChange = new EventEmitter<string>();
  selectedDate: Date | null = null;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    if (this.selectedDate === null) {
      const date = new Date().toLocaleDateString();
      this.selectedDateChange.emit(date);
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

  onDateSelect( ) {
    this.selectedDateChange.emit(this.selectedDate?.toLocaleDateString());
  }
}
