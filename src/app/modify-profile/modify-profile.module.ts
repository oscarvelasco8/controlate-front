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
        InputNumberModule
    ],
  exports: [RouterModule]
})
export class ModifyProfileModule { }
