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
  Clock
} from 'lucide-react';
import { FAIR_SCORINGS } from '../data/rulesData';

interface GameTrackerProps {
  onOpenRules: () => void;
  onOpenCalculator: () => void;
  onOpenWineCalc: () => void;
}

export const GameTracker: React.FC = () => {
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
  const [cecaFairPoints, setCecaFairPoints] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_c_fp');
    return s ? parseInt(s) : 0;
  });
  const [cecaBarrelsSupply, setCecaBarrelsSupply] = useState<number>(() => {
    const s = localStorage.getItem('vinhos_c_supply');
    return s ? parseInt(s) : 4;
  });

  // Phases in a standard year
  // For years 1, 2, 4: Start -> Action 1 -> Action 2 -> Maintenance -> Production
  // For years 3, 5: Start -> Action 1 -> Action 2 -> Maintenance -> Production -> Fair
  // For year 6: Start -> Action 1 -> Action 2 -> Maintenance -> Production -> Fair -> Final 1 Action -> End Game!
  const hasFairThisYear = year === 3 || year === 5 || year === 6;

  const phasesForCurrentYear = [
    { id: 'start', name: 'Početak Godine', desc: 'Vremenska prognoza (Vintage pločica)', icon: Sun },
    { id: 'action1', name: '1. Akcija', desc: 'Quadrel kretanje i izvođenje 1. akcije', icon: ArrowRight },
    { id: 'action2', name: '2. Akcija', desc: 'Quadrel kretanje i izvođenje 2. akcije', icon: ArrowRight },
    { id: 'maintenance', name: 'Održavanje (B)', desc: 'Obavezan povratak 1 bureta iz Prodaje', icon: RotateCw },
    { id: 'production', name: 'Proizvodnja & Berba', desc: 'Starenje vina 1 desno, radnici, berba', icon: Wine },
    ...(hasFairThisYear ? [{ id: 'fair', name: 'Sajam Vina (Fair)', desc: `Rangiranje (${year === 3 ? '1.' : year === 5 ? '2.' : '3.'} sajam) & kupovina magnat pločica`, icon: Award }] : []),
    ...(year === 6 ? [{ id: 'final_action', name: '⭐ Poslednja Bonus Akcija', desc: 'Tačno 1 dodatna akcija po igraču pre kraja igre!', icon: Sparkles }] : []),
  ];

  const currentPhase = phasesForCurrentYear[phaseIndex] || phasesForCurrentYear[0];

  const nextPhase = () => {
    if (phaseIndex < phasesForCurrentYear.length - 1) {
      const nextP = phaseIndex + 1;
      setPhaseIndex(nextP);
      localStorage.setItem('vinhos_phase', nextP.toString());
    } else {
      // Advance to next year if year < 6
      if (year < 6) {
        const nextY = year + 1;
        setYear(nextY);
        setPhaseIndex(0);
        localStorage.setItem('vinhos_year', nextY.toString());
        localStorage.setItem('vinhos_phase', '0');
      } else {
        // Game finished!
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
      // set to last phase of previous year
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
      setDanijelFairPoints(0);
      setDanijelBarrelsSupply(4);
      setCecaBagos(10);
      setCecaFairPoints(0);
      setCecaBarrelsSupply(4);
      localStorage.removeItem('vinhos_year');
      localStorage.removeItem('vinhos_phase');
      localStorage.removeItem('vinhos_d_bagos');
      localStorage.removeItem('vinhos_d_fp');
      localStorage.removeItem('vinhos_d_supply');
      localStorage.removeItem('vinhos_c_bagos');
      localStorage.removeItem('vinhos_c_fp');
      localStorage.removeItem('vinhos_c_supply');
    }
  };

  const isGameEnd = year === 6 && phaseIndex === phasesForCurrentYear.length - 1 && currentPhase.id === 'final_action';

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Year Selector Pills */}
      <div className="bg-stone-900/90 p-3 rounded-2xl border border-stone-800 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-200">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>GODINA (RUNDA)</span>
          </div>
          <button 
            onClick={resetGame}
            className="text-[10px] text-stone-400 hover:text-stone-200 bg-stone-800 px-2 py-0.5 rounded transition"
          >
            Reset partije
          </button>
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
                    ? 'bg-gradient-to-b from-amber-500 to-amber-700 text-stone-950 font-black shadow-[0_0_12px_#f59e0b] scale-105'
                    : isPast
                    ? 'bg-stone-800/80 text-stone-400 border border-stone-700'
                    : 'bg-stone-900 text-stone-400 hover:bg-stone-800 border border-stone-800/80'
                }`}
              >
                <span className="text-[11px] font-bold">God. {y}</span>
                {isFair && (
                  <span className={`text-[8px] uppercase tracking-wider font-bold mt-0.5 px-1 rounded ${
                    isCurrent ? 'bg-amber-950 text-amber-200' : 'text-amber-400'
                  }`}>
                    Sajam
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Card */}
      <div className={`p-4 rounded-3xl border-2 shadow-2xl relative overflow-hidden transition-all ${
        currentPhase.id === 'final_action'
          ? 'bg-gradient-to-br from-amber-950 via-stone-900 to-purple-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
          : currentPhase.id === 'fair'
          ? 'bg-gradient-to-br from-purple-950/60 via-stone-900 to-amber-950/60 border-purple-500/60'
          : 'bg-stone-900/95 border-amber-900/40'
      }`}>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-900/50">
            Godina {year} od 6 • Faza {phaseIndex + 1}/{phasesForCurrentYear.length}
          </span>
          {year === 4 && phaseIndex === 0 && (
            <span className="text-[9px] font-bold bg-amber-500 text-stone-950 px-1.5 py-0.5 rounded animate-pulse">
              Okreni pločice licem nagore!
            </span>
          )}
          {year === 6 && phaseIndex === 0 && (
            <span className="text-[9px] font-bold bg-amber-500 text-stone-950 px-1.5 py-0.5 rounded animate-pulse">
              Okreni pločice licem nagore!
            </span>
          )}
        </div>

        <div className="my-2">
          <h2 className="text-xl font-black font-display text-white flex items-center gap-2">
            <currentPhase.icon className="w-6 h-6 text-amber-400 shrink-0" />
            {currentPhase.name}
          </h2>
          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
            {currentPhase.desc}
          </p>
        </div>

        {/* Phase-specific rich guidance */}
        {currentPhase.id === 'start' && (
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-1.5 mt-2">
            <div>• Okrenite novu <strong>Vintage pločicu</strong> za vremensku prognozu (-2 do +2).</div>
            {(year === 4 || year === 6) && (
              <div className="text-amber-300 font-bold bg-amber-950/40 p-1.5 rounded-lg border border-amber-500/40">
                🔄 <strong>POČETAK {year}. GODINE:</strong> Svi igrači okreću sve iskorišćene pločice Vinskih Stručnjaka i Magnata ponovo licem nagore!
              </div>
            )}
          </div>
        )}

        {(currentPhase.id === 'action1' || currentPhase.id === 'action2') && (
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-1.5 mt-2">
            <div className="font-semibold text-amber-200">Kretanje na Quadrelu:</div>
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
            <div className="text-[10px] text-stone-400 pt-1">
              Marker godine/poreza na ovom polju košta dodatnih 1 Bago u banku.
            </div>
          </div>
        )}

        {currentPhase.id === 'maintenance' && (
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-1 mt-2">
            <div className="text-emerald-300 font-semibold">Faza Održavanja (B - Barrel):</div>
            <div>Svaki igrač <strong>MORA uzeti jedno svoje bure</strong> iz Sales zone (Prodaja) i vratiti ga u svoje zalihe!</div>
            <div className="text-[10px] text-stone-400">Burad u Export zoni (Izvoz) se ne diraju!</div>
          </div>
        )}

        {currentPhase.id === 'production' && (
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-1.5 mt-2">
            <div className="text-amber-300 font-semibold">Koraci Proizvodnje:</div>
            <div>1. <strong>Starenje:</strong> Pomerite sva postojeća vina u skladištima i podrumima za 1 mesto UDESNO. Vina koja ispadnu su pokvarena i odbacuju se!</div>
            <div>2. <strong>Radnici:</strong> Možete besplatno preraspodeliti enologe (max 1 po vinariji) i farmere (max 1 po vinogradu).</div>
            <div>3. <strong>Berba:</strong> Izračunajte kvalitet vina na imanjima (+2 vinograd, +1 farmer, +1 vinarija, +2 enolog, +3 Porto, ± vreme).</div>
          </div>
        )}

        {currentPhase.id === 'fair' && (
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-2 mt-2">
            <div className="text-amber-300 font-bold flex items-center justify-between">
              <span>Wine Tasting Fair ({year === 3 ? '1.' : year === 5 ? '2.' : '3.'} Sajam)</span>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-200">2P PRAVILO</span>
            </div>
            <div className="text-stone-300">
              {year === 3 && '1. mesto: 9 VP | 2. igrač: 3 VP (Tie: 6 VP svaki)'}
              {year === 5 && '1. mesto: 12 VP | 2. igrač: 4 VP (Tie: 8 VP svaki)'}
              {year === 6 && '1. mesto: 15 VP | 2. igrač: 5 VP (Tie: 10 VP svaki)'}
            </div>
            <div className="text-[11px] text-stone-400">
              Nakon proglašenja: igrači mogu odbaciti 1 vino sa svoje table da kupe <strong>Magnat Action/Multiplier pločicu</strong> (mora se staviti bure na multiplikator da bi važio!).
            </div>
          </div>
        )}

        {currentPhase.id === 'final_action' && (
          <div className="bg-amber-950/60 p-3.5 rounded-2xl border border-amber-500/50 text-xs text-amber-100 space-y-2 mt-2">
            <div className="font-black text-sm text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              TRIGGER ZA KRAJ JE AKTIVIRAN!
            </div>
            <p className="leading-relaxed">
              Ovo je poslednja, završna akcija u igri! Počevši od prvog igrača, <strong className="text-white">svaki igrač ima TAČNO 1 AKCIJU</strong> na Quadrelu.
            </p>
            <div className="text-[11px] text-stone-300 bg-stone-950/70 p-2 rounded-lg border border-stone-800">
              ⚠️ Pločice se <strong>NE okreću</strong> posle 3. sajma! Koristite samo one koje su vam već ostale dostupne.
            </div>
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
          <span>Stanje Igrača (Brzi Brojači)</span>
          <span className="text-[10px] text-amber-400">Danijel 🟡 vs Ceca 🔴</span>
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Danijel */}
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-amber-500/40 space-y-2.5">
            <div className="font-bold text-amber-300 flex items-center justify-between border-b border-stone-800 pb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                Danijel (Žuti)
              </span>
            </div>

            {/* Bagos */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[11px]">Novac (Bagos):</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDanijelBagos(Math.max(0, danijelBagos - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-7 text-center font-bold text-amber-300 text-sm">
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

            {/* Fair Points */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[11px]">Fair Poeni (Sajam):</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDanijelFairPoints(Math.max(0, danijelFairPoints - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-7 text-center font-bold text-amber-300 text-sm">
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

            {/* Barrels in Supply */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[11px]">Burad u zalihi:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDanijelBarrelsSupply(Math.max(0, danijelBarrelsSupply - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-7 text-center font-bold text-white text-sm">
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
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-red-500/40 space-y-2.5">
            <div className="font-bold text-red-300 flex items-center justify-between border-b border-stone-800 pb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
                Ceca (Crvena)
              </span>
            </div>

            {/* Bagos */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[11px]">Novac (Bagos):</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCecaBagos(Math.max(0, cecaBagos - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-7 text-center font-bold text-red-300 text-sm">
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

            {/* Fair Points */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[11px]">Fair Poeni (Sajam):</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCecaFairPoints(Math.max(0, cecaFairPoints - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-7 text-center font-bold text-red-300 text-sm">
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

            {/* Barrels in Supply */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[11px]">Burad u zalihi:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCecaBarrelsSupply(Math.max(0, cecaBarrelsSupply - 1))}
                  className="w-5 h-5 rounded bg-stone-800 text-stone-300 hover:bg-stone-700 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="w-7 text-center font-bold text-white text-sm">
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
