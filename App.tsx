
import React, { useState, useEffect } from 'react';
import { Dish } from './types';
import Header from './components/Header';
import ProgressTracker from './components/ProgressTracker';
import DishList from './components/DishList';
import DishForm from './components/DishForm';
import { fetchDishes, addDish } from './services/supabase';
import LocationPage from './components/LocationPage';

const App: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'menu' | 'location'>('menu');

  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = async () => {
    setLoading(true);
    const data = await fetchDishes();
    setDishes(data);
    setLoading(false);
  };

  const handleAddDish = async (newDish: Omit<Dish, 'id' | 'timestamp'>) => {
    const dishToAdd: Dish = {
      ...newDish,
      id: crypto.randomUUID(), // Temporarily generate ID, but Supabase usually handles this if configured. keeping it consistent with type for now.
      timestamp: Date.now()
    };

    // If Supabase generates ID, we should let it. But the current Type and Form usage implies we create the object first.
    // Let's rely on the types. Ideally we should omit 'id' and let DB handle it, but for quick migration I'll stick to client-gen or what the service returns.
    // Actually, let's try to let the service handle the verified data.
    
    const savedDish = await addDish(dishToAdd);
    
    if (savedDish) {
      setDishes(prev => [savedDish, ...prev]);
      setIsFormOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetData = () => {
    // Implementing local reset view or creating a delete all function? 
    // Usually "Reset" on a shared DB is dangerous. I will disable it or change it to just refresh for now, or just warn user.
    // The original resetData wiped localStorage. Wiping a shared DB is probably not intended for a simple button anymore.
    // I'll change it to just reload data for now to be safe, or remove the button functionality.
    if (confirm("Questa azione ricaricherà i dati dal database.")) {
      loadDishes();
    }
  };

  const shareMenu = () => {
    const text = `Capodanno 2025 - Menu\nAbbiamo ${dishes.length} piatti. Aggiungi il tuo: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({ title: 'Menu Capodanno', text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
      alert("Copiato negli appunti!");
    }
  };

  if (loading && dishes.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-[#5f6368]">
        <i className="fas fa-circle-notch fa-spin text-2xl"></i>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gourmet-base text-gourmet-text pb-32 font-sans selection:bg-gourmet-gold/30">
      <Header 
        onReset={resetData} 
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      <main className="max-w-5xl mx-auto px-4 md:px-8 pt-8">
        
        {currentView === 'menu' ? (
          <>
            {/* Progress Section */}
            <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-12 border border-stone-200/50 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-bold text-gourmet-dark flex items-center gap-2">
                  <i className="fas fa-chart-pie text-gourmet-gold"></i>
                  Menu Overview
                </h2>
              </div>
              <ProgressTracker dishes={dishes} />
            </section>
    
            {/* Dish List Section */}
            <div className="mt-8">
               <div className="flex items-center justify-between mb-8 px-2">
                  <h2 className="text-3xl font-serif font-bold text-gourmet-dark">Il Menu</h2>
                  <span className="text-sm text-gourmet-text/50 font-medium">{dishes.length} portate</span>
               </div>
               <DishList dishes={dishes} />
            </div>
          </>
        ) : (
          <LocationPage />
        )}

        {/* Form Overlay - Bottom Sheet on Mobile, Modal on Desktop */}
        {isFormOpen && (
          <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-gourmet-dark/20 backdrop-blur-[2px] animate-in fade-in duration-300"
              onClick={() => setIsFormOpen(false)}
            />
            
            {/* Form Container */}
            <div className="relative w-full md:w-auto z-10 animate-in slide-in-from-bottom-10 fade-in duration-300 md:animate-in md:zoom-in-95">
              <DishForm 
                onAdd={handleAddDish} 
                dishes={dishes} 
                onCancel={() => setIsFormOpen(false)} 
              />
            </div>
          </div>
        )}
      </main>

      {/* FAB - Gourmet Style */}
      {!isFormOpen && (
        <button
          onClick={() => setIsFormOpen(true)}
          className="fixed bottom-8 right-8 bg-gourmet-gold text-white px-6 py-4 rounded-[20px] shadow-lg hover:shadow-xl transition-all flex items-center gap-3 z-50 group"
        >
          <i className="fas fa-plus text-lg"></i>
          <span className="font-medium">Aggiungi Piatto</span>
        </button>
      )}
    </div>
  );
};

export default App;
