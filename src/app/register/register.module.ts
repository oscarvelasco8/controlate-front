import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PersonalFormComponent } from './components/personal-form/personal-form.component';
import { ActividadFormComponent } from './components/actividad-form/actividad-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {InputSwitchModule} from 'primeng/inputswitch';
import {StepsModule} from 'primeng/steps';

// Definiciónde los componentes que forman parte del módulo y se importan los módulos necesarios
@NgModule({
  declarations: [
    RegisterPageComponent,
    PersonalFormComponent,
    ActividadFormComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    InputSwitchModule,
    StepsModule
  ]
})
export class RegisterModule { }
