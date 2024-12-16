import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaloriesRoutingModule } from './calories-routing.module';
import { CaloriesPageComponent } from './pages/calories-page/calories-page.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DoughtComponent } from './components/dought/dought.component';
import { FoodInfoComponent } from './components/food-info/food-info.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SearchFoodComponent } from './components/search-food/search-food.component';
import {CalendarModule} from 'primeng/calendar';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';
import {ProgressBarModule} from 'primeng/progressbar';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';


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
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ChartModule,
    CardModule,
    ProgressBarModule,
    DialogModule,
    TableModule,
    InputNumberModule,
    DropdownModule
  ],
  exports:[
    CalendarComponent
  ]
})
export class CaloriesModule { }
