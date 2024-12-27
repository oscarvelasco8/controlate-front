import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {UserService} from '../../../shared/services/user.service';
import {RegisterValidatorService} from '../../../register/services/register-validator.service';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrl: './modify-profile.component.css'
})
export class ModifyProfileComponent implements OnInit{

  public modifyUserForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.minLength(2), Validators.required]],
    lastname: ['', [Validators.minLength(2), Validators.required]],
    email: ['',[Validators.email, Validators.required]],
    gender: [''],
    age: ['', [Validators.min(1), Validators.required]],
    height: ['', [Validators.min(1), Validators.required]],
    weight: ['', [Validators.min(1), Validators.required]],
    activityFactor: [''],
    insulinaFactor: [''],
    username: ['', [Validators.minLength(3), Validators.required]],
    password: [''],
    objective: [''],
    icr: [''],
  })

  userObjectiveOptions: any[] = [
    { name: 'Bajar de peso ligeramente', code: '1' , value:'BAJAR_LIGERO' },
    { name: 'Bajar de peso moderadamente', code: '2', value: 'BAJAR_MODERADO' },
    { name: 'Mantenimiento', code: '3', value: 'MANTENIMIENTO' },
    { name: 'Subir de peso ligeramente', code: '4', value: 'SUBIR_LIGERO' },
    { name: 'Subir de peso moderadamente', code: '5', value: 'SUBIR_MODERADO' }];

  activityOptions: any[] = [
    { name: 'Poco Sedentario', code: '1' , value:'POCO_SEDENTARIO' },
    { name: 'Sedentario', code: '2', value: 'SEDENTARIO' },
    { name: 'Moderadamente Sedentario', code: '3', value: 'MODERADAMENTE_SEDENTARIO' },
    { name: 'Activo', code: '4', value: 'ACTIVO' },
    { name: 'Muy Activo', code: '5', value: 'MUY_ACTIVO' }];

  genderOptions: any[] = [{ name: 'Hombre', code: '1', value:'MALE' }, { name: 'Mujer', code: '2', value: 'FEMALE' }];
  constructor(
    private router:Router,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private registerValidatorService: RegisterValidatorService
  ) {
    this.configureValidationPassword();
  }

  configureValidationPassword() {
    const passwordControl = this.modifyUserForm.get('password');
    if (passwordControl) {
      passwordControl.valueChanges.subscribe((value) => {
        if (value) {
          passwordControl.setValidators([this.registerValidatorService.passwordValidator2()]);
        }else{
          passwordControl.clearValidators();
        }
        this.modifyUserForm.get('password')?.updateValueAndValidity();
      });

    }
  }

  modifyProperties() {
    if (!this.modifyUserForm.dirty) {
      this.messageService.add({severity: 'info', summary: 'Sin cambios', detail: 'No se realizaron cambios en el perfil'});
      this.router.navigate(['home']);
      return;
    }
    if (this.modifyUserForm.invalid) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.'});
      return;
    }

    const {activityFactor, gender, objective} = this.modifyUserForm.value
    const noEmptyFields = Object.fromEntries(Object.entries(this.modifyUserForm.value).filter(([key, value]) => value !== ''));
    this.userService.modifyUserInfo({
      ...noEmptyFields,
      activityFactor: activityFactor.value,
      gender: gender.value,
      objective: objective.value,

    }).subscribe({
      next: (response) => {
        this.messageService.add({severity:'success', summary: 'Modificado', detail: 'Perfil modificado con exito'});
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.log(error)
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al modificar el perfil'});
      }
    })
  }

  isValidField( field: string ): boolean | null {
    return this.registerValidatorService.isValidField(this.modifyUserForm, field);
  }
  getFieldError( field: string ): string | null {
    return this.registerValidatorService.getFieldError(this.modifyUserForm, field);
  }

  ngOnInit(): void {
    this.userService.userInfo.subscribe({
      next: (response) => {
        this.modifyUserForm.setValue({
          name: response.name,
          lastname: response.lastname,
          email: response.email,
          gender: this.genderOptions.find(option => option.value === response.gender) || response.gender,
          age: response.age,
          height: response.height,
          weight: response.weight,
          activityFactor: this.activityOptions.find(option => option.value === response.activityFactor) || response.activityFactor,
          insulinaFactor: response.insulinaFactor,
          username: response.username,
          password: '',
          objective: this.userObjectiveOptions.find(option => option.value === response.objective) || response.objective,
          icr: response.icr
        });
      }
    })
  }
}
