import { Component } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  public loginUserForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['',[Validators.required]]
  })
  constructor(
    private router:Router,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private localStorageService:LocalStorageService
  ) {
  }

  logUser(){
    const username:string =  this.loginUserForm.get('username')?.value
    const password:string =  this.loginUserForm.get('password')?.value
    this.userService.logUser(username, password).subscribe(
      {
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Usuario logado', detail: "¡Bienvenido, " + username + "!" })
          this.localStorageService.login(username);
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
}
