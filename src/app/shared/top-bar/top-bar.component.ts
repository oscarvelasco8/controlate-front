import {Component,  ViewEncapsulation} from '@angular/core';
import {MegaMenuItem} from 'primeng/api';

import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'shared-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent{
  isLightTheme: boolean = true;
  public items: MegaMenuItem[] = [
    {
      label: 'Home',
      routerLink: 'home',
      routerLinkActive: 'active'
    },
    {
      label: 'Macronutrientes',
      routerLink: 'calories',
      routerLinkActive: 'active'
    },
    {
      label: 'Diabetes',
      routerLink: 'diabetes',
      routerLinkActive: 'active'
    },
  ];

  constructor(
    private localStorageService: LocalStorageService
  ) {
  }
  get userLogged(): boolean{
    return this.localStorageService.getLoginStatus();
  }
  logout(): void{
    this.localStorageService.logout();
  }

  changeTheme() {
    const link = document.getElementById("theme");
    console.log(link)
    if (this.isLightTheme) {
      console.log("blanco")
      link?.setAttribute("href", "themes/lara-dark-blue.css");
      this.isLightTheme = false;
    } else {
      console.log("negro")
      link?.setAttribute("href", "themes/lara-light-blue.css");
      this.isLightTheme = true;
    }
  }
}
