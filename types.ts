
export enum Category {
  ANTIPASTO = 'Antipasto',
  PRIMO = 'Primo',
  SECONDO_CONTORNO = 'Secondo / Contorno',
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
  [Category.PRIMO]: number;
  [Category.SECONDO_CONTORNO]: number;
  [Category.DOLCE]: number;
  total: number;
}


