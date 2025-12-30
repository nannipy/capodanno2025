import React from 'react';
import { Dish, Category } from '../types';

interface DishListProps {
  dishes: Dish[];
}

const DishList: React.FC<DishListProps> = ({ dishes }) => {
  const categories = Object.values(Category);

  const getCategoryColor = (cat: Category) => {
    switch(cat) {
      case Category.ANTIPASTO: return 'text-emerald-700 bg-emerald-50';
      case Category.PRIMO: return 'text-amber-700 bg-amber-50';
      case Category.SECONDO_CONTORNO: return 'text-orange-700 bg-orange-50';
      case Category.DOLCE: return 'text-rose-700 bg-rose-50';
      default: return 'text-stone-700 bg-stone-50';
    }
  };

  return (
    <div className="space-y-12 pb-24">
      {categories.map(cat => {
        const categoryDishes = dishes.filter(d => d.category === cat);
        if (categoryDishes.length === 0) return null;

        return (
          <div key={cat} className="animate-in fade-in duration-500">
            <div className="flex items-center gap-3 mb-6 px-1">
               <span className={`h-8 w-1 rounded-full ${getCategoryColor(cat).replace('text-', 'bg-').split(' ')[0]}`}></span>
               <h3 className="text-xl font-serif font-bold text-gourmet-dark tracking-wide">
                {cat}
               </h3>
               <span className="text-sm font-sans text-stone-400 font-medium">({categoryDishes.length})</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryDishes.sort((a,b) => b.timestamp - a.timestamp).map(dish => (
                <div key={dish.id} className="bg-white border border-stone-100 p-5 rounded-2xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-gourmet-gold/30 hover:-translate-y-1 transition-all group duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-serif font-bold text-gourmet-dark group-hover:text-gourmet-gold transition-colors leading-tight">
                      {dish.title}
                    </h4>
                  </div>
                  
                  <div className="flex items-center text-sm text-stone-500 mb-4 bg-stone-50 rounded-lg p-2 w-fit">
                    <div className="w-5 h-5 bg-white border border-stone-200 rounded-full flex items-center justify-center mr-2 text-[10px] shadow-sm">
                      <i className="fas fa-user text-gourmet-gold"></i>
                    </div>
                    <span className="font-medium max-w-[150px] truncate">{dish.contributor}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {dish.dietary.vegetarian && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">Veg</span>
                    )}
                    {dish.dietary.vegan && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">Vegan</span>
                    )}
                    {dish.dietary.glutenFree && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-100">No Glutine</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
      {dishes.length === 0 && (
        <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-stone-300 mx-4">
          <div className="bg-stone-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
             <i className="fas fa-utensils text-3xl text-stone-300"></i>
          </div>
          <h3 className="text-xl font-serif font-bold text-gourmet-dark mb-2">Il menu è vuoto</h3>
          <p className="text-stone-500 max-w-xs mx-auto">Sii il primo ad aggiungere un piatto delizioso per il Capodanno!</p>
        </div>
      )}
    </div>
  );
};

export default DishList;
