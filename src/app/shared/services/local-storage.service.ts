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
}
