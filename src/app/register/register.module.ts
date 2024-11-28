import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {CommonPrimengModule} from '../common-primeng/common-primeng.module';
import { PersonalComponent } from './components/personal/personal.component';
import { UsernameComponent } from './components/username/username.component';


@NgModule({
  declarations: [
    RegisterPageComponent,
    PersonalComponent,
    UsernameComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    CommonPrimengModule
  ]
})
export class RegisterModule { }
