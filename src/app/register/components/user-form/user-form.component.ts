import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {timeout} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterValidatorService} from '../../services/register-validator.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  public userForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['',[Validators.required, this.registerValidatorService.passwordValidator]]
  })

  constructor(
    private router:Router,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private registerValidatorService: RegisterValidatorService
    ) {
  }
  onSubmit():void{
    if (this.userForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.' })
      return
    }
    this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: '¡Registro completado con éxito!' })
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);

  }

  isValidField( field: string ): boolean | null {
    return this.registerValidatorService.isValidField(this.userForm, field);
  }
  getFieldError( field: string ): string | null {
    return this.registerValidatorService.getFieldError(this.userForm, field);
  }
}
