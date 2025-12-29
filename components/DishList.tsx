
import React from 'react';
import { Dish, Category } from '../types';

interface DishListProps {
  dishes: Dish[];
}

const DishList: React.FC<DishListProps> = ({ dishes }) => {
  const categories = Object.values(Category);

  return (
    <div className="space-y-12 pb-20">
      {categories.map(cat => {
        const categoryDishes = dishes.filter(d => d.category === cat);
        if (categoryDishes.length === 0) return null;

        return (
          <div key={cat} className="animate-in fade-in duration-500">
            <h3 className="text-[#5f6368] text-sm font-semibold uppercase tracking-wider mb-4 px-2">
              {cat}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryDishes.sort((a,b) => b.timestamp - a.timestamp).map(dish => (
                <div key={dish.id} className="bg-white border border-[#dadce0] p-5 rounded-2xl hover:shadow-sm transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-[#202124] group-hover:text-[#1a73e8] transition-colors">
                      {dish.title}
                    </h4>
                  </div>
                  <div className="flex items-center text-sm text-[#5f6368] mb-4">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-2 text-[10px]">
                      <i className="fas fa-user"></i>
                    </div>
                    <span>{dish.contributor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dish.dietary.vegetarian && (
                      <span className="text-[10px] font-medium bg-[#e6f4ea] text-[#137333] px-2 py-0.5 rounded-md">Veg</span>
                    )}
                    {dish.dietary.vegan && (
                      <span className="text-[10px] font-medium bg-[#e6f4ea] text-[#137333] px-2 py-0.5 rounded-md">Vegan</span>
                    )}
                    {dish.dietary.glutenFree && (
                      <span className="text-[10px] font-medium bg-[#f1f3f4] text-[#3c4043] px-2 py-0.5 rounded-md">Senza Glutine</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
      {dishes.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[28px] border border-dashed border-[#dadce0]">
          <i className="fas fa-plate-wheat text-4xl text-gray-200 mb-4"></i>
          <p className="text-gray-400 font-medium tracking-tight">Ancora nessun piatto. Comincia tu!</p>
        </div>
      )}
    </div>
  );
};

export default DishList;
