import { NgModule } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { StepsModule } from 'primeng/steps';
import { ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    InputTextModule,
    CardModule,
    MegaMenuModule,
    ButtonModule,
    ImageModule,
    StepsModule,
    ToastModule

  ]
})
export class CommonPrimengModule { }
