import React, { useState } from 'react';
import { getVPFromMoney, FAIR_SCORINGS, MONEY_TO_VP_TABLE } from '../data/rulesData';
import { Trophy, Calculator, Plus, Trash2, Award, Sparkles, RefreshCw, ChevronDown, ChevronUp, Wine, Coins } from 'lucide-react';

interface PlayerScoreState {
  name: string;
  color: 'yellow' | 'red';
  bagos: number;
  wines: number[]; // e.g. [7, 5, 3]
  // Export Columns: who won each column (1 to 5)? Value options: 'none' | 'yellow' | 'red' | 'tie'
  exportBarrelsCount: number; // for tie breaker
  directExportVP: number; // sum of slot values where barrels were placed during the game
  fair1Placement: '1st' | '2nd' | 'tie' | 'none';
  fair2Placement: '1st' | '2nd' | 'tie' | 'none';
  fair3Placement: '1st' | '2nd' | 'tie' | 'none';
  multiplierVP: number; // only multipliers with barrels!
}

export const ScoreCalculator: React.FC = () => {
  // Shared column majorities (1 to 5)
  // Standard values for column majorities: e.g. Col 1 (14 VP), Col 2 (12 VP), Col 3 (10 VP), Col 4 (8 VP), Col 5 (6 VP)
  const [col1Winner, setCol1Winner] = useState<'danijel' | 'ceca' | 'tie' | 'none'>('none');
  const [col2Winner, setCol2Winner] = useState<'danijel' | 'ceca' | 'tie' | 'none'>('none');
  const [col3Winner, setCol3Winner] = useState<'danijel' | 'ceca' | 'tie' | 'none'>('none');
  const [col4Winner, setCol4Winner] = useState<'danijel' | 'ceca' | 'tie' | 'none'>('none');
  const [col5Winner, setCol5Winner] = useState<'danijel' | 'ceca' | 'tie' | 'none'>('none');

  // Danijel (Yellow)
  const [dBagos, setDBagos] = useState<number>(14);
  const [dWines, setDWines] = useState<number[]>([7, 5, 4]);
  const [newDWineQuality, setNewDWineQuality] = useState<string>('');
  const [dExportBarrels, setDExportBarrels] = useState<number>(4);
  const [dDirectExportVP, setDDirectExportVP] = useState<number>(24);
  const [dFair1, setDFair1] = useState<'1st' | '2nd' | 'tie'>('1st');
  const [dFair2, setDFair2] = useState<'1st' | '2nd' | 'tie'>('2nd');
  const [dFair3, setDFair3] = useState<'1st' | '2nd' | 'tie'>('1st');
  const [dMultiplierVP, setDMultiplierVP] = useState<number>(10);

  // Ceca (Red)
  const [cBagos, setCBagos] = useState<number>(16);
  const [cWines, setCWines] = useState<number[]>([9, 6, 3]);
  const [newCWineQuality, setNewCWineQuality] = useState<string>('');
  const [cExportBarrels, setCExportBarrels] = useState<number>(3);
  const [cDirectExportVP, setCDirectExportVP] = useState<number>(22);
  const [cFair1, setCFair1] = useState<'1st' | '2nd' | 'tie'>('2nd');
  const [cFair2, setCFair2] = useState<'1st' | '2nd' | 'tie'>('1st');
  const [cFair3, setCFair3] = useState<'1st' | '2nd' | 'tie'>('2nd');
  const [cMultiplierVP, setCMultiplierVP] = useState<number>(12);

  // Helper to add wine
  const addDWine = () => {
    const val = parseInt(newDWineQuality);
    if (!isNaN(val) && val > 0) {
      setDWines([...dWines, val]);
      setNewDWineQuality('');
    }
  };

  const addCWine = () => {
    const val = parseInt(newCWineQuality);
    if (!isNaN(val) && val > 0) {
      setCWines([...cWines, val]);
      setNewCWineQuality('');
    }
  };

  const removeDWine = (index: number) => {
    setDWines(dWines.filter((_, i) => i !== index));
  };

  const removeCWine = (index: number) => {
    setCWines(cWines.filter((_, i) => i !== index));
  };

  // Fair VP Calculation for 2 Players (using 1st and 3rd place!)
  const getFairPoints = (fairIdx: 0 | 1 | 2, status: '1st' | '2nd' | 'tie') => {
    const config = FAIR_SCORINGS[fairIdx];
    if (status === '1st') return config.firstPlaceVP;
    if (status === '2nd') return config.secondPlayerVP_2p; // In 2p gets 3rd place reward
    if (status === 'tie') return config.tieVP_2p; // (1st + 3rd)/2
    return 0;
  };

  // Export column points configuration
  const colPoints = [14, 12, 10, 8, 6];

  // Column points calculation
  const getColPoints = (winner: 'danijel' | 'ceca' | 'tie' | 'none', colIndex: number) => {
    const base = colPoints[colIndex];
    if (winner === 'danijel') return { danijel: base, ceca: 0 };
    if (winner === 'ceca') return { danijel: 0, ceca: base };
    if (winner === 'tie') {
      const split = Math.floor(base / 2);
      return { danijel: split, ceca: split };
    }
    return { danijel: 0, ceca: 0 };
  };

  const col1 = getColPoints(col1Winner, 0);
  const col2 = getColPoints(col2Winner, 1);
  const col3 = getColPoints(col3Winner, 2);
  const col4 = getColPoints(col4Winner, 3);
  const col5 = getColPoints(col5Winner, 4);

  const dColTotal = col1.danijel + col2.danijel + col3.danijel + col4.danijel + col5.danijel;
  const cColTotal = col1.ceca + col2.ceca + col3.ceca + col4.ceca + col5.ceca;

  // Danijel totals
  const dMoneyVP = getVPFromMoney(dBagos);
  const dWinesVP = dWines.reduce((sum, q) => sum + Math.floor(q / 2), 0);
  const dFairVP = getFairPoints(0, dFair1) + getFairPoints(1, dFair2) + getFairPoints(2, dFair3);
  const dTotalVP = dMoneyVP + dWinesVP + dColTotal + dDirectExportVP + dFairVP + dMultiplierVP;

  // Ceca totals
  const cMoneyVP = getVPFromMoney(cBagos);
  const cWinesVP = cWines.reduce((sum, q) => sum + Math.floor(q / 2), 0);
  const cFairVP = getFairPoints(0, cFair1) + getFairPoints(1, cFair2) + getFairPoints(2, cFair3);
  const cTotalVP = cMoneyVP + cWinesVP + cColTotal + cDirectExportVP + cFairVP + cMultiplierVP;

  // Final winner determination with official tie breaker
  let winnerText = '';
  let winnerColor = '';
  let winReason = '';

  if (dTotalVP > cTotalVP) {
    winnerText = 'Danijel (Žuti)';
    winnerColor = 'text-amber-400';
    winReason = `Pobeda sa ${dTotalVP} VP prema ${cTotalVP} VP (+${dTotalVP - cTotalVP} VP)!`;
  } else if (cTotalVP > dTotalVP) {
    winnerText = 'Ceca (Crvena)';
    winnerColor = 'text-red-400';
    winReason = `Pobeda sa ${cTotalVP} VP prema ${dTotalVP} VP (+${cTotalVP - dTotalVP} VP)!`;
  } else {
    // Tie-breaker 1: Barrels in Export
    if (dExportBarrels > cExportBarrels) {
      winnerText = 'Danijel (Žuti) [Tie-Break]';
      winnerColor = 'text-amber-400';
      winReason = `Izjednačeni na ${dTotalVP} VP! Danijel pobeđuje na osnovu više buradi u Export zoni (${dExportBarrels} vs ${cExportBarrels})!`;
    } else if (cExportBarrels > dExportBarrels) {
      winnerText = 'Ceca (Crvena) [Tie-Break]';
      winnerColor = 'text-red-400';
      winReason = `Izjednačeni na ${cTotalVP} VP! Ceca pobeđuje na osnovu više buradi u Export zoni (${cExportBarrels} vs ${dExportBarrels})!`;
    } else {
      // Tie-breaker 2: Money
      if (dBagos > cBagos) {
        winnerText = 'Danijel (Žuti) [Tie-Break 2]';
        winnerColor = 'text-amber-400';
        winReason = `Izjednačeni na ${dTotalVP} VP i po ${dExportBarrels} buradi! Danijel pobeđuje sa više Bagosa (${dBagos} vs ${cBagos})!`;
      } else if (cBagos > dBagos) {
        winnerText = 'Ceca (Crvena) [Tie-Break 2]';
        winnerColor = 'text-red-400';
        winReason = `Izjednačeni na ${cTotalVP} VP i po ${cExportBarrels} buradi! Ceca pobeđuje sa više Bagosa (${cBagos} vs ${dBagos})!`;
      } else {
        winnerText = 'Nerešeno u svim kategorijama!';
        winnerColor = 'text-purple-400';
        winReason = 'Potpuno izjednačeno (VP, burad u exportu i novac)!';
      }
    }
  }

  const resetCalculator = () => {
    if (confirm('Da li želite da resetujete kalkulator bodova?')) {
      setDBagos(10);
      setCBagos(10);
      setDWines([]);
      setCWines([]);
      setDExportBarrels(0);
      setCExportBarrels(0);
      setDDirectExportVP(0);
      setCDirectExportVP(0);
      setDMultiplierVP(0);
      setCMultiplierVP(0);
      setCol1Winner('none');
      setCol2Winner('none');
      setCol3Winner('none');
      setCol4Winner('none');
      setCol5Winner('none');
    }
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Winner Hero Card */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 p-4 rounded-3xl border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-[11px] uppercase font-bold tracking-wider text-amber-300">
              Konačni Rezultat Partije
            </span>
          </div>
          <button
            onClick={resetCalculator}
            className="text-[10px] text-stone-400 hover:text-stone-200 flex items-center gap-1 transition bg-stone-800/80 px-2 py-1 rounded-lg"
          >
            <RefreshCw className="w-3 h-3" /> Nova partija
          </button>
        </div>

        {/* Score comparison display */}
        <div className="grid grid-cols-2 gap-3 my-3">
          {/* Danijel Card */}
          <div className={`p-3 rounded-2xl border text-center transition-all ${
            dTotalVP >= cTotalVP 
              ? 'bg-amber-950/40 border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
              : 'bg-stone-900/60 border-stone-800'
          }`}>
            <span className="text-xs font-bold text-amber-300 flex items-center justify-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-[0_0_6px_#f59e0b]" />
              Danijel (Žuti)
            </span>
            <div className="text-3xl font-black font-display text-amber-400 mt-1">
              {dTotalVP} <span className="text-xs font-normal opacity-70">VP</span>
            </div>
            <div className="text-[10px] text-stone-400 mt-1 flex justify-center gap-2">
              <span>🍇 {dExportBarrels} buradi</span>
              <span>💰 {dBagos} B</span>
            </div>
          </div>

          {/* Ceca Card */}
          <div className={`p-3 rounded-2xl border text-center transition-all ${
            cTotalVP >= dTotalVP 
              ? 'bg-red-950/40 border-red-500/70 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
              : 'bg-stone-900/60 border-stone-800'
          }`}>
            <span className="text-xs font-bold text-red-300 flex items-center justify-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shadow-[0_0_6px_#ef4444]" />
              Ceca (Crvena)
            </span>
            <div className="text-3xl font-black font-display text-red-400 mt-1">
              {cTotalVP} <span className="text-xs font-normal opacity-70">VP</span>
            </div>
            <div className="text-[10px] text-stone-400 mt-1 flex justify-center gap-2">
              <span>🍇 {cExportBarrels} buradi</span>
              <span>💰 {cBagos} B</span>
            </div>
          </div>
        </div>

        {/* Winner Announcement Banner */}
        <div className="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800 text-center">
          <div className={`text-sm font-bold ${winnerColor}`}>
            🏆 Pobednik: {winnerText}
          </div>
          <div className="text-[11px] text-stone-300 mt-0.5">
            {winReason}
          </div>
        </div>
      </div>

      {/* SECTION: SAJAM (WINE TASTING FAIR) - 2 PLAYER SPECIAL */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-stone-100">1. Sajmovi Vina (Godine 3, 5, 6)</h3>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
            2P Pravilo (1. i 3. mesto)
          </span>
        </div>

        <p className="text-[11px] text-stone-400">
          U 2 igrača pobednik sajma uzima 1. mesto, a drugi igrač uzima bodove za 3. mesto (strana 15):
        </p>

        {/* Fair 1 (Godina 3) */}
        <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-stone-200">1. Sajam (Godina 3)</span>
            <span className="text-[10px] text-amber-400">1. mesto: 9 VP | 2. igrač: 3 VP | Tie: 6 VP</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-stone-400 block mb-0.5">Danijel:</span>
              <div className="flex gap-1">
                {(['1st', '2nd', 'tie'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setDFair1(opt);
                      if (opt === '1st') setCFair1('2nd');
                      if (opt === '2nd') setCFair1('1st');
                      if (opt === 'tie') setCFair1('tie');
                    }}
                    className={`flex-1 py-1 rounded text-[10px] font-bold ${
                      dFair1 === opt ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {opt === '1st' ? '1. (9)' : opt === '2nd' ? '2. (3)' : 'Tie (6)'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 block mb-0.5">Ceca:</span>
              <div className="flex gap-1">
                {(['1st', '2nd', 'tie'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setCFair1(opt);
                      if (opt === '1st') setDFair1('2nd');
                      if (opt === '2nd') setDFair1('1st');
                      if (opt === 'tie') setDFair1('tie');
                    }}
                    className={`flex-1 py-1 rounded text-[10px] font-bold ${
                      cFair1 === opt ? 'bg-red-600 text-white' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {opt === '1st' ? '1. (9)' : opt === '2nd' ? '2. (3)' : 'Tie (6)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fair 2 (Godina 5) */}
        <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-stone-200">2. Sajam (Godina 5)</span>
            <span className="text-[10px] text-amber-400">1. mesto: 12 VP | 2. igrač: 4 VP | Tie: 8 VP</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-stone-400 block mb-0.5">Danijel:</span>
              <div className="flex gap-1">
                {(['1st', '2nd', 'tie'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setDFair2(opt);
                      if (opt === '1st') setCFair2('2nd');
                      if (opt === '2nd') setCFair2('1st');
                      if (opt === 'tie') setCFair2('tie');
                    }}
                    className={`flex-1 py-1 rounded text-[10px] font-bold ${
                      dFair2 === opt ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {opt === '1st' ? '1. (12)' : opt === '2nd' ? '2. (4)' : 'Tie (8)'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 block mb-0.5">Ceca:</span>
              <div className="flex gap-1">
                {(['1st', '2nd', 'tie'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setCFair2(opt);
                      if (opt === '1st') setDFair2('2nd');
                      if (opt === '2nd') setDFair2('1st');
                      if (opt === 'tie') setDFair2('tie');
                    }}
                    className={`flex-1 py-1 rounded text-[10px] font-bold ${
                      cFair2 === opt ? 'bg-red-600 text-white' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {opt === '1st' ? '1. (12)' : opt === '2nd' ? '2. (4)' : 'Tie (8)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fair 3 (Godina 6) */}
        <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-stone-200">3. Sajam (Godina 6)</span>
            <span className="text-[10px] text-amber-400">1. mesto: 15 VP | 2. igrač: 5 VP | Tie: 10 VP</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-stone-400 block mb-0.5">Danijel:</span>
              <div className="flex gap-1">
                {(['1st', '2nd', 'tie'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setDFair3(opt);
                      if (opt === '1st') setCFair3('2nd');
                      if (opt === '2nd') setCFair3('1st');
                      if (opt === 'tie') setCFair3('tie');
                    }}
                    className={`flex-1 py-1 rounded text-[10px] font-bold ${
                      dFair3 === opt ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {opt === '1st' ? '1. (15)' : opt === '2nd' ? '2. (5)' : 'Tie (10)'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 block mb-0.5">Ceca:</span>
              <div className="flex gap-1">
                {(['1st', '2nd', 'tie'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setCFair3(opt);
                      if (opt === '1st') setDFair3('2nd');
                      if (opt === '2nd') setDFair3('1st');
                      if (opt === 'tie') setDFair3('tie');
                    }}
                    className={`flex-1 py-1 rounded text-[10px] font-bold ${
                      cFair3 === opt ? 'bg-red-600 text-white' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {opt === '1st' ? '1. (15)' : opt === '2nd' ? '2. (5)' : 'Tie (10)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: MONEY (BAGOS) SCORING */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-stone-100">2. Preostali Novac (Bagos)</h3>
          </div>
          <span className="text-[10px] text-stone-400">Tabela sa strane 16</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <span className="font-semibold text-amber-300 block mb-1">Danijel (Bagos):</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={dBagos}
                onChange={(e) => setDBagos(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-amber-300 text-base"
              />
            </div>
            <div className="text-[10px] text-stone-400 mt-1 text-center">
              Daje <strong className="text-amber-400">{dMoneyVP} VP</strong>
            </div>
          </div>

          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <span className="font-semibold text-red-300 block mb-1">Ceca (Bagos):</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={cBagos}
                onChange={(e) => setCBagos(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-red-300 text-base"
              />
            </div>
            <div className="text-[10px] text-stone-400 mt-1 text-center">
              Daje <strong className="text-red-400">{cMoneyVP} VP</strong>
            </div>
          </div>
        </div>

        {/* Money lookup cheat sheet */}
        <div className="bg-stone-950/40 p-2 rounded-xl text-[10px] text-stone-400 border border-stone-800/60 flex flex-wrap justify-between gap-1">
          <span>0-2: 0 VP</span>
          <span>3-5: 1 VP</span>
          <span>6-8: 3 VP</span>
          <span>9-11: 5 VP</span>
          <span>12-14: 7 VP</span>
          <span>15-17: 10 VP</span>
          <span>18-20: 14 VP</span>
          <span>21-23: 18 VP</span>
          <span>24+: 22 VP</span>
        </div>
      </div>

      {/* SECTION: WINES IN CELLAR / WAREHOUSE */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Wine className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-sm text-stone-100">3. Vina na Tabli (Pola Kvaliteta nadole)</h3>
          </div>
          <span className="text-[10px] text-purple-300 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-900/50">
            ⌊Kvalitet / 2⌋
          </span>
        </div>

        {/* Danijel wines */}
        <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-amber-300">Danijelova vina (Ukupno: {dWinesVP} VP):</span>
            <div className="flex gap-1 items-center">
              <input
                type="number"
                placeholder="Kvalitet"
                value={newDWineQuality}
                onChange={(e) => setNewDWineQuality(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addDWine()}
                className="w-16 bg-stone-900 border border-stone-700 rounded px-1.5 py-1 text-xs text-center"
              />
              <button
                onClick={addDWine}
                className="bg-amber-600 hover:bg-amber-500 text-white p-1 rounded transition text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {dWines.map((q, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 bg-stone-900 border border-amber-600/40 text-amber-300 text-xs px-2 py-0.5 rounded-lg"
              >
                Q{q} → <strong className="text-white">{Math.floor(q / 2)} VP</strong>
                <button
                  onClick={() => removeDWine(idx)}
                  className="text-stone-500 hover:text-red-400 ml-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
            {dWines.length === 0 && (
              <span className="text-[11px] text-stone-500 italic">Nema vina na tabli</span>
            )}
          </div>
        </div>

        {/* Ceca wines */}
        <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-red-300">Cecina vina (Ukupno: {cWinesVP} VP):</span>
            <div className="flex gap-1 items-center">
              <input
                type="number"
                placeholder="Kvalitet"
                value={newCWineQuality}
                onChange={(e) => setNewCWineQuality(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCWine()}
                className="w-16 bg-stone-900 border border-stone-700 rounded px-1.5 py-1 text-xs text-center"
              />
              <button
                onClick={addCWine}
                className="bg-red-600 hover:bg-red-500 text-white p-1 rounded transition text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cWines.map((q, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 bg-stone-900 border border-red-600/40 text-red-300 text-xs px-2 py-0.5 rounded-lg"
              >
                Q{q} → <strong className="text-white">{Math.floor(q / 2)} VP</strong>
                <button
                  onClick={() => removeCWine(idx)}
                  className="text-stone-500 hover:text-red-400 ml-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
            {cWines.length === 0 && (
              <span className="text-[11px] text-stone-500 italic">Nema vina na tabli</span>
            )}
          </div>
        </div>
      </div>

      {/* SECTION: EXPORT MAJORITIES & BARRELS */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-stone-100">4. Većine u Kolonama Izvoza (Export)</h3>
          </div>
          <span className="text-[10px] text-emerald-400">Danijel: {dColTotal} VP | Ceca: {cColTotal} VP</span>
        </div>

        <p className="text-[11px] text-stone-400">
          Ko ima više buradi u svakoj zemlji uvoznici dobija bodove. U slučaju izjednačenja (Tie), bodovi se dele na pola zaokruženo nadole:
        </p>

        {/* 5 Columns selectors */}
        <div className="space-y-1.5">
          {[
            { label: 'Kolona 1 (14 VP)', state: col1Winner, set: setCol1Winner, base: 14 },
            { label: 'Kolona 2 (12 VP)', state: col2Winner, set: setCol2Winner, base: 12 },
            { label: 'Kolona 3 (10 VP)', state: col3Winner, set: setCol3Winner, base: 10 },
            { label: 'Kolona 4 (8 VP)', state: col4Winner, set: setCol4Winner, base: 8 },
            { label: 'Kolona 5 (6 VP)', state: col5Winner, set: setCol5Winner, base: 6 },
          ].map((col, idx) => (
            <div key={idx} className="flex items-center justify-between bg-stone-950/60 p-2 rounded-xl border border-stone-800/80 text-xs">
              <span className="font-medium text-stone-300">{col.label}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => col.set('danijel')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${
                    col.state === 'danijel' ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  Danijel ({col.base})
                </button>
                <button
                  onClick={() => col.set('ceca')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${
                    col.state === 'ceca' ? 'bg-red-600 text-white' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  Ceca ({col.base})
                </button>
                <button
                  onClick={() => col.set('tie')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${
                    col.state === 'tie' ? 'bg-purple-700 text-white' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  Tie ({Math.floor(col.base / 2)})
                </button>
                <button
                  onClick={() => col.set('none')}
                  className={`px-1.5 py-1 rounded text-[10px] ${
                    col.state === 'none' ? 'bg-stone-700 text-stone-300' : 'bg-stone-900 text-stone-500'
                  }`}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Export VP & Total Barrels for Tie-break */}
        <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5">
            <span className="font-bold text-amber-300 block">Danijel Izvoz:</span>
            <div>
              <span className="text-[10px] text-stone-400 block">VP sa slotova plasiranja:</span>
              <input
                type="number"
                min="0"
                value={dDirectExportVP}
                onChange={(e) => setDDirectExportVP(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-center font-bold text-amber-300 text-sm"
              />
            </div>
            <div>
              <span className="text-[10px] text-stone-400 block">Ukupno buradi u Exportu (Tie-Break):</span>
              <input
                type="number"
                min="0"
                value={dExportBarrels}
                onChange={(e) => setDExportBarrels(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-center font-bold text-stone-200 text-sm"
              />
            </div>
          </div>

          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5">
            <span className="font-bold text-red-300 block">Ceca Izvoz:</span>
            <div>
              <span className="text-[10px] text-stone-400 block">VP sa slotova plasiranja:</span>
              <input
                type="number"
                min="0"
                value={cDirectExportVP}
                onChange={(e) => setCDirectExportVP(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-center font-bold text-red-300 text-sm"
              />
            </div>
            <div>
              <span className="text-[10px] text-stone-400 block">Ukupno buradi u Exportu (Tie-Break):</span>
              <input
                type="number"
                min="0"
                value={cExportBarrels}
                onChange={(e) => setCExportBarrels(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-center font-bold text-stone-200 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: MULTIPLIERS (ONLY WITH BARRELS) */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-stone-100">5. Multiplier Pločice (Sa Buradima)</h3>
          </div>
          <span className="text-[10px] text-amber-300">Pravilo: Bez bureta = 0 VP</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <span className="font-semibold text-amber-300 block mb-1">Danijel Multipliers (VP):</span>
            <input
              type="number"
              min="0"
              value={dMultiplierVP}
              onChange={(e) => setDMultiplierVP(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-amber-300 text-base"
            />
          </div>

          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <span className="font-semibold text-red-300 block mb-1">Ceca Multipliers (VP):</span>
            <input
              type="number"
              min="0"
              value={cMultiplierVP}
              onChange={(e) => setCMultiplierVP(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-red-300 text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
