import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {CommonPrimengModule} from '../common-primeng/common-primeng.module';
import { PersonalComponent } from './components/personal/personal.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    RegisterPageComponent,
    PersonalComponent,
    ActividadComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    CommonPrimengModule,
    FormsModule
  ]
})
export class RegisterModule { }
