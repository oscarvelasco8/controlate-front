export interface Food {
  foods: Foods;
}

export interface Foods {
  food:          FoodElement[];
  max_results:   string;
  page_number:   string;
  total_results: string;
}

export interface FoodElement {
  food_description: string;
  food_id:          string;
  food_name:        string;
  food_type:        FoodType;
  food_url:         string;
  brand_name?:      string;
}

export enum FoodType {
  Brand = "Brand",
  Generic = "Generic",
}
