import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterValidatorService} from '../../services/register-validator.service';
import {FormValidatorService} from '../../../shared/services/form-validator.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{

  // Formulario de datos de la aplicación
  public userForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['',[Validators.required, this.registerValidatorService.passwordValidator]]
  })

  // Constructor de la clase, donde se inyectan los servicios
  constructor(
    private router:Router,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private registerValidatorService: RegisterValidatorService,
    private formValidatorService: FormValidatorService,
    private userService:UserService
    ) {
  }

  // Metodo que se ejecuta cuando se carga el componente. Establece los valores iniciales del formulario
  ngOnInit(): void {
    this.userForm.setValue({
      username: this.formValidatorService.userInfo.username,
      password: this.formValidatorService.userInfo.password
    });
  }

  // Metodo que se ejecuta cuando se envia el formulario para registrarlo en nuestra aplicación
  onSubmit():void{
    if (this.userForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.' })
      return
    }
    this.formValidatorService.userName = this.userForm.get('username')?.value.toLowerCase();
    this.formValidatorService.password = this.userForm.get('password')?.value;

    if (!this.formValidatorService.isValidForm()){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.' });
      return;
    }

    this.userService.registerUser(this.formValidatorService.userInfo).subscribe(
      {
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: '¡Registro completado con éxito!' })
          this.formValidatorService.resetForm();
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        },
        error: (err) => {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error });
        }
      }
    );

  }

  // Metodo que verifica si un campo es valido
  isValidField( field: string ): boolean | null {
    return this.registerValidatorService.isValidField(this.userForm, field);
  }

  // Metodo que obtiene el error de un campo
  getFieldError( field: string ): string | null {
    return this.registerValidatorService.getFieldError(this.userForm, field);
  }
}
