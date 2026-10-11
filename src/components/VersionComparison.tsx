import React, { useState } from 'react';
import { VERSION_DIFFERENCES } from '../data/rulesData';
import { VersionDifferenceItem } from '../types';
import { 
  Scale, 
  Landmark, 
  Users, 
  Award, 
  Store, 
  Grid3X3, 
  Trophy, 
  Calendar, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  BookOpen,
  Filter,
  Search,
  ExternalLink
} from 'lucide-react';

interface VersionComparisonProps {
  onSelectEdition?: (edition: '2016' | '2010') => void;
  selectedEdition?: '2016' | '2010';
}

export const VersionComparison: React.FC<VersionComparisonProps> = ({ 
  onSelectEdition,
  selectedEdition = '2010'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(VERSION_DIFFERENCES[0]?.id || null);

  const categories = [
    { id: 'all', label: 'Sve Razlike (8)' },
    { id: 'finances', label: '🏛️ Banka & Keš' },
    { id: 'workers', label: '👨‍🌾 Radnici & Plate' },
    { id: 'magnates', label: '🍷 Magnati & Pločice' },
    { id: 'sales', label: '🏪 Prodaja & Burad' },
    { id: 'quadrel', label: '🗺️ Quadrel Akcije' },
    { id: 'scoring', label: '🏆 Kraj & Bodovanje' },
    { id: 'setup', label: '⛅ Vreme & Postavka' },
  ];

  const filteredItems = VERSION_DIFFERENCES.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    if (!matchesCat) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.v2010.title.toLowerCase().includes(q) ||
      item.v2010.description.toLowerCase().includes(q) ||
      item.v2016.title.toLowerCase().includes(q) ||
      item.v2016.description.toLowerCase().includes(q) ||
      item.strategicTip.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-br from-rose-950 via-stone-900 to-amber-950 p-4 rounded-2xl border border-rose-800/50 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-300">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black font-display tracking-wide text-rose-100">
                2010 RESERVE vs 2016 SPECIAL VINTAGE
              </h2>
              <span className="text-[10px] text-rose-300 font-medium">
                Kompletan vodič kroz razlike dva izdanja Vinhos Deluxe
              </span>
            </div>
          </div>
        </div>

        {/* Quick summary notice according to page 1 of official manual */}
        <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800/80 text-xs text-stone-300 leading-relaxed space-y-2">
          <p className="flex items-start gap-2">
            <span className="text-rose-400 font-bold shrink-0 mt-0.5">📖</span>
            <span>
              <strong>Iz zvaničnog priručnika (str. 1):</strong> Vinhos Deluxe vam omogućava igranje dve verzije igre na dvostranoj tabli. <span className="text-rose-300 font-semibold">2010 Reserve</span> je originalno, dublje i ekonomski kompleksnije izdanje (označeno tamnocrvenom bojom u priručniku), dok je <span className="text-amber-300 font-semibold">Special Vintage 2016</span> modernizovana, ubrzana verzija bez bankovnih računa i plata.
            </span>
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div 
              onClick={() => onSelectEdition && onSelectEdition('2010')}
              className={`p-2.5 rounded-lg border text-center transition cursor-pointer ${
                selectedEdition === '2010'
                  ? 'bg-rose-950/70 border-rose-500 text-rose-200 ring-1 ring-rose-500/40'
                  : 'bg-stone-900/60 border-stone-800 hover:border-rose-900 text-stone-300'
              }`}
            >
              <div className="text-[11px] font-bold text-rose-300 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                2010 Reserve
              </div>
              <p className="text-[9px] text-stone-400 mt-0.5">Banco do Vinho, plate, žrtvovanje vina</p>
            </div>

            <div 
              onClick={() => onSelectEdition && onSelectEdition('2016')}
              className={`p-2.5 rounded-lg border text-center transition cursor-pointer ${
                selectedEdition === '2016'
                  ? 'bg-amber-950/70 border-amber-500 text-amber-200 ring-1 ring-amber-500/40'
                  : 'bg-stone-900/60 border-stone-800 hover:border-amber-900 text-stone-300'
              }`}
            >
              <div className="text-[11px] font-bold text-amber-300 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                Special Vintage 2016
              </div>
              <p className="text-[9px] text-stone-400 mt-0.5">Samo gotovina, slobodni farmeri, pločice</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-stone-900/90 p-3 rounded-2xl border border-stone-800 shadow-md space-y-2">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pretraži razlike (npr. banka, plata, enolog, multiplajer)..."
            className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-rose-500 transition"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                activeCategory === cat.id
                  ? 'bg-rose-700 text-white shadow-[0_0_8px_#be123c]'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difference cards list */}
      <div className="space-y-3">
        {filteredItems.map((diff) => {
          const isExpanded = expandedId === diff.id;
          return (
            <div 
              key={diff.id}
              className="bg-stone-900/90 rounded-2xl border border-stone-800 shadow-md overflow-hidden transition-all duration-200"
            >
              {/* Header Accordion Bar */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : diff.id)}
                className="w-full p-3.5 text-left flex items-center justify-between hover:bg-stone-800/40 transition gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    diff.impact === 'high' 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {diff.impact === 'high' ? '🔥' : '⚡'}
                  </span>
                  <div className="truncate">
                    <h3 className="text-xs font-bold text-stone-100 truncate">
                      {diff.title}
                    </h3>
                    <span className="text-[10px] text-stone-400 flex items-center gap-1.5">
                      <span className="text-rose-400">2010 vs 2016</span>
                      <span>•</span>
                      <span className="text-stone-500 capitalize">{diff.category}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    diff.impact === 'high' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {diff.impact === 'high' ? 'Ključna razlika' : 'Umerena razlika'}
                  </span>
                  <span className="text-stone-400 text-xs">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>
              </button>

              {/* Expanded Side-by-Side Comparison */}
              {isExpanded && (
                <div className="p-3.5 pt-0 space-y-3 text-xs border-t border-stone-800/80 bg-stone-950/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                    {/* 2010 Reserve Side (Styled in official Dark Wine Red) */}
                    <div className="bg-gradient-to-b from-rose-950/40 to-stone-950 p-3 rounded-xl border border-rose-900/60 space-y-2">
                      <div className="flex items-center justify-between border-b border-rose-900/40 pb-1.5">
                        <span className="font-extrabold text-rose-300 flex items-center gap-1.5 text-xs">
                          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
                          2010 RESERVE (Original)
                        </span>
                        {diff.v2010.rulebookRef && (
                          <span className="text-[9px] text-rose-400 bg-rose-950/80 px-1.5 py-0.5 rounded border border-rose-800/80">
                            {diff.v2010.rulebookRef}
                          </span>
                        )}
                      </div>
                      
                      <p className="font-semibold text-rose-200 text-[11px] leading-snug">
                        {diff.v2010.title}
                      </p>
                      <p className="text-stone-300 text-[11px] leading-relaxed">
                        {diff.v2010.description}
                      </p>

                      <div className="space-y-1 pt-1">
                        {diff.v2010.keyPoints.map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[10px] text-stone-300">
                            <span className="text-rose-400 font-bold shrink-0">•</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2016 Special Vintage Side (Styled in Amber/Gold) */}
                    <div className="bg-gradient-to-b from-amber-950/30 to-stone-950 p-3 rounded-xl border border-amber-900/50 space-y-2">
                      <div className="flex items-center justify-between border-b border-amber-900/40 pb-1.5">
                        <span className="font-extrabold text-amber-300 flex items-center gap-1.5 text-xs">
                          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                          2016 SPECIAL VINTAGE
                        </span>
                        {diff.v2016.rulebookRef && (
                          <span className="text-[9px] text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/80">
                            {diff.v2016.rulebookRef}
                          </span>
                        )}
                      </div>

                      <p className="font-semibold text-amber-200 text-[11px] leading-snug">
                        {diff.v2016.title}
                      </p>
                      <p className="text-stone-300 text-[11px] leading-relaxed">
                        {diff.v2016.description}
                      </p>

                      <div className="space-y-1 pt-1">
                        {diff.v2016.keyPoints.map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[10px] text-stone-300">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Strategic Tip Box */}
                  <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 flex items-start gap-2 text-[11px]">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">Strateški savet za duel:</strong>{' '}
                      <span className="text-stone-300">{diff.strategicTip}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
