import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterValidatorService} from '../../services/register-validator.service';

@Component({
  selector: 'app-actividad-form',
  templateUrl: './actividad-form.component.html',
  styleUrl: './actividad-form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ActividadFormComponent {
  isDiabetic: boolean = false;
  activityOptions: any[] = [{ name: 'Poco Sedentario', code: '1' }, { name: 'Sedentario', code: '2' }, { name: 'Moderadamente Sedentario', code: '3' }, { name: 'Activo', code: '4' }, { name: 'Muy Activo', code: '5' }];
  public activityForm: FormGroup = this.formBuilder.group({
    age: [null, [Validators.required]],
    weight: [null, [Validators.required]],
    height: [null, [Validators.required]],
    activity: [null, [Validators.required]],
    diabetesFactor: [null]
  });

  constructor(
    private router:Router,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private registerValidatorService: RegisterValidatorService
  ) {
  }
  onSubmit():void{
    if (this.activityForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.' })
      return
    }
    this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: 'Datos de actividad guardados con éxito' })
    this.router.navigate(['/register/user']);

  }

  isValidField( field: string ): boolean | null {
    return this.registerValidatorService.isValidField(this.activityForm, field);
  }
  getFieldError( field: string ): string | null {
    return this.registerValidatorService.getFieldError(this.activityForm, field);
  }
}
