import React, { useState } from 'react';
import { RULES_CLARIFICATIONS } from '../data/rulesData';
import { Search, X, BookOpen, AlertCircle, Sparkles, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export const RulesSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(RULES_CLARIFICATIONS[0]?.id || null);

  const categories = [
    { id: 'all', label: 'Sve teme' },
    { id: 'end_game', label: 'Kraj & Tie-Break' },
    { id: 'two_player', label: '2 Igrača (Danijel & Ceca)' },
    { id: 'quadrel', label: 'Quadrel & Kretanje' },
    { id: 'production', label: 'Berba & Kvalitet' },
    { id: 'wine_value', label: 'Vrednost Vina' },
    { id: 'fair_magnates', label: 'Sajam & Magnati' },
    { id: 'cellars', label: 'Podrumi & Starenje' },
    { id: 'sales_export', label: 'Prodaja & Izvoz' },
  ];

  const filteredRules = RULES_CLARIFICATIONS.filter((rule) => {
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
            placeholder="Pretraži pravila, nedoumice, akcije..."
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

        {/* Filter Pills */}
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
        {searchQuery && (
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
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
          return (
            <div
              key={rule.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded 
                  ? 'bg-stone-900 border-amber-500/50 shadow-md ring-1 ring-amber-500/20' 
                  : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
              }`}
            >
              <button
                onClick={() => toggleExpand(rule.id)}
                className="w-full p-3.5 text-left flex items-start justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-amber-200">
                      {rule.title}
                    </span>
                    {rule.pageRef && (
                      <span className="text-[9px] bg-stone-800 text-stone-400 px-1.5 py-0.5 rounded border border-stone-700">
                        {rule.pageRef}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-300 font-medium">
                    ❓ {rule.question}
                  </p>
                </div>
                <div className="text-stone-400 mt-1 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-3.5 pb-3.5 pt-1 border-t border-stone-800/80 text-xs space-y-2.5 bg-stone-950/40">
                  <div className="text-stone-200 leading-relaxed whitespace-pre-line pt-1">
                    {rule.answer}
                  </div>

                  {rule.tip && (
                    <div className="bg-amber-950/40 border border-amber-600/30 p-2.5 rounded-xl text-amber-200 text-[11px] flex gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>{rule.tip}</div>
                    </div>
                  )}

                  {rule.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {rule.tags.map(t => (
                        <span key={t} className="text-[9px] bg-stone-900 text-stone-400 px-1.5 py-0.5 rounded border border-stone-800">
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

        {filteredRules.length === 0 && (
          <div className="text-center py-10 bg-stone-900/40 rounded-2xl border border-stone-800 space-y-2">
            <BookOpen className="w-8 h-8 text-stone-500 mx-auto" />
            <h4 className="font-bold text-stone-300 text-sm">Nema rezultata za "{searchQuery}"</h4>
            <p className="text-xs text-stone-400">Pokušajte sa terminom: Quadrel, Sajam, Bago, Export, Podrum, ili Berba.</p>
          </div>
        )}
      </div>

      {/* Top 4 "Najčešće greške" cheat sheet */}
      <div className="bg-gradient-to-br from-stone-900 to-amber-950/30 p-4 rounded-2xl border border-amber-900/40 space-y-2.5 mt-6">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>Najčešće zablude u Vinhos Deluxe:</span>
        </div>
        <ul className="text-[11px] text-stone-300 space-y-1.5 pl-1">
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-bold">1.</span>
            <span><strong>Resetovanje sajamskih poena:</strong> Fair bodovi se NIKAD ne resetuju na nulu posle sajma! Ostaju trajni i sabiraju se.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-bold">2.</span>
            <span><strong>Isto polje na Quadrelu:</strong> Ne smete ostati na istom polju, osim ako ste na Pass polju i nemate gde drugo da odete.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-bold">3.</span>
            <span><strong>Burad od magnata:</strong> Možete osloboditi NAJVIŠE 2 bureta po jednom sajmu, i to od 2 različita magnata.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-amber-400 font-bold">4.</span>
            <span><strong>Poslednja akcija:</strong> Posle 3. sajma (kraj 6. godine) svako igra još 1 akciju, ali pločice se NE okreću ponovo nagore!</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
