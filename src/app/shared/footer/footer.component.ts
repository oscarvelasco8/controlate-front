import { Component } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private localStorageService: LocalStorageService) {

  }

  get isDarkTheme():boolean {
    return this.localStorageService.darkTheme;
  }
}
