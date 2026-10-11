import React, { useState, useEffect } from 'react';
import { Navigation, TabType } from './components/Navigation';
import { GameTracker } from './components/GameTracker';
import { ActionsGuide } from './components/ActionsGuide';
import { RegionsGuide } from './components/RegionsGuide';
import { SetupGuide } from './components/SetupGuide';
import { EndGameRules } from './components/EndGameRules';
import { ScoreCalculator } from './components/ScoreCalculator';
import { WineCalculator } from './components/WineCalculator';
import { RulesSearch } from './components/RulesSearch';
import { VersionComparison } from './components/VersionComparison';
import { GitHubGuide } from './components/GitHubGuideModal';
import { Wine, Github, Trophy, Scale, Landmark, Sparkles } from 'lucide-react';
import { GameEdition } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('tracker');
  const [selectedEdition, setSelectedEdition] = useState<GameEdition>(() => {
    const saved = localStorage.getItem('vinhos_edition') as GameEdition;
    return saved === '2016' || saved === '2010' ? saved : '2010';
  });

  const handleEditionChange = (ed: GameEdition) => {
    setSelectedEdition(ed);
    localStorage.setItem('vinhos_edition', ed);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600/30 selection:text-amber-200">
      {/* Top Header for Mobile */}
      <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 px-3 py-2 shadow-md">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => setCurrentTab('tracker')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-amber-200 shadow-md border shrink-0 transition-colors ${
                selectedEdition === '2010'
                  ? 'bg-gradient-to-br from-rose-900 to-rose-700 border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                  : 'bg-gradient-to-br from-red-800 to-amber-700 border-amber-500/40 shadow-[0_0_10px_rgba(217,119,6,0.3)]'
              }`}>
                <Wine className="w-4 h-4 text-amber-200" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xs font-black font-display tracking-wider text-stone-100">
                    VINHOS DELUXE
                  </h1>
                  <span className={`text-[8.5px] uppercase tracking-wider font-extrabold px-1.5 py-0.2 rounded border ${
                    selectedEdition === '2010'
                      ? 'bg-rose-950 text-rose-300 border-rose-700'
                      : 'bg-amber-950 text-amber-400 border-amber-800/60'
                  }`}>
                    {selectedEdition === '2010' ? '2010 Reserve' : '2016 Vintage'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-stone-300 font-medium">
                  <span className="flex items-center gap-0.5 text-amber-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Danijel
                  </span>
                  <span className="text-stone-500 font-light">vs</span>
                  <span className="flex items-center gap-0.5 text-red-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Ceca
                  </span>
                  <span className="text-stone-500 text-[8px]">• 2P Duel</span>
                </div>
              </div>
            </div>

            {/* Quick Header Action Buttons */}
            <div className="flex items-center gap-1">
              {/* Quick Differences Button */}
              <button
                onClick={() => setCurrentTab('differences')}
                title="2010 vs 2016 Razlike"
                className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  currentTab === 'differences'
                    ? 'bg-rose-700 text-white font-bold shadow-[0_0_8px_#be123c]'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <Scale className="w-3 h-3 text-rose-400" />
                <span className="text-[10px] font-bold">Razlike</span>
              </button>

              {/* Quick Tie / End Game Button */}
              <button
                onClick={() => setCurrentTab('endgame')}
                title="Kraj & Tie-Break"
                className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  currentTab === 'endgame'
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <Trophy className="w-3 h-3 text-amber-400" />
                <span className="text-[10px]">Kraj</span>
              </button>

              {/* Quick Wine Calc Button */}
              <button
                onClick={() => setCurrentTab('winecalc')}
                title="Kalkulator Vina"
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center transition ${
                  currentTab === 'winecalc'
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <Wine className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Quick Edition Selector Bar */}
          <div className="grid grid-cols-2 gap-1.5 bg-stone-900/80 p-0.5 rounded-xl border border-stone-800 text-[10.5px]">
            <button
              onClick={() => handleEditionChange('2010')}
              className={`py-1 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                selectedEdition === '2010'
                  ? 'bg-rose-800 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedEdition === '2010' ? 'bg-rose-300' : 'bg-stone-600'}`} />
              <span>2010 Reserve</span>
              <span className="text-[8px] opacity-75">(Banka, Plate, Vreme 0)</span>
            </button>

            <button
              onClick={() => handleEditionChange('2016')}
              className={`py-1 rounded-lg font-bold transition flex items-center justify-center gap-1 ${
                selectedEdition === '2016'
                  ? 'bg-amber-600 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedEdition === '2016' ? 'bg-stone-950' : 'bg-stone-600'}`} />
              <span>2016 Special Vintage</span>
              <span className="text-[8px] opacity-75">(Samo keš)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md w-full mx-auto p-4 safe-area-pt">
        {currentTab === 'tracker' && (
          <GameTracker 
            edition={selectedEdition} 
            onSelectEdition={handleEditionChange}
            onOpenCalculator={() => setCurrentTab('calculator')}
            onOpenRules={() => setCurrentTab('rules')}
            onOpenWineCalc={() => setCurrentTab('winecalc')}
          />
        )}
        {currentTab === 'actions' && (
          <ActionsGuide 
            edition={selectedEdition} 
            onSelectEdition={handleEditionChange} 
          />
        )}
        {currentTab === 'differences' && (
          <VersionComparison 
            selectedEdition={selectedEdition} 
            onSelectEdition={handleEditionChange} 
          />
        )}
        {currentTab === 'regions' && <RegionsGuide />}
        {currentTab === 'rules' && <RulesSearch edition={selectedEdition} />}
        {currentTab === 'calculator' && (
          <ScoreCalculator 
            edition={selectedEdition} 
            onSelectEdition={handleEditionChange} 
          />
        )}
        {currentTab === 'endgame' && (
          <EndGameRules 
            edition={selectedEdition} 
            onSelectEdition={handleEditionChange} 
          />
        )}
        {currentTab === 'setup' && (
          <SetupGuide 
            edition={selectedEdition} 
            onSelectEdition={handleEditionChange} 
          />
        )}
        {currentTab === 'winecalc' && <WineCalculator edition={selectedEdition} />}
        {currentTab === 'github' && <GitHubGuide />}
      </main>

      {/* Bottom Sticky Navigation */}
      <Navigation currentTab={currentTab} onSelectTab={setCurrentTab} />
    </div>
  );
}
