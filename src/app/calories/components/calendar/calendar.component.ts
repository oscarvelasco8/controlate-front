import {Component, OnInit} from '@angular/core';
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
  //Atributos de la clase
  selectedDate!: Date;
  currentRoute = '';

  // Constructor de la clase. Se inyectan los servicios necesarios
  constructor(
    private primengConfig: PrimeNGConfig,
    private foodHistoryService: FoodHistoryService,
    private diabetesHistoryService: DiabetesHistoryService,
    private router: Router
  ) {}

  // Método que se ejecuta al iniciar el componente

  ngOnInit() {
    this.currentRoute = this.router.url;

    // Si no hay una fecha seleccionada, se obtiene la fecha actual y se obtienen los datos de la semana y del día
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

    // Se configura el calendario
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

  // Método que se ejecuta al seleccionar una fecha. Se obtiene la fecha seleccionada y se obtienen los datos de la semana y del día

  onDateSelect() {
    this.currentRoute = this.router.url;

    // Convertir la fecha seleccionada a un objeto Date
    let date = new Date(this.selectedDate);

    // Sumar un día
    date.setDate(date.getDate() + 1);

    // Formatear la fecha a "YYYY-MM-DD"
    this.foodHistoryService.date = date.toISOString().split('T')[0];
    this.foodHistoryService.getHistoryByDate();
    // Llamar a los métodos correspondientes
    this.currentRoute === '/calories'
      ? this.foodHistoryService.getTotalCaloriesWeek()
      : this.diabetesHistoryService.getTotalPortionsWeek();
  }

}
