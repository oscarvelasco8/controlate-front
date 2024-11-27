import { NgModule } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';


@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    InputTextModule,
    CardModule,
    MegaMenuModule,
    ButtonModule,
    ImageModule
  ]
})
export class CommonPrimengModule { }
