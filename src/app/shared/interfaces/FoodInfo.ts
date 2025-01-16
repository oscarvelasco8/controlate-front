//Interfaz que define la estructura de un registro de comida
export interface FoodInfo {
  name:string,
  id:string,
  calories:string,
  protein:string,
  carbohydrate:string,
  fat:string
  serving_description:string,
  portions?: number
}
