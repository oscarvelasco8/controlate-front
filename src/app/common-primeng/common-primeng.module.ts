import { NgModule } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';


@NgModule({
  exports: [
    MegaMenuModule,
    ButtonModule
  ]
})
export class CommonPrimengModule { }
