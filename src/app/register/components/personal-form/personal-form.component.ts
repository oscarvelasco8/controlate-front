import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterValidatorService} from '../../services/register-validator.service';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.css'
})
export class PersonalFormComponent {
  public personalForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastname: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]]
  })

  constructor(
    private router:Router,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private registerValidatorService: RegisterValidatorService
  ) {
  }
  onSubmit():void{
    if (this.personalForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.' })
      return
    }
    this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: 'Datos personales guardados con éxito' })
    this.router.navigate(['/register/activity']);

  }

  isValidField( field: string ): boolean | null {
    return this.registerValidatorService.isValidField(this.personalForm, field);
  }
  getFieldError( field: string ): string | null {
    return this.registerValidatorService.getFieldError(this.personalForm, field);
  }
}
