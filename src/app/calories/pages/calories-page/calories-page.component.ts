import { Component } from '@angular/core';
import {doughtData} from '../../interfaces/doughtData';

@Component({
  selector: 'app-calories-page',
  templateUrl: './calories-page.component.html',
  styleUrl: './calories-page.component.css'
})
export class CaloriesPageComponent {

  displayModal: boolean = false;

  openModal() {
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }
}
