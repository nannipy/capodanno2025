
export enum Category {
  ANTIPASTO = 'Antipasto / Contorno',
  PIATTO_PRINCIPALE = 'Piatto Principale',
  DOLCE = 'Dolce'
}

export interface DietaryInfo {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
}

export interface Dish {
  id: string;
  contributor: string;
  title: string;
  category: Category;
  dietary: DietaryInfo;
  timestamp: number;
}

export interface Limits {
  [Category.ANTIPASTO]: number;
  [Category.PIATTO_PRINCIPALE]: number;
  [Category.DOLCE]: number;
  total: number;
}


