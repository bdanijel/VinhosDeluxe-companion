import React from 'react';
import { 
  Compass, 
  CheckSquare, 
  Trophy, 
  Calculator, 
  Search, 
  Wine, 
  Github 
} from 'lucide-react';

export type TabType = 'tracker' | 'setup' | 'endgame' | 'calculator' | 'winecalc' | 'rules' | 'github';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { id: 'tracker' as TabType, label: 'Partija', icon: Compass, badge: 'Runda' },
    { id: 'setup' as TabType, label: 'Postavka', icon: CheckSquare, badge: '2P' },
    { id: 'endgame' as TabType, label: 'Kraj & Tie', icon: Trophy, badge: 'Pravila' },
    { id: 'calculator' as TabType, label: 'Kalkulator', icon: Calculator, badge: 'Bodovi' },
    { id: 'winecalc' as TabType, label: 'Vino', icon: Wine, badge: 'Formula' },
    { id: 'rules' as TabType, label: 'Nedoumice', icon: Search, badge: 'FAQ' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-md border-t border-amber-900/40 shadow-2xl safe-area-pb">
      <div className="max-w-md mx-auto grid grid-cols-6 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-all duration-200 relative ${
                isActive
                  ? 'text-amber-400 font-bold scale-105'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-8 h-1 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]" />
              )}
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
              <span className="text-[10px] leading-tight tracking-tight truncate w-full text-center">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
