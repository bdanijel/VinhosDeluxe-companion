import { RuleClarification, SetupStep } from '../types';

// Money to VP table from rulebook page 16
export const MONEY_TO_VP_TABLE: { min: number; max: number; vp: number }[] = [
  { min: 0, max: 2, vp: 0 },
  { min: 3, max: 5, vp: 1 },
  { min: 6, max: 8, vp: 3 },
  { min: 9, max: 11, vp: 5 },
  { min: 12, max: 14, vp: 7 },
  { min: 15, max: 17, vp: 10 },
  { min: 18, max: 20, vp: 14 },
  { min: 21, max: 23, vp: 18 },
  { min: 24, max: 999, vp: 22 },
];

export function getVPFromMoney(bagos: number): number {
  if (bagos <= 0) return 0;
  const match = MONEY_TO_VP_TABLE.find(item => bagos >= item.min && bagos <= item.max);
  return match ? match.vp : (bagos >= 24 ? 22 : 0);
}

// 2-Player Fair scoring rules (Page 15: "In a 2-player game, use the 1st and 3rd place scorings")
export const FAIR_SCORINGS = [
  {
    fairNumber: 1,
    year: 3,
    title: '1. Sajam Vina (Kraj 3. godine)',
    firstPlaceVP: 9,
    secondPlaceVP_standard: 6,
    secondPlayerVP_2p: 3, // In 2p, 2nd player gets 3rd place reward (3 VP)
    tieVP_2p: 6, // (9 + 3) / 2 = 6 VP each
    fourthPlaceStandard: 'Wine Expert pločica',
  },
  {
    fairNumber: 2,
    year: 5,
    title: '2. Sajam Vina (Kraj 5. godine)',
    firstPlaceVP: 12,
    secondPlaceVP_standard: 8,
    secondPlayerVP_2p: 4, // In 2p, 2nd player gets 3rd place reward (4 VP)
    tieVP_2p: 8, // (12 + 4) / 2 = 8 VP each
    fourthPlaceStandard: 'Wine Expert pločica',
  },
  {
    fairNumber: 3,
    year: 6,
    title: '3. Sajam Vina (Kraj 6. godine)',
    firstPlaceVP: 15,
    secondPlaceVP_standard: 10,
    secondPlayerVP_2p: 5, // In 2p, 2nd player gets 3rd place reward (5 VP)
    tieVP_2p: 10, // (15 + 5) / 2 = 10 VP each
    fourthPlaceStandard: 'Wine Expert pločica',
  },
];

