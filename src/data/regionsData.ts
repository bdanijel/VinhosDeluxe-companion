export interface RegionInfo {
  number: number;
  name: string;
  specialAbility: string;
  initialVineyardBonus: string;
  initialWineValue: number;
  hasCellarRestriction?: boolean;
  notes: string;
  flavorText: string;
  colorPreference: 'red_white' | 'red_heavy' | 'white_heavy';
}

export const REGIONS_DATA: RegionInfo[] = [
  {
    number: 1,
    name: 'Trás-os-Montes',
    specialAbility: 'Dobijate +2 DODATNA Fair Poena ako na Sajmu predstavite vino iz Trás-os-Montes!',
    initialVineyardBonus: 'Standardno vino vrednosti 2 u skladište.',
    initialWineValue: 2,
    notes: 'Izuzetno cenjeno na sajmovima. 2 crvena i 2 bela vinograda.',
    flavorText: 'Ime znači "iza brda". Drevni vinogradi na severoistoku Portugala daju voćna crvena i cvetna meka bela vina tražena na sajmovima.',
    colorPreference: 'red_white'
  },
  {
    number: 2,
    name: 'Minho',
    specialAbility: 'STROGA ZABRANA: Na imanju u Minho regiji NE SMETE graditi podrum (Cellar)!',
    initialVineyardBonus: 'Standardno vino vrednosti 2 u skladište.',
    initialWineValue: 2,
    hasCellarRestriction: true,
    notes: 'Vina iz Minha (Vinho Verde) se piju mlada, unutar 1 godine, i ne mogu dugo da stare.',
    flavorText: 'Poznata "zelena vina" (Vinhos Verdes) sa bujne vegetacije. Kisela, lagana i osvežavajuća vina namenjena konzumaciji u prvoj godini.',
    colorPreference: 'red_white'
  },
  {
    number: 3,
    name: 'Douro',
    specialAbility: 'Dobijate 2 PORTO PLOČICE! Tokom proizvodnje možete potrošiti Porto pločicu da povećate kvalitet vina iz Doura za +3!',
    initialVineyardBonus: 'Birate: vino vrednosti 2, ILI vino vrednosti 5 ako odmah pravite Porto vino!',
    initialWineValue: 5,
    notes: 'Porto pločica se može iskoristiti ISKLJUČIVO za Douro vino.',
    flavorText: 'Ambasador portugalskih vina. Strme padine reke Douro gde se dodavanjem alkohola prekida fermentacija, stvarajući slatko i moćno desertno vino.',
    colorPreference: 'red_heavy'
  },
  {
    number: 4,
    name: 'Dão',
    specialAbility: 'BESPLATAN PODRUM! Gradite besplatan podrum u Dão imanju (bez dodatne kockice renomea za besplatan podrum).',
    initialVineyardBonus: 'Odmah dobijate 1 Podrum i stavljate početno vino vrednosti 2 u njegov najlevlji slot!',
    initialWineValue: 2,
    notes: 'Vina iz Dãoa imaju ogroman potencijal starenja. Planinski masivi štite dolinu od vetrova.',
    flavorText: 'Zemljište okruženo borovom šumom i planinama. Bela vina su aromatična i voćna, crvena vina su punog tela i postaju kompleksna sa godinama.',
    colorPreference: 'red_white'
  },
  {
    number: 5,
    name: 'Ribatejo',
    specialAbility: 'BESPLATAN FARMER! Odmah stavljate besplatnog Farmera na vinograd u Ribatejo imanju.',
    initialVineyardBonus: 'Odmah dobijate 1 besplatnog Farmera i vino vrednosti 3 u skladište!',
    initialWineValue: 3,
    notes: 'Farmer odmah podiže kvalitet za +1 u svakoj budućoj berbi.',
    flavorText: 'Plodna ravnica oko reke Težo sa velikim vinogradima. Poljoprivrednici ovde eksperimentišu sa sortama stvarajući mlada i pitka vina.',
    colorPreference: 'red_white'
  },
  {
    number: 6,
    name: 'Lisboa',
    specialAbility: 'BESPLATNA VINARIJA! Gradite besplatnu vinariju u Lisboa imanju (bez dodatne kockice za besplatnu vinariju).',
    initialVineyardBonus: 'Odmah dobijate 1 besplatnu Vinariju i vino vrednosti 3 u skladište!',
    initialWineValue: 3,
    notes: 'Vinarija daje +1 kvalitet i odmah omogućava smeštaj Enologa!',
    flavorText: 'Nekadašnja Estremadura sa mikroklimom i morskim vetrovima. Crvena vina su elegantna i bogata taninima, bela su sveža i citrusna.',
    colorPreference: 'red_white'
  },
  {
    number: 7,
    name: 'Setúbal',
    specialAbility: '2 BESPLATNA VINSKA STRUČNJAKA! Angažujete 2 stručnjaka besplatno sa vrha bilo kog kupa.',
    initialVineyardBonus: 'Odmah uzimate 2 pločice vinskih stručnjaka licem nagore i vino vrednosti 2!',
    initialWineValue: 2,
    notes: 'U partiji za 2 igrača (Danijel i Ceca), zvanična preporuka pravila je da se ova regija UKLONI iz igre!',
    flavorText: 'Čuveno utvrđeno vino od Muskatela (Moscatel de Setúbal), jedno od najstarijih i najcenjenijih vina na svetu.',
    colorPreference: 'red_white'
  },
  {
    number: 8,
    name: 'Alentejo',
    specialAbility: 'KOCKICE RENOMEA VREDE DUPLO! Svaka kockica renomea ove regije vredi +2 Vrednosti umesto +1 (1 ili 2 kocke daju +2 ili +4)!',
    initialVineyardBonus: 'Standardno vino vrednosti 2 u skladište.',
    initialWineValue: 2,
    notes: 'Najmoćnija regija za manipulaciju vrednošću vina pri prodaji, izvozu i sajmu!',
    flavorText: 'Vrele i suve ravnice juga Portugala. Vina su bogata taninima, moćna i sa aromama divljeg crvenog voća. Poznata po međunarodnom uspehu.',
    colorPreference: 'red_heavy'
  },
  {
    number: 9,
    name: 'Algarve',
    specialAbility: 'TRAJNI BONUS +1 VREDNOST! Sva vina iz Algarve uvek imaju +1 na Wine Value pri prodaji, izvozu i Press Release-u!',
    initialVineyardBonus: 'Standardno vino vrednosti 2 u skladište.',
    initialWineValue: 2,
    notes: 'U partiji za 2 igrača (Danijel i Ceca), zvanična preporuka pravila je da se ova regija takođe UKLONI (igra se sa 7 regija)!',
    flavorText: 'Krajnji jug Portugala sa uticajem okeana i planina. Zbog turizma vinogradi su ređi, ali daju meka i izrazito voćna vina.',
    colorPreference: 'red_white'
  }
];

