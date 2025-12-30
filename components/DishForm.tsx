import React, { useState } from 'react';
import { Category, DietaryInfo, Dish } from '../types';
import { PARTY_LIMITS } from '../constants';

interface DishFormProps {
  onAdd: (dish: Omit<Dish, 'id' | 'timestamp'>) => void;
  dishes: Dish[];
  onCancel: () => void;
}

const DishForm: React.FC<DishFormProps> = ({ onAdd, dishes, onCancel }) => {
  const [contributor, setContributor] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [dietary, setDietary] = useState<DietaryInfo>({
    vegetarian: false,
    vegan: false,
    glutenFree: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributor || !title || !category) return;
    
    if (dishes.some(d => d.title.toLowerCase() === title.toLowerCase())) {
      alert("Qualcun altro ha già scelto questo piatto!");
      return;
    }
    
    onAdd({ contributor, title, category: category as Category, dietary });
  };

  return (
    <div className="w-full bg-white md:rounded-3xl rounded-t-[32px] rounded-b-none p-6 md:p-8 shadow-2xl border border-stone-200/50 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 py-2">
        <h2 className="text-2xl font-serif font-bold text-gourmet-dark">Aggiungi il tuo piatto</h2>
        <button onClick={onCancel} className="text-stone-400 hover:bg-stone-100 p-2 rounded-full transition-colors">
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-8 md:pb-0">
        <div className="space-y-6">
          <div className="relative group">
            <input
              required
              type="text"
              id="contributor"
              value={contributor}
              onChange={(e) => setContributor(e.target.value)}
              className="peer w-full border-b-2 border-stone-200 bg-transparent px-0 py-3 text-lg text-gourmet-dark focus:border-gourmet-gold focus:outline-none transition-colors placeholder-transparent"
              placeholder="Il tuo nome"
            />
            <label 
              htmlFor="contributor"
              className="absolute left-0 -top-3.5 text-xs font-medium text-stone-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gourmet-gold"
            >
              Il tuo nome
            </label>
          </div>

          <div className="relative group">
            <input
              required
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="peer w-full border-b-2 border-stone-200 bg-transparent px-0 py-3 text-lg text-gourmet-dark focus:border-gourmet-gold focus:outline-none transition-colors placeholder-transparent"
              placeholder="Cosa porti?"
            />
            <label 
              htmlFor="title"
              className="absolute left-0 -top-3.5 text-xs font-medium text-stone-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gourmet-gold"
            >
              Cosa porti?
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-gourmet-text/60 uppercase tracking-wider block">Categoria</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(Category).map((cat) => {
              const count = dishes.filter(d => d.category === cat).length;
              const limit = PARTY_LIMITS[cat] || 10;
              const isFull = count >= limit;
              const isSelected = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium border text-left transition-all flex justify-between items-center ${
                    isSelected
                      ? 'bg-gourmet-gold text-white border-gourmet-gold shadow-md scale-[1.02]'
                      : isFull
                      ? 'bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed opacity-60'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-gourmet-gold/50 hover:bg-stone-50'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                    {count}/{limit}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-gourmet-text/60 uppercase tracking-wider block">Note Alimentari</label>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'vegan', label: 'Vegano', icon: 'fa-seedling' },
              { id: 'glutenFree', label: 'Senza Glutine', icon: 'fa-wheat-awn' }
            ].map((tag) => {
              const isActive = dietary[tag.id as keyof DietaryInfo];
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setDietary(prev => ({ ...prev, [tag.id]: !prev[tag.id as keyof DietaryInfo] }))}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full border text-sm transition-all ${
                    isActive
                      ? 'bg-green-100 border-green-200 text-green-800 font-medium'
                      : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'
                  }`}
                >
                  <i className={`fas ${tag.icon} ${isActive ? 'text-green-600' : 'text-stone-300'}`}></i>
                  <span>{tag.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-gourmet-gold text-white py-5 rounded-2xl font-serif font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex justify-center items-center gap-2"
          >
            Conferma piatto
          </button>
        </div>
      </form>
    </div>
  );
};

export default DishForm;
