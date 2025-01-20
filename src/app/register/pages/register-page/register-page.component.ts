import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {LocalStorageService} from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  encapsulation: ViewEncapsulation.None

})
export class RegisterPageComponent implements OnInit{
  //Atributo de la clase
  items: MenuItem[] = [];

  //Constructor de la clase, donde se inyectan los servicios
  constructor(public localStorageService: LocalStorageService) {
  }

  //Metodo que se ejecuta al iniciar el componente. Inicializamos los items que tendrá el formulario de registro
  ngOnInit() {
    this.items = [
      {
        label: 'Datos personales',
        routerLink: "personal"
      },
      {
        label: 'Datos de actividad',
        routerLink: "activity"
      },
      {
        label: 'Creación del usuario',
        routerLink: "user"
      }
    ];
  }


  protected readonly localStorage = localStorage;
}
