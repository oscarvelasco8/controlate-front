import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MegaMenuItem} from 'primeng/api';

import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'shared-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent implements OnInit{
  isLightTheme: boolean = true;
  public items: MegaMenuItem[] = [
    {
      label: 'Home',
      routerLink: 'home',
      routerLinkActive: 'active'
    },
    {
      label: 'Macros',
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

  ngOnInit(): void {
    this.isLightTheme = !this.localStorageService.darkTheme;
  }
  get userLogged(): boolean{
    return this.localStorageService.getLoginStatus();
  }
  logout(): void{
    this.localStorageService.logout();
  }

  changeTheme() {
    const link = document.getElementById("theme");
    if (this.isLightTheme) {
      link?.setAttribute("href", "themes/aura-dark-blue.css");
      this.isLightTheme = false;
      this.localStorageService.isDarkTheme();
    } else {
      link?.setAttribute("href", "themes/aura-light-blue.css");
      this.isLightTheme = true;
      this.localStorageService.isLightTheme();
    }
  }
  get isDarkTheme():boolean{
    return this.localStorageService.darkTheme;
  }


}
