import { Component } from '@angular/core';
import { FaqItem } from '../../interfaces/faq-item.interface';
import { faqData } from '../../constants';

@Component({
  selector: 'home-faq-accordion',
  templateUrl: './faq-accordion.component.html',
  styleUrl: './faq-accordion.component.css'
})
export class FaqAccordionComponent {
  public faqList: FaqItem[] = faqData;
}
