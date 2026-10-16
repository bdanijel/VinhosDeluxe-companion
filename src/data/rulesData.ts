import { RuleClarification, SetupStep, VersionDifferenceItem } from '../types';

// 2016 Special Vintage: Money to VP table
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

// 2010 Reserve: Bank Account Marker to VP table (from rulebook pages 12 and 20)
// "At the end of the game, your Bank Account will earn you the number of VP indicated beside the section with your Account Marker in it."
// 0-6: 0 VP, 7-9: 3 VP, 10-13: 7 VP, 14-18: 12 VP, 19-24: 18 VP
export const BANK_TO_VP_TABLE_2010: { min: number; max: number; vp: number }[] = [
  { min: 0, max: 6, vp: 0 },
  { min: 7, max: 9, vp: 3 },
  { min: 10, max: 13, vp: 7 },
  { min: 14, max: 18, vp: 12 },
  { min: 19, max: 24, vp: 18 },
];

export function getVPFromBank2010(bankAccount: number): number {
  if (bankAccount <= 6) return 0;
  const match = BANK_TO_VP_TABLE_2010.find(item => bankAccount >= item.min && bankAccount <= item.max);
  return match ? match.vp : (bankAccount >= 19 ? 18 : 0);
}

// 2-Player Fair scoring rules (Page 15/17: "In a 2-player game, use the 1st and 3rd place scorings")
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

