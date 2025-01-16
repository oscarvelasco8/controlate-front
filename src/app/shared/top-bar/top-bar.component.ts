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
  // Atributos de la clase
  isLightTheme: boolean = true;

  // Atributo que indica los items que tendrá la TopBar
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

  // Constructor de la clase donde se inyectan los servicios
  constructor(
    private localStorageService: LocalStorageService
  ) {
  }

  // Metodo que se ejecuta al iniciar el componente. Establece el tema de la topbar
  ngOnInit(): void {
    this.isLightTheme = !this.localStorageService.darkTheme;
  }

  // Getter que nos devuelve si el usuario se ha logado
  get userLogged(): boolean{
    return this.localStorageService.getLoginStatus();
  }

  // Metodo para cerrar la sesion
  logout(): void{
    this.localStorageService.logout();
  }

  // Metodo para cambiar el tema

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

  // Getter para saber si el tema es oscuro
  get isDarkTheme():boolean{
    return this.localStorageService.darkTheme;
  }


}
