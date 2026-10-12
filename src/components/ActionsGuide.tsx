import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  Landmark,
  Scale,
  MapPin
} from 'lucide-react';
import { GameEdition } from '../types';

interface QuadrelAction {
  id: string;
  name: string;
  positionName: string;
  category: 'imanje' | 'tržište' | 'sajam' | 'radnici' | 'banka';
  icon: any;
  cost: string;
  frequency: string;
  summary: string;
  steps: string[];
  tips: string[];
  renownRule?: string;
  editionNote?: {
    is2010Only?: boolean;
    is2016Only?: boolean;
    diffText: string;
  };
}

export const ACTIONS_2016: QuadrelAction[] = [
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
      'U 2016 košta 3 Bagosa (u 2010 košta samo 2 Bagosa!).',
      'Skladište omogućava starenje do samo 2 godine, a podrum do 4 godine!',
      'Vino u podrumu na slotu 2 dobija +1 vrednost, na slotu 3 dobija +3, a na slotu 4 čak +5 na konačnu Vrednost!'
    ],
    editionNote: {
      diffText: 'U 2016 podrum košta 3 Bagosa (u 2010 košta 2 Bagosa).'
    }
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
      'Press Release u 2016: birate vino, dobijate Fair poene, uzimate Fair štand i bonus, i OSLOBAĐATE DO 2 BURETA OD MAGNATA (iz zaliha magnata u svoje lične zalihe).'
    ],
    tips: [
      'U 2016 burad se uzimaju nazad od magnata u zalihe (u 2010 se postavljaju iz zaliha na magnate).',
      'Press Release možete odigrati samo JEDNOM po sajmu. Ako ponovo dođete ovde pre sajma, morate pasirati.'
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
      'U 2016 nema plata za radnike u Fazi Održavanja!',
      'Tokom Faze Proizvodnje možete BESPLATNO premeštati sve svoje enologe i farmere na druga svoja imanja.'
    ],
    editionNote: {
      diffText: 'U 2016 možete slobodno kupovati farmere za 2 Bagosa i nema plata u održavanju. U 2010 farmeri se ne mogu kupiti!'
    }
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
      'Broj buradi u Exportu je 1. zvanični Tie-breaker na kraju igre!'
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
      'Opciono: uklonite 1 ili 2 Kockice Renomea iz regije vina ako su vam neophodne za traženu vrednost.',
      'Odbacite prodatu pločicu vina i ODMAH uzmite vrednost slota u Bagosima u gotovini!'
    ],
    tips: [
      'U 2016 zarada od prodaje ide direktno u gotovinu.',
      'U Fazi Održavanja automatski uzimate nazad 1 bure iz Sales zone.'
    ],
    editionNote: {
      diffText: 'U 2016 novac ide u gotovinu i vraća se 1 bure u Fazi Održavanja. U 2010 novac ide na bankovni račun i burad se vraćaju samo u parovima!'
    }
  }
];