// KEY DIFFERENCES MATRIX: 2010 RESERVE vs 2016 SPECIAL VINTAGE
export const VERSION_DIFFERENCES: VersionDifferenceItem[] = [
  {
    id: 'diff-bank-economy',
    category: 'finances',
    title: 'Banka (Banco do Vinho) i ekonomski sistem',
    impact: 'high',
    v2010: {
      title: 'Dvoslojni finansijski sistem: Gotovina + Banka + Investicije',
      description: 'Igrači vode bankovni račun na posebnoj stazi (0–24 Bagosa) i investicionu stazu (-2 do +3). Prodaja vina puni isključivo bankovni račun, a ne gotovinu!',
      keyPoints: [
        'Početni novac: U 2010 igrači kreću sa 10 Bagosa gotovine i 5 u banci. Nakon izbora vinograda, 1. igrač dobija +0 (ima 10), a 2. igrač dobija +2 (ima 12 gotovine).',
        'Postoji posebna akcija "Bank" na Quadrelu (Podizanje novca, Polaganje depozita, Investiranje).',
        'Razinvestiranje (Divesting) se može uraditi U BILO KOM TRENUTKU besplatno (za dobijanje gotovine iz banke).',
        'U Fazi Održavanja automatski se obračunava kamata sa investicione staze (pozitivna ili negativna).',
        'Ako ne možete platiti negativnu kamatu u banci: gubite 2 VP i MORATE odbaciti Vinariju (ili Vinograd)!',
        'Kraj igre: Bodove (0 do 18 VP) donosi SAMO stanje na bankovnom računu. Gotovina u ruci i investiciona staza donose 0 VP!'
      ],
      rulebookRef: '2010 Pravila str. 4, 11, 12, 15, 20'
    },
    v2016: {
      title: 'Pojednostavljeni keš sistem (Samo Bagosi u ruci)',
      description: 'Nema table banke, nema bankovnih računa, nema investicija niti kamata. Sav novac je u gotovini (Bagos žetoni).',
      keyPoints: [
        'Početni novac: Nema banke. 1. igrač odmah dobija 19 Bagosa gotovine, a 2. igrač dobija 20 Bagosa.',
        'Akcija "Bank" uopšte ne postoji na Quadrelu.',
        'Prodaja vina odmah daje direktnu gotovinu u ruku.',
        'Nema plaćanja kamata u Fazi Održavanja.',
        'Na kraju igre gotovina se pretvara u VP po posebnoj tabeli (0 do 22 VP).'
      ],
      rulebookRef: '2016 Pravila str. 4, 11, 16'
    },
    strategicTip: 'U 2010 verziji bankrot je stvaran i brutalan — manjak na bankovnom računu vodi do uništavanja vinarija i gubitka 2 VP!'
  },
  {
    id: 'diff-workers',
    category: 'workers',
    title: 'Farmeri i Enolozi (Plate i unajmljivanje)',
    impact: 'high',
    v2010: {
      title: 'Samo Enolozi se kupuju; Farmeri su unikatni i ne kupuju se!',
      description: 'Na tabli postoji samo akcija "Enologists". Farmeri se uopšte ne mogu kupiti na Quadrelu!',
      keyPoints: [
        'Farmeri ne postoje kao kupovni radnici u zalihama — jedini način da dobijete farmera je osnivanjem imanja u Ribatejo regiji!',
        'Enolog košta samo 1 Bago u gotovini (umesto 3).',
        'SVAKE GODINE u Fazi Održavanja MORATE platiti 1 Bago po enologu sa bankovnog računa kao platu!',
        'Ako nemate dovoljno novca na računu da isplatite enologa: gubite 2 VP i enolog biva otpušten!'
      ],
      rulebookRef: '2010 Pravila str. 7, 15'
    },
    v2016: {
      title: 'Slobodno unajmljivanje i Enologa i Farmera bez ikakvih plata!',
      description: 'Akcija na Quadrelu je "Enologists & Farmers". Možete unajmiti bilo koju kombinaciju do 2 radnika.',
      keyPoints: [
        'Enolog košta 3 Bagosa, a Farmer 2 Bagosa (plaća se samo jednom pri kupovini).',
        'U Fazi Održavanja nema nikakvih plata — radnici ostaju na vašoj tabli zauvek besplatno!',
        'Postoji puna zaliha od 9 farmera na tabli.'
      ],
      rulebookRef: '2016 Pravila str. 7'
    },
    strategicTip: 'U 2010 verziji svaki enolog je fiksni godišnji trošak. Ne unajmljujte enologe ako nemate stalan priliv novca u banci za plate!'
  },
  {
    id: 'diff-magnates',
    category: 'magnates',
    title: 'Magnati i Bonus Akcije (Rešetka vs Pločice)',
    impact: 'high',
    v2010: {
      title: 'Sistemska rešetka na tabli: Žrtvovanje vina i klizanje buradi',
      description: 'Magnati (Anabela, Bruno, Carolina) imaju sopstvenu rešetku sa stazama za dodatne akcije i multiplajere.',
      keyPoints: [
        'U 1. godini NIKO ne može postaviti burad na Magnate!',
        'Od 2. godine: tokom Press Release-a, ako vino zadovolji zahteve, stavljate 1 ili 2 svoja bureta na portrete Magnata.',
        'Korišćenje benefita: tokom svog poteza ODBACUJETE 1 VINO sa svoje table da pomerite 1 bure u istom redu na polje Dodatne Akcije ili Multiplajera!',
        'Bure na multiplajeru se trajno zaključava.',
        'Maksimalno 1 pomeranje bureta po normalnoj Quadrel akciji.'
      ],
      rulebookRef: '2010 Pravila str. 15, 18, 19'
    },
    v2016: {
      title: 'Sistem pločica (Action Tiles & Multiplier Tiles)',
      description: 'Nema rešetke kretanja buradi. Igrači započinju sa po 2 svoja bureta već postavljenim kod svakog od 3 magnata (ukupno 6).',
      keyPoints: [
        'Press Release oslobađa burad nazad u lične zalihe (do 2 bureta po objavi).',
        'Dodatne akcije dolaze u obliku zelenih akcionih pločica koje se okreću nadole kad se iskoriste.',
        'Multiplajeri su zasebne ljubičaste pločice koje se kupuju postavljanjem bureta tokom Sajma.'
      ],
      rulebookRef: '2016 Pravila str. 12, 13, 15'
    },
    strategicTip: 'U 2010 je ključno sačuvati nekoliko vina u podrumu samo zato da ih žrtvujete za aktiviranje moćnih magnat poteza i multiplajera!'
  },
  {
    id: 'diff-sales-barrels',
    category: 'sales',
    title: 'Prodaja (Sales) i vraćanje buradi iz lokala',
    impact: 'high',
    v2010: {
      title: 'Vraćanje buradi SAMO U PAROVIMA + 2 Kocke Renomea!',
      description: 'Prodaja povećava bankovni račun (ne keš). Vraćanje buradi nazad u zalihe je strogo kontrolisano.',
      keyPoints: [
        'NIKADA ne možete vratiti samo 1 bure iz lokala (Casa de Fados, Hotel, Enoteca)!',
        'Morate vratiti TAČNO PAR buradi (2 bureta) iz ISTOG lokala.',
        'Kada uzmete par buradi, MORATE postaviti 2 Kocke Renomea u 2 različite regije po izboru!',
        'U Fazi Održavanja postoji varijanta pravila gde igrač mora povući par ako je u mogućnosti.'
      ],
      rulebookRef: '2010 Pravila str. 10'
    },
    v2016: {
      title: 'Jednostavno vraćanje 1 bureta svake godine u Održavanju',
      description: 'Zarada od prodaje ide direktno u gotovinu.',
      keyPoints: [
        'U svakoj Fazi Održavanja (oznaka "B"), svaki igrač automatski uzima nazad TAČNO 1 svoje bure iz Sales zone nazad u zalihe.',
        'Nema uslova za parove, niti obaveze postavljanja kockica renomea za povlačenje.'
      ],
      rulebookRef: '2016 Pravila str. 10, 13'
    },
    strategicTip: 'U 2010 nemojte ostati zarobljeni sa neparnim brojem buradi u jednom lokalu, jer samostalno bure ne možete vratiti bez drugog para!'
  },
  {
    id: 'diff-quadrel-grid',
    category: 'quadrel',
    title: 'Raspored polja na 3x3 Quadrelu i cena podruma',
    impact: 'medium',
    v2010: {
      title: 'Quadrel sa Bankom | Podrum košta 2 Bagosa',
      description: 'Polja na Quadrelu 2010: Vinogradi, Podrumi, Vinarije / Stručnjaci, Sajam, Enolozi / Izvoz, Prodaja, Banka.',
      keyPoints: [
        'Polje "Bank" se nalazi u donjem desnom uglu (redovna Quadrel akcija).',
        'Podrum (Cellar) košta samo 2 Bagosa u gotovini.',
        'Akcija je "Enologists" (ne Enologists & Farmers).'
      ],
      rulebookRef: '2010 Pravila str. 3, 7, 9'
    },
    v2016: {
      title: 'Quadrel bez Banke (Dupli vinograd) | Podrum košta 3 Bagosa',
      description: 'Polja na Quadrelu 2016 nemaju Banku; u donjem desnom uglu se nalazi još jedno polje za Vinograde.',
      keyPoints: [
        'Nema polja Banke — umesto toga postoji drugo polje za kupovinu Vinograda.',
        'Podrum (Cellar) košta 3 Bagosa u gotovini.',
        'Akcija desno u sredini je "Enologists & Farmers".'
      ],
      rulebookRef: '2016 Pravila str. 3, 6, 9'
    },
    strategicTip: 'U 2010 podrumi su jeftiniji (2 umesto 3 Bagosa), što omogućava brže pokrivanje skladišta za dugotrajno starenje vina.'
  },
  {
    id: 'diff-endgame-trigger',
    category: 'scoring',
    title: 'Kraj igre i poslednji potezi (Poslednja akcija vs Magnat potezi)',
    impact: 'high',
    v2010: {
      title: 'Poslednji krug žrtvovanja vina za Magnat poteze',
      description: 'Nema standardne akcije na Quadrelu nakon 3. sajma!',
      keyPoints: [
        'Nakon 3. sajma (kraj 6. godine), igrači redom mogu žrtvovati 1 vino da pomere 1 bure na Magnat rešetki za dodatnu akciju ili multiplajer.',
        'Ovo se ponavlja u krug sve dok svi igrači ne odustanu (pasiraju).',
        'Preostala vina na tabli koja NISU žrtvovana DONOSE TAČNO 0 VP na kraju partije!'
      ],
      rulebookRef: '2010 Pravila str. 20'
    },
    v2016: {
      title: '1 Obavezna poslednja Quadrel akcija + Pola vrednosti preostalih vina',
      description: 'Svaki igrač odigrava još tačno jednu standardnu akciju na Quadrelu.',
      keyPoints: [
        'Nakon 3. sajma, svaki igrač dobija još TAČNO 1 standardnu akciju na Quadrelu.',
        'Sva preostala vina na ličnoj tabli donose bodove: svako vino vredi Math.floor(kvalitet / 2) VP!'
      ],
      rulebookRef: '2016 Pravila str. 16'
    },
    strategicTip: 'U 2010 ako vam na kraju ostane vino u podrumu, bacili ste ga u vetar ako ga ne iskoristite za Magnat potez!'
  },
  {
    id: 'diff-endgame-scoring',
    category: 'scoring',
    title: 'Finalno bodovanje i Tie-Breaker',
    impact: 'high',
    v2010: {
      title: 'Bodovanje Banke (Gotovina = 0 VP) | Tie-break: Gotovina + Banka nakon divesta',
      description: 'Samo stanje markera na stazi Banco do Vinho nosi VP (0 do 18 VP).',
      keyPoints: [
        'Gotovina u ruci donosi 0 VP! Pozicija na investicionoj traci donosi 0 VP!',
        'Preostala vina u podrumu donose 0 VP!',
        '1. Tie-breaker: Više buradi u Export zoni.',
        '2. Tie-breaker: Više ukupnog novca (Gotovina u ruci + Bankovni račun) NAKON što izvršite maksimalno razinvestiranje (divest)!'
      ],
      rulebookRef: '2010 Pravila str. 20'
    },
    v2016: {
      title: 'Bodovanje Gotovine po tabeli | Tie-break: Gotovina u ruci',
      description: 'Gotovina u ruci se direktno pretvara u VP po tabeli (0 do 22 VP).',
      keyPoints: [
        'Gotovina u ruci donosi VP (3-5 = 1, 6-8 = 3, ... 24+ = 22 VP).',
        'Preostala vina donose floor(kvalitet/2) VP svako.',
        '1. Tie-breaker: Više buradi u Export zoni.',
        '2. Tie-breaker: Više preostale gotovine (Bagosa).'
      ],
      rulebookRef: '2016 Pravila str. 16'
    },
    strategicTip: 'U 2010 pre kraja partije obavezno deponujte gotovinu u banku ako možete, jer gotovina u ruci ne donosi nijedan jedini pobednički poen!'
  },
  {
    id: 'diff-weather-setup',
    category: 'setup',
    title: 'Vremenska prognoza u 1. godini (Pločica "0")',
    impact: 'medium',
    v2010: {
      title: 'Prva godina UVEK ima Vintage pločicu "0"',
      description: 'U 2010 Reserve verziji, vremenska prognoza za 1. godinu je fiksna.',
      keyPoints: [
        'Pločica sa vrednošću "0" se postavlja na polje prognoze za 1. godinu tokom pripreme igre.',
        'Ostale Vintage pločice se mešaju za godine od 2 do 6.',
        'Na početku 1. godine markeri karakteristika vina se NE pomeraju.'
      ],
      rulebookRef: '2010 Pravila str. 3'
    },
    v2016: {
      title: 'Pločica "0" se trajno uklanja u kutiju!',
      description: 'U 2016 Special Vintage verziji vreme je promenljivo od samog starta.',
      keyPoints: [
        'Vintage pločica "0" se pre početka igre trajno vraća u kutiju.',
        'Promeša se preostalih 8 pločica i odmah se okreće gornja pločica za 1. godinu sa realnim vremenom (-2 do +2).'
      ],
      rulebookRef: '2016 Pravila str. 3'
    },
    strategicTip: 'U 2010 u prvoj godini berba je potpuno predvidiva i stabilna jer je modifikator vremena tačno 0.'
  }
];

