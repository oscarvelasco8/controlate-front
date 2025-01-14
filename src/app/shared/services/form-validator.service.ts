import { Injectable } from '@angular/core';
import {userInfo} from '../interfaces/userInfo';


@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  // Datos base que contienen la información de un usuario
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
    icr: 0,
    isDiabetic: false
  };

  //Getters y Setters de la información de un usuario

  set isDiabetic(isDiabetic:boolean){
    this._userInfo.isDiabetic = isDiabetic;
  }

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

  set icr(icr:number){
    this._userInfo.icr = icr;
  }

  // Validación del formulario
  isValidForm():boolean{
    return this._userInfo.name.length > 0 && this._userInfo.lastname.length > 0 && this._userInfo.email.length > 0 &&
    this._userInfo.age > 0 && this._userInfo.weight > 0 && this._userInfo.height > 0 && this._userInfo.activityFactor.length > 0 &&
    this._userInfo.username.length > 0 && this._userInfo.password.length > 0;
  }

  // Resetear el formulario
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
      icr:0,
      isDiabetic: false
    };
  }

}
