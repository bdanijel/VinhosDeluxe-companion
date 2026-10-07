import React, { useState } from 'react';
import { Navigation, TabType } from './components/Navigation';
import { GameTracker } from './components/GameTracker';
import { ActionsGuide } from './components/ActionsGuide';
import { RegionsGuide } from './components/RegionsGuide';
import { SetupGuide } from './components/SetupGuide';
import { EndGameRules } from './components/EndGameRules';
import { ScoreCalculator } from './components/ScoreCalculator';
import { WineCalculator } from './components/WineCalculator';
import { RulesSearch } from './components/RulesSearch';
import { GitHubGuide } from './components/GitHubGuideModal';
import { Wine, Github, Trophy } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('tracker');

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600/30 selection:text-amber-200">
      {/* Top Header for Mobile */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-amber-950/60 px-4 py-2.5 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div 
            onClick={() => setCurrentTab('tracker')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-800 to-amber-700 flex items-center justify-center text-amber-200 shadow-[0_0_10px_rgba(217,119,6,0.3)] border border-amber-500/40 shrink-0">
              <Wine className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xs font-extrabold font-display tracking-wider text-amber-200">
                  VINHOS DELUXE
                </h1>
                <span className="text-[8px] uppercase tracking-wider font-bold bg-amber-950 text-amber-400 px-1 py-0.2 rounded border border-amber-800/60">
                  Companion
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
                <span className="text-stone-400 text-[8px]">• 2P</span>
              </div>
            </div>
          </div>

          {/* Quick Header Action Buttons */}
          <div className="flex items-center gap-1">
            {/* Quick Tie / End Game Button */}
            <button
              onClick={() => setCurrentTab('endgame')}
              title="Kraj & Tie-Break"
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                currentTab === 'endgame'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Trophy className="w-3 h-3 text-amber-400" />
              <span className="text-[10px]">Kraj/Tie</span>
            </button>

            {/* Quick Wine Calc Button */}
            <button
              onClick={() => setCurrentTab('winecalc')}
              title="Kalkulator Vina"
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                currentTab === 'winecalc'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Wine className="w-3 h-3 text-amber-400" />
              <span className="text-[10px]">Vino</span>
            </button>

            {/* Quick GitHub Action Deploy Guide Button */}
            <button
              onClick={() => setCurrentTab('github')}
              title="GitHub Objava"
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center transition ${
                currentTab === 'github'
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Github className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md w-full mx-auto p-4 safe-area-pt">
        {currentTab === 'tracker' && <GameTracker />}
        {currentTab === 'actions' && <ActionsGuide />}
        {currentTab === 'regions' && <RegionsGuide />}
        {currentTab === 'rules' && <RulesSearch />}
        {currentTab === 'calculator' && <ScoreCalculator />}
        {currentTab === 'endgame' && <EndGameRules />}
        {currentTab === 'setup' && <SetupGuide />}
        {currentTab === 'winecalc' && <WineCalculator />}
        {currentTab === 'github' && <GitHubGuide />}
      </main>

      {/* Bottom Sticky Navigation */}
      <Navigation currentTab={currentTab} onSelectTab={setCurrentTab} />
    </div>
  );
}
