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
    <div className="bg-white rounded-[28px] p-8 border border-gray-200 shadow-sm animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium text-[#202124]">Aggiungi il tuo piatto</h2>
        <button onClick={onCancel} className="text-[#5f6368] hover:bg-gray-100 p-2 rounded-full transition-colors">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="relative group">
            <input
              required
              type="text"
              value={contributor}
              onChange={(e) => setContributor(e.target.value)}
              className="w-full border border-[#dadce0] rounded-lg px-4 py-4 focus:border-[#1a73e8] focus:border-2 focus:ring-0 peer bg-transparent transition-all outline-none"
              placeholder=" "
            />
            <label className="absolute left-4 top-4 text-[#5f6368] transition-all duration-200 pointer-events-none origin-left transform peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-7 peer-focus:text-[#1a73e8] peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1">
              Il tuo nome
            </label>
          </div>

          <div className="relative group">
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-[#dadce0] rounded-lg px-4 py-4 focus:border-[#1a73e8] focus:border-2 focus:ring-0 peer bg-transparent transition-all outline-none"
              placeholder=" "
            />
            <label className="absolute left-4 top-4 text-[#5f6368] transition-all duration-200 pointer-events-none origin-left transform peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-7 peer-focus:text-[#1a73e8] peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1">
              Cosa porti?
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-[#5f6368] block">Categoria</label>
          <div className="flex flex-wrap gap-3">
            {Object.values(Category).map((cat) => {
              const count = dishes.filter(d => d.category === cat).length;
              const isFull = count >= PARTY_LIMITS[cat];
              const isSelected = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  disabled={isFull}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                    isSelected
                      ? 'bg-[#e8f0fe] border-[#1a73e8] text-[#1967d2]'
                      : isFull
                      ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                      : 'border-[#dadce0] text-[#5f6368] hover:bg-gray-50'
                  }`}
                >
                  {cat} <span className="ml-1 opacity-60">({count}/{PARTY_LIMITS[cat]})</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-[#5f6368] block">Esigenze alimentari</label>
          <div className="flex flex-wrap gap-4">
            {[
              { id: 'vegan', label: 'Vegano', icon: 'fa-seedling' },
              { id: 'glutenFree', label: 'Senza Glutine', icon: 'fa-wheat-awn' }
            ].map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setDietary(prev => ({ ...prev, [tag.id]: !prev[tag.id as keyof DietaryInfo] }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all ${
                  dietary[tag.id as keyof DietaryInfo]
                    ? 'bg-[#e6f4ea] border-[#1e8e3e] text-[#137333]'
                    : 'bg-white border-[#dadce0] text-[#5f6368] hover:bg-gray-50'
                }`}
              >
                <i className={`fas ${tag.icon}`}></i>
                <span>{tag.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-google-blue text-white py-4 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
          >
            Conferma piatto
          </button>
        </div>
      </form>
    </div>
  );
};

export default DishForm;