// SETUP STEPS FOR 2016 SPECIAL VINTAGE
export const SETUP_STEPS: SetupStep[] = [
  {
    id: 'setup-board',
    title: '1. Glavna tabla i Vremenska Prognoza (2016)',
    category: 'board',
    edition: '2016',
    description: 'Postavka centralne table Vinhos Deluxe (Special Vintage 2016).',
    details: [
      'Postavite glavnu tablu na stranu Special Vintage 2016 na sredinu stola.',
      'Uklonite "0" (nula) Vintage pločicu u kutiju (ne koristi se u 2016 verziji). Promešajte preostalih 8 Vintage pločica licem nadole i okrenite gornju za 1. godinu.',
      'Postavite beli marker Godine/Poreza na početno polje 1. godine.',
      'Pripremite komponente za 2 IGRAČA na tablu (tačne količine iz Reference Book-a):',
      '  • 11 Vinarija (Wineries) na tablu (višak u kutiju).',
      '  • 8 Podruma (Cellars) na tablu (višak u kutiju).',
      '  • 7 Enologa na tablu (višak u kutiju).',
      '  • 9 Farmera na tablu (višak u kutiju).',
      'Složite 4 kupa vinskih stručnjaka (Ukus, Aroma, Izgled, Alkohol) licem nagore na odgovarajuća polja table.'
    ]
  },
  {
    id: 'setup-regions',
    title: '2. Regije u 2 Igrača (Igra se sa 7 Regija!)',
    category: 'board',
    edition: 'both',
    isTwoPlayerSpecial: true,
    description: 'U 2 igrača priprema se tačno 7 od 9 regija.',
    details: [
      'Zvanična preporuka pravila za 2 igrača: UKLONITE Setúbal (regija 7) i Algarve (regija 9) u kutiju!',
      'Za preostalih 7 regija složite pločice vinograda u kup sa cenom okrenutom nagore (po 2 crvena i 2 bela vinograda po regiji).',
      'Stavite 2 Porto pločice u Douro regiju (regija 3).',
      'Stavite sve Kockice Renomea (Region Renown Cubes) u zajedničku zalihu.'
    ]
  },
  {
    id: 'setup-2p-frame',
    title: '⭐ 3. Izvozna Zona (POKLOPAC / RAM ZA 2 IGRAČA)',
    category: 'two_player_focus',
    edition: 'both',
    isTwoPlayerSpecial: true,
    description: 'KRITIČNO ZA DVA IGRAČA: Koristi se ograničeni 2-player ram za izvoz!',
    details: [
      'Stavite poseban ram za 2 igrača (2-player frame overlay) preko Export zone.',
      'Dozvoljeno je izvoziti vino SAMO na polja koja se nalaze unutar 2-player rama!',
      'Polja van rama su blokirana i ne mogu se koristiti u ovoj partiji.',
      'Ovo stvara izuzetno tesnu borbu za većine u kolonama (14, 12, 10, 8, 6 VP).'
    ]
  },
  {
    id: 'setup-magnates',
    title: '4. Magnat Pločice za 2 Igrača (2016)',
    category: 'board',
    edition: '2016',
    isTwoPlayerSpecial: true,
    description: 'Priprema Magnat Action i Multiplier kupova.',
    details: [
      'Zelene Action pločice: Vratite u kutiju sve pločice sa ikonicom "3+" ili "4 igrača". Promešajte i popunite SAMO 6 polja u prikazu (ostala ostaju prazna). Ostatak kupa stavite pored table.',
      'Ljubičaste Multiplier pločice: U 2 igrača koristi se samo 12 pločica (onih 10 sa ukrasnim ornamentom na vrhu + 2 unikatne pločice). Promešajte ih u poseban kup.',
      'Stavite diskove Danijela i Cece na Fair logo između sajamskih štandova i na "0" na Fair traci bodova.'
    ]
  },
  {
    id: 'setup-players',
    title: '5. Danijel (Žuti) i Ceca (Crvena) – Resursi i Početni Novac (2016)',
    category: 'player_board',
    edition: '2016',
    isTwoPlayerSpecial: true,
    description: 'Postavka ličnih tabli i početnih Bagosa (Reference Book str. 4).',
    details: [
      'Danijel uzima ŽUTE komponente, Ceca CRVENE komponente.',
      'Burad (tačno 8 buradi po igraču):',
      '  • Postavite po 2 bureta kod svakog od 3 magnata (ukupno 6 buradi u zoni magnata).',
      '  • Preostala 2 bureta stavite u svoje lične zalihe (Supply) na tabli igrača.',
      'Postavite po 1 disk (marker regije) na prvi slot svakog od svojih 5 imanja.',
      'Postavite diskove na broj 0 na stazi pobedničkih poena (VP).',
      'POČETNI NOVAC ZA 2016 SPECIAL VINTAGE (Ref. Knjiga str. 4, stavka 8):',
      '  • Prvi igrač dobija 19 BAGOSA u gotovini.',
      '  • Drugi igrač dobija 20 BAGOSA u gotovini.'
    ]
  },
  {
    id: 'setup-initial-vineyard',
    title: '6. Izbor Početnog Vinograda i Besplatno Početno Vino (2016)',
    category: 'player_board',
    edition: '2016',
    isTwoPlayerSpecial: true,
    description: 'Pre nego što 1. godina počne, svaki igrač bira 1 besplatno početno imanje!',
    details: [
      'Po redosledu poteza, svaki igrač bira BILO KOJU dostupnu regiju:',
      '  a) Stavite 1 Kockicu Renomea u ram te regije.',
      '  b) Uzmite gornju pločicu vinograda te regije BESPLATNO i stavite na 1. slot praznog imanja.',
      '  c) Pomerite disk sa tog slota na odgovarajuću regiju na mapi.',
      '  d) Uzmite BESPLATNO POČETNO VINO u skladište (ili podrum za Dão):',
      '     • Minho / Trás-os-Montes: Vino vrednosti 2',
      '     • Douro: Vino vrednosti 2, ILI vrednosti 5 ako odmah pravite Porto vino!',
      '     • Dão: Odmah besplatan Podrum i vino vrednosti 2 u njemu!',
      '     • Ribatejo: Odmah besplatan Farmer na vinogradu i vino vrednosti 3!',
      '     • Lisboa: Odmah besplatna Vinarija i vino vrednosti 3!',
      '  e) U OBRNUTOM redosledu poteza: svaki igrač bira po 1 Magnat Action pločicu iz ponude licem nagore pored svoje table!'
    ]
  }
];

