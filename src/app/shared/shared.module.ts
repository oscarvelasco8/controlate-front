import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import {RouterLink} from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import {CommonPrimengModule} from '../common-primeng/common-primeng.module';
import {PrimeTemplate} from 'primeng/api';



@NgModule({
  declarations: [
    TopBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    CommonPrimengModule,
    PrimeTemplate
  ],
  exports: [
    TopBarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
