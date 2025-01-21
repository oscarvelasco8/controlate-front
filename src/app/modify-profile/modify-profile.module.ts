import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ModifyProfileComponent } from './pages/modify-profile/modify-profile.component';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from 'primeng/dialog';

// Rutas del módulo de modificación de perfil
const routes : Routes = [
  {
    path: '',
    redirectTo: 'modify-profile',
    pathMatch: 'full'
  },
  {
  path: 'modify-profile',
  component:ModifyProfileComponent
  }
];

// Se declaran los componentes que forman parte del módulo, se importan los módulos necesarios y se exportan los componentes que
// se necesitarán en otros módulos

@NgModule({
  declarations: [
    ModifyProfileComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        Button,
        InputTextModule,
        PasswordModule,
        ReactiveFormsModule,
        DropdownModule,
        InputNumberModule,
        DialogModule
    ],
  exports: [RouterModule]
})
export class ModifyProfileModule { }