// SETUP STEPS FOR 2010 RESERVE
export const SETUP_STEPS_2010: SetupStep[] = [
  {
    id: 'setup-board-2010',
    title: '1. Glavna tabla i Vremenska Prognoza (2010 Reserve)',
    category: 'board',
    edition: '2010',
    description: 'Postavka table 2010 Reserve sa bankom i fiksnim vremenom.',
    details: [
      'Postavite glavnu tablu na stranu 2010 RESERVE (sa zonom Banco do Vinho i Magnat rešetkom na sredinu stola).',
      'OBAVEZNO: Vintage pločica "0" (nula) stavlja se licem nagore na polje vremenske prognoze 1. godine!',
      'Promešajte preostalih 8 Vintage pločica licem nadole i rasporedite ih za godine od 2 do 6.',
      'Postavite beli marker Godine/Poreza na početno polje 1. godine.',
      'Radnici i zalihe: Uklonite SVE Farmere sa table u kutiju (u 2010 farmeri se ne mogu kupovati!).',
      'Postavite na tablu komponente za 2 igrača: 11 Vinarija, 8 Podruma i 7 Enologa (višak u kutiju).',
      'Složite 4 kupa vinskih stručnjaka licem nagore na odgovarajuća polja.'
    ]
  },
  {
    id: 'setup-bank-2010',
    title: '2. Banco do Vinho (Banka: 5 Bagosa & Investicije: 0)',
    category: 'board',
    edition: '2010',
    description: 'Priprema bankovnih računa i investicione trake za oba igrača.',
    details: [
      'Svaki igrač postavlja svoj marker bankovnog računa (disk u svojoj boji) na broj 5 na stazi Banco do Vinho.',
      'Oba igrača započinju sa tačno 5 BAGOSA na svom bankovnom računu!',
      'Svaki igrač postavlja svoj marker investicija na polje "0" na traci investicija (-2 do +3).',
      'Pripremite zajedničku zalihu Bagos novčanica i kovanica pored table.'
    ]
  },
  {
    id: 'setup-regions-2010',
    title: '3. Regije u 2 Igrača (Igra se sa 7 Regija)',
    category: 'board',
    edition: '2010',
    isTwoPlayerSpecial: true,
    description: 'U 2 igrača priprema se tačno 7 od 9 regija.',
    details: [
      'Zvanična preporuka pravila za 2 igrača: UKLONITE Setúbal (regija 7) i Algarve (regija 9) u kutiju!',
      'Složite pločice vinograda za preostalih 7 regija sa cenom okrenutom nagore (po 2 crvena i 2 bela po regiji).',
      'Stavite 2 Porto pločice u Douro regiju (regija 3).',
      'Stavite sve Kockice Renomea (Region Renown Cubes) u zajedničku zalihu.'
    ]
  },
  {
    id: 'setup-export-2010',
    title: '⭐ 4. Izvozna Zona (POKLOPAC / RAM ZA 2 IGRAČA)',
    category: 'two_player_focus',
    edition: '2010',
    isTwoPlayerSpecial: true,
    description: 'KRITIČNO ZA DVA IGRAČA: Koristi se ograničeni 2-player ram za izvoz!',
    details: [
      'Stavite poseban ram za 2 igrača (2-player frame overlay) preko Export zone.',
      'Dozvoljeno je izvoziti vino SAMO na polja koja se nalaze unutar 2-player rama.',
      'U sajmu za 2 igrača koriste se isključivo bodovanja za 1. i 3. mesto (drugo mesto se preskače)!'
    ]
  },
  {
    id: 'setup-players-2010',
    title: '5. Danijel (Žuti) i Ceca (Crvena) – Resursi i Početnih 10 Bagosa Keša (2010)',
    category: 'player_board',
    edition: '2010',
    isTwoPlayerSpecial: true,
    description: 'Postavka ličnih tabli, buradi i početnog novca pre izbora vinograda.',
    details: [
      'Danijel uzima ŽUTE komponente, Ceca CRVENE komponente.',
      'Burad (tačno 8 buradi po igraču): Za razliku od 2016, u 2010 NEMA buradi postavljenih kod magnata! SVIH 8 BURADI idu u ličnu zalihu (Supply) na tabli igrača.',
      'U 1. godini NIKO ne može slati burad kod Magnata.',
      'Postavite po 1 disk na prvi slot svakog od svojih imanja i disk na broj 0 na VP traci.',
      'POČETNI GOTOVINSKI NOVAC (Pre izbora vinograda):',
      '  • OBA IGRAČA dobijaju tačno po 10 BAGOSA u gotovini (papirne novčanice u ruku).',
      '  • Stanje u banci: Podsećanje da oba igrača već imaju i po 5 BAGOSA na svom bankovnom računu (marker na polju 5).'
    ]
  },
  {
    id: 'setup-initial-vineyard-2010',
    title: '⭐ 6. Kupovina Početnog Vinograda, Određivanje Redosleda i Kompenzacija (+0 vs +2 Bagosa)',
    category: 'player_board',
    edition: '2010',
    isTwoPlayerSpecial: true,
    description: 'Plaćanje vinograda iz gotovine, ko igra prvi po broju regije i tačan novac nakon kupovine!',
    details: [
      '1. KUPOVINA POČETNOG VINOGRADA (PLAĆA SE U 2010!):',
      '  • U 2010 verziji, početni vinograd SE PLAĆA iz početnih 10 Bagosa gotovine (na pločici je vizuelno prikazana cena / Cost Side)!',
      '  • Svaki igrač bira regiju od 7 pripremljenih i PLAĆA u gotovini tačnu cenu sa pločice (npr. 3 do 7 Bagosa u zavisnosti od regije).',
      '  • Pločica vinograda se stavlja na 1. imanje, disk tog imanja na mapi u tu regiju, i dodaje se 1 Kockica Renomea u ram regije.',
      '  • Svaki igrač uzima BESPLATNO POČETNO VINO u skladište:',
      '     • Minho / Trás-os-Montes / Bairrada: Vino vrednosti 2',
      '     • Douro: Vino vrednosti 2, ILI vrednosti 5 ako odmah pravite Porto vino!',
      '     • Dão: Odmah besplatan Podrum i vino vrednosti 2 u njemu!',
      '     • Ribatejo: Odmah besplatan Farmer na vinogradu i vino vrednosti 3!',
      '     • Lisboa: Odmah besplatna Vinarija i vino vrednosti 3!',
      '2. ODREĐIVANJE REDOSLEDA POTEZA (KO JE PRVI IGRAČ):',
      '  • Redosled poteza za 1. godinu određuje se po brojevima kupljenih regija:',
      '  • Igrač sa MANJIM BROJEM regije (npr. Minho #1 ili Douro #3) postaje PRVI IGRAČ!',
      '  • Igrač sa VEĆIM BROJEM regije (npr. Dão #4, Bairrada #5, Lisboa #6 ili Alentejo #8) postaje DRUGI IGRAČ.',
      '3. NAKON KUPOVINE VINOGRADA – KOMPENZACIJA NOVCA (Zvanično 2010 pravilo):',
      '  • PRVI IGRAČ dobija: +0 dodatnih Bagosa ➔ Konačna gotovina: 10 - [cena vinograda] + 0.',
      '  • DRUGI IGRAČ (u 2 igrača) dobija: +2 DODATNA BAGOSA ➔ Konačna gotovina: 10 - [cena vinograda] + 2 (odnosno 12 - cena vinograda)!',
      '  • U banci: Oba igrača zadržavaju svojih početnih 5 BAGOSA na računu u Banco do Vinho.',
      '  • Primer: Ako 1. igrač kupi vinograd za 4 Bagosa, ostaje mu 6 Bagosa gotovine (10 - 4 + 0). Ako 2. igrač kupi vinograd za 5 Bagosa, ostaje mu 7 Bagosa gotovine (10 - 5 + 2).'
    ]
  }
];

