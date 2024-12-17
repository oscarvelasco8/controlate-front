import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  login(user:string): void {
    localStorage.setItem('userLogged', user);
  }

  logout(): void {
    localStorage.removeItem('userLogged');
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
