import { NgModule } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';


@NgModule({
  exports: [
    MegaMenuModule,
    ButtonModule,
    ImageModule
  ]
})
export class CommonPrimengModule { }
