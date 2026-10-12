import React, { useState } from 'react';
import { 
  Wine, 
  Calendar, 
  Sun, 
  RotateCw, 
  ArrowRight, 
  Award, 
  Coins, 
  Plus, 
  Minus, 
  AlertTriangle, 
  Sparkles, 
  Trophy,
  HelpCircle,
  Clock,
  Landmark,
  Scale,
  MapPin
} from 'lucide-react';
import { FAIR_SCORINGS } from '../data/rulesData';
import { GameEdition } from '../types';

interface GameTrackerProps {
  onOpenRules?: () => void;
  onOpenCalculator?: () => void;
  onOpenWineCalc?: () => void;
  onOpenRegions?: () => void;
  edition?: GameEdition;
  onSelectEdition?: (edition: GameEdition) => void;
}

export const GameTracker: React.FC<GameTrackerProps> = ({
  onOpenRules,
  onOpenCalculator,
  onOpenWineCalc,
  onOpenRegions,
  edition = '2010',
  onSelectEdition
}) => {
  const currentEdition = edition;

  // Current game state
  const [year, setYear] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_year');
    return s ? parseInt(s) : 1;
  });

  const [phaseIndex, setPhaseIndex] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_phase');
    return s ? parseInt(s) : 0;
  });

  // Player quick trackers
  const [danijelBagos, setDanijelBagos] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_d_bagos');
    return s ? parseInt(s) : 10;
  });
  const [danijelBank, setDanijelBank] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_d_bank');
    return s ? parseInt(s) : 10;
  });
  const [danijelFairPoints, setDanijelFairPoints] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_d_fp');
    return s ? parseInt(s) : 0;
  });
  const [danijelBarrelsSupply, setDanijelBarrelsSupply] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_d_supply');
    return s ? parseInt(s) : 4;
  });

  const [cecaBagos, setCecaBagos] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_c_bagos');
    return s ? parseInt(s) : 10;
  });
  const [cecaBank, setCecaBank] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_c_bank');
    return s ? parseInt(s) : 10;
  });
  const [cecaFairPoints, setCecaFairPoints] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_c_fp');
    return s ? parseInt(s) : 0;
  });
  const [cecaBarrelsSupply, setCecaBarrelsSupply] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_c_supply');
    return s ? parseInt(s) : 4;
  });

  const handleEditionChange = (ed: GameEdition) => {
    if (onSelectEdition) onSelectEdition(ed);
  };

  const hasFairThisYear = year === 3 || year === 5 || year === 6;

  // Phases tailored to edition
  const phasesForCurrentYear = [
    { 
      id: 'start', 
      name: 'Početak Godine', 
      desc: currentEdition === '2010'
        ? (year === 1 ? '1. Godina: Vintage pločica "0" (fiksno vreme)' : 'Nova Vintage pločica i pomeranje osobina')
        : (year === 1 ? '1. Godina: Nasumična Vintage pločica (pločica 0 u kutiji)' : 'Nova Vintage pločica i vremenska prognoza'),
      icon: Sun 
    },
    { id: 'action1', name: '1. Akcija', desc: 'Quadrel kretanje i izvođenje 1. akcije', icon: ArrowRight },
    { id: 'action2', name: '2. Akcija', desc: 'Quadrel kretanje i izvođenje 2. akcije', icon: ArrowRight },
    { 
      id: 'maintenance', 
      name: 'Održavanje (B)', 
      desc: currentEdition === '2010'
        ? '1. Kamata na investicije; 2. Plate enologa (1B); 3. Parovi buradi'
        : 'Obavezno povlačenje 1 bureta iz Prodaje nazad u zalihe',
      icon: RotateCw 
    },
    { id: 'production', name: 'Proizvodnja & Berba', desc: 'Starenje vina 1 desno, preraspodela radnika, berba', icon: Wine },
    ...(hasFairThisYear ? [{ 
      id: 'fair', 
      name: 'Sajam Vina (Fair)', 
      desc: `Rangiranje (${year === 3 ? '1.' : year === 5 ? '2.' : '3.'} sajam) • 2P pravilo (1. i 3. mesto)`, 
      icon: Award 
    }] : []),
    ...(year === 6 ? [{ 
      id: 'final_action', 
      name: currentEdition === '2010' ? '⭐ Završna Faza Magnata' : '⭐ Poslednja Bonus Akcija', 
      desc: currentEdition === '2010'
        ? 'Žrtvovanje preostalih vina za kretanje buradi na dodatne akcije/multiplajere!'
        : 'Tačno 1 dodatna Quadrel akcija po igraču pre kraja partije!', 
      icon: Sparkles 
    }] : []),
  ];

  const currentPhase = phasesForCurrentYear[phaseIndex] || phasesForCurrentYear[0];

  const nextPhase = () => {
    if (phaseIndex < phasesForCurrentYear.length - 1) {
      const nextP = phaseIndex + 1;
      setPhaseIndex(nextP);
      localStorage.setItem('vinhos_phase', nextP.toString());
    } else {
      if (year < 6) {
        const nextY = year + 1;
        setYear(nextY);
        setPhaseIndex(0);
        localStorage.setItem('vinhos_year', nextY.toString());
        localStorage.setItem('vinhos_phase', '0');
      }
    }
  };

  const prevPhase = () => {
    if (phaseIndex > 0) {
      const p = phaseIndex - 1;
      setPhaseIndex(p);
      localStorage.setItem('vinhos_phase', p.toString());
    } else if (year > 1) {
      const prevY = year - 1;
      setYear(prevY);
      const prevYearHasFair = prevY === 3 || prevY === 5;
      const lastIdx = prevYearHasFair ? 5 : 4;
      setPhaseIndex(lastIdx);
      localStorage.setItem('vinhos_year', prevY.toString());
      localStorage.setItem('vinhos_phase', lastIdx.toString());
    }
  };

  const jumpToYear = (targetYear: number) => {
    setYear(targetYear);
    setPhaseIndex(0);
    localStorage.setItem('vinhos_year', targetYear.toString());
    localStorage.setItem('vinhos_phase', '0');
  };

  const resetGame = () => {
    if (confirm('Da li želite da započnete novu partiju od 1. godine?')) {
      setYear(1);
      setPhaseIndex(0);
      setDanijelBagos(10);
      setDanijelBank(10);
      setDanijelFairPoints(0);
      setDanijelBarrelsSupply(4);
      setCecaBagos(10);
      setCecaBank(10);
      setCecaFairPoints(0);
      setCecaBarrelsSupply(4);
      localStorage.removeItem('vinhos_year');
      localStorage.removeItem('vinhos_phase');
      localStorage.removeItem('vinhos_d_bagos');
      localStorage.removeItem('vinhos_d_bank');
      localStorage.removeItem('vinhos_d_fp');
      localStorage.removeItem('vinhos_d_supply');
      localStorage.removeItem('vinhos_c_bagos');
      localStorage.removeItem('vinhos_c_bank');
      localStorage.removeItem('vinhos_c_fp');
      localStorage.removeItem('vinhos_c_supply');
    }
  };

  const isGameEnd = year === 6 && phaseIndex === phasesForCurrentYear.length - 1 && currentPhase.id === 'final_action';

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Year Selector Pills & Edition Bar */}
      <div className={`p-3 rounded-2xl border shadow-lg space-y-2.5 ${
        currentEdition === '2010'
          ? 'bg-gradient-to-r from-rose-950/70 via-stone-900 to-rose-950/70 border-rose-800/60'
          : 'bg-stone-900/90 border-stone-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-200">
            <Calendar className={`w-4 h-4 ${currentEdition === '2010' ? 'text-rose-400' : 'text-amber-400'}`} />
            <span>GODINA {year} • {currentEdition === '2010' ? '2010 RESERVE' : '2016 VINTAGE'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick switcher */}
            <button
              onClick={() => handleEditionChange(currentEdition === '2010' ? '2016' : '2010')}
              className="text-[10px] text-amber-300 bg-stone-950 px-2 py-0.5 rounded border border-stone-800 hover:border-amber-700 transition"
            >
              Prebaci na {currentEdition === '2010' ? '2016' : '2010'}
            </button>
            <button 
              onClick={resetGame}
              className="text-[10px] text-stone-400 hover:text-stone-200 bg-stone-800 px-2 py-0.5 rounded transition"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((y) => {
            const isFair = y === 3 || y === 5 || y === 6;
            const isCurrent = year === y;
            const isPast = year > y;
            return (
              <button
                key={y}
                onClick={() => jumpToYear(y)}
                className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isCurrent
                    ? currentEdition === '2010'
                      ? 'bg-gradient-to-b from-rose-600 to-rose-800 text-white font-black shadow-[0_0_12px_#f43f5e] scale-105'
                      : 'bg-gradient-to-b from-amber-500 to-amber-700 text-stone-950 font-black shadow-[0_0_12px_#f59e0b] scale-105'
                    : isPast
                    ? 'bg-stone-800/80 text-stone-400 border border-stone-700'
                    : 'bg-stone-900 text-stone-400 hover:bg-stone-800 border border-stone-800/80'
                }`}
              >
                <span className="text-[11px] font-bold">God. {y}</span>
                {isFair && (
                  <span className={`text-[8px] uppercase tracking-wider font-bold mt-0.5 px-1 rounded ${
                    isCurrent ? 'bg-stone-950 text-white' : 'text-amber-400'
                  }`}>
                    Sajam
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Companion Tools Bar */}
      <div className="grid grid-cols-3 gap-1.5 text-xs">
        {onOpenRegions && (
          <button
            onClick={onOpenRegions}
            className="py-1.5 px-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-amber-300 border border-stone-800 flex items-center justify-center gap-1.5 transition font-semibold shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10.5px]">Regije & Bonusi</span>
          </button>
        )}
        {onOpenWineCalc && (
          <button
            onClick={onOpenWineCalc}
            className="py-1.5 px-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 flex items-center justify-center gap-1.5 transition font-semibold shadow-sm"
          >
            <Wine className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-[10.5px]">Kalkulator Vina</span>
          </button>
        )}
        {onOpenRules && (
          <button
            onClick={onOpenRules}
            className="py-1.5 px-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 flex items-center justify-center gap-1.5 transition font-semibold shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10.5px]">Pravila</span>
          </button>
        )}
      </div>

      {/* Active Phase Card */}
      <div className={`p-4 rounded-3xl border-2 shadow-2xl relative overflow-hidden transition-all ${
        currentPhase.id === 'final_action'
          ? 'bg-gradient-to-br from-amber-950 via-stone-900 to-purple-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
          : currentPhase.id === 'fair'
          ? 'bg-gradient-to-br from-purple-950/60 via-stone-900 to-amber-950/60 border-purple-500/60'
          : currentEdition === '2010'
          ? 'bg-stone-900/95 border-rose-900/60'
          : 'bg-stone-900/95 border-amber-900/40'
      }`}>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
            currentEdition === '2010'
              ? 'text-rose-300 bg-rose-950/50 border-rose-900/50'
              : 'text-amber-400 bg-amber-950/50 border-amber-900/50'
          }`}>
            Godina {year} od 6 • Faza {phaseIndex + 1}/{phasesForCurrentYear.length}
          </span>
          {(year === 4 || year === 6) && phaseIndex === 0 && (
            <span className="text-[9px] font-bold bg-amber-500 text-stone-950 px-1.5 py-0.5 rounded animate-pulse">
              Okreni pločice licem nagore!
            </span>
          )}
        </div>

        <div className="my-2">
          <h2 className="text-xl font-black font-display text-white flex items-center gap-2">
            <currentPhase.icon className={`w-6 h-6 shrink-0 ${currentEdition === '2010' ? 'text-rose-400' : 'text-amber-400'}`} />
            {currentPhase.name}
          </h2>
          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
            {currentPhase.desc}
          </p>
        </div>

        {/* Phase-specific rich guidance */}
        {currentPhase.id === 'start' && (
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-1.5 mt-2">
            {year === 1 ? (
              currentEdition === '2010' ? (
                <div className="text-rose-300 font-bold bg-rose-950/40 p-2 rounded-xl border border-rose-800/60">
                  ⚠️ <strong>2010 RESERVE PRAVILO (str. 3):</strong> U 1. godini koristi se <span className="underline">isključivo pločica "0"</span> postavljena tokom postavke! Nema pomeranja osobina na početku 1. godine.
                </div>
              ) : (
                <div>• U 2016 pločica "0" se baca u kutiju i okreće se gornja nasumična pločica (-2 do +2).</div>
              )
            ) : (
              <div>• Odbacite prošlogodišnju pločicu i okrenite novu Vintage pločicu. Pomerite markere osobina 1-3 polja gore.</div>
            )}
            {(year === 4 || year === 6) && (
              <div className="text-amber-300 font-bold bg-amber-950/40 p-1.5 rounded-lg border border-amber-500/40">
                🔄 <strong>POČETAK {year}. GODINE:</strong> Svi igrači okreću sve iskorišćene pločice Vinskih Stručnjaka ponovo licem nagore!
              </div>
            )}
          </div>
        )}

        {(currentPhase.id === 'action1' || currentPhase.id === 'action2') && (
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-1.5 mt-2">
            <div className="font-semibold text-amber-200">Podsetnik za kretanje na Quadrelu:</div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="bg-stone-900 p-1.5 rounded border border-stone-800">
                • <strong>Susedno polje:</strong> Besplatno
              </div>
              <div className="bg-stone-900 p-1.5 rounded border border-stone-800">
                • <strong>Nesusedno:</strong> 1 Bago banci
              </div>
              <div className="bg-stone-900 p-1.5 rounded border border-stone-800">
                • <strong>Tuđi marker:</strong> 1 Bago igraču!
              </div>
              <div className="bg-stone-900 p-1.5 rounded border border-stone-800">
                • <strong>Pass / Sajam:</strong> Uvek besplatno!
              </div>
            </div>
            {currentEdition === '2010' && (
              <div className="text-[10px] text-rose-300 pt-1">
                *U 2010 možete izvršiti Divest (razinvestiranje) u bilo kom trenutku ako vam fali gotovina za kretanje ili akciju!
              </div>
            )}
          </div>
        )}

        {currentPhase.id === 'maintenance' && (
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-1.5 mt-2">
            {currentEdition === '2010' ? (
              <div className="space-y-1.5">
                <div className="text-rose-300 font-bold flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-rose-400" /> Održavanje u 2010 Reserve (str. 15):
                </div>
                <div>1. <strong>Kamata na investicije:</strong> Pomerite marker na banci napred/nazad prema investicionoj traci (-2 do +3). Ako ne možete platiti: -2 VP i odbacite Vinariju/Vinograd!</div>
                <div>2. <strong>Plate enologa:</strong> Platite 1 Bago sa bankovnog računa po enologu. Ako ne možete: -2 VP i otpustite enologa!</div>
                <div>3. <strong>Burad iz prodaje:</strong> Povlače se SAMO U PAROVIMA iz istog lokala uz postavljanje 2 Kocke Renomea!</div>
              </div>
            ) : (
              <div>
                <div className="text-emerald-300 font-semibold">Održavanje u 2016 Special Vintage:</div>
                <div>Svaki igrač <strong>MORA uzeti nazad 1 bure</strong> iz Sales zone nazad u svoje zalihe. Nema plata niti kamata!</div>
              </div>
            )}
          </div>
        )}

        {currentPhase.id === 'production' && (
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-1.5 mt-2">
            <div className="text-amber-300 font-semibold">Faza Proizvodnje & Berba:</div>
            <div>1. <strong>Starenje:</strong> Sva vina u skladištima/podrumima pomeraju se za 1 polje UDESNO. Vina koja ispadnu se trajno odbacuju!</div>
            <div>2. <strong>Preraspodela radnika:</strong> Besplatno rasporedite enologe i farmere na svoja imanja.</div>
            <div>3. <strong>Berba:</strong> Računajte kvalitet vina (+2 vinograd, +1 farmer, +1 vinarija, +2 enolog, +3 Porto, ± vreme).</div>
            {currentEdition === '2010' && (
              <div className="text-[10px] text-rose-300">
                *U 2010 farmer postoji samo ako imate imanje u Ribateju!
              </div>
            )}
          </div>
        )}

        {currentPhase.id === 'fair' && (
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-2 mt-2">
            <div className="text-amber-300 font-bold flex items-center justify-between">
              <span>Wine Tasting Fair ({year === 3 ? '1.' : year === 5 ? '2.' : '3.'} Sajam)</span>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-200">2P PROPOZICIJE</span>
            </div>
            <div className="text-stone-300">
              {year === 3 && '1. mesto: 9 VP | 2. igrač: 3 VP (Tie: 6 VP svaki)'}
              {year === 5 && '1. mesto: 12 VP | 2. igrač: 4 VP (Tie: 8 VP svaki)'}
              {year === 6 && '1. mesto: 15 VP | 2. igrač: 5 VP (Tie: 10 VP svaki)'}
            </div>
            {currentEdition === '2010' ? (
              <div className="text-[11px] text-rose-300 bg-rose-950/40 p-2 rounded-lg border border-rose-800/60">
                U 2010 pri Press Release-u stavljate svoja burad na portrete Magnata (osim u 1. godini)!
              </div>
            ) : (
              <div className="text-[11px] text-stone-400">
                U 2016 igrači oslobađaju burad od magnata i mogu uzeti Magnat pločice.
              </div>
            )}
          </div>
        )}

        {currentPhase.id === 'final_action' && (
          <div className="bg-amber-950/60 p-3.5 rounded-2xl border border-amber-500/50 text-xs text-amber-100 space-y-2 mt-2">
            <div className="font-black text-sm text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              ZAVRŠETAK PARTIJE ({currentEdition === '2010' ? '2010 RESERVE' : '2016 VINTAGE'})
            </div>
            {currentEdition === '2010' ? (
              <div className="space-y-1.5 leading-relaxed">
                <p>
                  Počevši od 1. igrača, igrači redom mogu <strong>odbaciti 1 vino</strong> sa table da pomere 1 bure na Magnat rešetki za dodatnu akciju ili multiplajer. Ponavlja se dok svi ne pasiraju!
                </p>
                <div className="text-[11px] text-rose-300 bg-rose-950/70 p-2 rounded-lg border border-rose-800">
                  ⚠️ Preostala vina u podrumu NE NOSE VP (0 VP)! Bodove donosi stanje na banci (0 do 18 VP).
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 leading-relaxed">
                <p>
                  Svaki igrač ima <strong>TAČNO 1 DODATNU AKCIJU</strong> na Quadrelu po redosledu poteza.
                </p>
                <div className="text-[11px] text-stone-300 bg-stone-950/70 p-2 rounded-lg border border-stone-800">
                  Nakon te akcije prelazi se na Kalkulator. Preostala vina donose floor(kvalitet / 2) VP svako!
                </div>
              </div>
            )}
          </div>
        )}

        {/* Phase navigation buttons */}
        <div className="flex items-center justify-between gap-2 mt-4 pt-2 border-t border-stone-800">
          <button
            onClick={prevPhase}
            disabled={year === 1 && phaseIndex === 0}
            className="px-3 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-700 disabled:opacity-40 disabled:pointer-events-none transition"
          >
            ← Prethodna faza
          </button>

          <button
            onClick={nextPhase}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              isGameEnd 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_12px_#059669]'
                : currentEdition === '2010'
                ? 'bg-rose-700 hover:bg-rose-600 text-white shadow-[0_0_12px_#be123c]'
                : 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-[0_0_12px_#d97706]'
            }`}
          >
            {isGameEnd ? (
              <>Kraj partije! Idite na Kalkulator 🏆</>
            ) : (
              <>Sledeća faza →</>
            )}
          </button>
        </div>
      </div>

      {/* QUICK STATUS TRACKER FOR DANIJEL & CECA */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-stone-400 flex items-center justify-between">
          <span>Stanje Igrača (Danijel 🟡 vs Ceca 🔴)</span>
          <span className="text-[10px] text-amber-400">
            {currentEdition === '2010' ? '2010: Keš + Banka' : '2016: Keš'}
          </span>
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Danijel */}
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-amber-500/40 space-y-2">
            <span className="font-bold text-amber-300 flex items-center gap-1.5 border-b border-stone-800 pb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
              Danijel (Žuti)
            </span>

            {/* Bagos Cash */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[10.5px]">Gotovina (Keš):</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDanijelBagos(Math.max(0, danijelBagos - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-amber-300 text-xs">
                  {danijelBagos}
                </span>
                <button
                  onClick={() => setDanijelBagos(danijelBagos + 1)}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Bank Track (2010 only) */}
            {currentEdition === '2010' && (
              <div className="flex items-center justify-between">
                <span className="text-rose-300 text-[10.5px]">Banka (0-24):</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setDanijelBank(Math.max(0, danijelBank - 1))}
                    className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-rose-300 text-xs">
                    {danijelBank}
                  </span>
                  <button
                    onClick={() => setDanijelBank(Math.min(24, danijelBank + 1))}
                    className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Fair Points */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[10.5px]">Fair Poeni:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDanijelFairPoints(Math.max(0, danijelFairPoints - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-amber-300 text-xs">
                  {danijelFairPoints}
                </span>
                <button
                  onClick={() => setDanijelFairPoints(danijelFairPoints + 1)}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Barrels */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[10.5px]">Burad u zalihi:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDanijelBarrelsSupply(Math.max(0, danijelBarrelsSupply - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-white text-xs">
                  {danijelBarrelsSupply}
                </span>
                <button
                  onClick={() => setDanijelBarrelsSupply(danijelBarrelsSupply + 1)}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Ceca */}
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-red-500/40 space-y-2">
            <span className="font-bold text-red-300 flex items-center gap-1.5 border-b border-stone-800 pb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
              Ceca (Crvena)
            </span>

            {/* Bagos Cash */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[10.5px]">Gotovina (Keš):</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCecaBagos(Math.max(0, cecaBagos - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-red-300 text-xs">
                  {cecaBagos}
                </span>
                <button
                  onClick={() => setCecaBagos(cecaBagos + 1)}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Bank Track (2010 only) */}
            {currentEdition === '2010' && (
              <div className="flex items-center justify-between">
                <span className="text-rose-300 text-[10.5px]">Banka (0-24):</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCecaBank(Math.max(0, cecaBank - 1))}
                    className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-rose-300 text-xs">
                    {cecaBank}
                  </span>
                  <button
                    onClick={() => setCecaBank(Math.min(24, cecaBank + 1))}
                    className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Fair Points */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[10.5px]">Fair Poeni:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCecaFairPoints(Math.max(0, cecaFairPoints - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-red-300 text-xs">
                  {cecaFairPoints}
                </span>
                <button
                  onClick={() => setCecaFairPoints(cecaFairPoints + 1)}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Barrels */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[10.5px]">Burad u zalihi:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCecaBarrelsSupply(Math.max(0, cecaBarrelsSupply - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-white text-xs">
                  {cecaBarrelsSupply}
                </span>
                <button
                  onClick={() => setCecaBarrelsSupply(cecaBarrelsSupply + 1)}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
