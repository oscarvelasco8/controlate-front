import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {timeout} from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  constructor(private router:Router, private messageService: MessageService) {
  }
  onSubmit():void{
    this.messageService.add({ severity: 'success', summary: 'Registro completado', detail: '¡Registro completado con éxito!' })
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);

  }
}
