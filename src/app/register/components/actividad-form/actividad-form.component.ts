import {Component, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterValidatorService} from '../../services/register-validator.service';
import {FormValidatorService} from '../../../shared/services/form-validator.service';
import {LocalStorageService} from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-actividad-form',
  templateUrl: './actividad-form.component.html',
  styleUrl: './actividad-form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ActividadFormComponent implements OnInit{
  // Opciones de actividad para el formulario
  activityOptions: any[] = [
    { name: 'Poco Sedentario', code: '1' , value:'POCO_SEDENTARIO' },
    { name: 'Sedentario', code: '2', value: 'SEDENTARIO' },
    { name: 'Moderadamente Sedentario', code: '3', value: 'MODERADAMENTE_SEDENTARIO' },
    { name: 'Activo', code: '4', value: 'ACTIVO' },
    { name: 'Muy Activo', code: '5', value: 'MUY_ACTIVO' }];

  //Formulario reactivo de actividad del usuario
  public activityForm: FormGroup = this.formBuilder.group({
    age: [null, [Validators.required, Validators.min(1)]],
    weight: [null, [Validators.required , Validators.min(1)]],
    height: [null, [Validators.required, Validators.min(1)]],
    activity: [null, [Validators.required]],
    isDiabetic: [false],
    diabetesFactor: [null],
    icr:[null],
  });

  //Constructor de la clase, donde se inyectan los servicios

  constructor(
    private router:Router,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private registerValidatorService: RegisterValidatorService,
    private formValidatorService: FormValidatorService,
    public localStorageService: LocalStorageService
  ) {
  }

  // Metodo que se ejecuta al iniciar el componente. Iniciamos el formulario y seteamos los valores por defecto
  ngOnInit(): void {
    this.activityForm.patchValue({
      age: this.formValidatorService.userInfo.age,
      weight: this.formValidatorService.userInfo.weight,
      height: this.formValidatorService.userInfo.height,
      activity: this.activityOptions.find(option => option.value === this.formValidatorService.userInfo.activityFactor) || this.formValidatorService.userInfo.activityFactor,
      diabetesFactor: this.formValidatorService.userInfo.insulinaFactor,
      icr: this.formValidatorService.userInfo.icr,
      isDiabetic: this.formValidatorService.isDiabetic
    });
    this.localStorageService.setIsDiabetic(false);
  }

  //Metodo para enviar los datos del formulario
  onSubmit():void{
    if (this.activityForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.' })
      return
    }
    this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: 'Datos de actividad guardados con éxito' })
    this.formValidatorService.age = this.activityForm.get('age')?.value;
    this.formValidatorService.weight = this.activityForm.get('weight')?.value;
    this.formValidatorService.height = this.activityForm.get('height')?.value;
    this.formValidatorService.activityFactor = this.activityForm.get('activity')?.value.value;
    this.formValidatorService.insulinaFactor = this.activityForm.get('diabetesFactor')?.value;
    this.formValidatorService.icr = this.activityForm.get('icr')?.value;
    this.formValidatorService.isDiabetic = this.activityForm.get('isDiabetic')?.value;

    this.router.navigate(['/register/user']);
    console.log(this.activityForm.controls['isDiabetic'].value)

  }

  // Metodo para validar los campos
  isValidField( field: string ): boolean | null {
    return this.registerValidatorService.isValidField(this.activityForm, field);
  }

  // Metodo para obtener el error de los campos
  getFieldError( field: string ): string | null {
    return this.registerValidatorService.getFieldError(this.activityForm, field);
  }

  // Metodo para saber si el usuario es diabético
  get isDiabetic(): boolean {
    return this.activityForm.controls['isDiabetic'].value;
  }

  protected readonly localStorage = localStorage;
}