export const SETUP_STEPS: SetupStep[] = [
  {
    id: 'setup-board',
    title: '1. Glavna tabla i Vremenska Prognoza',
    category: 'board',
    description: 'Postavka centralne table Vinhos Deluxe.',
    details: [
      'Postavite glavnu tablu na sredinu stola.',
      'Promešajte 6 Vintage (berbanskih) pločica i složite ih licem nadole na prostor vremenske prognoze. Okrenite prvu pločicu za 1. godinu (preskače se faza pripreme za godinu 1).',
      'Postavite beli marker Godine/Poreza (Year/Taxation) na prostor 1. godine.',
      'Složite pločice vinarija (Wineries) i podruma (Cellars) na odgovarajuća polja table.',
      'Složite 4 kupa vinskih stručnjaka (Wine Experts: Ukus, Aroma, Izgled, Alkohol) licem nadole pored table.',
      'Postavite Magnat akcione i multiplikatorske pločice prema pravilima odabrane verzije (Special Vintage 2016 ili 2010 Reserve).'
    ]
  },
  {
    id: 'setup-regions',
    title: '2. Portugalske Regije i Kockice Renomea',
    category: 'board',
    description: 'Priprema 9 vinogradarskih regija Portugala.',
    details: [
      'Za svaku od 9 regija stavite odgovarajuće pločice vinograda (Vineyards) u kup sa cenom okrenutom nagore.',
      'Svaka regija ima po 2 crvena i 2 bela vinograda.',
      'Stavite kocke renomea regije (Region Renown Cubes) u zajedničku zalihu pored table (drvene bele/neutralne kocke).',
      'Pripremite figuru farmera i enologa u opštu zalihu.'
    ]
  },
  {
    id: 'setup-2p-frame',
    title: '⭐ 3. Izvozna Zona (POKLOPAC / RAM ZA 2 IGRAČA)',
    category: 'two_player_focus',
    isTwoPlayerSpecial: true,
    description: 'KRITIČNO ZA DVA IGRAČA: Koristi se ograničeni 2-player ram za izvoz!',
    details: [
      'U partiji za 2 igrača (Danijel i Ceca), stavite poseban ram za 2 igrača (2-player frame overlay) preko Export zone.',
      'Dozvoljeno je izvoziti vino SAMO na polja koja se nalaze unutar 2-player rama!',
      'Polja van rama su blokirana i ne mogu se koristiti u ovoj partiji.',
      'Ovo stvara izuzetno tesnu i napetu borbu za većine u kolonama (zemljama uvoznika) i brzinu plasiranja buradi.'
    ]
  },
  {
    id: 'setup-players',
    title: '4. Danijel (Žuti) i Ceca (Crvena) – Lične Table',
    category: 'player_board',
    isTwoPlayerSpecial: true,
    description: 'Postavka ličnih tabli i komponenti za Danijela i Cecu.',
    details: [
      'Danijel uzima ŽUTE komponente (Yellow): tablu igrača, diskove, akcijski marker, markere redosleda poteza i drvenu žutu burad.',
      'Ceca uzima CRVENE komponente (Red): tablu igrača, diskove, akcijski marker, markere redosleda poteza i drvenu crvenu burad.',
      'Svaki igrač postavlja po 1 marker regije u prvi slot svakog od svojih 5 imanja na tabli.',
      'Burad: Postavite po 1 bure kod svakog od 3 magnata (Anabela, Bruno, Carolina). Ostatak buradi ide na vašu tablu u zonu zaliha (Supply).',
      'Postavite diskove igrača na startnu poziciju Sajamske bodovne trake (0 poena) i na stazu pobedničkih poena (VP).',
      'Početni novac: Svaki igrač započinje sa početnim Bagosima po izabranoj varijanti (u 2016 Special Vintage standardno 10 Bagosa).'
    ]
  },
  {
    id: 'setup-quadrel',
    title: '5. Početne Akcije na Quadrelu',
    category: 'player_board',
    description: 'Postavljanje na centralni akcijski kvadrat (Quadrel 3x3).',
    details: [
      'Odredite ko je prvi igrač (nasumično ili najskoriji posetilac vinarije). Postavite markere redosleda poteza.',
      'Na početku 1. godine igrači još uvek nemaju akcijski marker na Quadrelu – pri svom prvom potezu stavljaju ga na BILO KOJE polje na Quadrelu bez plaćanja troškova kretanja!',
      'Troškovi kretanja se primenjuju tek od sledećih pomeranja.'
    ]
  }
];

