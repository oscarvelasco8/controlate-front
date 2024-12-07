import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {userInfo} from '../interfaces/userInfo';
import {Observable} from 'rxjs';
import {FoodAddedFromUser} from '../../calories/interfaces/foodAddedFromUser';
import {FormGroup} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://localhost:8080';
  /*private _userHistory: FoodAddedFromUser[] = [];*/

  constructor(
    private httpClient: HttpClient
  ) { }

  registerUser(userInfo: userInfo): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/api/users', userInfo);
  }
  logUser(username: string, password: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/api/users/login?username=${username}&password=${password}`);
  }

  /*addtoUserHistory(meal:string, food:string, formGroup: FormGroup): void{
    this._userHistory.push({meal:meal,food:food, quantity:formGroup.controls['quantity'].value, unit:formGroup.controls['units'].value});
  }*/
  /*get userHistory():FoodAddedFromUser[]{
    return this._userHistory;
  }*/
}
