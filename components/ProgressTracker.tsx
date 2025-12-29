
import React from 'react';
import { Category, Dish } from '../types';
import { PARTY_LIMITS } from '../constants';

interface ProgressTrackerProps {
  dishes: Dish[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ dishes }) => {
  const counts = {
    [Category.ANTIPASTO]: dishes.filter(d => d.category === Category.ANTIPASTO).length,
    [Category.PIATTO_PRINCIPALE]: dishes.filter(d => d.category === Category.PIATTO_PRINCIPALE).length,
    [Category.DOLCE]: dishes.filter(d => d.category === Category.DOLCE).length,
    vegetarian: dishes.filter(d => d.dietary.vegetarian).length,
    vegan: dishes.filter(d => d.dietary.vegan).length,
    glutenFree: dishes.filter(d => d.dietary.glutenFree).length,
  };

  const categories = [
    { name: 'Antipasti', current: counts[Category.ANTIPASTO], max: PARTY_LIMITS[Category.ANTIPASTO], color: 'bg-blue-600' },
    { name: 'Primi/Secondi', current: counts[Category.PIATTO_PRINCIPALE], max: PARTY_LIMITS[Category.PIATTO_PRINCIPALE], color: 'bg-green-600' },
    { name: 'Dolci', current: counts[Category.DOLCE], max: PARTY_LIMITS[Category.DOLCE], color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.name} className="flex flex-col">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-[#202124]">{cat.name}</span>
              <span className="text-xs text-[#5f6368] font-medium">{cat.current} / {cat.max}</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full ${cat.current >= cat.max ? 'bg-red-500' : 'bg-[#1a73e8]'} transition-all duration-1000 ease-out rounded-full`}
                style={{ width: `${Math.min(100, (cat.current / cat.max) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
        {[
          { label: 'Vegano', val: counts.vegan, icon: 'fa-seedling' },
          { label: 'Senza Glutine', val: counts.glutenFree, icon: 'fa-wheat-awn' }
        ].map(d => (
          <div key={d.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-gray-50 border-gray-200 text-gray-600">
            <i className={`fas ${d.icon}`}></i>
            <span>{d.label}: {d.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
