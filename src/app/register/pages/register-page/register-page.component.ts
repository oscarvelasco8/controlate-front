import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  encapsulation: ViewEncapsulation.None

})
export class RegisterPageComponent implements OnInit{

  items: MenuItem[] = [];

  activeIndex: number = 0;

  constructor(private messageService: MessageService) {}



  ngOnInit() {
    this.items = [
      {
        label: 'Datos personales',
        routerLink: "personal-form"
      },
      {
        label: 'Datos de actividad-form',
        routerLink: "activity"
      },
      {
        label: 'Creación del usuario',
        routerLink: "user"
      }
    ];
  }




}
