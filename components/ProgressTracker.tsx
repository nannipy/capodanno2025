import React from 'react';
import { Category, Dish } from '../types';
import { PARTY_LIMITS } from '../constants';

interface ProgressTrackerProps {
  dishes: Dish[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ dishes }) => {
  const counts = {
    [Category.ANTIPASTO]: dishes.filter(d => d.category === Category.ANTIPASTO).length,
    [Category.PRIMO]: dishes.filter(d => d.category === Category.PRIMO).length,
    [Category.SECONDO_CONTORNO]: dishes.filter(d => d.category === Category.SECONDO_CONTORNO).length,
    [Category.DOLCE]: dishes.filter(d => d.category === Category.DOLCE).length,
    vegetarian: dishes.filter(d => d.dietary.vegetarian).length,
    vegan: dishes.filter(d => d.dietary.vegan).length,
    glutenFree: dishes.filter(d => d.dietary.glutenFree).length,
  };

  const categories = [
    { name: 'Antipasti', current: counts[Category.ANTIPASTO], max: PARTY_LIMITS[Category.ANTIPASTO], color: 'bg-emerald-500' },
    { name: 'Primi', current: counts[Category.PRIMO], max: PARTY_LIMITS[Category.PRIMO], color: 'bg-amber-500' },
    { name: 'Secondi', current: counts[Category.SECONDO_CONTORNO], max: PARTY_LIMITS[Category.SECONDO_CONTORNO], color: 'bg-orange-600' },
    { name: 'Dolci', current: counts[Category.DOLCE], max: PARTY_LIMITS[Category.DOLCE], color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(cat => {
            const percentage = Math.min(100, (cat.current / cat.max) * 100);
            const isComplete = percentage >= 100;
            
            return (
              <div key={cat.name} className="flex flex-col relative group">
                <div className="flex justify-between items-end mb-3">
                  <span className={`text-sm font-bold tracking-wide ${isComplete ? 'text-gourmet-gold' : 'text-gourmet-dark'}`}>
                    {cat.name}
                  </span>
                  <span className="text-xs text-stone-400 font-medium font-sans">
                     {cat.current} <span className="text-stone-300">/</span> {cat.max}
                  </span>
                </div>
                
                {/* Progress Bar Container */}
                <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden border border-stone-200/50">
                  <div 
                    className={`h-full ${cat.color} transition-all duration-1000 ease-out shadow-sm relative`}
                    style={{ width: `${percentage}%` }}
                  >
                     {/* Shine effect */}
                     <div className="absolute inset-0 bg-white/20"></div>
                  </div>
                </div>
              </div>
            );
        })}
      </div>

      <div className="flex flex-wrap gap-2 pt-6 border-t border-stone-100">
        {[
          { label: 'Vegano', val: counts.vegan, icon: 'fa-seedling' },
          { label: 'Senza Glutine', val: counts.glutenFree, icon: 'fa-wheat-awn' }
        ].map(d => (
          (d.val > 0) && (
            <div key={d.label} className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border bg-stone-50 border-stone-200 text-stone-500">
                <i className={`fas ${d.icon} text-gourmet-gold`}></i>
                <span>{d.label}: {d.val}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
