import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {CommonPrimengModule} from '../common-primeng/common-primeng.module';
import { PersonalFormComponent } from './components/personal-form/personal-form.component';
import { ActividadFormComponent } from './components/actividad-form/actividad-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserFormComponent } from './components/user-form/user-form.component';


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
    CommonPrimengModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
