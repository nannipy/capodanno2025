
import React from 'react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="pt-12 pb-12 px-6 text-center">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-google-blue rounded-xl flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-utensils"></i>
          </div>
          <h1 className="text-3xl font-medium tracking-tight">Capodanno 2025</h1>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
