import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiabetesRoutingModule } from './diabetes-routing.module';
import { DiabetesPageComponent } from './pages/diabetes-page/diabetes-page.component';
import {CaloriesModule} from '../calories/calories.module';
import { GraphicComponent } from './components/graphic/graphic.component';
import {ChartModule} from 'primeng/chart';
import {Button} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ReactiveFormsModule} from '@angular/forms';
import { PolarGraphicComponent } from './components/polar-graphic/polar-graphic.component';


@NgModule({
  declarations: [
    DiabetesPageComponent,
    GraphicComponent,
    PolarGraphicComponent
  ],
  imports: [
    CommonModule,
    DiabetesRoutingModule,
    CaloriesModule,
    ChartModule,
    Button,
    DropdownModule,
    ReactiveFormsModule
  ]
})
export class DiabetesModule { }
