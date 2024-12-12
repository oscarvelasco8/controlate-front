import { Injectable } from '@angular/core';
import {userInfo} from '../interfaces/userInfo';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  private _userInfo: userInfo = {
    name: '',
    lastname: '',
    email: '',
    age: 0,
    weight: 0,
    height: 0,
    activityFactor: '',
    insulinaFactor: 0,
    username: '',
    password: '',
    gender: '',
    ICR: 0
  };

  constructor(

  ) { }

  get userInfo():userInfo{
    return this._userInfo;
  }

  set name(name:string){
    this._userInfo.name = name;
  }

  set lastName(lastName:string){
    this._userInfo.lastname = lastName;
  }

  set email(email:string){
    this._userInfo.email = email;
  }

  set age(age:number){
    this._userInfo.age = age;
  }

  set weight(weight:number){
    this._userInfo.weight = weight;
  }

  set height(height:number){
    this._userInfo.height = height;
  }

  set activityFactor(activityFactor:string){
    this._userInfo.activityFactor = activityFactor;
  }

  set insulinaFactor(insulinaFactor:number){
    this._userInfo.insulinaFactor = insulinaFactor;
  }

  set userName(userName:string){
    this._userInfo.username = userName;
  }

  set password(password:string){
    this._userInfo.password = password;
  }

  set gender(gender:string){
    this._userInfo.gender = gender;
  }

  get gender ():string{
    return this._userInfo.gender;
  }

  set ICR(icr:number){
    this._userInfo.ICR = icr;
  }

  isValidForm():boolean{
    return this._userInfo.name.length > 0 && this._userInfo.lastname.length > 0 && this._userInfo.email.length > 0 &&
    this._userInfo.age > 0 && this._userInfo.weight > 0 && this._userInfo.height > 0 && this._userInfo.activityFactor.length > 0 &&
    this._userInfo.username.length > 0 && this._userInfo.password.length > 0;
  }

  resetForm():void{
    this._userInfo = {
      name: '',
      lastname: '',
      email: '',
      age: 0,
      weight: 0,
      height: 0,
      activityFactor: '',
      insulinaFactor: 0,
      username: '',
      password: '',
      gender: '',
      ICR:0
    };
  }

}
