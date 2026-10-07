import React, { useState } from 'react';
import { Wine, Sparkles, TrendingUp, HelpCircle, ShieldAlert, Check } from 'lucide-react';

export const WineCalculator: React.FC = () => {
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
      <div className="bg-gradient-to-r from-red-950/60 via-amber-950/40 to-stone-900 p-4 rounded-2xl border border-red-900/40 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-300">
            <Wine className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-100">Kalkulator za Vino</h2>
            <p className="text-xs text-stone-300">Kvalitet u berbi vs Vrednost pri prodaji / izvozu / sajmu</p>
          </div>
        </div>
        <p className="text-xs text-stone-300">
          U Vinhosu je najčešća nedoumica razlika između <strong className="text-amber-300">Kvaliteta</strong> (koji se pravi u berbi) i <strong className="text-emerald-300">Vrednosti</strong> (koja se dobija starenjem i renomeom regije).
        </p>
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
              <p className="text-[10px] text-stone-400">Max 1 farmer po vinogradu (max {vineyards})</p>
            </div>
            <div className="flex items-center gap-2">
              {[0, 1, 2].filter(n => n <= vineyards).map(num => (
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
              <span className="font-semibold text-stone-200">Vremenska prognoza (Vintage pločica)</span>
              <p className="text-[10px] text-stone-400">Broj u gornjem levom uglu (-2 do +2)</p>
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
              <p className="text-[10px] text-stone-400">Douro specijalitet po pravilima</p>
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
                Kvalitet je 0 ili manji! Nema dovoljno grožđa, ne uzima se pločica vina!
              </div>
            ) : (
              <div className="text-xs text-stone-300 mt-0.5">
                Uzmi pločicu vina iz zalihe sa ovim brojem i stavi u najlevlji slot imanja.
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
            <h3 className="font-bold text-stone-200 text-sm">Računanje Vrednosti Vina (Value)</h3>
          </div>
          <span className="text-[11px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-900/50">
            Prodaja • Izvoz • Sajam
          </span>
        </div>

        <div className="space-y-3 text-xs">
          {/* Quality Input */}
          <div className="flex items-center justify-between bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
            <div>
              <span className="font-semibold text-stone-200">Kvalitet vina sa pločice</span>
              <p className="text-[10px] text-stone-400">Broj odštampan na samoj pločici vina</p>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="1"
                max="12"
                value={wineQualityInput}
                onChange={(e) => setWineQualityInput(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 h-8 text-center bg-stone-900 border border-stone-700 rounded-lg text-amber-300 font-bold text-sm"
              />
            </div>
          </div>

          {/* Cellar aging slot */}
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-stone-200">Starenje u Podrumu (Cellar)</span>
              <span className="text-stone-400 text-[10px]">U skladištu nema ovog bonusa</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { label: 'Skladište / Novo', val: 0, text: '+0' },
                { label: 'Slot 2 (+1)', val: 1, text: '+1' },
                { label: 'Slot 3 (+3)', val: 3, text: '+3' },
                { label: 'Slot 4 (+5)', val: 5, text: '+5' },
              ].map(slot => (
                <button
                  key={slot.val}
                  onClick={() => setCellarAgingSlot(slot.val)}
                  className={`p-1.5 rounded-lg text-center transition ${
                    cellarAgingSlot === slot.val
                      ? 'bg-emerald-700 text-white font-bold border border-emerald-500 shadow-[0_0_8px_#059669]'
                      : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                  }`}
                >
                  <span className="block text-[11px] font-bold">{slot.text}</span>
                  <span className="block text-[9px] opacity-75 truncate">{slot.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Renown cubes */}
          <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80 space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-stone-200">Kockice renomea regije (Renown)</span>
                <p className="text-[10px] text-stone-400">Uklanja se 1 ili 2 kocke sa table regije</p>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map(cubes => (
                  <button
                    key={cubes}
                    onClick={() => setRenownCubesUsed(cubes)}
                    className={`w-8 h-8 rounded-lg font-bold text-xs transition ${
                      renownCubesUsed === cubes
                        ? 'bg-emerald-600 text-white shadow-[0_0_8px_#059669]'
                        : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                    }`}
                  >
                    {cubes}
                  </button>
                ))}
              </div>
            </div>

            {/* Region specific bonuses */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setIsAlentejo(!isAlentejo)}
                className={`p-2 rounded-lg text-left transition border ${
                  isAlentejo 
                    ? 'bg-amber-900/40 border-amber-500/60 text-amber-200' 
                    : 'bg-stone-900/60 border-stone-800 text-stone-400'
                }`}
              >
                <div className="font-bold text-[11px]">Vino iz Alenteja?</div>
                <div className="text-[10px] text-stone-400">Svaka kocka daje +2 umesto +1</div>
              </button>

              <button
                onClick={() => setIsAlgarve(!isAlgarve)}
                className={`p-2 rounded-lg text-left transition border ${
                  isAlgarve 
                    ? 'bg-amber-900/40 border-amber-500/60 text-amber-200' 
                    : 'bg-stone-900/60 border-stone-800 text-stone-400'
                }`}
              >
                <div className="font-bold text-[11px]">Vino iz Algarve?</div>
                <div className="text-[10px] text-stone-400">Stalni fiksni bonus +1 vrednost</div>
              </button>
            </div>
          </div>
        </div>

        {/* Value Result Banner */}
        <div className="p-3.5 rounded-xl border bg-emerald-950/40 border-emerald-600/50 flex items-center justify-between text-emerald-100">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-80">
              Konačna Vrednost Vina:
            </div>
            <div className="text-xs text-stone-300 mt-0.5">
              Ovo vino može ići na bilo koji slot čiji je zahtev ≤ {computedWineValue}.
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
