import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import {RouterLink} from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import {PrimeTemplate} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {AvatarModule} from 'primeng/avatar';


//Declaración de los componentes que forman parte del módulo, se importan los módulos necesarios y se exportan los componentes que se necesitarán en otros módulosa
@NgModule({
  declarations: [
    TopBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    PrimeTemplate,
    ButtonModule,
    MenubarModule,
    AvatarModule
  ],
  exports: [
    TopBarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
