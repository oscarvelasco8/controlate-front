import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit{
  /*constructor(public messageService: MessageService) {}
  ngOnInit(): void {
    this.items =  [
      {label: 'Información Personal', routerLink: "personal" },
      {label: 'Usuario', routerLink: "usuario"},
      {label: 'Contraseña', routerLink: "password"}
    ];
  }
  activeIndex: number = 1;
  items: MenuItem[] = [];
  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }*/
  items: MenuItem[] | undefined;

  activeIndex: number = 0;

  constructor(public messageService: MessageService) {}

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Personal',
        routerLink: "personal"
      },
      {
        label: 'Usuario',
        routerLink: "usuario"
      },
      {
        label: 'Contraseña',
        routerLink: "password"
      }
    ];
  }


}
