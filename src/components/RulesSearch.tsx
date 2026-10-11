import React, { useState } from 'react';
import { RULES_CLARIFICATIONS } from '../data/rulesData';
import { GameEdition } from '../types';
import { Search, X, BookOpen, AlertCircle, Sparkles, Filter, ChevronDown, ChevronUp, Scale, Landmark } from 'lucide-react';

interface RulesSearchProps {
  edition?: GameEdition;
}

export const RulesSearch: React.FC<RulesSearchProps> = ({ edition = '2010' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEditionFilter, setSelectedEditionFilter] = useState<'all' | '2010' | '2016' | 'diff'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(RULES_CLARIFICATIONS[0]?.id || null);

  const categories = [
    { id: 'all', label: 'Sve teme' },
    { id: 'bank_economy', label: '🏛️ Banka & Finansije' },
    { id: 'end_game', label: '🏆 Kraj & Tie-Break' },
    { id: 'two_player', label: '⚔️ 2 Igrača (Duel)' },
    { id: 'quadrel', label: '🗺️ Quadrel Kretanje' },
    { id: 'production', label: '🍇 Berba & Kvalitet' },
    { id: 'wine_value', label: '🍷 Vrednost Vina' },
    { id: 'fair_magnates', label: '🎪 Sajam & Magnati' },
    { id: 'cellars', label: '📦 Podrumi & Starenje' },
    { id: 'sales_export', label: '🚢 Prodaja & Izvoz' },
  ];

  const filteredRules = RULES_CLARIFICATIONS.filter((rule) => {
    // Edition filter
    if (selectedEditionFilter === '2010') {
      if (rule.edition !== '2010' && rule.edition !== 'both') return false;
    } else if (selectedEditionFilter === '2016') {
      if (rule.edition !== '2016' && rule.edition !== 'both') return false;
    } else if (selectedEditionFilter === 'diff') {
      if (!rule.isDifference) return false;
    }

    const matchesCategory = selectedCategory === 'all' || rule.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    const inTitle = rule.title.toLowerCase().includes(q);
    const inQuestion = rule.question.toLowerCase().includes(q);
    const inAnswer = rule.answer.toLowerCase().includes(q);
    const inTip = rule.tip ? rule.tip.toLowerCase().includes(q) : false;
    const inTags = rule.tags.some(t => t.toLowerCase().includes(q));

    return inTitle || inQuestion || inAnswer || inTip || inTags;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Search Header */}
      <div className="bg-stone-900/90 p-3.5 rounded-2xl border border-stone-800 shadow-lg space-y-2.5">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pretraži pravila (npr. banka, sajam, enolog, porez)..."
            className="w-full bg-stone-950 border border-stone-700/80 rounded-xl pl-9 pr-9 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-stone-400 hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Edition Filter Pills */}
        <div className="grid grid-cols-4 gap-1 pt-0.5">
          {[
            { id: 'all' as const, label: 'Sva pravila' },
            { id: '2010' as const, label: '2010 Reserve' },
            { id: '2016' as const, label: '2016 Vintage' },
            { id: 'diff' as const, label: '⚡ Razlike' },
          ].map(ed => (
            <button
              key={ed.id}
              onClick={() => setSelectedEditionFilter(ed.id)}
              className={`py-1 rounded-lg text-[10.5px] font-bold transition text-center truncate ${
                selectedEditionFilter === ed.id
                  ? ed.id === '2010' ? 'bg-rose-700 text-white shadow-[0_0_8px_#be123c]'
                    : ed.id === 'diff' ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]'
                    : 'bg-amber-700 text-white shadow-[0_0_8px_#b45309]'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {ed.label}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-[0_0_8px_#d97706]'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick summary banner */}
      <div className="text-[11px] text-stone-400 px-1 flex justify-between items-center">
        <span>Pronađeno: <strong className="text-amber-400">{filteredRules.length}</strong> pravila</span>
        {(searchQuery || selectedCategory !== 'all' || selectedEditionFilter !== 'all') && (
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedEditionFilter('all'); }}
            className="text-amber-400 hover:underline"
          >
            Poništi filtere
          </button>
        )}
      </div>

      {/* Rules Accordion List */}
      <div className="space-y-3">
        {filteredRules.map((rule) => {
          const isExpanded = expandedId === rule.id;
          const is2010Only = rule.edition === '2010';
          return (
            <div
              key={rule.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                is2010Only
                  ? isExpanded ? 'bg-stone-900 border-rose-500/60 ring-1 ring-rose-500/30' : 'bg-stone-900/80 border-rose-950'
                  : isExpanded 
                    ? 'bg-stone-900 border-amber-500/50 shadow-md ring-1 ring-amber-500/20' 
                    : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
              }`}
            >
              <button
                onClick={() => toggleExpand(rule.id)}
                className="w-full p-3.5 text-left flex items-start justify-between gap-3"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {rule.isDifference && (
                      <span className="text-[9px] bg-amber-950 text-amber-300 border border-amber-800/80 px-1.5 py-0.2 rounded font-extrabold flex items-center gap-1">
                        <Scale className="w-2.5 h-2.5" /> Razlika
                      </span>
                    )}
                    {is2010Only && (
                      <span className="text-[9px] bg-rose-950 text-rose-300 border border-rose-800 px-1.5 py-0.2 rounded font-extrabold">
                        Samo 2010 Reserve
                      </span>
                    )}
                    {rule.pageRef && (
                      <span className="text-[9px] text-stone-400 bg-stone-950 px-1.5 py-0.2 rounded border border-stone-800 font-mono">
                        {rule.pageRef}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-xs text-stone-100 leading-snug">
                    {rule.title}
                  </h3>
                </div>

                <div className="text-stone-400 text-xs mt-1">
                  {isExpanded ? '▲' : '▼'}
                </div>
              </button>

              {isExpanded && (
                <div className="p-3.5 pt-0 border-t border-stone-800/80 space-y-2.5 text-xs bg-stone-950/40">
                  <div className="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                      Pitanje:
                    </span>
                    <p className="text-stone-300 font-medium leading-relaxed">
                      {rule.question}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-stone-200 leading-relaxed pl-1 whitespace-pre-line text-[11px]">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                      Zvanični odgovor i pravilo:
                    </span>
                    {rule.answer}
                  </div>

                  {rule.tip && (
                    <div className="bg-amber-950/30 border border-amber-800/40 p-2.5 rounded-xl text-[11px] text-amber-200 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300">Savet / Taktika:</strong>{' '}
                        <span>{rule.tip}</span>
                      </div>
                    </div>
                  )}

                  {rule.tags && rule.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {rule.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] text-stone-500 bg-stone-900 px-1.5 py-0.2 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
