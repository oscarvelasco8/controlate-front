import {Component} from '@angular/core';
import {DiabetesHistory} from '../../../shared/interfaces/DiabetesHistory';
import {DiabetesHistoryService} from '../../../shared/services/diabetes-history.service';

@Component({
  selector: 'app-diabetes-page',
  templateUrl: './diabetes-page.component.html',
  styleUrl: './diabetes-page.component.css'
})
export class DiabetesPageComponent {

  //Constructor de la clase donde inyectamos los servicios
  constructor(
    private diabetesHistoryService:DiabetesHistoryService
  ) {
  }

  // Método para obtener el historial de diabetes
  get history():DiabetesHistory[]{
    return this.diabetesHistoryService.history;
  }
}
