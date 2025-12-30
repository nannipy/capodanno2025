import React from 'react';

interface HeaderProps {
  onReset?: () => void;
  currentView: 'menu' | 'location';
  onNavigate: (view: 'menu' | 'location') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 bg-gourmet-base/90 backdrop-blur-md border-b border-stone-200/60 py-4 transition-all duration-300 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)]">
      <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="text-2xl animate-bounce-slow">🍾</span>
          <h1 className="text-2xl font-serif text-gourmet-dark font-bold tracking-tight">
            Capodanno <span className="text-gourmet-gold italic">2025</span>
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center bg-stone-100/50 p-1 rounded-xl border border-stone-200">
           <button
            onClick={() => onNavigate('menu')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentView === 'menu'
                ? 'bg-white text-gourmet-dark shadow-sm border border-stone-200/50'
                : 'text-gourmet-text/60 hover:text-gourmet-dark hover:bg-white/50'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => onNavigate('location')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentView === 'location'
                ? 'bg-white text-gourmet-dark shadow-sm border border-stone-200/50'
                : 'text-gourmet-text/60 hover:text-gourmet-dark hover:bg-white/50'
            }`}
          >
            Info
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
