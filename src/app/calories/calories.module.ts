import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaloriesRoutingModule } from './calories-routing.module';
import { CaloriesPageComponent } from './pages/calories-page/calories-page.component';


@NgModule({
  declarations: [
    CaloriesPageComponent
  ],
  imports: [
    CommonModule,
    CaloriesRoutingModule
  ]
})
export class CaloriesModule { }