export const RULES_CLARIFICATIONS: RuleClarification[] = [
  {
    id: 'end-game-trigger',
    title: 'Trigger za kraj igre (Kada se igra završava?)',
    category: 'end_game',
    question: 'Koji je tačan trenutak i trigger za završetak igre?',
    answer: 'Igra traje 6 godina (rundi). Na kraju 6. godine održava se 3. Sajam vina (Wine Tasting Fair). NAKON 3. sajma, marker runde se pomera na krug desno od ikone sajma. Tada svaki igrač igra JOŠ TAČNO JEDNU DODATNU AKCIJU na Quadrelu prema trenutnom redosledu poteza! Nakon te poslednje akcije igra se odmah završava i prelazi se na finalno bodovanje.',
    tip: 'PAŽNJA: Pločice vinskih stručnjaka i magnata se NE okreću ponovo licem nagore nakon 3. sajma! U toj poslednjoj akciji možete iskoristiti samo one stručnjake i magnat pločice koje su vam već ostale okrenute licem nagore.',
    pageRef: 'Strana 16 pravila',
    tags: ['kraj', 'trigger', 'poslednja akcija', '6. godina', 'sajam']
  },
  {
    id: 'tie-breaker-official',
    title: 'Zvanični Tie-Breaker (Nerešen rezultat)',
    category: 'end_game',
    question: 'Šta se dešava ako Danijel i Ceca imaju isti broj pobedničkih poena (VP)?',
    answer: 'Pobednik je igrač sa više ukupnih pobedničkih poena (VP). U slučaju nerešenog rezultata, primenjuje se sledeća stroga zvanična hijerarhija:\n1. Pobeđuje igrač koji ima VIŠE BURADI U EXPORT ZONI (Izvozno područje)!\n2. Ako je i dalje nerešeno, pobeđuje igrač sa VIŠE NOVCA (preostali Bagos).',
    tip: 'Za izjednačenja u sajmu (Fair Points) poeni se sabiraju i dele na pola zaokruženo nadole. Za izjednačenja u kolonama izvoza (zemlje uvoznice) bodovi na vrhu kolone se takođe dele na pola zaokruženo nadole.',
    pageRef: 'Strana 16 pravila',
    tags: ['tie breaker', 'nerešeno', 'pobednik', 'izjednačenje', 'burad']
  },
  {
    id: 'two-player-fair',
    title: 'Sajam u 2 igrača (Danijel i Ceca)',
    category: 'two_player',
    question: 'Kako se boduje Sajam vina kada igraju samo 2 igrača?',
    answer: 'U partiji za 2 igrača primenjuje se posebno pravilo: KORISTE SE BODOVANJA ZA 1. I 3. MESTO! Drugo mesto se preskače.\n- 1. Sajam (Godina 3): 1. mesto dobija 9 VP, a 2. igrač dobija 3 VP!\n- 2. Sajam (Godina 5): 1. mesto dobija 12 VP, a 2. igrač dobija 4 VP!\n- 3. Sajam (Godina 6): 1. mesto dobija 15 VP, a 2. igrač dobija 5 VP!\nAko su izjednačeni po bodovima sajma, sabiraju se bodovi za 1. i 3. mesto i dele sa 2 (zaokruženo nadole): 6 VP, 8 VP i 10 VP!',
    tip: 'Fair bodovi se NIKADA ne resetuju nakon sajma! Oni se kumulativno sabiraju iz sajma u sajam tokom cele partije.',
    pageRef: 'Strana 15 pravila',
    tags: ['2 igrača', 'sajam', 'danijel', 'ceca', 'fair', 'bodovanje']
  },
  {
    id: 'two-player-export',
    title: 'Izvoz u 2 igrača (2-player Frame)',
    category: 'two_player',
    question: 'Koja polja za izvoz su dostupna u 2 igrača?',
    answer: 'U igri za 2 igrača dostupna su ISKLJUČIVO polja koja se nalaze unutar posebnog rama za 2 igrača (2-player frame). Sva ostala polja su blokirana. Za svako izvezeno vino igrač odmah dobija VP naznačene na polju gde postavlja bure.',
    tip: 'Na kraju igre igrač sa najviše buradi u koloni (zemlji) dobija dodatne VP sa vrha te kolone. Ako Danijel i Ceca imaju jednak broj buradi u toj koloni, dele bodove na pola (zaokruženo nadole).',
    pageRef: 'Strana 10 pravila',
    tags: ['2 igrača', 'izvoz', 'export', 'ram', 'većina']
  },
  {
    id: 'quadrel-movement-costs',
    title: 'Troškovi kretanja na Quadrelu (Kada se plaća Bago?)',
    category: 'quadrel',
    question: 'Koliko košta pomeranje akcijskog markera po 3x3 mreži (Quadrelu)?',
    answer: 'Pravila kretanja su precizna i kumulativna:\n1. Susedno polje (ortogonalno ili dijagonalno): BESPLATNO (0 Bagosa).\n2. Nesusedno polje (udaljeno): Plaća se 1 BAGO u banku (zajedničku zalihu).\n3. Ako se na odredišnom polju već nalazi marker drugog igrača: Plaća se 1 BAGO TOM IGRAČU!\n4. Ako se na odredišnom polju nalazi beli marker Godine/Poreza: Plaća se 1 BAGO u banku.\nSvi ovi troškovi se sabiraju!',
    tip: 'IZUZETAK: Polje Pass / Press Release (Sajam/Propusti) je UVEK POTPUNO BESPLATNO za kretanje, čak i ako je protivnički marker već tamo!',
    pageRef: 'Strana 4 pravila',
    tags: ['kretanje', 'quadrel', 'trošak', 'bago', 'porez']
  },
  {
    id: 'stay-same-quadrel',
    title: 'Da li smem ostati na istom akcijskom polju?',
    category: 'quadrel',
    question: 'Mogu li ponovo izvršiti istu akciju bez pomeranja markera?',
    answer: 'NE! Pravilo glasi: Ne možete ostati na istom polju, morate se pomeriti na novo polje. Takođe, ako nemate novca da platite trošak kretanja i samu akciju, ne smete preći na to polje.\nJEDINI IZUZETAK: Ako ste već na polju Pass / Press Release i nemate mogućnost da pređete ni na jedno drugo polje, smete ostati na njemu i pasirati.',
    tip: 'Ako želite istu akciju dva puta zaredom, možete upotrebiti odgovarajuću Magnat akcionu pločicu pre ili posle redovnog pomeranja.',
    pageRef: 'Strana 4 pravila',
    tags: ['quadrel', 'isto polje', 'ostanak', 'zabrana']
  },
  {
    id: 'wine-quality-formula',
    title: 'Kvalitet Vina (Wine Quality) pri Berbi',
    category: 'production',
    question: 'Kako se tačno računa kvalitet vina koje se proizvede na imanju?',
    answer: 'Kvalitet vina (ikona bureta sa brojem) se računa u Fazi Proizvodnje za svako imanje sa bar 1 vinogradom:\n+ 2 poena za SVAKI vinograd na imanju (max 2 vinograda = +4)\n+ 1 poen za svakog farmera na imanju\n+ 1 poen za svaku vinariju na imanju (max 2 vinarije = +2)\n+ 2 poena za svakog enologa na imanju\n+ 3 poena ako proizvodite Porto vino (u Douro regiji uz uslove)\n± Vrednost vremenskih prilika sa Vintage pločice (-2 do +2).',
    tip: 'VAŽNO: Ako je konačni kvalitet 0 ili negativan, na tom imanju se NE PROIZVODI VINO (nema pločice kvaliteta 0)!',
    pageRef: 'Strana 8 pravila',
    tags: ['kvalitet', 'berba', 'proizvodnja', 'formula', 'vreme']
  },
  {
    id: 'wine-value-formula',
    title: 'Vrednost Vina (Wine Value) za Prodaju/Izvoz/Sajam',
    category: 'wine_value',
    question: 'Koja je razlika između Kvaliteta i Vrednosti vina, i kako se računa Vrednost?',
    answer: 'Kvalitet je broj na pločici vina. VREDNOST VINA (krug sa buretom unutra) se određuje u trenutku kada vino Prodajete, Izvozite ili Šaljete na Sajam:\n= Kvalitet vina (broj na pločici)\n+ 1, 3, ili 5 poena za godine starenja u Podrumu (Cellar)\n+ (opciono) 1 ili 2 poena iz Kockica Renomea te regije: uklonite 1 ili 2 kocke sa table regije i dodajte +1 po kocki (+2 po kocki ako je vino iz Alenteja, regija 8!)\n+ 1 poen ako je vino iz regije Algarve (regija 9).',
    tip: 'Kocke renomea regije SMETE ukloniti SAMO ako su vam stvarno potrebne da dostignete traženu vrednost slota. Ne smete ih uklanjati samo da biste napakostili protivniku!',
    pageRef: 'Strana 9 pravila',
    tags: ['vrednost', 'wine value', 'kockice', 'renome', 'podrum', 'alentejo']
  },
  {
    id: 'aging-and-discard',
    title: 'Starenje vina i gubljenje vina (Aging & Warehouses)',
    category: 'cellars',
    question: 'Kako vina stare i šta se dešava ako izađu iz skladišta ili podruma?',
    answer: 'Na početku Faze Proizvodnje svake godine, sva postojeća vina u skladištima i podrumima pomeraju se za 1 polje UDESNO (stare za 1 godinu). Tek NAKON toga nova vina ulaze u najlevlji (prvi) slot. Ako vino mora da se pomeri sa krajnjeg desnog slota i nema gde da ode, VINO JE POKVARENO I TRAJNO SE ODBACUJE!',
    tip: 'Skladište (Warehouse) ima mesta za starenje do 2 godine. Kupovinom Podruma (Cellar) pokrivate skladište i proširujete kapacitet starenja (do 4 slota), što dramatično povećava vrednost vina (+1, +3, +5 vrednosti)!',
    pageRef: 'Strana 8, 9 pravila',
    tags: ['starenje', 'skladište', 'podrum', 'odbacivanje', 'propast']
  },
  {
    id: 'press-release-timing',
    title: 'Press Release: Zašto i kada ga uraditi ranije?',
    category: 'fair_magnates',
    question: 'Zašto bih trošio akciju na Press Release tokom godine, ako mogu besplatno na Sajmu?',
    answer: 'Tokom godine možete otići na polje Pass/Press Release i prijaviti vino za predstojeći sajam. Prednosti ranog prijavljivanja:\n1. Bira se najbolji Fair Booth (štand na sajmu) pre nego što ga Ceca ili Danijel zauzme (bonusi: biranje magnata prvi, besplatan stručnjak, 3 bagosa, ili +3 fair poena).\n2. ODMAH se uzimaju dragocena burad od Magnata (do 2 bureta), koja su vam očajnički potrebna za prodaju i izvoz!\n3. Možete iskoristiti vinske stručnjake koji odgovaraju trenutnoj berbanskoj pločici za dodatne Fair poene.',
    tip: 'Ako ne uradite Press Release tokom godine, MORATE ga uraditi u samoj fazi Sajma kao besplatnu akciju.',
    pageRef: 'Strana 12, 13 pravila',
    tags: ['press release', 'sajam', 'štand', 'burad', 'magnati']
  },
  {
    id: 'magnates-barrels',
    title: 'Magnati i Uzimanje Buradi',
    category: 'fair_magnates',
    question: 'Kako se uzimaju burad od tri Magnata (Anabela, Bruno, Carolina)?',
    answer: 'Kada prijavite vino za sajam (kroz Press Release):\n- Anabela traži BOJU vina (belo ili crveno po Vintage pločici)\n- Bruno traži MINIMALNU VREDNOST vina (npr. vrednost bar 8)\n- Carolina traži VINO IZ ODREĐENIH REGIJA (npr. regije 1, 4, 7 ili 8)\nAko vaše vino ispunjava uslove, možete uzeti do 2 VAŠA BURETA iz prostora magnata u vaše lične zalihe (najviše 1 bure od svakog magnata). Čak i ako vino ispunjava uslove sva 3 magnata, limit je 2 bureta!',
    tip: 'Pošto ima 3 sajma u igri, tokom cele partije imate tačno 3 prilike da oslobodite svoja burad od magnata!',
    pageRef: 'Strana 13 pravila',
    tags: ['magnati', 'anabela', 'bruno', 'carolina', 'burad']
  },
  {
    id: 'maintenance-barrel-recall',
    title: 'Faza Održavanja (Maintenance): Vraćanje buradi iz Prodaje',
    category: 'sales_export',
    question: 'Kada i kako mi se vraćaju burad poslata u lokalne lokale (Casa de Fados, Hotel, Enoteca)?',
    answer: 'U svakoj godini, nakon što su odigrane obe akcije, nastupa Faza Održavanja (označena sa "B" na stazi godine). Svaki igrač MORA uzeti nazad TAČNO JEDNO svoje bure iz Sales zone (ako ih tamo ima) i vratiti ga u svoje zalihe.',
    tip: 'Burad u EXPORT zoni (izvoz) se NIKADA ne vraćaju u zalihe (ostaju tamo trajno i boduju većine na kraju igre, osim u slučaju posebnog vinskog stručnjaka)! Burad na Multiplier pločicama takođe ostaju tamo.',
    pageRef: 'Strana 13 pravila',
    tags: ['održavanje', 'prodaja', 'burad', 'zalihe', 'povratak']
  },
  {
    id: 'workers-movement',
    title: 'Preraspodela Enologa i Farmera',
    category: 'production',
    question: 'Mogu li da premeštam radnike sa jednog imanja na drugo?',
    answer: 'DA! U Fazi Proizvodnje, u koraku 2 (Redistribute employees), pre nego što izračunate kvalitet vina za novu berbu, možete besplatno premestiti svoje enologe i farmere na bilo koja vaša imanja po želji!\nOgraničenja: Svaka vinarija može ugostiti najviše 1 enologa, a svaki vinograd najviše 1 farmera.',
    tip: 'Ovo je ključna taktika: premeštajte sve radnike na imanje koje trenutno ima najbolje vremenske prilike ili gde želite elitno vino za sajam!',
    pageRef: 'Strana 14 pravila',
    tags: ['radnici', 'enolog', 'farmer', 'premestanje', 'proizvodnja']
  },
  {
    id: 'multiplier-tiles-barrel-rule',
    title: 'Multiplier (Množilac) pločice na kraju igre',
    category: 'end_game',
    question: 'Koji je najvažniji uslov da bi Magnat Multiplier pločica donela poene na kraju igre?',
    answer: 'KRITIČNO: Multiplier pločica donosi poene na kraju igre SAMO ako se na njoj nalazi vaše bure! Prilikom kupovine pločice na sajmu morali ste postaviti bure iz zaliha. Ako na pločici nema bureta na kraju igre, ona vredi tačno 0 VP!',
    tip: 'Takođe obratite pažnju na maksimalne limite poena na pločicama (npr. max 16 VP za pločicu vina).',
    pageRef: 'Strana 15, 16 pravila',
    tags: ['multiplier', 'množilac', 'bure', 'kraj', 'magnat']
  }
];
