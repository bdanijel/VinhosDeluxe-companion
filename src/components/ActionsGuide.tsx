import React, { useState } from 'react';
import { 
  Wine, 
  Store, 
  Globe, 
  Users, 
  Sparkles, 
  Building, 
  Compass, 
  Coins, 
  Award, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface QuadrelAction {
  id: string;
  name: string;
  positionName: string;
  category: 'imanje' | 'tržište' | 'sajam' | 'radnici';
  icon: any;
  cost: string;
  frequency: string;
  summary: string;
  steps: string[];
  tips: string[];
  renownRule?: string;
}

export const ACTIONS_LIST: QuadrelAction[] = [
  {
    id: 'vineyards',
    name: 'Vinogradi (Vineyards)',
    positionName: 'Gore-Levo & Dole-Desno na Quadrelu',
    category: 'imanje',
    icon: Wine,
    cost: 'Cena naznačena na vrhu kupa za tu regiju',
    frequency: 'Mora se kupiti 1 vinograd po regiji iz 1 ili 2 regije',
    summary: 'Osnova proizvodnje! Svaki vinograd donosi +2 kvalitetu vina na tom imanju.',
    steps: [
      'Uzimate gornju pločicu vinograda iz željene regije (maksimalno 1 po regiji u istoj akciji).',
      'Plaćate cenu u Bagosima odštampanu na strani pločice sa cenom.',
      'Postavljate je na prazan slot imanja na svojoj tabli (stranom sa regijom nagore).',
      'U svakom imanju svi vinogradi moraju biti iz ISTE regije i ISTE boje (belo ili crveno). Maksimalno 2 vinograda po imanju.',
      'Ako je ovo PRVI vinograd na tom imanju: pomerite marker regije tog imanja sa table na odgovarajuću regiju na mapi.',
      'Ako je ovo DRUGI vinograd na tom imanju: ne pomerate novi marker regije (već ste ga postavili).'
    ],
    renownRule: 'Ako ima slobodnih kockica u opštoj zalihi i praznih mesta u toj regiji: stavite 1 Kockicu Renomea u ram te regije na mapi!',
    tips: [
      'Nikada u istoj akciji ne smete kupiti 2 vinograda iz ISTE regije.',
      'Imanje bez bar jednog vinograda ne može proizvoditi vino tokom berbe.'
    ]
  },
  {
    id: 'wineries',
    name: 'Vinarije (Wineries)',
    positionName: 'Gore-Desno na Quadrelu',
    category: 'imanje',
    icon: Building,
    cost: '3 Bagosa po vinariji',
    frequency: 'Morate izgraditi 1 ili 2 vinarije',
    summary: 'Povećavaju kvalitet vina za +1 i neophodne su za smeštaj Enologa!',
    steps: [
      'Uzmite 1 ili 2 pločice vinarije sa glavne table.',
      'Platite 3 Bagosa za svaku izgrađenu vinariju (ukupno 3 ili 6 Bagosa).',
      'Postavite pločicu na prazan slot imanja (svako imanje može imati maksimalno 2 vinarije).',
      'Okrenite vinariju odgovarajućom stranom (bela ili crvena strana). Ako imanje još nema vinograd, boja trenutno nije bitna i promeniće se kad kupite vinograd.'
    ],
    renownRule: 'Ako imanje već ima vinograd: stavite 1 Kockicu Renomea u tu regiju. Ako još nema vinograd, stavite kockicu na samu vinariju dok ne kupite vinograd za to imanje!',
    tips: [
      'Vinarija bez enologa daje +1 kvalitetu. Sa enologom daje ukupno +3 kvalitetu (+1 vinarija + 2 enolog)!',
      'Maksimalno 1 enolog može boraviti u jednoj vinariji.'
    ]
  },
  {
    id: 'enologists_farmers',
    name: 'Enolozi i Farmeri (Enologists & Farmers)',
    positionName: 'Desno (Sredina) na Quadrelu',
    category: 'radnici',
    icon: Users,
    cost: 'Enolog: 3 Bagosa | Farmer: 2 Bagosa',
    frequency: 'Morate unajmiti 1 ili 2 radnika u bilo kojoj kombinaciji',
    summary: 'Radnici koji drastično dižu kvalitet vina u berbi (Enolog +2, Farmer +1).',
    steps: [
      'Za svakog Enologa: platite 3 Bagosa i postavite ga na PRAZNU vinariju na svojoj tabli (max 1 po vinariji). Ne možete unajmiti enologa ako nemate slobodnu vinariju!',
      'Za svakog Farmera: platite 2 Bagosa i postavite ga na PRAZAN vinograd na svojoj tabli (max 1 po vinogradu). Ne možete unajmiti farmera ako nemate slobodan vinograd!'
    ],
    tips: [
      'Enolozi daju +2 kvalitetu, Farmeri daju +1 kvalitetu.',
      'Tokom Faze Proizvodnje (korak 2: Redistribute employees) možete BESPLATNO premeštati sve svoje enologe i farmere na druga svoja imanja gde su vam najpotrebniji!'
    ]
  },
  {
    id: 'cellars',
    name: 'Podrumi (Cellars)',
    positionName: 'Gore (Sredina) na Quadrelu',
    category: 'imanje',
    icon: Store,
    cost: '3 Bagosa po podrumu',
    frequency: 'Morate izgraditi 1 ili 2 podruma',
    summary: 'Pokrivaju skladište i omogućavaju vinu da duže i vrednije stari (+1, +3, +5 na Vrednost)!',
    steps: [
      'Uzmite 1 ili 2 pločice podruma sa glavne table i platite 3 Bagosa po podrumu.',
      'Postavite pločicu podruma preko postojećeg skladišta (Warehouse) na izabranom imanju.',
      'Prebacite sva postojeća vina iz skladišta u podrum, zadržavajući njihov tačan nivo starenja (prvi slot ostaje u prvom, drugi u drugom).'
    ],
    renownRule: 'Stavite 1 Kockicu Renomea u regiju tog imanja (ili na podrum ako imanje još uvek nema vinograd).',
    tips: [
      'Skladište omogućava starenje do samo 2 godine, a podrum do 4 godine!',
      'Vino u podrumu na slotu 2 dobija +1 vrednost, na slotu 3 dobija +3, a na slotu 4 čak +5 na konačnu Vrednost!'
    ]
  },
  {
    id: 'sales',
    name: 'Prodaja (Sales)',
    positionName: 'Dole (Sredina) na Quadrelu',
    category: 'tržište',
    icon: Coins,
    cost: 'Besplatno (zahteva vino i burad)',
    frequency: 'Morate prodati 1 ili 2 vina iz skladišta/podruma',
    summary: 'Glavni izvor svežeg novca! Prodaja lokalnim portugalskim objektima (Casa de Fados, Hotel, Enoteca).',
    steps: [
      'Izaberite prazan slot u Sales zoni. Vrednost vašeg vina (Wine Value) mora biti bar onolika kolika piše na slotu.',
      'Crvena vina idu ISKLJUČIVO na crvene slotove, bela na bele slotove.',
      'Postavite 1 bure iz svojih zaliha na izabrani Sales slot.',
      'Opciono: možete ukloniti 1 ili 2 Kockice Renomea iz regije vina ako su vam neophodne da dostignete traženu vrednost (+1 po kocki, ili +2 za Alentejo).',
      'Odbacite prodatu pločicu vina i ODMAH uzmite vrednost slota u Bagosima!'
    ],
    tips: [
      'Važno za održavanje: Na kraju svake godine (Faza B - Maintenance) MORATE uzeti jedno svoje bure iz Sales zone nazad u zalihe!',
      'Ne smete ukloniti kockicu renomea ako vam njena vrednost nije neophodna za taj slot.'
    ]
  },
  {
    id: 'export',
    name: 'Izvoz (Export)',
    positionName: 'Dole-Levo na Quadrelu',
    category: 'tržište',
    icon: Globe,
    cost: 'Besplatno (zahteva vino i burad)',
    frequency: 'Morate izvesti 1 ili 2 vina na strana tržišta',
    summary: 'Donosi trenutne pobedničke poene (VP) i trajne većine u kolonama na kraju igre!',
    steps: [
      'Postavite 1 bure iz zaliha na prazan Export slot. Vrednost vašeg vina mora biti bar onolika koliko traži slot.',
      'U PARTIJI ZA 2 IGRAČA (Danijel i Ceca): dostupna su SAMO polja unutar 2-player rama!',
      'Opciono: uklonite kockice renomea ako vam trebaju za dostizanje tražene vrednosti.',
      'Odbacite pločicu vina i ODMAH uzmite VP odštampane na tom slotu!'
    ],
    tips: [
      'Burad u Export zoni se NE vraćaju u zalihe tokom održavanja – ostaju tamo trajno!',
      'Na kraju igre igrač sa najviše buradi u svakoj koloni (zemlji) dobija dodatne poene sa vrha te kolone (u slučaju nerešenog poeni se dele nadole).',
      'Broj buradi u Exportu je 1. zvanični Tie-breaker na kraju igre!'
    ]
  },
  {
    id: 'wine_experts',
    name: 'Vinski Stručnjaci (Wine Experts)',
    positionName: 'Levo (Sredina) na Quadrelu',
    category: 'sajam',
    icon: Sparkles,
    cost: '1 Bago po stručnjaku',
    frequency: 'Morate unajmiti 1 ili 2 vinska stručnjaka',
    summary: 'Stručnjaci za Ukus, Aromu, Izgled i Alkohol donose poene na sajmu i moćne jednokratne sposobnosti.',
    steps: [
      'Izaberite jedan od 4 kupa (Ukus, Aroma, Izgled, Alkohol) i uzmite gornju pločicu.',
      'Platite 1 Bago u opštu zalihu i stavite pločicu ispred sebe licem nagore.',
      'Možete odlučiti da kupite i drugog stručnjaka iz istog ili drugog kupa za još 1 Bago.',
      'Nema limita koliko stručnjaka možete imati ispred sebe.'
    ],
    tips: [
      'Jednom po potezu tokom Akcijske faze možete okrenuti 1 pločicu stručnjaka licem nadole da iskoristite njegovu specijalnu moć!',
      'Pločica okrenuta licem nadole se NE MOŽE koristiti na sledećem sajmu, ali se okreće nagore pre 4. i 6. godine!',
      'Iskorišćeni stručnjaci na Sajmu se trajno odbacuju na dno kupa.'
    ]
  },
  {
    id: 'pass_press_release',
    name: 'Pass / Press Release (Sajam & Propusti)',
    positionName: 'U Centru (Sredina) na Quadrelu',
    category: 'sajam',
    icon: Award,
    cost: 'POTPUNO BESPLATNO (Uvek 0 Bagosa!)',
    frequency: 'Može se uzeti jednom po sajmu za Press Release, ili za Pass',
    summary: 'Kritična strateška akcija za promenu redosleda poteza, prijavu vina na sajam i oslobađanje buradi od Magnata!',
    steps: [
      'Pomeranje na ovo polje je UVEK besplatno, čak i ako je protivnik već tamo!',
      'Pomerite svoj marker redosleda poteza iz gornjeg u donji red na željeno slobodno mesto.',
      'Izaberite: 1. Pass (ne radite ništa), ili 2. Press Release (Prijavite 1 vino za predstojeći sajam).',
      'Press Release koraci:',
      '  a) Izaberite 1 vino sa svoje table (i opciono iskoristite kockice renomea).',
      '  b) Dobijate Fair Poene jednake Vrednosti vina (pomerite svoj marker na traci sajma).',
      '  c) Postavite svoj disk na slobodan štand na sajmu (Fair Booth) i uzmite trenutni bonus (biranje magnata prvi, stručnjak, 3 bagosa ili +3 poena).',
      '  d) Iskoristite odgovarajuće stručnjake koji odgovaraju Vintage pločici za dodatne poene.',
      '  e) UZMITE BURAD OD MAGNATA: proverite da li vino ispunjava uslove Anabele (boja), Bruna (vrednost) i Caroline (regija). Možete uzeti do 2 burad u svoje zalihe (max 1 po magnatu)!',
      '  f) Odbacite pločicu tog vina.'
    ],
    tips: [
      'Press Release možete odigrati samo JEDNOM po sajmu. Ako ponovo dođete ovde pre sajma, morate pasirati.',
      'Zašto raditi Press Release ranije? Da uzmete do 2 bureta koja su vam hitno potrebna za prodaju/izvoz, i da zauzmete najbolji štand!',
      'Fair poeni se NIKADA ne resetuju posle sajma, kumulativni su!'
    ]
  }
];

export const ActionsGuide: React.FC = () => {
  const [selectedActionId, setSelectedActionId] = useState<string>('vineyards');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const selectedAction = ACTIONS_LIST.find(a => a.id === selectedActionId) || ACTIONS_LIST[0];

  const categories = [
    { id: 'all', label: 'Sve akcije' },
    { id: 'imanje', label: 'Imanje & Proizvodnja' },
    { id: 'tržište', label: 'Prodaja & Izvoz' },
    { id: 'sajam', label: 'Sajam & Stručnjaci' },
    { id: 'radnici', label: 'Radnici' },
  ];

  const filteredActions = ACTIONS_LIST.filter(a => {
    if (filterCategory === 'all') return true;
    return a.category === filterCategory;
  });

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 p-4 rounded-2xl border border-amber-900/40 shadow-lg">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-amber-100">Spisak Akcija (Quadrel 3x3)</h2>
            <p className="text-xs text-stone-300">Sve dostupne akcije na centralnoj tabli i njihova pravila</p>
          </div>
        </div>
        <p className="text-xs text-stone-300">
          U svakoj godini igrač odigrava <strong className="text-amber-300">2 akcije</strong> pomeranjem svog markera na Quadrelu.
        </p>
      </div>

      {/* Mini Visual 3x3 Quadrel Matrix for Fast Tap */}
      <div className="bg-stone-900/90 p-3 rounded-2xl border border-stone-800 shadow-md space-y-2">
        <div className="flex items-center justify-between text-xs border-b border-stone-800 pb-1.5">
          <span className="font-bold text-stone-300">Vizuelni Quadrel (Tapnite za detalje):</span>
          <span className="text-[10px] text-amber-400">9 polja na tabli</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-center">
          {/* Top row */}
          <button
            onClick={() => setSelectedActionId('vineyards')}
            className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
              selectedActionId === 'vineyards'
                ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_10px_#f59e0b]'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Wine className="w-4 h-4 mb-0.5 text-amber-400" />
            <span className="text-[10px] leading-tight">Vinogradi</span>
          </button>

          <button
            onClick={() => setSelectedActionId('cellars')}
            className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
              selectedActionId === 'cellars'
                ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_10px_#f59e0b]'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Store className="w-4 h-4 mb-0.5 text-stone-300" />
            <span className="text-[10px] leading-tight">Podrumi</span>
          </button>

          <button
            onClick={() => setSelectedActionId('wineries')}
            className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
              selectedActionId === 'wineries'
                ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_10px_#f59e0b]'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Building className="w-4 h-4 mb-0.5 text-amber-400" />
            <span className="text-[10px] leading-tight">Vinarije</span>
          </button>

          {/* Middle row */}
          <button
            onClick={() => setSelectedActionId('wine_experts')}
            className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
              selectedActionId === 'wine_experts'
                ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_10px_#f59e0b]'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4 mb-0.5 text-purple-400" />
            <span className="text-[10px] leading-tight">Stručnjaci</span>
          </button>

          <button
            onClick={() => setSelectedActionId('pass_press_release')}
            className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ring-1 ring-amber-500/30 ${
              selectedActionId === 'pass_press_release'
                ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_10px_#f59e0b]'
                : 'bg-amber-950/40 text-amber-200 border-amber-800/60 hover:bg-amber-900/40'
            }`}
          >
            <Award className="w-4 h-4 mb-0.5 text-amber-300" />
            <span className="text-[10px] leading-tight font-extrabold">Pass / Sajam</span>
            <span className="text-[8px] opacity-75 font-normal">Besplatno</span>
          </button>

          <button
            onClick={() => setSelectedActionId('enologists_farmers')}
            className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
              selectedActionId === 'enologists_farmers'
                ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_10px_#f59e0b]'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Users className="w-4 h-4 mb-0.5 text-emerald-400" />
            <span className="text-[10px] leading-tight">Radnici</span>
          </button>

          {/* Bottom row */}
          <button
            onClick={() => setSelectedActionId('export')}
            className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
              selectedActionId === 'export'
                ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_10px_#f59e0b]'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Globe className="w-4 h-4 mb-0.5 text-emerald-400" />
            <span className="text-[10px] leading-tight">Izvoz (VP)</span>
          </button>

          <button
            onClick={() => setSelectedActionId('sales')}
            className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
              selectedActionId === 'sales'
                ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_10px_#f59e0b]'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Coins className="w-4 h-4 mb-0.5 text-amber-400" />
            <span className="text-[10px] leading-tight">Prodaja (B)</span>
          </button>

          <button
            onClick={() => setSelectedActionId('vineyards')}
            className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
              selectedActionId === 'vineyards'
                ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_10px_#f59e0b]'
                : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Wine className="w-4 h-4 mb-0.5 text-amber-400" />
            <span className="text-[10px] leading-tight">Vinogradi</span>
          </button>
        </div>
      </div>

      {/* Detailed Action View */}
      {selectedAction && (
        <div className="bg-stone-900/95 p-4 rounded-3xl border-2 border-amber-500/40 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                <selectedAction.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-100">{selectedAction.name}</h3>
                <span className="text-[10px] text-stone-400">{selectedAction.positionName}</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-800/50">
              {selectedAction.cost}
            </span>
          </div>

          <p className="text-xs text-amber-200 font-medium">
            {selectedAction.summary}
          </p>

          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Kako se izvodi ova akcija:
            </span>
            <ul className="space-y-1.5 text-stone-300 pl-1 text-[11px]">
              {selectedAction.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          {selectedAction.renownRule && (
            <div className="bg-emerald-950/40 border border-emerald-700/40 p-2.5 rounded-xl text-[11px] text-emerald-200 flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300">Kockica Renomea Regije:</strong> {selectedAction.renownRule}
              </div>
            </div>
          )}

          {selectedAction.tips.length > 0 && (
            <div className="bg-amber-950/40 border border-amber-800/40 p-2.5 rounded-xl text-[11px] text-amber-200 space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Važne napomene:
              </div>
              {selectedAction.tips.map((tip, idx) => (
                <div key={idx}>• {tip}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Movement Cost Reminder */}
      <div className="bg-stone-950/80 p-3.5 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-1.5">
        <span className="font-bold text-amber-300 block text-xs">Podsetnik za troškove kretanja:</span>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>• <strong>Susedno polje:</strong> 0 Bagosa (besplatno)</div>
          <div>• <strong>Nesusedno:</strong> 1 Bago u banku</div>
          <div>• <strong>Tuđi marker na polju:</strong> 1 Bago tom igraču!</div>
          <div>• <strong>Marker godine/poreza:</strong> 1 Bago u banku</div>
        </div>
        <div className="text-[10px] text-stone-400 pt-1">
          *Polje Pass / Press Release je uvek 0 Bagosa bez obzira na udaljenost i druge markere.
        </div>
      </div>
    </div>
  );
};
