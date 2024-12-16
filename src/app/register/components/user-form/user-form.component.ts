import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {timeout} from 'rxjs';
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
  public userForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['',[Validators.required, this.registerValidatorService.passwordValidator]]
  })

  constructor(
    private router:Router,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private registerValidatorService: RegisterValidatorService,
    private formValidatorService: FormValidatorService,
    private userService:UserService
    ) {
  }
  onSubmit():void{
    if (this.userForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.' })
      return
    }
    this.formValidatorService.userName = this.userForm.get('username')?.value;
    this.formValidatorService.password = this.userForm.get('password')?.value;

    if (!this.formValidatorService.isValidForm()){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.' });
      return;
    }

    this.userService.registerUser(this.formValidatorService.userInfo).subscribe(
      {
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: '¡Registro completado con éxito!' })
          this.formValidatorService.resetForm();
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (err) => {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error });
        }
      }
    );

  }

  isValidField( field: string ): boolean | null {
    return this.registerValidatorService.isValidField(this.userForm, field);
  }
  getFieldError( field: string ): string | null {
    return this.registerValidatorService.getFieldError(this.userForm, field);
  }

  ngOnInit(): void {
    this.userForm.setValue({
      username: this.formValidatorService.userInfo.username,
      password: this.formValidatorService.userInfo.password
    });
  }
}
