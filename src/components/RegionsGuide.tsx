import React, { useState } from 'react';
import { REGIONS_DATA, MAGNATE_ACTIONS_2016, WINE_EXPERTS_ABILITIES, RegionInfo } from '../data/regionsData';
import { 
  MapPin, 
  Wine, 
  Sparkles, 
  Award, 
  AlertCircle, 
  ShieldAlert, 
  Building, 
  Users, 
  Store, 
  TrendingUp,
  Info
} from 'lucide-react';

export const RegionsGuide: React.FC = () => {
  const [selectedRegionNum, setSelectedRegionNum] = useState<number>(3); // Default Douro
  const [activeTab, setActiveTab] = useState<'regions' | 'magnates' | 'experts'>('regions');

  const selectedRegion = REGIONS_DATA.find(r => r.number === selectedRegionNum) || REGIONS_DATA[0];

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Sub-navigation tabs */}
      <div className="grid grid-cols-3 gap-1.5 bg-stone-900/90 p-1.5 rounded-2xl border border-stone-800 shadow-md">
        <button
          onClick={() => setActiveTab('regions')}
          className={`py-2 px-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
            activeTab === 'regions'
              ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>9 Regija</span>
        </button>

        <button
          onClick={() => setActiveTab('magnates')}
          className={`py-2 px-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
            activeTab === 'magnates'
              ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Magnati</span>
        </button>

        <button
          onClick={() => setActiveTab('experts')}
          className={`py-2 px-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
            activeTab === 'experts'
              ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stručnjaci</span>
        </button>
      </div>

      {/* TAB 1: REGIONS */}
      {activeTab === 'regions' && (
        <div className="space-y-3.5">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 p-3.5 rounded-2xl border border-amber-900/40 shadow-lg">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-amber-200 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Karakteristike 9 Regija Portugala
              </h2>
              <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-900/60 font-semibold">
                Ref. Knjiga str. 12
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Svaka regija ima jedinstvenu specijalnu moć i specifičan početni bonus za prvo imanje.
            </p>
            <div className="text-[10px] text-amber-300 bg-amber-950/50 p-1.5 rounded-lg border border-amber-800/40 mt-2">
              ⭐ <strong>Pravilo za 2 igrača (Danijel & Ceca):</strong> Igra se sa 7 regija. Zvanična preporuka pravila je da se iz igre <strong>uklone Setúbal (7) i Algarve (9)</strong>!
            </div>
          </div>

          {/* Region Number Horizontal Selector */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
            {REGIONS_DATA.map((reg) => (
              <button
                key={reg.number}
                onClick={() => setSelectedRegionNum(reg.number)}
                className={`flex-shrink-0 px-2.5 py-2 rounded-xl text-center transition flex flex-col items-center justify-center min-w-[70px] border ${
                  selectedRegionNum === reg.number
                    ? 'bg-amber-600 text-white font-bold border-amber-400 shadow-[0_0_10px_#f59e0b]'
                    : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
                }`}
              >
                <span className="text-[10px] opacity-75">Regija {reg.number}</span>
                <span className="text-xs font-bold truncate max-w-[65px]">{reg.name}</span>
              </button>
            ))}
          </div>

          {/* Detailed Selected Region Card */}
          {selectedRegion && (
            <div className="bg-stone-900/95 p-4 rounded-3xl border-2 border-amber-500/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Regija #{selectedRegion.number}
                  </span>
                  <h3 className="text-lg font-black font-display text-white">
                    {selectedRegion.name}
                  </h3>
                </div>
                {selectedRegion.hasCellarRestriction && (
                  <span className="text-[10px] bg-red-950 text-red-300 font-bold px-2 py-1 rounded-lg border border-red-800 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    Zabranjen Podrum
                  </span>
                )}
              </div>

              {/* Special Ability Banner */}
              <div className="bg-gradient-to-r from-amber-950/60 to-stone-950 p-3 rounded-2xl border border-amber-500/50 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Specijalna moć regije:
                </span>
                <p className="text-xs font-semibold text-amber-100 leading-relaxed">
                  {selectedRegion.specialAbility}
                </p>
              </div>

              {/* Initial Vineyard Setup Bonus */}
              <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Ako je izaberete kao početno imanje pre 1. godine:
                </span>
                <div className="text-stone-200 font-medium">
                  • <strong>Početno vino:</strong> Vrednost {selectedRegion.initialWineValue}
                </div>
                <div className="text-stone-300">
                  • <strong>Početni bonus:</strong> {selectedRegion.initialVineyardBonus}
                </div>
              </div>

              {/* Flavor text & Lore */}
              <p className="text-[11px] text-stone-400 italic bg-stone-950/40 p-2.5 rounded-xl border border-stone-800/60 leading-relaxed">
                "{selectedRegion.flavorText}"
              </p>

              {/* Golden Rule Note */}
              <div className="text-[10px] text-stone-400 bg-stone-950/80 p-2 rounded-xl border border-stone-800 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Zlatno pravilo (str. 12):</strong> Drugi vinograd na istom imanju NIKADA ne duplira bonus regije! Svaki bonus se dobija samo jednom po imanju.
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MAGNATES */}
      {activeTab === 'magnates' && (
        <div className="space-y-3.5">
          <div className="bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 p-3.5 rounded-2xl border border-amber-900/40 shadow-lg">
            <h2 className="text-sm font-bold text-amber-200 flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              Magnat Pločice (Akcione & Multiplikatori)
            </h2>
            <p className="text-xs text-stone-300">
              Kupuju se na Sajmu (godine 3, 5, 6) odbacivanjem 1 vina sa table (Ref. Knjiga str. 5).
            </p>
          </div>

          <div className="bg-stone-900/90 p-3.5 rounded-2xl border border-stone-800 space-y-2">
            <span className="text-xs font-bold text-amber-300 block">
              Zelene Akcione Pločice (Magnate Actions):
            </span>
            <p className="text-[11px] text-stone-400">
              Igraju se jednom po potezu pre ili posle redovnog Quadrel poteza (okreću se licem nadole). Vraćaju se nagore tek pre 4. i 6. godine!
            </p>

            <div className="space-y-1.5 pt-1">
              {MAGNATE_ACTIONS_2016.map((tile, idx) => (
                <div key={idx} className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800 text-xs flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-stone-200">{tile.name}</span>
                    <p className="text-[11px] text-stone-400 mt-0.5">{tile.effect}</p>
                  </div>
                  <span className="text-[10px] bg-stone-900 px-1.5 py-0.5 rounded text-amber-400 shrink-0 border border-stone-800">
                    {tile.count} u igri
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-stone-950/80 p-3.5 rounded-2xl border border-amber-500/40 text-xs space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Ljubičasti Multiplikatori (Magnate Multipliers):
            </div>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              Prilikom kupovine Multiplikatora <strong className="text-white underline">MORATE staviti bure iz zaliha na njega</strong>! Ako na kraju igre na pločici nema bureta, vredi tačno 0 VP.
            </p>
            <div className="text-[10px] text-stone-400 bg-stone-900 p-2 rounded-xl border border-stone-800">
              U igri za 2 igrača koristi se samo 12 multiplikatora (onih 10 sa ornamentom na vrhu + 2 unikatne pločice).
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WINE EXPERTS */}
      {activeTab === 'experts' && (
        <div className="space-y-3.5">
          <div className="bg-gradient-to-r from-stone-900 via-purple-950/40 to-stone-900 p-3.5 rounded-2xl border border-purple-900/40 shadow-lg">
            <h2 className="text-sm font-bold text-purple-200 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Specijalne Moći Vinskih Stručnjaka
            </h2>
            <p className="text-xs text-stone-300">
              Stručnjaci donose poene na sajmu ili se okreću nadole za trenutnu moć (Ref. Knjiga str. 9).
            </p>
          </div>

          <div className="space-y-2">
            {WINE_EXPERTS_ABILITIES.map((exp, idx) => (
              <div key={idx} className="bg-stone-900/90 p-3 rounded-2xl border border-stone-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Moć: {exp.feature}
                  </span>
                  <span className="text-[10px] text-stone-400">1x po potezu</span>
                </div>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  {exp.ability}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800 text-[11px] text-stone-400">
            ⚠️ <strong>Napomena:</strong> U 2016 Special Vintage verziji možete upotrebiti najviše 1 stručnjaka po potezu. Pločica se okreće licem nadole i ne može se slati na sledeći sajam, ali se ponovo okreće licem nagore pre 4. i 6. godine!
          </div>
        </div>
      )}
    </div>
  );
};
