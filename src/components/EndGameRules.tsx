import React, { useState } from 'react';
import { GameEdition } from '../types';
import { Trophy, AlertTriangle, ShieldCheck, ArrowRight, Sparkles, Scale, Wine, Coins, Landmark, HelpCircle } from 'lucide-react';

interface EndGameRulesProps {
  edition?: GameEdition;
  onSelectEdition?: (edition: GameEdition) => void;
}

export const EndGameRules: React.FC<EndGameRulesProps> = ({ 
  edition = '2010',
  onSelectEdition 
}) => {
  const [currentEdition, setCurrentEdition] = useState<GameEdition>(edition);

  // Tie-breaker interactive quick resolver simulator
  const [dVP, setDVP] = useState<number>(75);
  const [dBarrels, setDBarrels] = useState<number>(4);
  const [dCash, setDCash] = useState<number>(6);
  const [dBank, setDBank] = useState<number>(14);

  const [cVP, setCVP] = useState<number>(75);
  const [cBarrels, setCBarrels] = useState<number>(4);
  const [cCash, setCCash] = useState<number>(12);
  const [cBank, setCBank] = useState<number>(9);

  const handleEditionChange = (ed: GameEdition) => {
    setCurrentEdition(ed);
    if (onSelectEdition) onSelectEdition(ed);
  };

  // Compute winner based on selected edition rules
  let winner = 'draw';
  let reason = '';

  const dTotalMoney2010 = dCash + dBank;
  const cTotalMoney2010 = cCash + cBank;

  if (dVP > cVP) {
    winner = 'Danijel (Žuti)';
    reason = `Danijel ima više pobedničkih poena (${dVP} vs ${cVP} VP)!`;
  } else if (cVP > dVP) {
    winner = 'Ceca (Crvena)';
    reason = `Ceca ima više pobedničkih poena (${cVP} vs ${dVP} VP)!`;
  } else {
    // 1st Tie-breaker: Barrels in Export (same in both editions)
    if (dBarrels > cBarrels) {
      winner = 'Danijel (Žuti)';
      reason = `Tie-break 1: Oboje imaju ${dVP} VP, ali Danijel ima VIŠE BURADI U EXPORT ZONI (${dBarrels} vs ${cBarrels} buradi)!`;
    } else if (cBarrels > dBarrels) {
      winner = 'Ceca (Crvena)';
      reason = `Tie-break 1: Oboje imaju ${dVP} VP, ali Ceca ima VIŠE BURADI U EXPORT ZONI (${cBarrels} vs ${dBarrels} buradi)!`;
    } else {
      // 2nd Tie-breaker differs by edition!
      if (currentEdition === '2010') {
        if (dTotalMoney2010 > cTotalMoney2010) {
          winner = 'Danijel (Žuti)';
          reason = `Tie-break 2 (2010 Reserve): Izjednačeni na ${dVP} VP i ${dBarrels} buradi! Po pravilu 2010 (strana 20), pobeđuje igrač sa više ukupnog novca (gotovina + banka nakon divesta): Danijel (${dTotalMoney2010} B) vs Ceca (${cTotalMoney2010} B)!`;
        } else if (cTotalMoney2010 > dTotalMoney2010) {
          winner = 'Ceca (Crvena)';
          reason = `Tie-break 2 (2010 Reserve): Izjednačeni na ${dVP} VP i ${dBarrels} buradi! Po pravilu 2010 (strana 20), pobeđuje igrač sa više ukupnog novca (gotovina + banka nakon divesta): Ceca (${cTotalMoney2010} B) vs Danijel (${dTotalMoney2010} B)!`;
        } else {
          winner = 'Apsolutno Nerešeno!';
          reason = `Čudesno izjednačenje u sve 3 kategorije (${dVP} VP, ${dBarrels} buradi, ${dTotalMoney2010} Bagosa ukupno)!`;
        }
      } else {
        if (dCash > cCash) {
          winner = 'Danijel (Žuti)';
          reason = `Tie-break 2 (2016 Vintage): Izjednačeni na ${dVP} VP i ${dBarrels} buradi! Danijel pobeđuje jer ima više gotovine (${dCash} vs ${cCash} Bagosa)!`;
        } else if (cCash > dCash) {
          winner = 'Ceca (Crvena)';
          reason = `Tie-break 2 (2016 Vintage): Izjednačeni na ${dVP} VP i ${dBarrels} buradi! Ceca pobeđuje jer ima više gotovine (${cCash} vs ${dCash} Bagosa)!`;
        } else {
          winner = 'Apsolutno Nerešeno!';
          reason = `Čudesno izjednačenje u svim kategorijama!`;
        }
      }
    }
  }

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Header & Edition Selector */}
      <div className={`p-4 rounded-2xl border shadow-lg space-y-3 ${
        currentEdition === '2010'
          ? 'bg-gradient-to-r from-rose-950 via-stone-900 to-rose-950/80 border-rose-800/60'
          : 'bg-gradient-to-r from-amber-950/70 via-stone-900 to-red-950/70 border-amber-800/40'
      }`}>
        <div className="flex items-center gap-2.5">
          <Trophy className={`w-5 h-5 ${currentEdition === '2010' ? 'text-rose-400' : 'text-amber-400'}`} />
          <div>
            <h2 className="text-base font-bold text-stone-100 font-display">
              Kraj Igre & Tie-Breaker Pravila
            </h2>
            <p className="text-xs text-stone-300">
              Poređenje pravila završetka partije za 2010 Reserve i 2016 Vintage
            </p>
          </div>
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
              Magnat potezi
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
              1 bonus akcija
            </span>
          </button>
        </div>
      </div>

      {/* SECTION 1: END GAME TRIGGER BY EDITION */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-red-500/20 text-red-300 flex items-center justify-center text-xs font-bold border border-red-500/30">
              🎯
            </span>
            <h3 className="font-bold text-sm text-stone-100">
              Tačan Trigger za Kraj Igre ({currentEdition === '2010' ? '2010 Reserve' : '2016 Vintage'})
            </h3>
          </div>
          <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded font-bold border border-amber-900">
            Kraj 6. godine
          </span>
        </div>

        {currentEdition === '2010' ? (
          <div className="space-y-2 text-xs text-stone-300 leading-relaxed">
            <p>
              Igra traje ukupno <strong className="text-rose-300">6 godina (rundi)</strong>. Na kraju 6. godine održava se <strong className="text-amber-200">3. Sajam vina</strong>.
            </p>
            <div className="bg-stone-950/70 p-3 rounded-xl border border-stone-800 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0 mt-0.5">1.</span>
                <span>
                  <strong>ZAVRŠNA MAGNAT FAZA (str. 20):</strong> Odmah nakon 3. sajma, počevši od prvog igrača, svaki igrač redom može <strong className="text-rose-300">odbaciti (žrtvovati) 1 vino</strong> sa svoje table da pomeri 1 bure na Magnat rešetki u tom redu na polje Dodatne Akcije ili Multiplajera!
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0 mt-0.5">2.</span>
                <span>
                  Ovo se nastavlja u krug sve dok svi igrači ne odustanu (pasiraju). Smeju se koristiti sposobnosti preostalih otkrivenih vinskih stručnjaka.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0 mt-0.5">3.</span>
                <span>
                  <strong className="text-rose-400">NEMA AKCIJE NA QUADRELU:</strong> Za razliku od 2016, u 2010 nema standardnog pomeranja po Quadrelu nakon sajma!
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0 mt-0.5">4.</span>
                <span>
                  <strong className="text-red-400">VINA VREDE 0 VP:</strong> Preostala vina koja nisu iskorišćena za magnat kretanje ne donose nijedan bod!
                </span>
              </div>
            </div>

            <div className="bg-rose-950/40 border border-rose-800/60 p-2.5 rounded-xl text-rose-200 flex items-start gap-2 text-[11px]">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong>Pločice vinskih stručnjaka:</strong> Pločice stručnjaka se <strong>NE okreću</strong> ponovo nagore nakon 3. sajma! U završnoj fazi dostupni su samo stručnjaci koji su već ostali licem nagore.
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-xs text-stone-300 leading-relaxed">
            <p>
              Igra traje ukupno <strong className="text-amber-300">6 godina (rundi)</strong>. Na kraju 6. godine održava se <strong className="text-amber-200">3. Sajam vina</strong>.
            </p>
            <div className="bg-stone-950/70 p-3 rounded-xl border border-stone-800 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0 mt-0.5">1.</span>
                <span>Nakon 3. sajma, marker godine se pomera na krug desno od ikone sajma.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0 mt-0.5">2.</span>
                <span>
                  <strong className="text-emerald-400 uppercase">POSLEDNJA QUADREL AKCIJA:</strong> Počevši od trenutnog prvog igrača, <strong className="text-white">svaki igrač odigrava još TAČNO JEDNU DODATNU AKCIJU</strong> na Quadrelu prema redovnim pravilima kretanja!
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0 mt-0.5">3.</span>
                <span>Nakon te 1 akcije igra se odmah završava i prelazi se na finalno bodovanje.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0 mt-0.5">4.</span>
                <span>
                  <strong className="text-amber-300">VINA NOSE VP:</strong> Svako preostalo vino na tabli vredi floor(kvalitet / 2) VP!
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: TIE-BREAKER HIERARCHY */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-stone-100">Zvanični Tie-Breaker ({currentEdition === '2010' ? '2010' : '2016'})</h3>
          </div>
          <span className="text-[10px] text-stone-400 font-mono">
            {currentEdition === '2010' ? 'Ref: Str. 20' : 'Ref: Str. 16'}
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          {/* Step 1 */}
          <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center border border-amber-500/40 text-xs">
                1
              </div>
              <div>
                <span className="font-bold text-stone-200">Ukupni Pobednički Poeni (VP)</span>
                <p className="text-[10px] text-stone-400">Igrač sa najvećim ukupnim zbirom bodova</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-400">Glavni cilj</span>
          </div>

          {/* Step 2 */}
          <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-600/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-xs">
                2
              </div>
              <div>
                <span className="font-bold text-amber-200">1. TIE-BREAK: Broj Buradi u EXPORT ZONI!</span>
                <p className="text-[10px] text-stone-300">Isto u obe verzije: ko ima više svojih buradi plasiranih u izvozu</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-300">1. Tie-break</span>
          </div>

          {/* Step 3 - DIFFERENT BY EDITION */}
          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            currentEdition === '2010'
              ? 'bg-rose-950/30 border-rose-600/40'
              : 'bg-stone-950/60 border-stone-800'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-stone-700 text-stone-200 font-bold flex items-center justify-center text-xs">
                3
              </div>
              <div>
                <span className={`font-bold ${currentEdition === '2010' ? 'text-rose-200' : 'text-stone-200'}`}>
                  2. TIE-BREAK: {currentEdition === '2010' ? 'UKUPNO NOVCA (Gotovina + Banka nakon divesta)!' : 'Preostala gotovina (Bagos u ruci)'}
                </span>
                <p className="text-[10px] text-stone-400">
                  {currentEdition === '2010' 
                    ? 'Pravilo str. 20: "more money (cash + bank) after divesting"' 
                    : 'Igrač sa više gotovinskih novčića u ruci'}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-stone-300">2. Tie-break</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: INTERACTIVE TIE-BREAKER SIMULATOR */}
      <div className="bg-gradient-to-br from-stone-900 to-amber-950/30 rounded-2xl p-4 border border-amber-500/30 shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-amber-100">Simulator Tie-Breakera za Duel</h3>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
            Simulacija za {currentEdition === '2010' ? '2010' : '2016'}
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Danijel */}
          <div className="bg-stone-950/80 p-3 rounded-xl border border-amber-500/40 space-y-2">
            <span className="font-bold text-amber-300 flex items-center gap-1.5 pb-1 border-b border-stone-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-[0_0_6px_#f59e0b]" />
              Danijel (Žuti)
            </span>

            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5">Ukupno VP:</label>
              <input
                type="number"
                value={dVP}
                onChange={(e) => setDVP(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-amber-300 text-sm"
              />
            </div>

            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5 flex items-center gap-1">
                <Wine className="w-3 h-3 text-stone-400" /> Burad u Exportu:
              </label>
              <input
                type="number"
                value={dBarrels}
                onChange={(e) => setDBarrels(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-stone-200 text-sm"
              />
            </div>

            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5 flex items-center gap-1">
                <Coins className="w-3 h-3 text-amber-400" /> Gotovina (Keš):
              </label>
              <input
                type="number"
                value={dCash}
                onChange={(e) => setDCash(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-stone-200 text-sm"
              />
            </div>

            {currentEdition === '2010' && (
              <div>
                <label className="text-[10px] text-rose-300 block mb-0.5 flex items-center gap-1">
                  <Landmark className="w-3 h-3 text-rose-400" /> Banka nakon divesta:
                </label>
                <input
                  type="number"
                  value={dBank}
                  onChange={(e) => setDBank(parseInt(e.target.value) || 0)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-rose-300 text-sm"
                />
              </div>
            )}
          </div>

          {/* Ceca */}
          <div className="bg-stone-950/80 p-3 rounded-xl border border-red-500/40 space-y-2">
            <span className="font-bold text-red-300 flex items-center gap-1.5 pb-1 border-b border-stone-800">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shadow-[0_0_6px_#ef4444]" />
              Ceca (Crvena)
            </span>

            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5">Ukupno VP:</label>
              <input
                type="number"
                value={cVP}
                onChange={(e) => setCVP(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-red-300 text-sm"
              />
            </div>

            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5 flex items-center gap-1">
                <Wine className="w-3 h-3 text-stone-400" /> Burad u Exportu:
              </label>
              <input
                type="number"
                value={cBarrels}
                onChange={(e) => setCBarrels(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-stone-200 text-sm"
              />
            </div>

            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5 flex items-center gap-1">
                <Coins className="w-3 h-3 text-amber-400" /> Gotovina (Keš):
              </label>
              <input
                type="number"
                value={cCash}
                onChange={(e) => setCCash(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-stone-200 text-sm"
              />
            </div>

            {currentEdition === '2010' && (
              <div>
                <label className="text-[10px] text-rose-300 block mb-0.5 flex items-center gap-1">
                  <Landmark className="w-3 h-3 text-rose-400" /> Banka nakon divesta:
                </label>
                <input
                  type="number"
                  value={cBank}
                  onChange={(e) => setCBank(parseInt(e.target.value) || 0)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-rose-300 text-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Verdict Box */}
        <div className="p-3.5 rounded-xl border bg-gradient-to-r from-stone-950 to-stone-900 border-amber-500/50 text-center space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
            Zvanični Pobednik ({currentEdition === '2010' ? '2010 Pravila' : '2016 Pravila'}):
          </span>
          <div className="text-xl font-black font-display text-amber-200">
            {winner}
          </div>
          <p className="text-xs text-stone-300 leading-relaxed pt-1">
            {reason}
          </p>
        </div>
      </div>
    </div>
  );
};
