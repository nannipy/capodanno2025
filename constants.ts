
import { Category, Limits } from './types';

export const PARTY_LIMITS: Limits = {
  [Category.ANTIPASTO]: 5,
  [Category.PRIMO]: 10,
  [Category.SECONDO_CONTORNO]: 10,
  [Category.DOLCE]: 5,
  total: 30
};



export const INITIAL_DISHES = [
  {
    id: '1',
    contributor: 'Marco',
    title: 'Tartine al salmone e aneto',
    category: Category.ANTIPASTO,
    dietary: { vegetarian: false, vegan: false, glutenFree: false },
    timestamp: Date.now()
  },
  {
    id: '2',
    contributor: 'Giulia',
    title: 'Hummus di ceci e crudité',
    category: Category.ANTIPASTO,
    dietary: { vegetarian: true, vegan: true, glutenFree: true },
    timestamp: Date.now()
  },
  {
    id: '3',
    contributor: 'Luca',
    title: 'Lasagne alla bolognese',
    category: Category.PRIMO,
    dietary: { vegetarian: false, vegan: false, glutenFree: false },
    timestamp: Date.now()
  }
];
