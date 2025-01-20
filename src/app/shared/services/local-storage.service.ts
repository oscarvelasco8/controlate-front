import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  //Constructor de la clase donde inyectamos los servicios
  constructor(private messageService: MessageService, private router: Router) { }

  // Metodo que añade a LocalStorage la información necesaria una vez el usuario se loga en la aplicación
  login(user:string, token:string): void {
    localStorage.setItem('userLogged', user);
    localStorage.setItem('token', token);
    localStorage.setItem("showMessage", "false");
    localStorage.setItem("isExpired", "false");
  }

  // Getters y Setters
  setShowMessage(value: string) {
    localStorage.setItem("showMessage", value);
  }

  get showMessage(): string {
    return localStorage.getItem("showMessage") || "";
  }

  setExpired(value: string) {
    localStorage.setItem("isExpired", value);
  }

  get isExpired(): string {
    return localStorage.getItem("isExpired") || "";
  }

  // Metodo que limpia la información almacenada en LocalStorage cuando nos deslogamos
  logout(): void {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    if (localStorage.getItem("showMessage") === "false" && localStorage.getItem("isExpired") === "true") {
      this.messageService.add({ severity: 'error', summary: 'Sesion expirada', detail: 'La sesion ha expirado. Por favor, lógate de nuevo.' });
      this.setShowMessage("true");
    }
  }

  // Metodo que recupera el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Metodo que verifica si el usuario ha iniciado sesión
  getLoginStatus(): boolean {
    return !!localStorage.getItem('userLogged');
  }

  // Metodo para saber si se esta utilizando el tema oscuro
  isDarkTheme():void{
    localStorage.setItem("isDarkTheme", "true");
  }

  // Metodo para saber si se esta utilizando el tema claro
  isLightTheme():void{
    localStorage.setItem("isDarkTheme", "false");
  }

  // Metodo que recupera si se esta utilizando el tema oscuro
  get darkTheme():boolean{
    return localStorage.getItem("isDarkTheme") === "true";
  }

  // Metodo que nos dice si el usuario es diabetico
  get isDiabetic():boolean{
    return localStorage.getItem("isDiabetic") === "true";
  }

  // Metodo para guardar si el usuario es diabetico
  setIsDiabetic(isDiabetic:boolean){
    localStorage.setItem("isDiabetic", isDiabetic.toString());
  }
}
