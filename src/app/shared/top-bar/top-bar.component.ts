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
    console.log(this.localStorageService.getLoginStatus())
    return this.localStorageService.getLoginStatus();
  }
  logout(): void{
    this.localStorageService.logout();
  }
}
