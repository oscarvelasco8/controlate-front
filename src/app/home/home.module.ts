import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InformativeSectionComponent } from './components/informative-section/informative-section.component';
import { FaqAccordionComponent } from './components/faq-accordion/faq-accordion.component';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [
    HomePageComponent,
    InformativeSectionComponent,
    FaqAccordionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    AccordionModule
  ]
})
export class HomeModule { }
