import React, { useState } from 'react';
import { SETUP_STEPS, SETUP_STEPS_2010 } from '../data/rulesData';
import { GameEdition } from '../types';
import { CheckSquare, Square, Wine, Users, Sparkles, AlertCircle, RefreshCw, Scale, MapPin } from 'lucide-react';

interface SetupGuideProps {
  edition?: GameEdition;
  onSelectEdition?: (edition: GameEdition) => void;
  onOpenRegions?: () => void;
}

export const SetupGuide: React.FC<SetupGuideProps> = ({
  edition = '2010',
  onSelectEdition,
  onOpenRegions
}) => {
  const currentEdition = edition;

  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('vinhos_setup_checks');
    return saved ? JSON.parse(saved) : {};
  });

  const handleEditionChange = (ed: GameEdition) => {
    if (onSelectEdition) onSelectEdition(ed);
  };

  const stepsList = currentEdition === '2010' ? SETUP_STEPS_2010 : SETUP_STEPS;

  const toggleCheck = (id: string) => {
    const next = { ...checkedSteps, [id]: !checkedSteps[id] };
    setCheckedSteps(next);
    localStorage.setItem('vinhos_setup_checks', JSON.stringify(next));
  };

  const resetAll = () => {
    setCheckedSteps({});
    localStorage.removeItem('vinhos_setup_checks');
  };

  const totalSteps = stepsList.length;
  const completedSteps = stepsList.filter(s => !!checkedSteps[s.id]).length;

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* 2-Player Banner Danijel & Ceca */}
      <div className={`p-4 rounded-2xl border shadow-lg space-y-3 ${
        currentEdition === '2010'
          ? 'bg-gradient-to-r from-rose-950 via-stone-900 to-rose-950/80 border-rose-800/60'
          : 'bg-gradient-to-r from-amber-950/70 via-stone-900 to-red-950/70 border-amber-800/40'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Users className={`w-5 h-5 ${currentEdition === '2010' ? 'text-rose-400' : 'text-amber-400'}`} />
            <div>
              <h2 className="text-base font-bold text-stone-100 font-display">
                Postavka za 2 Igrača ({currentEdition === '2010' ? '2010 Reserve' : '2016 Vintage'})
              </h2>
              <span className="text-[10px] text-stone-300">
                Danijel 🟡 vs Ceca 🔴 • Priprema pre 1. godine
              </span>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            2P Duel
          </span>
        </div>

        {/* Edition Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-stone-950/80 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => handleEditionChange('2010')}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              currentEdition === '2010'
                ? 'bg-rose-700 text-white shadow-[0_0_10px_#be123c]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>2010 Reserve</span>
            <span className="text-[8.5px] bg-rose-950 px-1 rounded text-rose-300 border border-rose-800">
              Vreme "0" + Banka
            </span>
          </button>

          <button
            onClick={() => handleEditionChange('2016')}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              currentEdition === '2016'
                ? 'bg-amber-600 text-white shadow-[0_0_10px_#d97706]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>2016 Vintage</span>
            <span className="text-[8.5px] bg-amber-950 px-1 rounded text-amber-300 border border-amber-800">
              Pločice magnata
            </span>
          </button>
        </div>

        {/* Key Difference Banner */}
        <div className={`p-2.5 rounded-xl border text-[11px] leading-relaxed flex items-start gap-2 ${
          currentEdition === '2010'
            ? 'bg-rose-950/50 border-rose-800 text-rose-200'
            : 'bg-amber-950/40 border-amber-800 text-amber-200'
        }`}>
          <Scale className="w-4 h-4 shrink-0 mt-0.5 text-rose-300" />
          <div>
            {currentEdition === '2010' ? (
              <span>
                <strong className="text-rose-300">Specifičnosti postavke za 2010:</strong> Tabla na <strong>2010 stranu</strong>. Prognoza u 1. godini je <strong>obavezno fiksna "0"</strong>. Start: <strong>10 Bagosa keša + 5 u banci</strong>. Početni vinograd <strong>SE PLAĆA</strong> iz keša! Zatim <strong>1. igrač dobija +0 (ostaje 10 - cena)</strong>, a <strong>2. igrač dobija +2 (ostaje 12 - cena)</strong>. Farmeri se ne kupuju.
              </span>
            ) : (
              <span>
                <strong className="text-amber-300">Specifičnosti postavke za 2016:</strong> Tabla na strani 2016. Pločica "0" se <strong>baca u kutiju</strong> i okreće nasumično vreme. Početni novac: <strong>1. igrač 19 Bagosa</strong>, <strong>2. igrač 20 Bagosa</strong> (nema banke). Postavlja se 9 farmera. Igrači započinju sa <strong>po 2 bureta već postavljenim kod svakog od 3 magnata</strong> (ukupno 6).
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-stone-950/80 rounded-full h-2.5 overflow-hidden border border-stone-800 flex">
          <div 
            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300"
            style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] text-stone-400">
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
          <strong className="text-red-300 block mb-0.5 font-bold">KLJUČNO ZA 2 IGRAČA (OBE VERZIJE):</strong>
          Postavite <span className="underline font-semibold">2-Player Ram (overlay)</span> preko Export zone! Uklonite regije Setúbal (7) i Algarve (9) (igra se sa 7 regija). U sajmu se boduju isključivo 1. i 3. mesto!
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {stepsList.map((step) => {
          const isDone = !!checkedSteps[step.id];
          return (
            <div
              key={step.id}
              onClick={() => toggleCheck(step.id)}
              className={`cursor-pointer transition-all duration-200 p-3.5 rounded-2xl border text-xs select-none ${
                isDone 
                  ? 'bg-stone-900/40 border-emerald-900/40 opacity-75' 
                  : 'bg-stone-900/90 border-stone-800 hover:border-amber-700/60 shadow-md'
              }`}
            >
              <div className="flex items-start gap-3">
                <button className="mt-0.5 shrink-0 text-amber-400 hover:scale-110 transition">
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-stone-500" />
                  )}
                </button>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-sm ${isDone ? 'line-through text-stone-500' : 'text-stone-100'}`}>
                      {step.title}
                    </h3>
                    {step.isTwoPlayerSpecial && (
                      <span className="text-[9px] bg-red-950 text-red-300 border border-red-800/80 px-1.5 py-0.5 rounded font-bold">
                        2P Duel
                      </span>
                    )}
                  </div>

                  <p className={`text-[11px] ${isDone ? 'text-stone-500' : 'text-stone-300'}`}>
                    {step.description}
                  </p>

                  {/* Special Visual Callouts for Money */}
                  {step.id === 'setup-players-2010' && (
                    <div className="my-2 p-2.5 rounded-xl bg-stone-950 border border-rose-800/60 flex items-center justify-between text-xs shadow-inner">
                      <div className="flex items-center gap-2">
                        <span className="text-base">💵</span>
                        <div>
                          <div className="font-bold text-rose-200 text-[11px]">Početni gotovinski novac (u novčanicama pre kupovine):</div>
                          <div className="text-[10px] text-stone-300 font-semibold">
                            Danijel (Žuti): <span className="text-amber-400 font-bold">10 Bagosa</span> • Ceca (Crvena): <span className="text-rose-400 font-bold">10 Bagosa</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                          + 5 u Banci oboje
                        </span>
                      </div>
                    </div>
                  )}

                  {step.id === 'setup-initial-vineyard-2010' && (
                    <div className="my-2 p-3 rounded-xl bg-stone-950 border border-emerald-800/60 space-y-2 text-xs shadow-inner">
                      <div className="font-bold text-emerald-300 text-[11px] flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span>💰</span>
                          <span>Novac nakon kupovine vinograda i kompenzacije za 2P:</span>
                        </div>
                        <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded font-bold">
                          Plaća se cena sa pločice
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-800 space-y-1">
                          <div className="text-amber-400 font-bold text-xs flex items-center justify-between">
                            <span>1. Igrač (manji # regije)</span>
                            <span className="text-emerald-400 font-black">+0 Bagosa</span>
                          </div>
                          <div className="text-stone-300 text-[10.5px]">
                            Konačna gotovina: <strong className="text-white font-mono">10 - Cena + 0</strong>
                          </div>
                          <div className="text-stone-400 text-[9.5px]">
                            (+ 5 Bagosa u banci)
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-stone-900/90 border border-emerald-900/60 bg-emerald-950/10 space-y-1">
                          <div className="text-rose-400 font-bold text-xs flex items-center justify-between">
                            <span>2. Igrač (veći # regije)</span>
                            <span className="text-emerald-300 font-black text-sm">+2 Bagosa</span>
                          </div>
                          <div className="text-stone-300 text-[10.5px]">
                            Konačna gotovina: <strong className="text-emerald-300 font-mono">12 - Cena</strong>
                          </div>
                          <div className="text-stone-400 text-[9.5px]">
                            (+ 5 Bagosa u banci)
                          </div>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-800 text-[10px] text-stone-300 space-y-0.5">
                        <div className="text-amber-300 font-semibold">💡 Konkretan primer iz partije:</div>
                        <div>• Ako 1. igrač kupi vinograd za <strong>4 Bagosa</strong> ➔ ostaje mu <strong>6 gotovine</strong> (10 - 4 + 0).</div>
                        <div>• Ako 2. igrač kupi vinograd za <strong>5 Bagosa</strong> ➔ ostaje mu <strong>7 gotovine</strong> (10 - 5 + 2).</div>
                        <div className="text-stone-400 text-[9px] pt-0.5">• Na bankovnom računu u Banco do Vinho oboje i dalje imaju po <strong>5 Bagosa</strong>.</div>
                      </div>
                    </div>
                  )}

                  {step.id === 'setup-players' && (
                    <div className="my-2 p-2.5 rounded-xl bg-stone-950 border border-amber-800/60 flex items-center justify-between text-xs shadow-inner">
                      <div className="flex items-center gap-2">
                        <span className="text-base">💵</span>
                        <div>
                          <div className="font-bold text-amber-200 text-[11px]">Početni novac za 2016 Vintage (samo gotovina):</div>
                          <div className="text-[10px] text-stone-300 font-semibold">
                            1. Igrač: <span className="text-amber-400">19 Bagosa</span> • 2. Igrač: <span className="text-amber-400">20 Bagosa</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                          Nema banke
                        </span>
                      </div>
                    </div>
                  )}

                  <ul className="space-y-1.5 pt-1 border-t border-stone-800/60">
                    {step.details.map((detail, idx) => {
                      const isSubBullet = detail.startsWith('     •') || detail.startsWith('     -');
                      const isBullet = detail.startsWith('  •') || detail.startsWith('  -');
                      const cleanText = detail.replace(/^(\s*[•\-])\s*/, '');
                      const isKeyHeader = detail.startsWith('1.') || detail.startsWith('2.') || detail.startsWith('3.') || detail.startsWith('POČETNI');

                      return (
                        <li 
                          key={idx} 
                          className={`text-[11px] flex items-start gap-1.5 ${
                            isSubBullet ? 'pl-6 text-[10.5px]' : isBullet ? 'pl-3' : ''
                          } ${isDone ? 'text-stone-500' : isKeyHeader ? 'text-amber-300 font-bold pt-1' : 'text-stone-300'}`}
                        >
                          {!isKeyHeader && (
                            <span className={`shrink-0 font-bold ${
                              isSubBullet ? 'text-stone-500 text-[8px] mt-0.5' : isBullet ? 'text-amber-400' : 'text-amber-500'
                            }`}>
                              {isSubBullet ? '▪' : '•'}
                            </span>
                          )}
                          <span className="leading-snug">{isKeyHeader ? detail : cleanText || detail}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {(step.id.includes('regions') || step.id.includes('vineyard')) && onOpenRegions && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenRegions();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                      >
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pogledaj spisak 9 regija i njihove bonuse →</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
