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
  Info,
  CheckCircle2,
  Table,
  LayoutGrid,
  Filter,
  Check
} from 'lucide-react';

export const RegionsGuide: React.FC = () => {
  const [selectedRegionNum, setSelectedRegionNum] = useState<number>(3); // Default Douro
  const [activeTab, setActiveTab] = useState<'list' | 'single' | 'table' | 'magnates' | 'experts'>('list');
  const [filter2POnly, setFilter2POnly] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const selectedRegion = REGIONS_DATA.find(r => r.number === selectedRegionNum) || REGIONS_DATA[0];

  const filteredRegions = REGIONS_DATA.filter(reg => {
    if (filter2POnly && !reg.inTwoPlayer) return false;
    if (categoryFilter !== 'all' && reg.bonusCategory !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Sub-navigation tabs */}
      <div className="grid grid-cols-4 gap-1 bg-stone-900/90 p-1.5 rounded-2xl border border-stone-800 shadow-md">
        <button
          onClick={() => setActiveTab('list')}
          className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 ${
            activeTab === 'list'
              ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span className="text-[10.5px]">Spisak Regija</span>
        </button>

        <button
          onClick={() => setActiveTab('table')}
          className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 ${
            activeTab === 'table'
              ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span className="text-[10.5px]">Brza Tabela</span>
        </button>

        <button
          onClick={() => setActiveTab('magnates')}
          className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 ${
            activeTab === 'magnates'
              ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span className="text-[10.5px]">Magnati</span>
        </button>

        <button
          onClick={() => setActiveTab('experts')}
          className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 ${
            activeTab === 'experts'
              ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[10.5px]">Stručnjaci</span>
        </button>
      </div>

      {/* 2-Player Danijel & Ceca Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 p-3.5 rounded-2xl border border-amber-900/40 shadow-lg space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-amber-200 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-400" />
            9 Regija Portugala & Njihovi Bonusi
          </h2>
          <span className="text-[9.5px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/60 font-bold">
            Ref. Knjiga str. 12
          </span>
        </div>
        <p className="text-xs text-stone-300">
          Svaka regija ima jedinstvenu <strong>specijalnu moć</strong> i specifičan <strong>početni bonus</strong> za startno imanje pre 1. godine.
        </p>
        <div className="text-[11px] text-amber-300 bg-amber-950/60 p-2.5 rounded-xl border border-amber-800/50 flex items-start gap-2">
          <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Pravilo za 2 igrača (Danijel & Ceca):</strong> Igra se sa 7 regija. Zvanična preporuka pravila je da se iz igre <strong className="text-rose-300">uklone Setúbal (#7) i Algarve (#9)</strong>!
          </div>
        </div>
      </div>

      {/* FILTER BAR FOR REGIONS LIST */}
      {(activeTab === 'list' || activeTab === 'table') && (
        <div className="space-y-2 bg-stone-900/80 p-2.5 rounded-2xl border border-stone-800">
          <div className="flex items-center justify-between gap-1.5 text-xs">
            <span className="text-[11px] font-bold text-stone-400 flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-400" /> Filter:
            </span>

            {/* 2P Toggle button */}
            <button
              onClick={() => setFilter2POnly(!filter2POnly)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
                filter2POnly
                  ? 'bg-amber-600 text-stone-950 font-bold border-amber-400 shadow-sm'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
              }`}
            >
              <Users className="w-3 h-3" />
              <span>Samo za 2P ({filter2POnly ? 'Aktivno: 7 regija' : 'Sve 9 regija'})</span>
            </button>
          </div>

          {/* Category filter pills */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar pt-1 text-[10.5px]">
            {[
              { id: 'all', label: 'Svi bonusi' },
              { id: 'building', label: 'Besplatna Zgrada' },
              { id: 'worker', label: 'Farmer / Radnici' },
              { id: 'wine_value', label: 'Vrednost Vina' },
              { id: 'fair', label: 'Sajam (+2)' },
              { id: 'experts', label: 'Stručnjaci' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-2 py-1 rounded-lg shrink-0 font-medium transition border ${
                  categoryFilter === cat.id
                    ? 'bg-stone-100 text-stone-950 font-bold border-stone-100'
                    : 'bg-stone-950/70 text-stone-400 border-stone-800/80 hover:text-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 1: FULL REGIONS LIST CARDS */}
      {activeTab === 'list' && (
        <div className="space-y-3">
          {/* Quick numbers bar to jump/filter or inspect single */}
          <div className="flex items-center justify-between text-xs px-1 text-stone-400">
            <span>Prikazano: <strong className="text-amber-400">{filteredRegions.length}</strong> od 9 regija</span>
            <button
              onClick={() => setActiveTab('single')}
              className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
            >
              Pojedinačni detaljni pregled →
            </button>
          </div>

          <div className="space-y-3">
            {filteredRegions.map((region) => {
              const isTwoPlayerRemoval = !region.inTwoPlayer;

              return (
                <div 
                  key={region.number}
                  className={`bg-stone-900/95 rounded-2xl p-3.5 border transition shadow-md space-y-3 ${
                    isTwoPlayerRemoval
                      ? 'border-red-900/50 opacity-90'
                      : region.number === 3
                      ? 'border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                      : 'border-stone-800 hover:border-amber-700/50'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 border-b border-stone-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shrink-0 border ${
                        region.number === 3
                          ? 'bg-amber-600 text-stone-950 border-amber-400'
                          : isTwoPlayerRemoval
                          ? 'bg-stone-800 text-stone-400 border-stone-700'
                          : 'bg-stone-800 text-amber-300 border-stone-700'
                      }`}>
                        #{region.number}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-black font-display text-white">
                            {region.name}
                          </h3>
                          {region.hasCellarRestriction && (
                            <span className="text-[9px] bg-red-950 text-red-300 font-bold px-1.5 py-0.2 rounded border border-red-800 flex items-center gap-0.5">
                              <ShieldAlert className="w-3 h-3 text-red-400" />
                              Bez Podruma
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400 font-medium">
                          {region.wineTypes}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {region.shortTag}
                      </span>
                      {isTwoPlayerRemoval ? (
                        <span className="text-[9px] font-semibold text-rose-400 bg-rose-950/60 px-1.5 py-0.2 rounded border border-rose-900/60">
                          ⚠️ Uklanja se za 2P
                        </span>
                      ) : (
                        <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-900/60 flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5" /> U 2P duelu
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Special Ability Box */}
                  <div className="bg-gradient-to-r from-amber-950/50 via-stone-950 to-stone-950 p-2.5 rounded-xl border border-amber-500/40 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Specijalna moć regije:
                    </span>
                    <p className="text-xs font-semibold text-stone-100 leading-snug">
                      {region.specialAbility}
                    </p>
                  </div>

                  {/* Starting Estate Bonus Box */}
                  <div className="bg-stone-950/70 p-2.5 rounded-xl border border-stone-800/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        🎁 Početni bonus (ako se bira pre 1. godine):
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-stone-800 text-amber-300 border border-stone-700">
                        Početno vino: Kvalitet {region.initialWineValue}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-amber-200">
                      {region.initialVineyardBonus}
                    </p>
                  </div>

                  {/* Lore / Notes footer */}
                  <div className="text-[10.5px] text-stone-400 flex items-start gap-1.5 pt-0.5">
                    <Info className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <span>{region.notes}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Golden Rule Footer */}
          <div className="bg-stone-950/90 p-3 rounded-2xl border border-amber-800/40 text-xs text-stone-300 space-y-1">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Zlatno pravilo regija (Ref. Knjiga str. 12):
            </span>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Kupovina DRUGOG vinograda na već postojećem imanju NIKADA ne duplira bonus regije! Svaki bonus se dobija samo jednom prilikom osnivanja imanja.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: QUICK TABLE / MATRIX VIEW */}
      {activeTab === 'table' && (
        <div className="space-y-3">
          <div className="bg-stone-900/90 p-3 rounded-2xl border border-stone-800 space-y-1">
            <h3 className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-amber-400" />
              Brza Referentna Tabela Bonusa (9 Regija)
            </h3>
            <p className="text-[11px] text-stone-400">
              Kompaktan pregled svih moći i startnih benefita za brzu odluku tokom igre.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-800 shadow-md">
            <table className="w-full text-left text-xs border-collapse bg-stone-900/95">
              <thead>
                <tr className="border-b border-stone-800 bg-stone-950 text-[10.5px] text-stone-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-2.5"># Regija</th>
                  <th className="py-2.5 px-2.5">Specijalna Moć</th>
                  <th className="py-2.5 px-2.5">Startni Bonus</th>
                  <th className="py-2.5 px-2">Vino</th>
                  <th className="py-2.5 px-2">2P Duel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {filteredRegions.map((reg) => (
                  <tr 
                    key={reg.number}
                    className={`hover:bg-stone-800/50 transition ${
                      !reg.inTwoPlayer ? 'opacity-60 bg-red-950/10' : ''
                    }`}
                  >
                    <td className="py-2.5 px-2.5 align-top">
                      <div className="font-bold text-white whitespace-nowrap">
                        #{reg.number} {reg.name}
                      </div>
                      <span className="text-[9.5px] text-amber-400 font-semibold block">
                        {reg.shortTag}
                      </span>
                    </td>
                    <td className="py-2.5 px-2.5 align-top text-stone-200 text-[11px]">
                      {reg.specialAbilitySummary}
                    </td>
                    <td className="py-2.5 px-2.5 align-top text-amber-200/90 text-[11px]">
                      {reg.startingBonusSummary}
                    </td>
                    <td className="py-2.5 px-2 align-top text-center">
                      <span className="font-bold text-amber-400 bg-stone-950 px-1.5 py-0.5 rounded border border-stone-800 text-[10.5px]">
                        {reg.initialWineValue}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 align-top text-center whitespace-nowrap">
                      {reg.inTwoPlayer ? (
                        <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-900/60">
                          ✓ U igri
                        </span>
                      ) : (
                        <span className="text-[9px] text-rose-400 font-bold bg-rose-950/60 px-1 py-0.5 rounded border border-rose-900/60">
                          ✕ Ukloni
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SINGLE REGION DETAILS DRILLDOWN */}
      {activeTab === 'single' && (
        <div className="space-y-3.5">
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
                    Regija #{selectedRegion.number} • {selectedRegion.wineTypes}
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
                {!selectedRegion.inTwoPlayer && (
                  <span className="text-[10px] bg-rose-950 text-rose-300 font-bold px-2 py-1 rounded-lg border border-rose-800">
                    Uklanja se za 2P
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
              <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 space-y-1.5 text-xs">
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

          <div className="text-center pt-1">
            <button
              onClick={() => setActiveTab('list')}
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              ← Nazad na spisak svih 9 regija
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: MAGNATES */}
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

      {/* TAB 5: WINE EXPERTS */}
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
