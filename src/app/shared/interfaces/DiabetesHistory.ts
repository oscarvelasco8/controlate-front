//Interfaz que define un objeto DiabetesHistory con los datos del historial de diabetes
export interface DiabetesHistory {
  logId:         string;
  username:      string;
  meal:          string;
  foodName:      string;
  carbohydrates: number;
  quantity:      number;
  foodId:        number;
  logDate:       string;
  units:         string;
  portions:      number;
}
