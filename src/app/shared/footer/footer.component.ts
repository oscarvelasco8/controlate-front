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

  // Método para saber si se está utilizando el tema oscuro
  get isDarkTheme():boolean {
    return this.localStorageService.darkTheme;
  }
}
