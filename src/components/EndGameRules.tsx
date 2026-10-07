import React, { useState } from 'react';
import { Trophy, AlertTriangle, ShieldCheck, ArrowRight, Sparkles, Scale, Wine, Coins } from 'lucide-react';

export const EndGameRules: React.FC = () => {
  // Tie-breaker interactive quick resolver simulator
  const [dVP, setDVP] = useState<number>(75);
  const [dBarrels, setDBarrels] = useState<number>(4);
  const [dMoney, setDMoney] = useState<number>(12);

  const [cVP, setCVP] = useState<number>(75);
  const [cBarrels, setCBarrels] = useState<number>(5);
  const [cMoney, setCMoney] = useState<number>(9);

  // Compute winner
  let winner = 'draw';
  let reason = '';

  if (dVP > cVP) {
    winner = 'Danijel (Žuti)';
    reason = `Danijel ima više pobedničkih poena (${dVP} vs ${cVP} VP)!`;
  } else if (cVP > dVP) {
    winner = 'Ceca (Crvena)';
    reason = `Ceca ima više pobedničkih poena (${cVP} vs ${dVP} VP)!`;
  } else {
    // 1st Tie-breaker: Barrels in Export
    if (dBarrels > cBarrels) {
      winner = 'Danijel (Žuti)';
      reason = `Tie-break 1: Oboje imaju ${dVP} VP, ali Danijel ima VIŠE BURADI U EXPORT ZONI (${dBarrels} vs ${cBarrels} buradi)!`;
    } else if (cBarrels > dBarrels) {
      winner = 'Ceca (Crvena)';
      reason = `Tie-break 1: Oboje imaju ${dVP} VP, ali Ceca ima VIŠE BURADI U EXPORT ZONI (${cBarrels} vs ${dBarrels} buradi)!`;
    } else {
      // 2nd Tie-breaker: Money
      if (dMoney > cMoney) {
        winner = 'Danijel (Žuti)';
        reason = `Tie-break 2: Oboje imaju ${dVP} VP i po ${dBarrels} buradi u Exportu, ali Danijel ima VIŠE NOVCA (${dMoney} vs ${cMoney} Bagosa)!`;
      } else if (cMoney > dMoney) {
        winner = 'Ceca (Crvena)';
        reason = `Tie-break 2: Oboje imaju ${dVP} VP i po ${cBarrels} buradi u Exportu, ali Ceca ima VIŠE NOVCA (${cMoney} vs ${dMoney} Bagosa)!`;
      } else {
        winner = 'Apsolutno Nerešeno!';
        reason = `Čudesno izjednačenje u sve 3 kategorije (${dVP} VP, ${dBarrels} buradi u exportu, ${dMoney} Bagosa)! Pobednici dele slavu i otvaraju flašu pravog portugalskog vina!`;
      }
    }
  }

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950/70 via-stone-900 to-red-950/70 p-4 rounded-2xl border border-amber-800/40 shadow-lg">
        <div className="flex items-center gap-2.5 mb-1.5">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-amber-100">Kraj Igre & Tie-Breaker Pravila</h2>
        </div>
        <p className="text-xs text-stone-300">
          Zvanična pravila Vital Lacerde za trigger završetka i rešavanje nerešenog rezultata u Vinhos Deluxe.
        </p>
      </div>

      {/* SECTION 1: END GAME TRIGGER */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
          <span className="w-6 h-6 rounded-lg bg-red-500/20 text-red-300 flex items-center justify-center text-xs font-bold border border-red-500/30">
            🎯
          </span>
          <h3 className="font-bold text-sm text-stone-100">Tačan Trigger za Kraj Igre</h3>
        </div>

        <div className="space-y-2 text-xs text-stone-300 leading-relaxed">
          <p>
            Igra traje ukupno <strong className="text-amber-300">6 godina (rundi)</strong>.
          </p>
          <div className="bg-stone-950/70 p-3 rounded-xl border border-stone-800 space-y-1.5">
            <div className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">1.</span>
              <span>Na kraju 6. godine održava se <strong className="text-amber-200">3. Sajam vina (Wine Tasting Fair)</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">2.</span>
              <span>Čim se sajam završi, marker godine se pomera na <strong className="text-amber-200">krug desno od ikone sajma</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">3.</span>
              <span>
                <strong className="text-emerald-400 uppercase">POSLEDNJA AKCIJA:</strong> Počevši od trenutnog prvog igrača, <strong className="text-white">svaki igrač odigrava još TAČNO JEDNU DODATNU AKCIJU</strong> na Quadrelu!
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">4.</span>
              <span>Nakon te 1 dodatne akcije, igra se <strong className="text-red-400">ODMAH ZAVRŠAVA</strong> i prelazi se na finalno bodovanje!</span>
            </div>
          </div>

          {/* Critical Warning */}
          <div className="bg-amber-950/40 border border-amber-800/60 p-2.5 rounded-xl text-amber-200 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300">VAŽNA NAPOMENA ZA POSLEDNJU AKCIJU:</strong>
              <br />
              Pločice vinskih stručnjaka i magnata se <span className="underline font-bold">NE okreću</span> ponovo licem nagore nakon 3. sajma! U toj poslednjoj akciji možete iskoristiti samo one koji su vam već ostali okrenuti licem nagore.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: TIE-BREAKER HIERARCHY */}
      <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
          <Scale className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm text-stone-100">Zvanični Tie-Breaker (Redosled Rešavanja)</h3>
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
                <p className="text-[10px] text-stone-400">Igrač sa najvećim ukupnim zbirom VP</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-400">Primarni kriterijum</span>
          </div>

          {/* Step 2 */}
          <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-600/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-xs">
                2
              </div>
              <div>
                <span className="font-bold text-amber-200">1. TIE-BREAK: Broj Buradi u EXPORT ZONI!</span>
                <p className="text-[10px] text-stone-300">Ko ima više svojih buradi plasiranih u izvozu</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-300">1. Tie-break</span>
          </div>

          {/* Step 3 */}
          <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-stone-700 text-stone-200 font-bold flex items-center justify-center text-xs">
                3
              </div>
              <div>
                <span className="font-bold text-stone-200">2. TIE-BREAK: Preostali Novac (Bagos)</span>
                <p className="text-[10px] text-stone-400">Ako je i dalje nerešeno, pobeđuje igrač sa više novca</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-stone-300">2. Tie-break</span>
          </div>
        </div>

        {/* Other in-game ties */}
        <div className="bg-stone-950/50 p-2.5 rounded-xl border border-stone-800 text-[11px] text-stone-400 space-y-1">
          <strong className="text-stone-300 block">Ostala izjednačenja u igri:</strong>
          <div>• <strong>Sajam (Fair Points):</strong> Sabiraju se poeni odgovarajućih mesta i dele na pola (zaokruženo nadole).</div>
          <div>• <strong>Izvozne kolone (Export majorities):</strong> Bodovi sa vrha kolone se dele na pola (zaokruženo nadole).</div>
        </div>
      </div>

      {/* SECTION 3: INTERACTIVE TIE-BREAKER SIMULATOR */}
      <div className="bg-gradient-to-br from-stone-900 to-amber-950/30 rounded-2xl p-4 border border-amber-500/30 shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-amber-100">Simulator Duel Tie-Breakera</h3>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
            Uživo provera
          </span>
        </div>

        <p className="text-xs text-stone-300">
          Unesite trenutne ili završne podatke za Danijela i Cecu da biste odmah videli ko odnosi pobedu po zvaničnim pravilima:
        </p>

        {/* Comparison Inputs */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Danijel (Yellow) */}
          <div className="bg-stone-950/80 p-3 rounded-xl border border-amber-500/40 space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-stone-800">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-[0_0_6px_#f59e0b]" />
                Danijel (Žuti)
              </span>
            </div>

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
                <Coins className="w-3 h-3 text-amber-400" /> Preostali Bagos:
              </label>
              <input
                type="number"
                value={dMoney}
                onChange={(e) => setDMoney(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-stone-200 text-sm"
              />
            </div>
          </div>

          {/* Ceca (Red) */}
          <div className="bg-stone-950/80 p-3 rounded-xl border border-red-500/40 space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-stone-800">
              <span className="font-bold text-red-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shadow-[0_0_6px_#ef4444]" />
                Ceca (Crvena)
              </span>
            </div>

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
                <Coins className="w-3 h-3 text-amber-400" /> Preostali Bagos:
              </label>
              <input
                type="number"
                value={cMoney}
                onChange={(e) => setCMoney(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg p-1.5 text-center font-bold text-stone-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="p-3.5 rounded-xl border bg-gradient-to-r from-stone-950 to-stone-900 border-amber-500/50 text-center space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
            Zvanični Pobednik:
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
