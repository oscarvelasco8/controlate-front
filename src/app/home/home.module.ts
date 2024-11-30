import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonPrimengModule } from '../common-primeng/common-primeng.module';
import { SharedModule } from '../shared/shared.module';
import { InformativeSectionComponent } from './components/informative-section/informative-section.component';
import { FaqAccordionComponent } from './components/faq-accordion/faq-accordion.component';


@NgModule({
  declarations: [
    HomePageComponent,
    InformativeSectionComponent,
    FaqAccordionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommonPrimengModule,
    SharedModule
  ]
})
export class HomeModule { }
