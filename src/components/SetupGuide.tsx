import React, { useState } from 'react';
import { SETUP_STEPS } from '../data/rulesData';
import { CheckSquare, Square, Wine, Users, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export const SetupGuide: React.FC = () => {
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('vinhos_setup_checks');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleCheck = (id: string) => {
    const next = { ...checkedSteps, [id]: !checkedSteps[id] };
    setCheckedSteps(next);
    localStorage.setItem('vinhos_setup_checks', JSON.stringify(next));
  };

  const resetAll = () => {
    setCheckedSteps({});
    localStorage.removeItem('vinhos_setup_checks');
  };

  const totalSteps = SETUP_STEPS.length;
  const completedSteps = Object.values(checkedSteps).filter(Boolean).length;
  const isAllReady = completedSteps === totalSteps;

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* 2-Player Banner Danijel & Ceca */}
      <div className="bg-gradient-to-r from-amber-950/70 via-stone-900 to-red-950/70 p-4 rounded-2xl border border-amber-800/40 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-amber-100">Postavka za 2 Igrača (Duel)</h2>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Danijel 🟡 vs Ceca 🔴
          </span>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed">
          Specijalna postavka pripremljena za meč između <strong className="text-amber-400">Danijela (Žuti)</strong> i <strong className="text-red-400">Cece (Crvena)</strong>. Označite korake kako ih završavate pre početka 1. godine.
        </p>

        {/* Progress Bar */}
        <div className="mt-3 bg-stone-950/80 rounded-full h-2.5 overflow-hidden border border-stone-800 flex">
          <div 
            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300"
            style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] text-stone-400 mt-1">
          <span>{completedSteps} od {totalSteps} koraka označeno</span>
          {completedSteps > 0 && (
            <button 
              onClick={resetAll}
              className="text-stone-400 hover:text-stone-200 flex items-center gap-1 transition"
            >
              <RefreshCw className="w-2.5 h-2.5" /> Resetuj kvačice
            </button>
          )}
        </div>
      </div>

      {/* Critical 2-Player Note */}
      <div className="bg-red-950/40 border border-red-800/60 p-3.5 rounded-xl flex gap-3 text-xs text-red-200">
        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-red-300 block mb-0.5 font-bold">KLJUČNO ZA 2 IGRAČA:</strong>
          Ne zaboravite postaviti <span className="underline font-semibold">2-Player Ram (overlay)</span> preko Export zone! Koriste se samo polja uokvirena ramom. Takođe, u sajmu se dele nagrade za 1. i 3. mesto!
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {SETUP_STEPS.map((step) => {
          const isDone = !!checkedSteps[step.id];
          return (
            <div
              key={step.id}
              onClick={() => toggleCheck(step.id)}
              className={`cursor-pointer transition-all duration-200 p-3.5 rounded-2xl border text-xs select-none ${
                isDone
                  ? 'bg-stone-900/40 border-emerald-900/40 opacity-75'
                  : step.isTwoPlayerSpecial
                  ? 'bg-stone-900/90 border-amber-500/50 shadow-md ring-1 ring-amber-500/20'
                  : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  className="mt-0.5 text-stone-400 hover:text-amber-400 shrink-0"
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className={`w-5 h-5 ${step.isTwoPlayerSpecial ? 'text-amber-400' : 'text-stone-500'}`} />
                  )}
                </button>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-sm ${isDone ? 'line-through text-stone-400' : 'text-stone-100'}`}>
                      {step.title}
                    </h3>
                    {step.isTwoPlayerSpecial && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/40 shrink-0 ml-2">
                        2-Player pravilo
                      </span>
                    )}
                  </div>
                  <p className="text-stone-300 text-xs">{step.description}</p>
                  
                  <ul className="space-y-1 pt-1 pl-1 text-[11px] text-stone-400">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion message */}
      {isAllReady && (
        <div className="bg-emerald-950/60 border border-emerald-500/50 p-4 rounded-2xl text-center space-y-1 animate-bounce">
          <Sparkles className="w-6 h-6 text-emerald-400 mx-auto" />
          <h4 className="font-bold text-sm text-emerald-200">Sve je postavljeno!</h4>
          <p className="text-xs text-stone-300">
            Srećno Danijelu 🟡 i Ceci 🔴! Pređite na tab <strong className="text-amber-300">Partija</strong> da pratite godine i akcije.
          </p>
        </div>
      )}
    </div>
  );
};