export const ACTIONS_2010: QuadrelAction[] = [
  {
    id: 'vineyards_2010',
    name: 'Vinogradi (Vineyards)',
    positionName: 'Gore-Levo na Quadrelu',
    category: 'imanje',
    icon: Wine,
    cost: 'Cena na pločici vinograda',
    frequency: 'Mora se kupiti 1 vinograd po regiji iz 1 ili više regija',
    summary: 'Kupovina vinograda u regijama Portugala. Svaki vinograd donosi +2 kvalitetu vina na tom imanju.',
    steps: [
      'Uzmite gornju pločicu vinograda sa kupa odgovarajuće regije.',
      'Platite cenu u gotovini (Bagos) prikazanu na pločici.',
      'Postavite je na prazan slot imanja na svojoj tabli.',
      'Ako je to 1. vinograd na imanju: pomerite marker regije tog imanja na odgovarajući prostor na mapi.',
      'Ako je moguće: stavite 1 Kockicu Renomea u ram te regije na mapi.'
    ],
    tips: [
      'Nikada u istoj akciji ne smete kupiti 2 vinograda iz ISTE regije.',
      'U svakom imanju svi vinogradi moraju biti iste boje i regije (max 2 vinograda po imanju).'
    ]
  },
  {
    id: 'cellars_2010',
    name: 'Podrumi (Cellars)',
    positionName: 'Gore (Sredina) na Quadrelu',
    category: 'imanje',
    icon: Store,
    cost: '2 Bagosa u gotovini (POVOLJNIJE NEGO U 2016!)',
    frequency: 'Morate izgraditi 1 podrum',
    summary: 'Pokriva skladište i omogućava vinu da duže i vrednije stari (+1, +3, +5 na Vrednost).',
    steps: [
      'Uzmite 1 pločicu podruma sa table.',
      'Platite samo 2 Bagosa u gotovini (u 2016 je cena 3 Bagosa!).',
      'Postavite pločicu preko postojećeg skladišta na izabranom imanju.',
      'Prebacite sva postojeća vina iz skladišta u podrum zadržavajući starenje.',
      'Stavite 1 Kockicu Renomea u tu regiju (ili na sam podrum ako imanje još nema vinograd).'
    ],
    tips: [
      'U 2010 podrum košta samo 2 Bagosa!',
      'Skladište omogućava 2 godine starenja, podrum čak 4 godine.'
    ],
    editionNote: {
      diffText: 'U 2010 Reserve podrum košta 2 Bagosa (dok u 2016 košta 3 Bagosa)!'
    }
  },
  {
    id: 'wineries_2010',
    name: 'Vinarije (Wineries)',
    positionName: 'Gore-Desno na Quadrelu',
    category: 'imanje',
    icon: Building,
    cost: '3 Bagosa po vinariji',
    frequency: 'Morate izgraditi 1 ili 2 vinarije',
    summary: 'Dodaje +1 kvalitetu vina i pruža mesto za smeštaj Enologa.',
    steps: [
      'Uzmite 1 ili 2 pločice vinarije sa table.',
      'Platite 3 Bagosa po vinariji u gotovini.',
      'Postavite u prazan slot imanja (max 2 vinarije po imanju).',
      'Stavite 1 Kockicu Renomea u tu regiju (ili na vinariju ako imanje još nema vinograd).'
    ],
    tips: [
      'Svaka vinarija može ugostiti najviše 1 enologa.'
    ]
  },
  {
    id: 'wine_experts_2010',
    name: 'Vinski Stručnjaci (Wine Experts)',
    positionName: 'Levo (Sredina) na Quadrelu',
    category: 'sajam',
    icon: Sparkles,
    cost: '1 Bago po stručnjaku',
    frequency: 'Morate unajmiti 1 ili 2 stručnjaka',
    summary: 'Stručnjaci za 4 osobine vina (Ukus, Aroma, Izgled, Alkohol). Maksimalno 6 pločica ispred sebe.',
    steps: [
      'Izaberite kup i uzmite gornju pločicu vinskog stručnjaka.',
      'Platite 1 Bago u gotovini i stavite pločicu ispred sebe licem nagore.',
      'Možete kupiti i drugog stručnjaka za još 1 Bago.',
      'Maksimalan kapacitet: 6 pločica ispred vas. Ako imate 6 i kupujete novu, morate prvo odbaciti jednu na dno odgovarajućeg kupa.'
    ],
    tips: [
      'Tokom svog poteza možete okrenuti pločicu stručnjaka licem nadole da iskoristite specijalnu sposobnost.',
      'Stručnjaci okrenuti licem nadole ponovo se okreću nagore pre 4. i 6. godine!'
    ]
  },
  {
    id: 'pass_press_release_2010',
    name: 'Pass / Press Release (Sajam & Magnati)',
    positionName: 'U Centru (Sredina) na Quadrelu',
    category: 'sajam',
    icon: Award,
    cost: 'POTPUNO BESPLATNO (Uvek 0 Bagosa)',
    frequency: 'Može se uzeti jednom po sajmu za Press Release, ili za Pass',
    summary: 'Promena redosleda poteza, prijava vina za sajam i postavljanje buradi na Magnate!',
    steps: [
      'Pomeranje je uvek besplatno, bez obzira gde se ko nalazi.',
      'Pomerite svoj marker redosleda u donji red na slobodno mesto.',
      'Ako radite Press Release:',
      '  a) Prijavite 1 vino sa svoje table (i opciono iskoristite kockice renomea).',
      '  b) Ako je Vrednost vina preko 9: dobijate Fair Poene (Vrednost - 9).',
      '  c) Izaberite slobodan Fair Booth štand i uzmite bonus (stručnjak, 3 bagosa ili 2 poena).',
      '  d) Dobijate Fair Poene za 2 osobine sa štanda prema poziciji markera osobina.',
      '  e) POSTAVLJANJE BURADI NA MAGNATE (Osim u 1. godini!): Proverite uslove Anabele (boja), Bruna (vrednost) i Caroline (regija). Možete staviti 1 ili 2 bureta IZ ZALIHA na portrete tih magnata (max 1 po magnatu)!',
      '  f) Odbacite pločicu prijavljenog vina.'
    ],
    tips: [
      'U 1. godini NIKO ne može staviti burad na Magnate!',
      'Kasnije u igri možete ODBACITI 1 VINO da pomerite bure sa portreta Magnata na dodatnu akciju ili multiplajer!'
    ],
    editionNote: {
      diffText: 'U 2010 se burad šalju IZ ZALIHA NA PORTRETE MAGNATA (u 2016 se uzimaju nazad u zalihe).'
    }
  },
  {
    id: 'enologists_2010',
    name: 'Enolozi (Enologists - SAMO U 2010!)',
    positionName: 'Desno (Sredina) na Quadrelu',
    category: 'radnici',
    icon: Users,
    cost: '1 Bago po enologu (Ali zahteva godišnju platu!)',
    frequency: 'Morate unajmiti 1 ili 2 enologa',
    summary: 'Rade u vinarijama i dodaju +2 kvalitetu vina. FARMERI SE NE MOGU KUPOVATI U 2010!',
    steps: [
      'Uzmite 1 ili 2 enologa sa glavne table.',
      'Platite 1 Bago u gotovini po enologu.',
      'Postavite svakog enologa na PRAZNU vinariju na svojoj tabli (max 1 po vinariji). Ne možete unajmiti enologa bez slobodne vinarije!',
      'SVAKE GODINE U FAZI ODRŽAVANJA: Morate platiti 1 Bago po enologu sa bankovnog računa kao platu!'
    ],
    tips: [
      'STROGO PRAVILO 2010: Farmeri se ne mogu kupiti! Jedini način da dobijete farmera je osnivanjem imanja u Ribatejo regiji!',
      'Ako u održavanju nemate para na bankovnom računu za plate: marker ide na "-2 VP" (gubite 2 VP) i otpuštate enologa!'
    ],
    editionNote: {
      is2010Only: true,
      diffText: 'U 2010 se kupuju samo enolozi (cena 1 Bago), a farmeri se uopšte ne mogu kupiti! Enolozi zahtevaju platu od 1 Bago godišnje iz banke.'
    }
  },
  {
    id: 'export_2010',
    name: 'Izvoz (Export)',
    positionName: 'Dole-Levo na Quadrelu',
    category: 'tržište',
    icon: Globe,
    cost: 'Besplatno (zahteva vino i burad)',
    frequency: 'Morate izvesti 1 ili više vina',
    summary: 'Izvoz na strana tržišta donosi trenutne VP i bodovanje većina na kraju igre.',
    steps: [
      'Postavite 1 bure iz zaliha na prazan Export slot.',
      'Vrednost vina mora biti bar kolika se traži na slotu.',
      'U 2 igrača: koristite samo polja unutar 2-player rama!',
      'Odbacite vino i ODMAH uzmite VP prikazane pored tog reda!'
    ],
    tips: [
      'Burad u Export zoni se ne vraćaju u zalihe.',
      'Na kraju igre kolone donose bodove igraču sa najviše buradi (nerešeno deli bodove na pola).'
    ]
  },
  {
    id: 'sales_2010',
    name: 'Prodaja (Sales - Zarada u Banku!)',
    positionName: 'Dole (Sredina) na Quadrelu',
    category: 'tržište',
    icon: Coins,
    cost: 'Besplatno (zahteva vino i burad)',
    frequency: 'Morate prodati 1 ili više vina',
    summary: 'Prodaja lokalnim objektima (Casa de Fados, Hotel, Enoteca). Puni Bankovni račun (NE gotovinu)!',
    steps: [
      'Postavite 1 bure na prazan slot odgovarajuće boje u Sales zoni.',
      'Vrednost vina mora dostići traženu vrednost slota.',
      'Odbacite vino.',
      'POMERITE MARKER BANKOVNOG RAČUNA unapred za broj polja naznačen na slotu (1 polje = 1 Bago)! (Maksimum 24). Ne dobijate gotovinu!',
      'POVLAČENJE BURADI: Burad se mogu povući SAMO U PAROVIMA iz istog lokala, pri čemu MORATE staviti 2 Kocke Renomea u 2 različite regije!'
    ],
    tips: [
      'NIKADA ne možete povući samo 1 bure iz lokala!',
      'Prodaja ne daje gotovinu u ruku, već puni vaš račun u Banco do Vinho.'
    ],
    editionNote: {
      is2010Only: true,
      diffText: 'U 2010 prihod ide na bankovni račun (ne keš), a burad se vraćaju isključivo u parovima uz postavljanje 2 kocke renomea.'
    }
  },
  {
    id: 'bank_2010',
    name: '🏛️ Banka (Bank Action - SAMO U 2010!)',
    positionName: 'Dole-Desno na Quadrelu',
    category: 'banka',
    icon: Landmark,
    cost: 'Zavisi od operacije',
    frequency: 'Možete izvesti bilo koju kombinaciju operacija u bilo kom broju',
    summary: 'Ključna akcija za upravljanje finansijama u 2010 Reserve! Podizanje, polaganje depozita i investiranje.',
    steps: [
      'Izaberite bar jednu od sledeće 3 operacije (možete ih raditi koliko god puta želite):',
      '1. PODIZANJE GOTOVINE: Pomerite marker bankovnog računa unazad 1 polje i uzmite 1 Bago gotovine iz opšte zalihe. Ako marker dođe na "-2 VP" polje, odmah gubite 2 VP!',
      '2. POLAGANJE GOTOVINE: Platite 1 Bago gotovine da pomerite marker bankovnog računa unapred 1 polje (maksimum 24).',
      '3. INVESTIRANJE: Uložite Bagose iz banke/gotovine da pomerite marker investicija udesno 1 polje (prema ceni na gornjoj ikoni). Maksimum je +3 polje.',
      'RAZINVESTIRANJE (DIVEST): U BILO KOM TRENUTKU partije možete besplatno pomeriti marker investicija ulevo 1 polje i uzeti gotovinu sa donje ikone!'
    ],
    tips: [
      'U 2016 verziji Banka NE POSTOJI na tabli!',
      'Na kraju partije stanje na bankovnom računu donosi bodove (0 do 18 VP), dok gotovina u ruci nosi 0 VP!'
    ],
    editionNote: {
      is2010Only: true,
      diffText: 'Ova akcija postoji ISKLJUČIVO u 2010 Reserve! U 2016 na ovom mestu nalazi se druga kupovina vinograda.'
    }
  }
];

