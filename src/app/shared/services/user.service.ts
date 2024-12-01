import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {userInfo} from '../interfaces/userInfo';
import {catchError, Observable, of, pipe, Subscription, tap} from 'rxjs';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {FormValidatorService} from './form-validator.service';
import {MessageService} from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient
  ) { }

  registerUser(userInfo: userInfo): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/api/users', userInfo);
  }
}
