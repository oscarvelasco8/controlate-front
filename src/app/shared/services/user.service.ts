import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {userInfo} from '../interfaces/userInfo';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'https://controlate-back.koyeb.app';
  //private baseUrl: string = 'http://localhost:8080';
  public userObjective:WritableSignal<string> = signal('');
  public proteinesObjective:WritableSignal<number> = signal(0);
  public carbohydratesObjective:WritableSignal<number> = signal(0);
  public fatsObjective:WritableSignal<number> = signal(0);
  public caloriesObjective:WritableSignal<number> = signal(0);
  public tmbObjective:WritableSignal<number> = signal(0);
  /*public tmbAdjusted:WritableSignal<number> = signal(0);*/
  constructor(
    private httpClient: HttpClient
  ) { }

  registerUser(userInfo: userInfo): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/api/users', userInfo);
  }
  logUser(username: string, password: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/api/users/login?username=${username}&password=${password}`);
  }

  getTmb(): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/api/users/tmb/${localStorage.getItem('userLogged')}`);
  }

  getDailyCalories(): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/api/users/daily-calories/${localStorage.getItem('userLogged')}`);
  }

  saveUserObjective(value:string): Observable<any> {
    return this.httpClient.patch(this.baseUrl + `/api/users/objective/${localStorage.getItem('userLogged')}`, value);
  }

  getUserObjective(): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/api/users/objective/${localStorage.getItem('userLogged')}`, { responseType: 'text' });
  }

  get userInfo(): Observable<userInfo> {
    return this.httpClient.get<userInfo>(this.baseUrl + `/api/users/${localStorage.getItem('userLogged')}`);
  }
  modifyUserInfo(userInfo: userInfo): Observable<any> {
    return this.httpClient.put(this.baseUrl + `/api/users/${localStorage.getItem('userLogged')}`, userInfo);
  }

}
