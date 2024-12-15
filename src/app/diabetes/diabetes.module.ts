import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiabetesRoutingModule } from './diabetes-routing.module';
import { DiabetesPageComponent } from './pages/diabetes-page/diabetes-page.component';
import {CaloriesModule} from '../calories/calories.module';
import { GraphicComponent } from './components/graphic/graphic.component';
import {ChartModule} from 'primeng/chart';
import {Button} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PolarGraphicComponent } from './components/polar-graphic/polar-graphic.component';
import { FoodInfoDiabetesComponent } from './components/food-info-diabetes/food-info-diabetes.component';
import { SearchFoodDiabetesComponent } from './components/search-food-diabetes/search-food-diabetes.component';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    DiabetesPageComponent,
    GraphicComponent,
    PolarGraphicComponent,
    FoodInfoDiabetesComponent,
    SearchFoodDiabetesComponent
  ],
  imports: [
    CommonModule,
    DiabetesRoutingModule,
    CaloriesModule,
    ChartModule,
    Button,
    DropdownModule,
    ReactiveFormsModule,
    CardModule,
    DialogModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    ProgressBarModule,
    TableModule
  ]
})
export class DiabetesModule { }
