import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaloriesRoutingModule } from './calories-routing.module';
import { CaloriesPageComponent } from './pages/calories-page/calories-page.component';
import {CommonPrimengModule} from '../common-primeng/common-primeng.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import {FormsModule} from '@angular/forms';
import { DoughtComponent } from './components/dought/dought.component';


@NgModule({
  declarations: [
    CaloriesPageComponent,
    CalendarComponent,
    DoughtComponent
  ],
  imports: [
    CommonModule,
    CaloriesRoutingModule,
    CommonPrimengModule,
    FormsModule
  ]
})
export class CaloriesModule { }
