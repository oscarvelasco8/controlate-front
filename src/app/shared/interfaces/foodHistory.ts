
//Interfaz que define la estructura de un registro de comida en el historial
export interface FoodHistory {
  logId:         string;
  username:      string;
  meal:          string;
  foodName:      string;
  carbohydrates: number;
  fats:          number;
  proteins:      number;
  calories:      number;
  quantity:      number;
  foodId:        number;
  logDate:       string;
  units:         string;
}
