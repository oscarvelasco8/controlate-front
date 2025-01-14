import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {UserService} from '../../../shared/services/user.service';
import {RegisterValidatorService} from '../../../register/services/register-validator.service';
import {distinctUntilChanged} from 'rxjs';
import {LocalStorageService} from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrl: './modify-profile.component.css'
})
export class ModifyProfileComponent implements OnInit{

  // Formulario para modificar el perfil de usuario
  public modifyUserForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.minLength(2), Validators.required]],
    lastname: ['', [Validators.minLength(2), Validators.required]],
    email: ['',[Validators.email, this.registerValidatorService.emailValidator]],
    gender: [''],
    age: ['', [Validators.min(1), Validators.required]],
    height: ['', [Validators.min(1), Validators.required]],
    weight: ['', [Validators.min(1), Validators.required]],
    activityFactor: [''],
    insulinaFactor: [''],
    username: ['', [Validators.minLength(3), Validators.required]],
    password: ['', this.registerValidatorService.passwordValidator],
    objective: [''],
    icr: [''],
  })
  // Atributos para el formulario
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
  private initialFormValue: any;

  // Constructor de la clase donde se inyectan los servicios
  constructor(
    private router:Router,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private registerValidatorService: RegisterValidatorService,
    private localStorageService:LocalStorageService
  ) {
    this.configureValidationPassword();
  }

  // Metodo que se ejecuta al iniciar el componente. Se llama al servicio para obtener la informacion del usuario y se inicializan los formularios
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
        this.initialFormValue = this.modifyUserForm.value; // Guardar el estado inicial
      }
    })
  }

  // Método que configura la validación de la contraseña
  configureValidationPassword() {
    const passwordControl = this.modifyUserForm.get('password');
    // Si la contraseña no es nula, se configura la validación. Si no, se limpian las validaciones
    if (passwordControl) {
      passwordControl.valueChanges.pipe(
        distinctUntilChanged() // Evita manejar valores repetidos
      ).subscribe((value) => {
        if (value) {
          passwordControl.setValidators([this.registerValidatorService.passwordValidator2()]);
        } else {
          passwordControl.clearValidators();
        }

        // Se actualizan las validaciones
        passwordControl.updateValueAndValidity({ emitEvent: false }); // Evita disparar valueChanges de nuevo
      });
    }
  }

  // Método que modifica el perfil de usuario
  modifyProperties() {

    // Si no se han realizado cambios, se redirige a la pantalla de inicio con un mensaje indicándo que no hay cambios
    if (JSON.stringify(this.modifyUserForm.value) === JSON.stringify(this.initialFormValue)) {
      this.messageService.add({severity: 'info', summary: 'Sin cambios', detail: 'No se realizaron cambios en el perfil'});
      this.router.navigate(['home']);
      return;
    }

    // Si el formulario es invalido, se muestra un mensaje de error
    if (this.modifyUserForm.invalid) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.'});
      return;
    }

    // Si no ocurre ninguna de las anteriores condiciones, se modifica el perfil
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

  // Método que verifica si un campo es valido
  isValidField( field: string ): boolean | null {
    return this.registerValidatorService.isValidField(this.modifyUserForm, field);
  }

  // Método que obtiene el error de un campo
  getFieldError( field: string ): string | null {
    return this.registerValidatorService.getFieldError(this.modifyUserForm, field);
  }

  // Metodo que elimina el perfil de usuario de la base de datos
  deleteUser() {
    this.userService.deleteUser().subscribe({
      next: (response) => {
        this.localStorageService.logout();
        this.messageService.add({severity:'success', summary: 'Eliminado', detail: 'Perfil eliminado con exito'});
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.log(error)
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar el perfil'});
      }
    })
  }
}
