// Interfaz que define los datos de un usuario
export interface userInfo{
  name: string,
  lastname: string,
  email: string,
  age: number,
  weight: number,
  height: number,
  activityFactor: string,
  insulinaFactor?: number,
  username:string,
  password:string,
  gender:string,
  objective?:string,
  icr?:number,
  isDiabetic?:boolean
}