export interface MagnateTile {
  name: string;
  type: 'action' | 'multiplier';
  count: number;
  effect: string;
  cost?: string;
  multiplierText?: string;
}

export const MAGNATE_ACTIONS_2016: MagnateTile[] = [
  { name: 'Besplatan Vinski Stručnjak', type: 'action', count: 3, effect: 'Unajmite 1 vinskog stručnjaka sa bilo kog kupa besplatno (0 Bagosa).' },
  { name: 'Popust na Vinograd', type: 'action', count: 3, effect: 'Kupite 1 vinograd za 1 Bago manje od redovne cene.' },
  { name: 'Besplatna 2 Fair Poena', type: 'action', count: 3, effect: 'Odmah pomerite svoj marker za 2 Fair Poena unapred na traci sajma.' },
  { name: 'Dodatna Prodaja (Sales)', type: 'action', count: 2, effect: 'Izvršite akciju prodaje vina lokalnim lokalima.' },
  { name: 'Dodatni Izvoz (Export)', type: 'action', count: 2, effect: 'Izvršite akciju izvoza vina u strane zemlje.' },
  { name: 'Kupovina Vinarije za 2 Bagosa', type: 'action', count: 2, effect: 'Kupite 1 vinariju za 2 Bagosa (umesto 3).' },
  { name: 'Kupovina Podruma za 1 Bago', type: 'action', count: 1, effect: 'Kupite 1 podrum za samo 1 Bago (umesto 3).' },
  { name: 'Unajmljivanje Enologa za 2 Bagosa', type: 'action', count: 1, effect: 'Unajmite 1 enologa za 2 Bagosa (umesto 3).' },
  { name: 'Unajmljivanje Farmera za 1 Bago', type: 'action', count: 1, effect: 'Unajmite 1 farmera za 1 Bago (umesto 2).' }
];

export const WINE_EXPERTS_ABILITIES = [
  { feature: 'Novac', ability: 'Dobijate 2 Bagosa u gotovini iz opšte zalihe.' },
  { feature: 'Bure', ability: 'Vratite 1 bure odakle god (u 2016: ne može sa prostora Magnata).' },
  { feature: 'Kretanje', ability: 'Tokom kretanja na Quadrelu ne plaćate porez, drugim igračima, niti za udaljenost (potpuno besplatno kretanje)!' },
  { feature: 'Prespajanje', ability: 'Pre kupovine vinograda možete presložiti pločice vinograda te regije.' },
  { feature: 'Renome', ability: 'Dodajte 1 Kockicu Renomea u bilo koju regiju na mapi.' },
  { feature: 'Popust', ability: 'Tokom akcije kupovine vinograda platite 1 Bago manje za svaki kupljeni vinograd.' },
];
