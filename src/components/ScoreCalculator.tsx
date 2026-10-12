import React, { useState } from 'react';
import { getVPFromMoney, getVPFromBank2010, FAIR_SCORINGS, MONEY_TO_VP_TABLE, BANK_TO_VP_TABLE_2010 } from '../data/rulesData';
import { GameEdition } from '../types';
import { Trophy, Calculator, Plus, Trash2, Award, Sparkles, RefreshCw, ChevronDown, ChevronUp, Wine, Coins, Landmark, Scale, AlertCircle } from 'lucide-react';

interface ScoreCalculatorProps {
  edition?: GameEdition;
  onSelectEdition?: (edition: GameEdition) => void;
}

export const ScoreCalculator: React.FC<ScoreCalculatorProps> = ({
  edition = '2010',
  onSelectEdition
}) => {
  const currentEdition = edition;

  // Shared column majorities (1 to 5)
  // Standard values for column majorities: Col 1 (14 VP), Col 2 (12 VP), Col 3 (10 VP), Col 4 (8 VP), Col 5 (6 VP)
  const [col1Winner, setCol1Winner] = useState<'danijel' | 'ceca' | 'tie' | 'none'>('none');
  const [col2Winner, setCol2Winner] = useState<'danijel' | 'ceca' | 'tie' | 'none'>('none');
  const [col3Winner, setCol3Winner] = useState<'danijel' | 'ceca' | 'tie' | 'none'>('none');
  const [col4Winner, setCol4Winner] = useState<'danijel' | 'ceca' | 'tie' | 'none'>('none');
  const [col5Winner, setCol5Winner] = useState<'danijel' | 'ceca' | 'tie' | 'none'>('none');

  // Danijel (Yellow)
  const [dBagos, setDBagos] = useState<number>(14);
  const [dBankTrack, setDBankTrack] = useState<number>(16); // 2010 Bank account marker (0 to 24)
  const [dInvestments, setDInvestments] = useState<number>(1); // 2010 Investment position (-2 to +3)
  const [dWines, setDWines] = useState<number[]>([7, 5, 4]); // 2016 wine qualities
  const [newDWineQuality, setNewDWineQuality] = useState<string>('');
  const [dExportBarrels, setDExportBarrels] = useState<number>(4);
  const [dDirectExportVP, setDDirectExportVP] = useState<number>(24);
  const [dFair1, setDFair1] = useState<'1st' | '2nd' | 'tie'>('1st');
  const [dFair2, setDFair2] = useState<'1st' | '2nd' | 'tie'>('2nd');
  const [dFair3, setDFair3] = useState<'1st' | '2nd' | 'tie'>('1st');
  const [dMultiplierVP, setDMultiplierVP] = useState<number>(10);

  // Ceca (Red)
  const [cBagos, setCBagos] = useState<number>(16);
  const [cBankTrack, setCBankTrack] = useState<number>(19); // 2010 Bank account marker (0 to 24)
  const [cInvestments, setCInvestments] = useState<number>(0);
  const [cWines, setCWines] = useState<number[]>([9, 6, 3]);
  const [newCWineQuality, setNewCWineQuality] = useState<string>('');
  const [cExportBarrels, setCExportBarrels] = useState<number>(3);
  const [cDirectExportVP, setCDirectExportVP] = useState<number>(22);
  const [cFair1, setCFair1] = useState<'1st' | '2nd' | 'tie'>('2nd');
  const [cFair2, setCFair2] = useState<'1st' | '2nd' | 'tie'>('1st');
  const [cFair3, setCFair3] = useState<'1st' | '2nd' | 'tie'>('2nd');
  const [cMultiplierVP, setCMultiplierVP] = useState<number>(12);

  const handleEditionChange = (ed: GameEdition) => {
    if (onSelectEdition) onSelectEdition(ed);
  };

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

  // Danijel totals calculation depending on edition
  const dMoneyVP = currentEdition === '2010' ? getVPFromBank2010(dBankTrack) : getVPFromMoney(dBagos);
  const dWinesVP = currentEdition === '2010' ? 0 : dWines.reduce((sum, q) => sum + Math.floor(q / 2), 0);
  const dFairVP = getFairPoints(0, dFair1) + getFairPoints(1, dFair2) + getFairPoints(2, dFair3);
  const dTotalVP = dMoneyVP + dWinesVP + dColTotal + dDirectExportVP + dFairVP + dMultiplierVP;

  // Ceca totals calculation
  const cMoneyVP = currentEdition === '2010' ? getVPFromBank2010(cBankTrack) : getVPFromMoney(cBagos);
  const cWinesVP = currentEdition === '2010' ? 0 : cWines.reduce((sum, q) => sum + Math.floor(q / 2), 0);
  const cFairVP = getFairPoints(0, cFair1) + getFairPoints(1, cFair2) + getFairPoints(2, cFair3);
  const cTotalVP = cMoneyVP + cWinesVP + cColTotal + cDirectExportVP + cFairVP + cMultiplierVP;

  // Tie-breaker 2 total money:
  // In 2010: Cash + Bank account after divesting
  // In 2016: Cash in hand
  const dTotalMoney2010 = dBagos + dBankTrack;
  const cTotalMoney2010 = cBagos + cBankTrack;

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
      // Tie-breaker 2: Money (Edition dependent)
      if (currentEdition === '2010') {
        if (dTotalMoney2010 > cTotalMoney2010) {
          winnerText = 'Danijel (Žuti) [Tie-Break 2: Banka+Keš]';
          winnerColor = 'text-amber-400';
          winReason = `Izjednačeni na ${dTotalVP} VP i po ${dExportBarrels} buradi! Po 2010 pravilima Danijel ima više ukupnog novca (${dTotalMoney2010} vs ${cTotalMoney2010} Bagosa)!`;
        } else if (cTotalMoney2010 > dTotalMoney2010) {
          winnerText = 'Ceca (Crvena) [Tie-Break 2: Banka+Keš]';
          winnerColor = 'text-red-400';
          winReason = `Izjednačeni na ${cTotalVP} VP i po ${cExportBarrels} buradi! Po 2010 pravilima Ceca ima više ukupnog novca (${cTotalMoney2010} vs ${dTotalMoney2010} Bagosa)!`;
        } else {
          winnerText = 'Nerešeno u svim kategorijama!';
          winnerColor = 'text-purple-400';
          winReason = 'Potpuno izjednačeno (VP, burad u exportu i novac)!';
        }
      } else {
        if (dBagos > cBagos) {
          winnerText = 'Danijel (Žuti) [Tie-Break 2: Gotovina]';
          winnerColor = 'text-amber-400';
          winReason = `Izjednačeni na ${dTotalVP} VP i po ${dExportBarrels} buradi! Po 2016 pravilima Danijel pobeđuje sa više Bagosa u gotovini (${dBagos} vs ${cBagos})!`;
        } else if (cBagos > dBagos) {
          winnerText = 'Ceca (Crvena) [Tie-Break 2: Gotovina]';
          winnerColor = 'text-red-400';
          winReason = `Izjednačeni na ${cTotalVP} VP i po ${cExportBarrels} buradi! Po 2016 pravilima Ceca pobeđuje sa više Bagosa u gotovini (${cBagos} vs ${dBagos})!`;
        } else {
          winnerText = 'Nerešeno u svim kategorijama!';
          winnerColor = 'text-purple-400';
          winReason = 'Potpuno izjednačeno u svim kategorijama!';
        }
      }
    }
  }

  const resetCalculator = () => {
    if (confirm('Da li želite da resetujete kalkulator bodova?')) {
      setDBagos(10);
      setCBagos(10);
      setDBankTrack(10);
      setCBankTrack(10);
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
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Top Banner & Edition Switcher */}
      <div className={`p-4 rounded-2xl border shadow-xl space-y-3 ${
        currentEdition === '2010'
          ? 'bg-gradient-to-r from-rose-950 via-stone-900 to-rose-950/80 border-rose-800/60'
          : 'bg-gradient-to-r from-amber-950 via-stone-900 to-red-950/70 border-amber-800/50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calculator className={`w-5 h-5 ${currentEdition === '2010' ? 'text-rose-400' : 'text-amber-400'}`} />
            <div>
              <h2 className="text-base font-extrabold text-stone-100 font-display">
                Kalkulator Završnih Bodova
              </h2>
              <span className="text-[10px] text-stone-300">
                Automatski obračun bodova i tie-breakera za duel
              </span>
            </div>
          </div>
          <button
            onClick={resetCalculator}
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition"
            title="Resetuj kalkulator"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
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
              Banka VP
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
              Keš + Vina
            </span>
          </button>
        </div>

        {/* Rule Explanation for Selected Edition */}
        <div className={`p-2.5 rounded-xl border text-[11px] leading-relaxed flex items-start gap-2 ${
          currentEdition === '2010'
            ? 'bg-rose-950/60 border-rose-800 text-rose-200'
            : 'bg-amber-950/40 border-amber-800 text-amber-200'
        }`}>
          <Scale className="w-4 h-4 shrink-0 mt-0.5 text-rose-300" />
          <div>
            {currentEdition === '2010' ? (
              <span>
                <strong className="text-rose-300">Bodovanje u 2010 Reserve (str. 20):</strong> VP donosi pozicija markera na <strong>stazi Bankovnog računa (0 do 18 VP)</strong>. Gotovina u ruci nosi <strong>0 VP</strong>! Preostala vina u podrumu nose <strong>0 VP</strong> (vino je trebalo žrtvovati za magnat akcije).
              </span>
            ) : (
              <span>
                <strong className="text-amber-300">Bodovanje u 2016 Vintage (str. 16):</strong> VP donosi <strong>gotovina u ruci po tabeli (0 do 22 VP)</strong>. Preostala vina u podrumu donose <strong>polovinu kvaliteta: floor(kvalitet/2) VP svako</strong>!
              </span>
            )}
          </div>
        </div>

        {/* Score comparison display */}
        <div className="grid grid-cols-2 gap-3 my-2">
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
              <span>{currentEdition === '2010' ? `🏛️ ${dBankTrack} B (Bank)` : `💰 ${dBagos} B`}</span>
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
              <span>{currentEdition === '2010' ? `🏛️ ${cBankTrack} B (Bank)` : `💰 ${cBagos} B`}</span>
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

      {/* SECTION: MONEY / BANK SCORING */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            {currentEdition === '2010' ? (
              <Landmark className="w-5 h-5 text-rose-400" />
            ) : (
              <Coins className="w-5 h-5 text-amber-400" />
            )}
            <h3 className="font-bold text-sm text-stone-100">
              {currentEdition === '2010' ? '1. Bankovni Račun (Banco do Vinho)' : '1. Gotovina u Ruci (Bagos)'}
            </h3>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
            currentEdition === '2010'
              ? 'bg-rose-950 text-rose-300 border border-rose-800'
              : 'bg-amber-950 text-amber-300 border border-amber-800'
          }`}>
            {currentEdition === '2010' ? '2010 Skala (0 do 18 VP)' : '2016 Tabela (0 do 22 VP)'}
          </span>
        </div>

        {currentEdition === '2010' ? (
          <div className="space-y-3">
            <p className="text-[11px] text-stone-300">
              Unesite polje na stazi Bankovnog računa (0 do 24). <span className="text-rose-300 font-semibold">Gotovina u ruci nosi 0 VP</span> (koristi se samo za eventualni tie-break 2)!
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Danijel Bank */}
              <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5">
                <span className="font-semibold text-amber-300 flex items-center justify-between">
                  <span>Danijel Banka:</span>
                  <span className="text-amber-400 font-bold">{dMoneyVP} VP</span>
                </span>
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={dBankTrack}
                  onChange={(e) => setDBankTrack(Math.max(0, Math.min(24, parseInt(e.target.value) || 0)))}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-stone-200"
                />
                <div className="text-[9.5px] text-stone-400 flex justify-between">
                  <span>Staza računa (0-24)</span>
                  <span>19-24 = 18 VP</span>
                </div>
              </div>

              {/* Ceca Bank */}
              <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5">
                <span className="font-semibold text-red-300 flex items-center justify-between">
                  <span>Ceca Banka:</span>
                  <span className="text-red-400 font-bold">{cMoneyVP} VP</span>
                </span>
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={cBankTrack}
                  onChange={(e) => setCBankTrack(Math.max(0, Math.min(24, parseInt(e.target.value) || 0)))}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-stone-200"
                />
                <div className="text-[9.5px] text-stone-400 flex justify-between">
                  <span>Staza računa (0-24)</span>
                  <span>19-24 = 18 VP</span>
                </div>
              </div>
            </div>

            {/* Reference Table for 2010 Bank */}
            <div className="bg-stone-950/50 p-2 rounded-xl border border-stone-800 text-[10px] text-stone-400 flex justify-around">
              <span>0-6 B = 0 VP</span>
              <span>7-9 B = 3 VP</span>
              <span>10-13 B = 7 VP</span>
              <span>14-18 B = 12 VP</span>
              <span className="text-rose-300 font-bold">19-24 B = 18 VP</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[11px] text-stone-300">
              Unesite gotovinu u ruci (Bagos žetoni) na kraju igre. Pretvara se u bodove po zvaničnoj 2016 tabeli:
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5">
                <span className="font-semibold text-amber-300 flex items-center justify-between">
                  <span>Danijel Gotovina:</span>
                  <span className="text-amber-400 font-bold">{dMoneyVP} VP</span>
                </span>
                <input
                  type="number"
                  min="0"
                  value={dBagos}
                  onChange={(e) => setDBagos(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-stone-200"
                />
              </div>

              <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5">
                <span className="font-semibold text-red-300 flex items-center justify-between">
                  <span>Ceca Gotovina:</span>
                  <span className="text-red-400 font-bold">{cMoneyVP} VP</span>
                </span>
                <input
                  type="number"
                  min="0"
                  value={cBagos}
                  onChange={(e) => setCBagos(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-stone-200"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION: WINES ON BOARD (2016 ONLY vs 2010 ZERO NOTICE) */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Wine className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-stone-100">2. Preostala Vina u Podrumu</h3>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
            currentEdition === '2010'
              ? 'bg-rose-950 text-rose-300 border border-rose-800'
              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
          }`}>
            {currentEdition === '2010' ? 'U 2010: 0 VP (Nema bodova!)' : 'U 2016: floor(kvalitet / 2)'}
          </span>
        </div>

        {currentEdition === '2010' ? (
          <div className="bg-rose-950/30 border border-rose-800/60 p-3 rounded-xl text-xs text-rose-200 space-y-1.5">
            <p className="font-bold text-rose-300">
              ⚠️ ZVANIČNO PRAVILO 2010 RESERVE (Strana 20):
            </p>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              U 2010 Reserve verziji, vina koja ostanu na vašoj tabli na kraju igre <strong>NE NOSE BODOVE (0 VP)</strong>! Nakon 3. sajma, igrači su imali posebnu završnu fazu u kojoj su mogli žrtvovati (odbaciti) svoja vina da pomere burad na Magnat rešetki za dodatne akcije i multiplajere. Vina koja nisu žrtvovana propadaju bez poena.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[11px] text-stone-300">
              Svaka preostala pločica vina na tabli donosi polovinu svog kvaliteta (zaokruženo nadole):
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Danijel Wines */}
              <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-amber-300">Danijel ({dWinesVP} VP):</span>
                </div>
                <div className="flex flex-wrap gap-1 min-h-[32px]">
                  {dWines.map((q, idx) => (
                    <span 
                      key={idx}
                      onClick={() => removeDWine(idx)}
                      className="bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer hover:bg-red-900/80 border border-amber-700/50 flex items-center gap-1"
                      title="Kliknite za brisanje"
                    >
                      Kvalitet {q} (+{Math.floor(q / 2)} VP) ×
                    </span>
                  ))}
                  {dWines.length === 0 && <span className="text-[10px] text-stone-500 italic">Nema unetih vina</span>}
                </div>
                <div className="flex gap-1">
                  <input
                    type="number"
                    placeholder="Kvalitet (npr. 7)"
                    value={newDWineQuality}
                    onChange={(e) => setNewDWineQuality(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addDWine()}
                    className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-[11px] text-center"
                  />
                  <button onClick={addDWine} className="bg-amber-600 text-white px-2 rounded text-[10px] font-bold">
                    +
                  </button>
                </div>
              </div>

              {/* Ceca Wines */}
              <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-red-300">Ceca ({cWinesVP} VP):</span>
                </div>
                <div className="flex flex-wrap gap-1 min-h-[32px]">
                  {cWines.map((q, idx) => (
                    <span 
                      key={idx}
                      onClick={() => removeCWine(idx)}
                      className="bg-red-900/60 text-red-200 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer hover:bg-red-950 border border-red-700/50 flex items-center gap-1"
                      title="Kliknite za brisanje"
                    >
                      Kvalitet {q} (+{Math.floor(q / 2)} VP) ×
                    </span>
                  ))}
                  {cWines.length === 0 && <span className="text-[10px] text-stone-500 italic">Nema unetih vina</span>}
                </div>
                <div className="flex gap-1">
                  <input
                    type="number"
                    placeholder="Kvalitet (npr. 8)"
                    value={newCWineQuality}
                    onChange={(e) => setNewCWineQuality(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCWine()}
                    className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-[11px] text-center"
                  />
                  <button onClick={addCWine} className="bg-red-600 text-white px-2 rounded text-[10px] font-bold">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION: SAJAM (FAIR) */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-stone-100">3. Sajmovi Vina (Godine 3, 5, 6)</h3>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
            2P Pravilo (1. i 3. mesto)
          </span>
        </div>

        {/* Fair 1 */}
        <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-stone-200">1. Sajam (Godina 3)</span>
            <span className="text-[10px] text-amber-400">1. = 9 VP | 2. = 3 VP | Tie = 6 VP</span>
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

        {/* Fair 2 */}
        <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-stone-200">2. Sajam (Godina 5)</span>
            <span className="text-[10px] text-amber-400">1. = 12 VP | 2. = 4 VP | Tie = 8 VP</span>
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

        {/* Fair 3 */}
        <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-stone-200">3. Sajam (Godina 6)</span>
            <span className="text-[10px] text-amber-400">1. = 15 VP | 2. = 5 VP | Tie = 10 VP</span>
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

      {/* SECTION: EXPORT MAJORITIES & DIRECT VP */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <h3 className="font-bold text-sm text-stone-100">4. Izvoz (Većine u Kolonama i Polja)</h3>
          <span className="text-[10px] text-amber-400 font-bold">2-Player Ram</span>
        </div>

        {/* 5 Columns majority selectors */}
        <div className="space-y-2 text-xs">
          {[
            { label: 'Kolona 1 (14 VP)', state: col1Winner, setter: setCol1Winner },
            { label: 'Kolona 2 (12 VP)', state: col2Winner, setter: setCol2Winner },
            { label: 'Kolona 3 (10 VP)', state: col3Winner, setter: setCol3Winner },
            { label: 'Kolona 4 (8 VP)', state: col4Winner, setter: setCol4Winner },
            { label: 'Kolona 5 (6 VP)', state: col5Winner, setter: setCol5Winner },
          ].map((col, idx) => (
            <div key={idx} className="flex items-center justify-between bg-stone-950/60 p-2 rounded-xl border border-stone-800">
              <span className="font-semibold text-stone-300">{col.label}</span>
              <div className="flex gap-1">
                {(['danijel', 'ceca', 'tie', 'none'] as const).map(w => (
                  <button
                    key={w}
                    onClick={() => col.setter(w)}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      col.state === w
                        ? w === 'danijel' ? 'bg-amber-600 text-white'
                          : w === 'ceca' ? 'bg-red-600 text-white'
                          : w === 'tie' ? 'bg-purple-600 text-white'
                          : 'bg-stone-700 text-white'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {w === 'danijel' ? 'Danijel' : w === 'ceca' ? 'Ceca' : w === 'tie' ? 'Tie' : 'Niko'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Direct VP and Export Barrels Count for Tie Breaker */}
        <div className="grid grid-cols-2 gap-3 text-xs pt-1">
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800 space-y-1.5">
            <span className="font-semibold text-amber-300 block">Danijel Izvoz Detalji:</span>
            <div>
              <label className="text-[10px] text-stone-400 block">Direktni VP sa polja:</label>
              <input
                type="number"
                value={dDirectExportVP}
                onChange={(e) => setDDirectExportVP(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-center font-bold text-stone-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-400 block">Ukupno buradi u Exportu (Tie-Break):</label>
              <input
                type="number"
                value={dExportBarrels}
                onChange={(e) => setDExportBarrels(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-center font-bold text-stone-200"
              />
            </div>
          </div>

          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800 space-y-1.5">
            <span className="font-semibold text-red-300 block">Ceca Izvoz Detalji:</span>
            <div>
              <label className="text-[10px] text-stone-400 block">Direktni VP sa polja:</label>
              <input
                type="number"
                value={cDirectExportVP}
                onChange={(e) => setCDirectExportVP(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-center font-bold text-stone-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-400 block">Ukupno buradi u Exportu (Tie-Break):</label>
              <input
                type="number"
                value={cExportBarrels}
                onChange={(e) => setCExportBarrels(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-center font-bold text-stone-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: MULTIPLIERS */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-sm text-stone-100">5. Multiplajeri (Magnati)</h3>
          </div>
          <span className="text-[10px] text-stone-400">Samo sa postavljenim buretom!</span>
        </div>

        <p className="text-[11px] text-stone-300">
          Unesite zbir poena sa svih aktiviranih multiplajera (npr. Gotovina max 16 VP, Vinarije 2x, itd.):
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800 space-y-1">
            <span className="font-semibold text-amber-300 block">Danijel Multiplajeri VP:</span>
            <input
              type="number"
              value={dMultiplierVP}
              onChange={(e) => setDMultiplierVP(parseInt(e.target.value) || 0)}
              className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-center font-bold text-amber-300"
            />
          </div>

          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800 space-y-1">
            <span className="font-semibold text-red-300 block">Ceca Multiplajeri VP:</span>
            <input
              type="number"
              value={cMultiplierVP}
              onChange={(e) => setCMultiplierVP(parseInt(e.target.value) || 0)}
              className="w-full bg-stone-900 border border-stone-700 rounded p-1 text-center font-bold text-red-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
