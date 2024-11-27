import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiabetesRoutingModule } from './diabetes-routing.module';
import { DiabetesPageComponent } from './pages/diabetes-page/diabetes-page.component';


@NgModule({
  declarations: [
    DiabetesPageComponent
  ],
  imports: [
    CommonModule,
    DiabetesRoutingModule
  ]
})
export class DiabetesModule { }
