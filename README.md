# 🍷 Vinhos Deluxe Companion (Mobilni Asistent)

Mobilni asistent i prateća aplikacija za društvenu igru **Vinhos Deluxe Edition** (autor: Vital Lacerda), sa posebnim fokusom na partiju za dva igrača: **Danijel (Žuti 🟡)** i **Ceca (Crvena 🔴)**.

---

## 🌟 Ključne Funkcionalnosti

1. **Vodič za Postavku Igre (2 Igrača):**
   - Interaktivna checklist-a za postavku table.
   - Prikaz 2-Player specifičnosti: postavljanje **Export rama (2-player frame overlay)**, priprema početnih resursa, vinograda, kockica renomea i buradi.

2. **Trigger za Kraj Igre & Zvanični Tie-Breaker:**
   - Detaljno objašnjenje kraja partije: nakon 3. Sajma na kraju 6. godine svaki igrač odigrava **još tačno 1 akciju** (pločice se NE okreću ponovo nagore!).
   - Hijerarhija Tie-breakera:
     1. Ukupno VP
     2. **1. Tie-break:** Više buradi u Export zoni (Izvoz)
     3. **2. Tie-break:** Preostali novac (Bagos)
   - Ugrađen interaktivni simulator izjednačenja uživo.

3. **Partija & Runda Tracker (Potez po potez):**
   - Praćenje godina 1 do 6 i faza: Početak godine (Vintage prognoza), 1. Akcija, 2. Akcija, Održavanje (vraćanje 1 bureta iz prodaje), Berba/Starenje i Sajmovi vina (godine 3, 5, 6).
   - Brzi brojači za Danijela i Cecu: Bagosi, Sajamski poeni, Burad u zalihi.

4. **Kalkulator Bodova (Danijel vs Ceca Duel):**
   - Zvanična tabela novca (0-2: 0, 3-5: 1, 6-8: 3, 9-11: 5, 12-14: 7, 15-17: 10, 18-20: 14, 21-23: 18, 24+: 22 VP).
   - Bodovanje vina na tabli (pola kvaliteta nadole).
   - Izvozne kolone sa većinama i podelom poena.
   - Multiplier pločice (samo sa buradima).
   - Sajamsko 2-player pravilo (1. i 3. mesto: 9/3, 12/4, 15/5 VP).
   - Automatsko proglašenje pobednika sa proverom tie-breakera!

5. **Kalkulator za Vino:**
   - Kvalitet pri berbi (Vinogradi +2, Vinarije +1, Farmeri +1, Enolozi +2, Porto +3, Vreme ±2).
   - Vrednost pri prodaji, izvozu i sajmu (Kvalitet + Podrum + Kockice renomea + Algarve bonus).

6. **Pretraga Pravila & Rešavanje Nedoumica (FAQ):**
   - Instant pretraga troškova kretanja na Quadrelu, starenja, magnata i čestih zabluda.

---

## 🚀 Objava na GitHub Pages (GitHub Actions)

Aplikacija je pripremljena sa automatskim CI/CD deploymentom:
- Workflow fajl: `.github/workflows/deploy.yml`
- Vite konfiguracija: `base: './'`

### Koraci za objavu:
```bash
# 1. Povežite repozitorijum
git init
git add .
git commit -m "feat: Vinhos Deluxe companion for Danijel and Ceca"
git branch -M main
git remote add origin https://github.com/TVOJE_IME/vinhos-deluxe-companion.git
git push -u origin main
```

Nakon push-a, na GitHub-u u podešavanjima repozitorijuma (`Settings` → `Pages` → `Source`) izaberite **GitHub Actions**. Aplikacija će automatski biti objavljena na GitHub Pages!
