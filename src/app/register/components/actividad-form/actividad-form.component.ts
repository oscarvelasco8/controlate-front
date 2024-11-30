import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-actividad-form',
  templateUrl: './actividad-form.component.html',
  styleUrl: './actividad-form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ActividadFormComponent {
  isDiabetic: boolean = false;
  activityOptions: any[] = [{ name: 'Poco Sedentario', code: '1' }, { name: 'Sedentario', code: '2' }, { name: 'Moderadamente Sedentario', code: '3' }, { name: 'Activo', code: '4' }, { name: 'Muy Activo', code: '5' }];
  constructor(private router:Router, private messageService: MessageService) {
  }
  onSubmit():void{
    this.router.navigate(['/register/user']);
    this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: 'Tus datos de actividad-form han sido guardados con éxito.' })
  }
}
