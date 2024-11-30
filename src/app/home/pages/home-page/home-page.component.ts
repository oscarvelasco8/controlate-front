import { Component } from '@angular/core';
import { SECTIONS } from '../../constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public sections = SECTIONS;
}
