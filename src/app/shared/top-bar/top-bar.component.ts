import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MegaMenuItem} from 'primeng/api';
import {UserService} from '../services/user.service';
import {LocalStorageService} from '../services/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'shared-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
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
  getLoginStatus(): boolean{
    console.log(this.localStorageService.getLoginStatus())
    return this.localStorageService.getLoginStatus();
  }
  logout(): void{
    this.localStorageService.logout();
  }
}
