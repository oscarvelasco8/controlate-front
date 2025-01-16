import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {userInfo} from '../interfaces/userInfo';
import {modifyUserInfo} from '../interfaces/modifyUserInfo';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // URL de la API de produccion y desarrollo
  private baseUrl: string = 'https://controlate-back.koyeb.app';
  //private baseUrl: string = 'http://localhost:8080';

  // Signals del servicio
  public userObjective:WritableSignal<string> = signal('');
  public proteinesObjective:WritableSignal<number> = signal(0);
  public carbohydratesObjective:WritableSignal<number> = signal(0);
  public fatsObjective:WritableSignal<number> = signal(0);
  public caloriesObjective:WritableSignal<number> = signal(0);
  public tmbObjective:WritableSignal<number> = signal(0);

  // Constructor de la clase donde inyectamos el servicio para realizar petciones HTTP
  constructor(
    private httpClient: HttpClient
  ) { }

  // Metodo para registrar un nuevo usuario
  registerUser(userInfo: userInfo): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/api/users', userInfo);
  }

  // Metodo para iniciar sesion
  logUser(username: string, password: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/api/users/login?username=${username}&password=${password}`);
  }

  // Metodo para obtener el tmb
  getTmb(): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/api/users/tmb/${localStorage.getItem('userLogged')}`);
  }

  // Metodo para obtener las calorias diarias
  getDailyCalories(): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/api/users/daily-calories/${localStorage.getItem('userLogged')}`);
  }

  // Metodo para guardar el objetivo del usuario
  saveUserObjective(value:string): Observable<any> {
    return this.httpClient.patch(this.baseUrl + `/api/users/objective/${localStorage.getItem('userLogged')}`, value, { responseType: 'text' });
  }

  // Metodo para obtener el objetivo del usuario
  getUserObjective(): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/api/users/objective/${localStorage.getItem('userLogged')}`, { responseType: 'text' })
  }

  // Getter que obtiene la informacion del usuario
  get userInfo(): Observable<userInfo> {
    return this.httpClient.get<userInfo>(this.baseUrl + `/api/users/${localStorage.getItem('userLogged')}`);
  }

  // Metodo para modificar la informacion del usuario
  modifyUserInfo(userInfo:modifyUserInfo): Observable<any> {
    return this.httpClient.patch(this.baseUrl + `/api/users/${localStorage.getItem('userLogged')}`, userInfo);
  }

  // Metodo para borrar el usuario
  deleteUser(): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `/api/users/${localStorage.getItem('userLogged')}`, { responseType: 'text' });
  }

}
