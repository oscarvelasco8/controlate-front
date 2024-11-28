import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import {MegaMenuModule} from 'primeng/megamenu';
import {PrimeTemplate} from 'primeng/api';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';



@NgModule({
  declarations: [
    TopBarComponent
  ],
  imports: [
    CommonModule,
    MegaMenuModule,
    PrimeTemplate,
    RouterLink,
    Button
  ],
  exports: [
    TopBarComponent
  ]
})
export class SharedModule { }
