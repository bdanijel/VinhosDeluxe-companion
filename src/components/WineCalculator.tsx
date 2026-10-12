import React, { useState } from 'react';
import { Wine, Sparkles, TrendingUp, HelpCircle, ShieldAlert, Check, Scale } from 'lucide-react';
import { GameEdition } from '../types';

interface WineCalculatorProps {
  edition?: GameEdition;
  onSelectEdition?: (edition: GameEdition) => void;
}

export const WineCalculator: React.FC<WineCalculatorProps> = ({ 
  edition = '2010',
  onSelectEdition
}) => {
  const currentEdition = edition;

  const handleEditionChange = (ed: GameEdition) => {
    if (onSelectEdition) onSelectEdition(ed);
  };

  // Quality calculator state
  const [vineyards, setVineyards] = useState<number>(1);
  const [farmers, setFarmers] = useState<number>(0);
  const [wineries, setWineries] = useState<number>(0);
  const [enologists, setEnologists] = useState<number>(0);
  const [isPorto, setIsPorto] = useState<boolean>(false);
  const [weatherBonus, setWeatherBonus] = useState<number>(0);

  // Value calculator state (selling, export, fair)
  const [wineQualityInput, setWineQualityInput] = useState<number>(5);
  const [cellarAgingSlot, setCellarAgingSlot] = useState<number>(0); // 0 = warehouse/none, 1, 3, or 5
  const [renownCubesUsed, setRenownCubesUsed] = useState<number>(0); // 0, 1, 2
  const [isAlentejo, setIsAlentejo] = useState<boolean>(false); // +2 per cube
  const [isAlgarve, setIsAlgarve] = useState<boolean>(false); // +1 flat bonus

  // Computed Quality
  // +2 per vineyard, +1 per farmer, +1 per winery, +2 per enologist, +3 porto, +/- weather
  const computedQualityRaw = 
    (vineyards * 2) +
    (farmers * 1) +
    (wineries * 1) +
    (enologists * 2) +
    (isPorto ? 3 : 0) +
    weatherBonus;

  const finalProducedQuality = computedQualityRaw > 0 ? computedQualityRaw : 0;
  const isZeroQuality = computedQualityRaw <= 0;

  // Computed Value
  // Quality + cellarAgingSlot + renownCubes * (isAlentejo ? 2 : 1) + (isAlgarve ? 1 : 0)
  const renownPoints = renownCubesUsed * (isAlentejo ? 2 : 1);
  const computedWineValue = wineQualityInput + cellarAgingSlot + renownPoints + (isAlgarve ? 1 : 0);

  return (
    <div className="space-y-5 pb-20 animate-fadeIn">
      {/* Title Card */}
      <div className={`p-4 rounded-2xl border shadow-lg space-y-2.5 ${
        currentEdition === '2010'
          ? 'bg-gradient-to-r from-rose-950 via-stone-900 to-rose-950/80 border-rose-800/60'
          : 'bg-gradient-to-r from-red-950/60 via-amber-950/40 to-stone-900 border-red-900/40'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              currentEdition === '2010'
                ? 'bg-rose-600/30 border-rose-500/40 text-rose-300'
                : 'bg-red-600/20 border-red-500/30 text-red-300'
            }`}>
              <Wine className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-100 font-display">Kalkulator za Vino</h2>
              <p className="text-xs text-stone-300">Kvalitet u berbi vs Vrednost pri prodaji / izvozu / sajmu</p>
            </div>
          </div>
        </div>

        {/* Edition Pill Selector */}
        <div className="grid grid-cols-2 gap-2 bg-stone-950/80 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => handleEditionChange('2010')}
            className={`py-1 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              currentEdition === '2010'
                ? 'bg-rose-700 text-white shadow-[0_0_8px_#be123c]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>2010 Reserve</span>
          </button>
          <button
            onClick={() => handleEditionChange('2016')}
            className={`py-1 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              currentEdition === '2016'
                ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>2016 Vintage</span>
          </button>
        </div>

        {/* 2010 Farmer Notice */}
        {currentEdition === '2010' && (
          <div className="bg-rose-950/40 border border-rose-800/60 p-2 rounded-xl text-[11px] text-rose-200 flex items-start gap-2">
            <Scale className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-300">2010 pravilo za radnike:</strong> Farmeri se <strong>ne mogu unajmljivati</strong> na Quadrelu (jedini farmer u igri dolazi iz Ribatejo imanja). Enolozi zahtevaju godišnju platu od 1 Bago sa bankovnog računa!
            </div>
          </div>
        )}
      </div>

      {/* SECTION 1: QUALITY CALCULATOR */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold border border-amber-500/30">
              1
            </span>
            <h3 className="font-bold text-stone-200 text-sm">Računanje Kvaliteta (Berba)</h3>
          </div>
          <span className="text-[11px] text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-900/50">
            Faza Proizvodnje
          </span>
        </div>

        {/* Sliders and Selectors */}
        <div className="space-y-3 text-xs">
          {/* Vineyards */}
          <div className="flex items-center justify-between bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <div>
              <span className="font-semibold text-stone-200">Vinogradi na imanju (+2 svaki)</span>
              <p className="text-[10px] text-stone-400">Maksimalno 2 po imanju</p>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2].map(num => (
                <button
                  key={num}
                  onClick={() => setVineyards(num)}
                  className={`w-8 h-8 rounded-lg font-bold transition ${
                    vineyards === num 
                      ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]' 
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Wineries */}
          <div className="flex items-center justify-between bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <div>
              <span className="font-semibold text-stone-200">Vinarije na imanju (+1 svaka)</span>
              <p className="text-[10px] text-stone-400">Maksimalno 2 po imanju</p>
            </div>
            <div className="flex items-center gap-2">
              {[0, 1, 2].map(num => (
                <button
                  key={num}
                  onClick={() => setWineries(num)}
                  className={`w-8 h-8 rounded-lg font-bold transition ${
                    wineries === num 
                      ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]' 
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Farmers */}
          <div className="flex items-center justify-between bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <div>
              <span className="font-semibold text-stone-200">Farmeri na vinogradima (+1 svaki)</span>
              <p className="text-[10px] text-stone-400">
                {currentEdition === '2010' 
                  ? 'U 2010 samo iz Ribateja (max 1)' 
                  : `Max 1 farmer po vinogradu (max ${vineyards})`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {[0, 1, ...(currentEdition === '2010' ? [] : [2])].filter(n => n <= vineyards).map(num => (
                <button
                  key={num}
                  onClick={() => setFarmers(num)}
                  className={`w-8 h-8 rounded-lg font-bold transition ${
                    farmers === num 
                      ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]' 
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Enologists */}
          <div className="flex items-center justify-between bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <div>
              <span className="font-semibold text-stone-200">Enolozi u vinarijama (+2 svaki)</span>
              <p className="text-[10px] text-stone-400">Max 1 enolog po vinariji (max {wineries})</p>
            </div>
            <div className="flex items-center gap-2">
              {[0, 1, 2].filter(n => n <= wineries).map(num => (
                <button
                  key={num}
                  onClick={() => setEnologists(num)}
                  className={`w-8 h-8 rounded-lg font-bold transition ${
                    enologists === num 
                      ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]' 
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Weather condition */}
          <div className="flex items-center justify-between bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <div>
              <span className="font-semibold text-stone-200">Vremenska prognoza (Vintage)</span>
              <p className="text-[10px] text-stone-400">Modifikator berbe (-2 do +2)</p>
            </div>
            <div className="flex items-center gap-1">
              {[-2, -1, 0, 1, 2].map(bonus => (
                <button
                  key={bonus}
                  onClick={() => setWeatherBonus(bonus)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                    weatherBonus === bonus 
                      ? bonus < 0 ? 'bg-red-700 text-white' : bonus > 0 ? 'bg-emerald-700 text-white' : 'bg-stone-600 text-white'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {bonus > 0 ? `+${bonus}` : bonus}
                </button>
              ))}
            </div>
          </div>

          {/* Douro Porto wine bonus */}
          <div className="flex items-center justify-between bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <div>
              <span className="font-semibold text-stone-200">Porto vino u Douro regiji? (+3)</span>
              <p className="text-[10px] text-stone-400">Trošenje Porto pločice pri proizvodnji</p>
            </div>
            <button
              onClick={() => setIsPorto(!isPorto)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                isPorto 
                  ? 'bg-purple-700 text-white shadow-[0_0_8px_#9333ea]' 
                  : 'bg-stone-800 text-stone-400'
              }`}
            >
              {isPorto ? 'DA (+3)' : 'NE'}
            </button>
          </div>
        </div>

        {/* Quality Result Banner */}
        <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
          isZeroQuality 
            ? 'bg-red-950/40 border-red-800/50 text-red-200' 
            : 'bg-amber-950/40 border-amber-600/40 text-amber-100'
        }`}>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-75">
              Proizvedeno vino:
            </div>
            {isZeroQuality ? (
              <div className="text-xs font-bold text-red-400 flex items-center gap-1 mt-0.5">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                Kvalitet je 0 ili manji! Nema grožđa, ne uzima se vino!
              </div>
            ) : (
              <div className="text-xs text-stone-300 mt-0.5">
                Uzmi pločicu vina sa ovim kvalitetom i stavi u najlevlji slot.
              </div>
            )}
          </div>
          <div className="text-center pl-3">
            <span className="text-[10px] block opacity-70">Kvalitet</span>
            <span className={`text-2xl font-black font-display ${isZeroQuality ? 'text-red-400' : 'text-amber-400'}`}>
              {finalProducedQuality}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: VALUE CALCULATOR (Selling, Exporting, Fair) */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold border border-emerald-500/30">
              2
            </span>
            <h3 className="font-bold text-stone-200 text-sm">Računanje Vrednosti Vina (Wine Value)</h3>
          </div>
          <span className="text-[11px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-900/50">
            Prodaja • Izvoz • Sajam
          </span>
        </div>

        <div className="space-y-3 text-xs">
          {/* Base Quality on Tile */}
          <div className="flex items-center justify-between bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <div>
              <span className="font-semibold text-stone-200">Kvalitet sa pločice vina</span>
              <p className="text-[10px] text-stone-400">Broj odštampan na samoj pločici</p>
            </div>
            <input
              type="number"
              min="1"
              max="12"
              value={wineQualityInput}
              onChange={(e) => setWineQualityInput(parseInt(e.target.value) || 0)}
              className="w-16 bg-stone-900 border border-stone-700 rounded-lg p-1 text-center font-bold text-amber-300 text-sm"
            />
          </div>

          {/* Cellar Aging Slot */}
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-stone-200">Godine starenja u Podrumu:</span>
              <span className="text-[10px] text-stone-400">
                {currentEdition === '2010' ? 'Podrum košta 2B' : 'Podrum košta 3B'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1 text-center">
              {[
                { label: 'Slot 1 (+0)', val: 0 },
                { label: 'Slot 2 (+1)', val: 1 },
                { label: 'Slot 3 (+3)', val: 3 },
                { label: 'Slot 4 (+5)', val: 5 },
              ].map(slot => (
                <button
                  key={slot.val}
                  onClick={() => setCellarAgingSlot(slot.val)}
                  className={`py-1.5 rounded-lg font-bold text-[10px] transition ${
                    cellarAgingSlot === slot.val 
                      ? 'bg-emerald-600 text-white shadow-[0_0_8px_#059669]' 
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Renown Cubes Used */}
          <div className="flex items-center justify-between bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <div>
              <span className="font-semibold text-stone-200">Iskorišćene Kocke Renomea (max 2)</span>
              <p className="text-[10px] text-stone-400">Skidaju se sa table regije ako su potrebne</p>
            </div>
            <div className="flex gap-1">
              {[0, 1, 2].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => setRenownCubesUsed(cnt)}
                  className={`w-8 h-8 rounded-lg font-bold transition ${
                    renownCubesUsed === cnt 
                      ? 'bg-emerald-600 text-white shadow-[0_0_8px_#059669]' 
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>

          {/* Alentejo / Algarve Special toggles */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsAlentejo(!isAlentejo)}
              className={`p-2 rounded-xl border text-[11px] font-semibold text-left transition ${
                isAlentejo 
                  ? 'bg-amber-950/60 border-amber-500 text-amber-200' 
                  : 'bg-stone-950/40 border-stone-800 text-stone-400'
              }`}
            >
              <div className="font-bold flex items-center gap-1">
                {isAlentejo ? '✓' : '○'} Alentejo (Regija 8)
              </div>
              <span className="text-[9px] opacity-75">+2 po kocki renomea (umesto +1)</span>
            </button>

            <button
              onClick={() => setIsAlgarve(!isAlgarve)}
              className={`p-2 rounded-xl border text-[11px] font-semibold text-left transition ${
                isAlgarve 
                  ? 'bg-amber-950/60 border-amber-500 text-amber-200' 
                  : 'bg-stone-950/40 border-stone-800 text-stone-400'
              }`}
            >
              <div className="font-bold flex items-center gap-1">
                {isAlgarve ? '✓' : '○'} Algarve (Regija 9)
              </div>
              <span className="text-[9px] opacity-75">+1 trajni bonus na Vrednost</span>
            </button>
          </div>
        </div>

        {/* Final Value Result Banner */}
        <div className="bg-emerald-950/40 border border-emerald-600/40 p-3.5 rounded-xl flex items-center justify-between text-emerald-100">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-75">
              Konačna Vrednost Vina (Wine Value):
            </div>
            <div className="text-xs text-stone-300 mt-0.5">
              Ovaj broj mora dostići ili preći traženu vrednost slota za Prodaju, Izvoz ili Sajam!
            </div>
          </div>
          <div className="text-center pl-3">
            <span className="text-[10px] block opacity-70">Vrednost</span>
            <span className="text-3xl font-black font-display text-emerald-400">
              {computedWineValue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
