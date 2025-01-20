import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

// Se declaran los componentes que forman parte del módulo y se importan los módulos necesarios
@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    InputTextModule
  ]
})
export class LoginModule { }
