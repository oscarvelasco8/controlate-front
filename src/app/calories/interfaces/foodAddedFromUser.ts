import {FoodInfo} from '../../shared/interfaces/FoodInfo';

export interface FoodAddedFromUser{
  meal:string
  food: FoodInfo,
  quantity: number
}
