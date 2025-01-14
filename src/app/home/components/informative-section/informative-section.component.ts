import {Component, Input} from '@angular/core';
import { SectionData } from '../../interfaces/section-data.interface';

@Component({
  selector: 'home-informative-section',
  templateUrl: './informative-section.component.html',
  styleUrl: './informative-section.component.css'
})
export class InformativeSectionComponent {

  //Atributos que recibimos del componente padre
  @Input()
  data!: SectionData;

  @Input()
  reverse?: boolean = false;
}