interface ActionsGuideProps {
  edition?: GameEdition;
  onSelectEdition?: (edition: GameEdition) => void;
  onOpenRegions?: () => void;
}

export const ActionsGuide: React.FC<ActionsGuideProps> = ({ 
  edition = '2010',
  onSelectEdition,
  onOpenRegions
}) => {
  const currentEdition = edition;
  const [selectedActionId, setSelectedActionId] = useState<string>(
    edition === '2010' ? 'vineyards_2010' : 'vineyards'
  );
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Sync selectedActionId when edition prop changes (e.g. from top bar)
  useEffect(() => {
    if (edition === '2010') {
      if (!selectedActionId.endsWith('_2010')) {
        const mapped = selectedActionId + '_2010';
        const exists = ACTIONS_2010.some(a => a.id === mapped);
        setSelectedActionId(exists ? mapped : 'vineyards_2010');
      }
    } else {
      if (selectedActionId.endsWith('_2010')) {
        const unmapped = selectedActionId.replace('_2010', '');
        const mapped = unmapped === 'enologists' ? 'enologists_farmers' : unmapped === 'bank' ? 'vineyards' : unmapped;
        const exists = ACTIONS_2016.some(a => a.id === mapped);
        setSelectedActionId(exists ? mapped : 'vineyards');
      }
    }
  }, [edition]);

  const handleEditionChange = (newEdition: GameEdition) => {
    if (onSelectEdition) onSelectEdition(newEdition);
    setSelectedActionId(newEdition === '2010' ? 'vineyards_2010' : 'vineyards');
  };

  const actionList = currentEdition === '2010' ? ACTIONS_2010 : ACTIONS_2016;
  const selectedAction = actionList.find(a => a.id === selectedActionId) || actionList[0];

  const categories = [
    { id: 'all', label: 'Sve akcije' },
    { id: 'imanje', label: 'Imanje' },
    { id: 'tržište', label: 'Tržište' },
    { id: 'sajam', label: 'Sajam' },
    { id: 'radnici', label: 'Radnici' },
    ...(currentEdition === '2010' ? [{ id: 'banka', label: '🏛️ Banka' }] : []),
  ];

  const filteredActions = actionList.filter(a => {
    if (filterCategory === 'all') return true;
    return a.category === filterCategory;
  });

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Header & Edition Selector */}
      <div className={`p-4 rounded-2xl border shadow-lg space-y-3 ${
        currentEdition === '2010'
          ? 'bg-gradient-to-r from-rose-950/80 via-stone-900 to-rose-950/80 border-rose-800/60'
          : 'bg-gradient-to-r from-amber-950/80 via-stone-900 to-stone-900 border-amber-800/60'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
              currentEdition === '2010'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}>
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-stone-100 font-display">
                Akcije na Quadrelu (3x3)
              </h2>
              <span className={`text-[10px] font-semibold ${
                currentEdition === '2010' ? 'text-rose-300' : 'text-amber-300'
              }`}>
                Prikaz za: {currentEdition === '2010' ? '2010 RESERVE' : '2016 SPECIAL VINTAGE'}
              </span>
            </div>
          </div>
        </div>

        {/* Edition Switcher Pills */}
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
            <span className="text-[9px] bg-rose-950 px-1 rounded text-rose-300 border border-rose-800">
              Banka + Plate
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
            <span className="text-[9px] bg-amber-950 px-1 rounded text-amber-300 border border-amber-800">
              Samo gotovina
            </span>
          </button>
        </div>

        {/* Version Difference Banner */}
        <div className={`p-2.5 rounded-xl border text-[11px] leading-relaxed flex items-start gap-2 ${
          currentEdition === '2010'
            ? 'bg-rose-950/50 border-rose-800/60 text-rose-200'
            : 'bg-amber-950/40 border-amber-800/50 text-amber-200'
        }`}>
          <Scale className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
          <div>
            {currentEdition === '2010' ? (
              <span>
                <strong className="text-rose-300">Ključne 2010 specifičnosti:</strong> U donjem desnom uglu Quadrela nalazi se <strong className="underline">Banka</strong>. Podrumi koštaju samo <strong className="underline">2 Bagosa</strong>. Farmeri se <strong className="underline">ne mogu kupovati</strong> (samo enolozi za 1 Bago, uz obaveznu godišnju platu u održavanju!).
              </span>
            ) : (
              <span>
                <strong className="text-amber-300">Ključne 2016 specifičnosti:</strong> Nema polja Banke (dole desno je drugi vinograd). Podrum košta <strong className="underline">3 Bagosa</strong>. Farmeri se <strong className="underline">slobodno kupuju za 2 Bagosa</strong> i nema plata u održavanju.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mini Visual 3x3 Quadrel Matrix for Fast Tap */}
      <div className="bg-stone-900/90 p-3 rounded-2xl border border-stone-800 shadow-md space-y-2">
        <div className="flex items-center justify-between text-xs border-b border-stone-800 pb-1.5">
          <span className="font-bold text-stone-300">
            Quadrel 3x3 ({currentEdition === '2010' ? '2010 Reserve' : '2016 Vintage'}):
          </span>
          <span className="text-[10px] text-amber-400 font-semibold">Tapnite polje za detalje</span>
        </div>

        {/* 3x3 Grid tailored to edition */}
        {currentEdition === '2010' ? (
          <div className="grid grid-cols-3 gap-1.5 text-center">
            {/* Row 1 */}
            <button
              onClick={() => setSelectedActionId('vineyards_2010')}
              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
                selectedActionId === 'vineyards_2010'
                  ? 'bg-rose-700 text-white border-rose-400 shadow-[0_0_10px_#f43f5e]'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
              }`}
            >
              <Wine className="w-4 h-4 mb-0.5 text-rose-400" />
              <span className="text-[10px] leading-tight">Vinogradi</span>
            </button>

            <button
              onClick={() => setSelectedActionId('cellars_2010')}
              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
                selectedActionId === 'cellars_2010'
                  ? 'bg-rose-700 text-white border-rose-400 shadow-[0_0_10px_#f43f5e]'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
              }`}
            >
              <Store className="w-4 h-4 mb-0.5 text-stone-300" />
              <span className="text-[10px] leading-tight">Podrumi (2B)</span>
            </button>

            <button
              onClick={() => setSelectedActionId('wineries_2010')}
              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
                selectedActionId === 'wineries_2010'
                  ? 'bg-rose-700 text-white border-rose-400 shadow-[0_0_10px_#f43f5e]'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
              }`}
            >
              <Building className="w-4 h-4 mb-0.5 text-rose-400" />
              <span className="text-[10px] leading-tight">Vinarije</span>
            </button>

            {/* Row 2 */}
            <button
              onClick={() => setSelectedActionId('wine_experts_2010')}
              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
                selectedActionId === 'wine_experts_2010'
                  ? 'bg-rose-700 text-white border-rose-400 shadow-[0_0_10px_#f43f5e]'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-4 h-4 mb-0.5 text-purple-400" />
              <span className="text-[10px] leading-tight">Stručnjaci</span>
            </button>

            <button
              onClick={() => setSelectedActionId('pass_press_release_2010')}
              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ring-1 ring-rose-500/30 ${
                selectedActionId === 'pass_press_release_2010'
                  ? 'bg-rose-700 text-white border-rose-400 shadow-[0_0_10px_#f43f5e]'
                  : 'bg-rose-950/40 text-rose-200 border-rose-800/60 hover:bg-rose-900/40'
              }`}
            >
              <Award className="w-4 h-4 mb-0.5 text-rose-300" />
              <span className="text-[10px] leading-tight font-extrabold">Pass / Sajam</span>
              <span className="text-[8px] opacity-75 font-normal">Besplatno</span>
            </button>

            <button
              onClick={() => setSelectedActionId('enologists_2010')}
              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
                selectedActionId === 'enologists_2010'
                  ? 'bg-rose-700 text-white border-rose-400 shadow-[0_0_10px_#f43f5e]'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
              }`}
            >
              <Users className="w-4 h-4 mb-0.5 text-emerald-400" />
              <span className="text-[10px] leading-tight font-bold">Enolozi (1B)</span>
              <span className="text-[8px] text-rose-400">Bez farmera</span>
            </button>

            {/* Row 3 */}
            <button
              onClick={() => setSelectedActionId('export_2010')}
              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
                selectedActionId === 'export_2010'
                  ? 'bg-rose-700 text-white border-rose-400 shadow-[0_0_10px_#f43f5e]'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
              }`}
            >
              <Globe className="w-4 h-4 mb-0.5 text-emerald-400" />
              <span className="text-[10px] leading-tight">Izvoz (VP)</span>
            </button>

            <button
              onClick={() => setSelectedActionId('sales_2010')}
              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
                selectedActionId === 'sales_2010'
                  ? 'bg-rose-700 text-white border-rose-400 shadow-[0_0_10px_#f43f5e]'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-800'
              }`}
            >
              <Coins className="w-4 h-4 mb-0.5 text-amber-400" />
              <span className="text-[10px] leading-tight">Prodaja (Banka)</span>
            </button>

            <button
              onClick={() => setSelectedActionId('bank_2010')}
              className={`p-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ring-1 ring-amber-500/40 ${
                selectedActionId === 'bank_2010'
                  ? 'bg-amber-600 text-white border-amber-400 shadow-[0_0_10px_#d97706]'
                  : 'bg-amber-950/40 text-amber-200 border-amber-800/60 hover:bg-amber-900/40'
              }`}
            >
              <Landmark className="w-4 h-4 mb-0.5 text-amber-300" />
              <span className="text-[10px] leading-tight font-extrabold">🏛️ Banka</span>
              <span className="text-[8px] text-amber-400 font-normal">Samo 2010</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1.5 text-center">
            {/* 2016 Standard Grid */}
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
              <span className="text-[10px] leading-tight">Podrumi (3B)</span>
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
              <span className="text-[10px] leading-tight">Radnici (E+F)</span>
              <span className="text-[8px] text-emerald-400">Bez plata</span>
            </button>

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
              <span className="text-[10px] leading-tight">Prodaja (Keš)</span>
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
        )}
      </div>

      {/* Detailed Action View */}
      {selectedAction && (
        <div className={`p-4 rounded-3xl border-2 shadow-xl space-y-3 ${
          currentEdition === '2010'
            ? 'bg-stone-900/95 border-rose-500/50'
            : 'bg-stone-900/95 border-amber-500/40'
        }`}>
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                currentEdition === '2010'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                <selectedAction.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-stone-100">{selectedAction.name}</h3>
                <span className="text-[10px] text-stone-400">{selectedAction.positionName}</span>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              currentEdition === '2010'
                ? 'text-rose-300 bg-rose-950/60 border-rose-800/60'
                : 'text-amber-400 bg-amber-950/50 border-amber-800/50'
            }`}>
              {selectedAction.cost}
            </span>
          </div>

          <p className="text-xs text-stone-200 font-medium leading-relaxed">
            {selectedAction.summary}
          </p>

          {/* Difference callout if present */}
          {selectedAction.editionNote && (
            <div className="bg-rose-950/40 border border-rose-800/60 p-2.5 rounded-xl text-[11px] text-rose-200 flex items-start gap-2">
              <Scale className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300">Specifičnost za ovo izdanje:</strong>{' '}
                <span>{selectedAction.editionNote.diffText}</span>
              </div>
            </div>
          )}

          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Kako se izvodi ova akcija:
            </span>
            <ul className="space-y-1.5 text-stone-300 pl-1 text-[11px]">
              {selectedAction.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`${currentEdition === '2010' ? 'text-rose-400' : 'text-amber-400'} font-bold`}>•</span>
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
            <div className="bg-amber-950/30 border border-amber-800/40 p-2.5 rounded-xl text-[11px] text-amber-200 space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Važne napomene:
              </div>
              {selectedAction.tips.map((tip, idx) => (
                <div key={idx}>• {tip}</div>
              ))}
            </div>
          )}

          {selectedAction.id.includes('vineyard') && onOpenRegions && (
            <button
              onClick={onOpenRegions}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Pogledaj spisak svih 9 regija i njihove bonuse →</span>
            </button>
          )}
        </div>
      )}

      {/* Movement Cost Reminder */}
      <div className="bg-stone-950/80 p-3.5 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-1.5">
        <span className="font-bold text-amber-300 block text-xs">Pravila i troškovi kretanja na Quadrelu:</span>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>• <strong>Susedno polje:</strong> 0 Bagosa (besplatno)</div>
          <div>• <strong>Nesusedno:</strong> 1 Bago u zalihu</div>
          <div>• <strong>Tuđi marker na polju:</strong> 1 Bago tom igraču!</div>
          <div>• <strong>Marker godine/poreza:</strong> 1 Bago u zalihu</div>
        </div>
        <div className="text-[10px] text-stone-400 pt-1">
          *Polje Pass / Press Release je uvek 0 Bagosa bez obzira na udaljenost i druge markere. U 2010 možete izvršiti Divest u bilo kom trenutku ako vam fali gotovina za kretanje!
        </div>
      </div>
    </div>
  );
};