export const RULES_CLARIFICATIONS: RuleClarification[] = [
  // 2010-SPECIFIC & DIFFERENCES FIRST
  {
    id: 'diff-starting-money-2010',
    title: '💰 Početni Novac, Kupovina Vinograda i Kompenzacija (2010 vs 2016)',
    category: 'bank_economy',
    edition: 'both',
    isDifference: true,
    question: 'Da li se početni vinograd u 2010 plaća, i koliko tačno novca imaju prvi i drugi igrač nakon kupovine vinograda?',
    answer: 'TAČNA ZVANIČNA PRAVILA ZA 2010 RESERVE I KUPOVINU VINOGRADA:\n\n1. U 2010 RESERVE:\n• Početni novac pre kupovine:\n  - OBA IGRAČA dobijaju tačno po 10 BAGOSA u gotovini (novčanice u ruku).\n  - OBA IGRAČA stavljaju marker na broj 5 na stazi Banco do Vinho (imaju po 5 BAGOSA u banci).\n  - Marker investicija je na 0.\n• Kupovina početnog vinograda:\n  - U 2010 pravilima, početni vinograd SE PLAĆA iz gotovine prema ceni koja je vizuelno odštampana na poleđini pločice (Cost Side)!\n  - Igrači biraju vinograd, plaćaju njegovu cenu u kešu i uzimaju početno vino (i bonus regije: Ribatejo farmer, Lisboa vinarija, Dão podrum).\n• Određivanje redosleda poteza:\n  - Igrač sa manjim brojem regije je 1. IGRAČ, a sa većim brojem regije je 2. IGRAČ.\n• Kompenzacija za redosled poteza:\n  - 1. IGRAČ dobija +0 dodatnih Bagosa ➔ Konačna gotovina: 10 - cena vinograda.\n  - 2. IGRAČ (u 2 igrača) dobija +2 DODATNA BAGOSA ➔ Konačna gotovina: 10 - cena vinograda + 2 (tj. 12 - cena vinograda)!\n  (U banci oboje imaju po 5 Bagosa).\n• Primer iz partije: Ako prvi igrač plati vinograd 4 Bagosa, ostaje mu 6 gotovine (10 - 4 + 0). Ako drugi igrač plati vinograd 5 Bagosa, ostaje mu 7 gotovine (10 - 5 + 2)!\n\n2. U 2016 SPECIAL VINTAGE:\n• Nema banke, investicija niti kompenzacije.\n• 1. igrač odmah dobija 19 BAGOSA gotovine, a 2. igrač 20 BAGOSA gotovine.\n• Početni vinograd u 2016 se dobija potpuno besplatno.',
    tip: 'Potpuno ste u pravu! U 2010 vinograd se regularno plaća iz startnih 10 gotovine (cena je vizuelno naznačena na Cost Side pločice), a zatim 1. igrač dobija 0, a 2. igrač +2 Bagosa kompenzacije (uz po 5 Bagosa na bankovnom računu).',
    pageRef: '2010 Pravila str. 4, 7',
    tags: ['početni novac', '2010', '2016', 'banka', 'gotovina', 'kompenzacija', 'kupovina vinograda', 'cena vinograda', 'prvi igrač', 'drugi igrač', '10 bagosa', '12 bagosa']
  },
  {
    id: 'diff-bank-rules-2010',
    title: '🏛️ Banka Banco do Vinho & Akcija Bank (Samo u 2010)',
    category: 'bank_economy',
    edition: '2010',
    isDifference: true,
    question: 'Kako funkcioniše Banka u 2010 verziji i šta obuhvata akcija Bank na Quadrelu?',
    answer: 'U 2010 Reserve, ekonomija je podeljena na Gotovinu (Bagos u ruci) i Bankovni račun (0-24 staza). Akcija Bank na Quadrelu omogućava izvođenje bilo koje od ove 3 operacije u bilo kom broju i redosledu:\n1. Podizanje gotovine: Pomerite marker računa unazad za 1 polje i uzmite 1 Bago gotovine. (Ako marker uđe na "-2 VP" polje, odmah gubite 2 VP!).\n2. Polaganje gotovine: Platite 1 Bago gotovine i pomerite marker računa unapred za 1 polje (maksimalno 24).\n3. Investiranje: Uložite Bagose da pomerite marker investicija udesno za 1 polje (cena piše na gornjoj ikoni).',
    tip: 'RAZINVESTIRANJE (DIVESTING): Možete uraditi U BILO KOM TRENUTKU tokom svog poteza besplatno — pomerite marker investicija ulevo za 1 polje i uzmite gotovinu prikazanu na donjoj ikoni! U 2016 verziji Banka uopšte ne postoji.',
    pageRef: '2010 Pravila str. 11, 12',
    tags: ['banka', '2010', 'razlike', 'investicije', 'divest', 'gotovina', 'porez']
  },
  {
    id: 'diff-maintenance-2010',
    title: '⚠️ Faza Održavanja: Kamate i Plate Enologa (Samo u 2010)',
    category: 'bank_economy',
    edition: '2010',
    isDifference: true,
    question: 'Šta se tačno dešava u Fazi Održavanja (oznaka B) u 2010 Reserve verziji?',
    answer: 'U 2010 Faza Održavanja zahteva 2 obavezna finansijska usklađivanja na bankovnom računu (NE u gotovini!):\na) Kamata na investicije: Pomerite marker na bankovnom računu napred ili nazad prema poziciji markera investicija (-2 do +3). Ako ne možete platiti negativnu kamatu: marker ide na "-2 VP" polje (gubite 2 VP) i MORATE trajno odbaciti 1 Vinariju (ili 1 Vinograd ako nemate vinariju) sa svoje table!\nb) Plate Enologa: Pomerite marker na bankovnom računu unazad za 1 polje po svakom enologu! Ako nemate novca da ih platite, gubite 2 VP i enolog se otpušta na tablu.',
    tip: 'OGROMNA RAZLIKA OD 2016: U 2016 nema plata enologa niti kamata u održavanju — umesto toga u 2016 samo povlačite 1 bure iz Sales zone!',
    pageRef: '2010 Pravila str. 15',
    tags: ['održavanje', '2010', 'razlike', 'kamata', 'plata', 'enolog', 'kazna']
  },
  {
    id: 'diff-farmers-2010',
    title: '👨‍🌾 Farmeri u 2010: Zabrana kupovine & Ribatejo',
    category: 'production',
    edition: '2010',
    isDifference: true,
    question: 'Da li u 2010 Reserve verziji mogu kupovati Farmere kao u 2016?',
    answer: 'NE! Zvanično pravilo 2010 Reserve (strana 7): "U 2010 Reserve, ne možete unajmiti Farmere; jedini način da ih dobijete je osnivanjem imanja u Ribatejo regiji!"\nAkcija na Quadrelu je strogo nazvana "Enologists", košta samo 1 Bago u gotovini po enologu (umesto 3), ali svaki enolog zahteva godišnju platu od 1 Bago u Fazi Održavanja.',
    tip: 'U 2016 verziji farmeri se slobodno kupuju za 2 Bagosa na polju "Enologists & Farmers" i nikada ne traže platu.',
    pageRef: '2010 Pravila str. 7',
    tags: ['farmer', 'enolog', '2010', 'razlike', 'ribatejo', 'radnici']
  },
  {
    id: 'diff-magnates-grid-2010',
    title: '🍷 Magnati u 2010: Žrtvovanje vina za kretanje buradi',
    category: 'fair_magnates',
    edition: '2010',
    isDifference: true,
    question: 'Kako tačno funkcionišu Magnati na tabli 2010 Reserve?',
    answer: 'U 2010 Magnati nisu pločice, već rešetka na tabli sa stazama:\n1. U 1. godini niko ne može poslati bure na Magnata.\n2. Od 2. godine, pri Press Release-u, ako vino ispunjava zahteve magnata, stavljate 1 ili 2 svoja bureta iz zaliha na njihove portrete (max 1 po magnatu).\n3. Korišćenje benefita: U bilo kom trenutku tokom svog poteza, možete ODBACITI 1 VINO sa svoje table da pomerite 1 svoje bure u istom redu na polje Dodatne Akcije ili na polje Multiplajera!\n4. Bure na polju dodatne akcije odmah izvodi tu akciju i može se kasnije pomeriti opet (žrtvovanjem novog vina). Bure na multiplajeru je trajno zaključano.',
    tip: 'U 2016 verziji nema žrtvovanja vina niti kretanja buradi po rešetki — tamo se koriste zelene pločice akcija i ljubičaste pločice multiplajera.',
    pageRef: '2010 Pravila str. 15, 18, 19',
    tags: ['magnati', '2010', 'razlike', 'žrtvovanje vina', 'bure', 'rešetka']
  },
  {
    id: 'diff-sales-retrieval-2010',
    title: '🏪 Prodaja u 2010: Povlačenje buradi SAMO U PAROVIMA',
    category: 'sales_export',
    edition: '2010',
    isDifference: true,
    question: 'Kako se povlače burad iz Prodaje (Casa de Fados, Hotel, Enoteca) u 2010 verziji?',
    answer: 'U 2010 Reserve važi strogo pravilo:\n• Nikada ne možete uzeti nazad samo 1 bure!\n• Burad se mogu povući SAMO U PAROVIMA (2 bureta odjednom) i OBA BURAD MORAJU BITI IZ ISTOG LOKALA!\n• Za svaki par buradi koji povučete, MORATE postaviti 2 Kocke Renomea u 2 različite regije po izboru na mapi!\n• Povlačenje se radi pre poteza ili pre Sajma.',
    tip: 'U 2016 verziji svake godine u Održavanju igrač jednostavno uzima nazad 1 bure bez ikakvih parova i bez kockica renomea.',
    pageRef: '2010 Pravila str. 10',
    tags: ['prodaja', 'burad', 'parovi', '2010', 'razlike', 'renome']
  },
  {
    id: 'diff-endgame-comparison',
    category: 'end_game',
    edition: 'both',
    isDifference: true,
    title: '🏆 Razlike na Kraju Igre: 2010 vs 2016 Završetak i Bodovanje',
    question: 'Koje su tačne razlike između 2010 i 2016 na samom kraju partije?',
    answer: 'Ključne razlike na kraju 6. godine:\n1. POSLEDNJI POTEZ:\n   • 2010: Nakon 3. sajma, igrači redom žrtvuju preostala vina da pomeraju burad na Magnat rešetki za akcije/multiplajere dok svi ne pasiraju.\n   • 2016: Svaki igrač odigrava još TAČNO 1 standardnu akciju na Quadrelu.\n2. PREOSTALA VINA:\n   • 2010: Vina koja ostanu na tabli vrede TAČNO 0 VP!\n   • 2016: Svako vino donosi floor(kvalitet / 2) VP.\n3. NOVAC:\n   • 2010: Samo Bankovni račun donosi VP (0 do 18 VP). Gotovina u ruci donosi 0 VP!\n   • 2016: Gotovina u ruci se boduje po tabeli (0 do 22 VP).\n4. TIE-BREAKER:\n   • 2010: Export burad -> Ukupno novca (Gotovina + Banka nakon divesta).\n   • 2016: Export burad -> Gotovina u ruci.',
    tip: 'U 2010 pazite da pre kraja igre deponujete gotovinu u banku, jer gotovina u ruci ne donosi VP!',
    pageRef: '2010 Pravila str. 20 / 2016 Pravila str. 16',
    tags: ['kraj', 'bodovanje', 'razlike', '2010', '2016', 'poslednji potez', 'vina']
  },

  // COMMON RULES & ESSENTIAL CLARIFICATIONS
  {
    id: 'end-game-trigger',
    title: 'Trigger za kraj igre (Kada se igra završava?)',
    category: 'end_game',
    edition: 'both',
    question: 'Koji je tačan trenutak i trigger za završetak igre?',
    answer: 'Igra traje 6 godina (rundi). Na kraju 6. godine održava se 3. Sajam vina (Wine Tasting Fair).\n• U 2016: Svaki igrač igra JOŠ TAČNO JEDNU DODATNU AKCIJU na Quadrelu!\n• U 2010: Svaki igrač može žrtvovati vina za kretanje buradi na Magnat rešetki dok svi ne pasiraju.\nNakon toga igra se odmah završava i prelazi se na finalno bodovanje.',
    tip: 'Pločice vinskih stručnjaka se NE okreću ponovo licem nagore nakon 3. sajma!',
    pageRef: 'Strana 16 (2016) / Strana 20 (2010)',
    tags: ['kraj', 'trigger', 'poslednja akcija', '6. godina', 'sajam']
  },
  {
    id: 'tie-breaker-official',
    title: 'Zvanični Tie-Breaker (Nerešen rezultat u obe verzije)',
    category: 'end_game',
    edition: 'both',
    question: 'Šta se dešava ako Danijel i Ceca imaju isti broj pobedničkih poena (VP)?',
    answer: 'Pobednik je igrač sa više ukupnih pobedničkih poena (VP). U slučaju nerešenog rezultata:\n1. Pobeđuje igrač koji ima VIŠE BURADI U EXPORT ZONI!\n2. Ako je i dalje nerešeno:\n   • U 2010: Pobeđuje igrač sa više novca (GOTOVINA + BANKOVNI RAČUN) nakon maksimalnog razinvestiranja!\n   • U 2016: Pobeđuje igrač sa više GOTOVINE (Bagos u ruci).',
    tip: 'Za izjednačenja u sajmu (Fair Points) poeni se sabiraju i dele na pola zaokruženo nadole.',
    pageRef: 'Strana 20 (2010) / Strana 16 (2016)',
    tags: ['tie breaker', 'nerešeno', 'pobednik', 'izjednačenje', 'burad']
  },
  {
    id: 'two-player-fair',
    title: 'Sajam u 2 igrača (Danijel i Ceca)',
    category: 'two_player',
    edition: 'both',
    question: 'Kako se boduje Sajam vina kada igraju samo 2 igrača?',
    answer: 'U partiji za 2 igrača primenjuje se posebno pravilo: KORISTE SE BODOVANJA ZA 1. I 3. MESTO! Drugo mesto se preskače.\n- 1. Sajam (Godina 3): 1. mesto dobija 9 VP, a 2. igrač dobija 3 VP!\n- 2. Sajam (Godina 5): 1. mesto dobija 12 VP, a 2. igrač dobija 4 VP!\n- 3. Sajam (Godina 6): 1. mesto dobija 15 VP, a 2. igrač dobija 5 VP!\nAko su izjednačeni po bodovima sajma, sabiraju se bodovi za 1. i 3. mesto i dele sa 2 (zaokruženo nadole): 6 VP, 8 VP i 10 VP!',
    tip: 'Fair bodovi se NIKADA ne resetuju nakon sajma! Oni se kumulativno sabiraju iz sajma u sajam tokom cele partije.',
    pageRef: 'Strana 17 (2010) / Strana 15 (2016)',
    tags: ['2 igrača', 'sajam', 'danijel', 'ceca', 'fair', 'bodovanje']
  },
  {
    id: 'two-player-export',
    title: 'Izvoz u 2 igrača (2-player Frame)',
    category: 'two_player',
    edition: 'both',
    question: 'Koja polja za izvoz su dostupna u 2 igrača?',
    answer: 'U igri za 2 igrača dostupna su ISKLJUČIVO polja koja se nalaze unutar posebnog rama za 2 igrača (2-player frame). Sva ostala polja su blokirana. Za svako izvezeno vino igrač odmah dobija VP naznačene na polju gde postavlja bure.',
    tip: 'Na kraju igre igrač sa najviše buradi u koloni (zemlji) dobija dodatne VP sa vrha te kolone. Ako Danijel i Ceca imaju jednak broj buradi u toj koloni, dele bodove na pola (zaokruženo nadole).',
    pageRef: 'Strana 11 (2010) / Strana 10 (2016)',
    tags: ['2 igrača', 'izvoz', 'export', 'ram', 'većina']
  },
  {
    id: 'quadrel-movement-costs',
    title: 'Troškovi kretanja na Quadrelu (Kada se plaća Bago?)',
    category: 'quadrel',
    edition: 'both',
    question: 'Koliko košta pomeranje akcijskog markera po 3x3 mreži (Quadrelu)?',
    answer: 'Pravila kretanja su precizna i kumulativna:\n1. Susedno polje (ortogonalno ili dijagonalno): BESPLATNO (0 Bagosa).\n2. Nesusedno polje (udaljeno): Plaća se 1 BAGO u opštu zalihu.\n3. Ako se na odredišnom polju već nalazi marker drugog igrača: Plaća se 1 BAGO TOM IGRAČU!\n4. Ako se na odredišnom polju nalazi beli marker Godine/Poreza: Plaća se 1 BAGO u opštu zalihu.\nSvi ovi troškovi se sabiraju!',
    tip: 'IZUZETAK: Polje Pass / Press Release (Sajam/Propusti) je UVEK POTPUNO BESPLATNO za kretanje, čak i ako je protivnički marker već tamo!',
    pageRef: 'Strana 4 (obe verzije)',
    tags: ['kretanje', 'quadrel', 'trošak', 'bago', 'porez']
  },
  {
    id: 'stay-same-quadrel',
    title: 'Da li smem ostati na istom akcijskom polju?',
    category: 'quadrel',
    edition: 'both',
    question: 'Mogu li ponovo izvršiti istu akciju bez pomeranja markera?',
    answer: 'NE! Pravilo glasi: Ne možete ostati na istom polju, morate se pomeriti na novo polje. Takođe, ako nemate novca da platite trošak kretanja i samu akciju, ne smete preći na to polje.\nJEDINI IZUZETAK: Ako ste već na polju Pass / Press Release i nemate mogućnost da pređete ni na jedno drugo polje, smete ostati na njemu i pasirati.',
    tip: 'Ako želite istu akciju dva puta zaredom, u 2010 možete upotrebiti Magnat dodatnu akciju, a u 2016 odgovarajuću Magnat akcionu pločicu.',
    pageRef: 'Strana 4 (obe verzije)',
    tags: ['quadrel', 'isto polje', 'ostanak', 'zabrana']
  },
  {
    id: 'wine-quality-formula',
    title: 'Kvalitet Vina (Wine Quality) pri Berbi',
    category: 'production',
    edition: 'both',
    question: 'Kako se tačno računa kvalitet vina koje se proizvede na imanju?',
    answer: 'Kvalitet vina (ikona bureta sa brojem) se računa u Fazi Proizvodnje za svako imanje sa bar 1 vinogradom:\n+ 2 poena za SVAKI vinograd na imanju (max 2 vinograda = +4)\n+ 1 poen za svakog farmera na imanju\n+ 1 poen za svaku vinariju na imanju (max 2 vinarije = +2)\n+ 2 poena za svakog enologa na imanju\n+ 3 poena ako proizvodite Porto vino (u Douro regiji uz uslove)\n± Vrednost vremenskih prilika sa Vintage pločice (-2 do +2).',
    tip: 'VAŽNO: Ako je konačni kvalitet 0 ili negativan, na tom imanju se NE PROIZVODI VINO (nema pločice kvaliteta 0)!',
    pageRef: 'Strana 8 (2010) / Strana 8 (2016)',
    tags: ['kvalitet', 'berba', 'proizvodnja', 'formula', 'vreme']
  },
  {
    id: 'wine-value-formula',
    title: 'Vrednost Vina (Wine Value) za Prodaju/Izvoz/Sajam',
    category: 'wine_value',
    edition: 'both',
    question: 'Koja je razlika između Kvaliteta i Vrednosti vina, i kako se računa Vrednost?',
    answer: 'Kvalitet je broj na pločici vina. VREDNOST VINA (krug sa buretom unutra) se određuje u trenutku kada vino Prodajete, Izvozite ili Šaljete na Sajam:\n= Kvalitet vina (broj na pločici)\n+ 1, 3, ili 5 poena za godine starenja u Podrumu (Cellar)\n+ (opciono) 1 ili 2 poena iz Kockica Renomea te regije: uklonite 1 ili 2 kocke sa table regije i dodajte +1 po kocki (+2 po kocki ako je vino iz Alenteja, regija 8!)\n+ 1 poen ako je vino iz regije Algarve (regija 9).',
    tip: 'Kocke renomea regije SMETE ukloniti SAMO ako su vam stvarno potrebne da dostignete traženu vrednost slota. Ne smete ih uklanjati samo da biste napakostili protivniku!',
    pageRef: 'Strana 9 (obe verzije)',
    tags: ['vrednost', 'wine value', 'kockice', 'renome', 'podrum', 'alentejo']
  },
  {
    id: 'aging-and-discard',
    title: 'Starenje vina i gubljenje vina (Aging & Warehouses)',
    category: 'cellars',
    edition: 'both',
    question: 'Kako vina stare i šta se dešava ako izađu iz skladišta ili podruma?',
    answer: 'Na početku Faze Proizvodnje svake godine, sva postojeća vina u skladištima i podrumima pomeraju se za 1 polje UDESNO (stare za 1 godinu). Tek NAKON toga nova vina ulaze u najlevlji (prvi) slot. Ako vino mora da se pomeri sa krajnjeg desnog slota i nema gde da ode, VINO JE POKVARENO I TRAJNO SE ODBACUJE!',
    tip: 'Skladište ima mesta za 2 godine starenja. Podrum (Cellar) pokriva skladište i proširuje ga na 4 slota (+1, +3, +5 vrednosti)!',
    pageRef: 'Strana 8, 9 (obe verzije)',
    tags: ['starenje', 'skladište', 'podrum', 'odbacivanje', 'propast']
  },
  {
    id: 'press-release-timing',
    title: 'Press Release: Zašto i kada ga uraditi ranije?',
    category: 'fair_magnates',
    edition: 'both',
    question: 'Zašto bih trošio akciju na Press Release tokom godine, ako mogu besplatno na Sajmu?',
    answer: 'Tokom godine možete otići na polje Pass/Press Release i prijaviti vino za predstojeći sajam. Prednosti:\n1. Bira se najbolji Fair Booth (štand) pre nego što ga protivnik zauzme (bonusi: biranje magnata, stručnjak, 3 bagosa ili +2/3 fair poena).\n2. Ranije impresionirate Magnate i omogućavate bonus akcije/burad!\n3. Dobijate poene za vino veće od 9 (Wine Value - 9 = Fair Points).',
    tip: 'Ako ne uradite Press Release tokom godine, MORATE ga uraditi u samoj fazi Sajma kao besplatnu akciju.',
    pageRef: 'Strana 14 (2010) / Strana 12 (2016)',
    tags: ['press release', 'sajam', 'štand', 'burad', 'magnati']
  },
  {
    id: 'workers-movement',
    title: 'Preraspodela Enologa i Farmera',
    category: 'production',
    edition: 'both',
    question: 'Mogu li da premeštam radnike sa jednog imanja na drugo?',
    answer: 'DA! U Fazi Proizvodnje, u koraku 2 (Redistribute employees), pre nego što izračunate kvalitet vina za novu berbu, možete besplatno premestiti svoje enologe i farmere na bilo koja vaša imanja po želji!\nOgraničenja: Svaka vinarija može ugostiti najviše 1 enologa, a svaki vinograd najviše 1 farmera.',
    tip: 'Premeštajte radnike na imanje koje ima najbolje vremenske prilike ili gde spremate vino za sledeći sajam!',
    pageRef: 'Strana 16 (2010) / Strana 14 (2016)',
    tags: ['radnici', 'enolog', 'farmer', 'premestanje', 'proizvodnja']
  }
];
