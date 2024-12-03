import { NgModule } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { StepsModule } from 'primeng/steps';
import { ToastModule} from 'primeng/toast';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputNumberModule} from 'primeng/inputnumber';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {PasswordModule} from 'primeng/password';
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import {CalendarModule} from 'primeng/calendar';
import {ChartModule} from 'primeng/chart';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';


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
    ToastModule,
    FloatLabelModule,
    InputNumberModule,
    SelectButtonModule,
    DropdownModule,
    InputSwitchModule,
    PasswordModule,
    ImageModule,
    AccordionModule,
    PasswordModule,
    AutoCompleteModule,
    AvatarModule,
    CalendarModule,
    ChartModule,
    CardModule,
    DialogModule,
    TableModule

  ]
})
export class CommonPrimengModule { }
