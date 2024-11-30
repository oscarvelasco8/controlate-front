import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.css'
})
export class PersonalFormComponent {

  constructor(private router:Router, private messageService: MessageService) {
  }
  onSubmit():void{
    this.router.navigate(['/register/activity']);
    this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: 'Tus datos personales han sido guardados con éxito.' })
  }
}
