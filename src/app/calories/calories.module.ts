import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaloriesRoutingModule } from './calories-routing.module';
import { CaloriesPageComponent } from './pages/calories-page/calories-page.component';
import {CommonPrimengModule} from '../common-primeng/common-primeng.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DoughtComponent } from './components/dought/dought.component';
import { FoodInfoComponent } from './components/food-info/food-info.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SearchFoodComponent } from './components/search-food/search-food.component';


@NgModule({
  declarations: [
    CaloriesPageComponent,
    CalendarComponent,
    DoughtComponent,
    FoodInfoComponent,
    GraphicComponent,
    ProgressBarComponent,
    SearchFoodComponent
  ],
  imports: [
    CommonModule,
    CaloriesRoutingModule,
    CommonPrimengModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CalendarComponent
  ]
})
export class CaloriesModule { }
