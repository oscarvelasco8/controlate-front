import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private messageService: MessageService, private router: Router) { }

  login(user:string, token:string): void {
    localStorage.setItem('userLogged', user);
    localStorage.setItem('token', token);
    localStorage.setItem("showMessage", "false");
    localStorage.setItem("isExpired", "false");
  }

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

  logout(): void {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    if (localStorage.getItem("showMessage") === "false" && localStorage.getItem("isExpired") === "true") {
      this.messageService.add({ severity: 'error', summary: 'Sesion expirada', detail: 'La sesion ha expirado. Por favor, lógate de nuevo.' });
      this.setShowMessage("true");
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getLoginStatus(): boolean {
    return !!localStorage.getItem('userLogged');
  }

  isDarkTheme():void{
    localStorage.setItem("isDarkTheme", "true");
  }

  isLightTheme():void{
    localStorage.setItem("isDarkTheme", "false");
  }

  get darkTheme():boolean{
    return localStorage.getItem("isDarkTheme") === "true";
  }

  saveUserObjective(value:string):void{
    localStorage.setItem('userObjective', value);
  }
}
