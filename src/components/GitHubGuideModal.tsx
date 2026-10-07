import React, { useState } from 'react';
import { Github, Check, Copy, ExternalLink, Sparkles, Terminal, Globe } from 'lucide-react';

export const GitHubGuide: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const gitCommands = `# 1. Inicijalizuj git repozitorijum (ako već nisi)
git init

# 2. Dodaj sve fajlove i workflow za GitHub Actions
git add .
git commit -m "feat: Vinhos Deluxe mobile companion for Danijel & Ceca"

# 3. Poveži sa svojim GitHub repozitorijumom (npr. lejinad5/vinhos-deluxe-companion)
git branch -M main
git remote add origin https://github.com/TVOJE_KORISNICKO_IME/vinhos-deluxe-companion.git
git push -u origin main`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-br from-stone-900 to-amber-950/40 p-4 rounded-2xl border border-amber-900/40 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-200">GitHub Actions & Pages Objava</h2>
            <p className="text-xs text-stone-300">Automatski deployment na tvoj GitHub</p>
          </div>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed">
          Ova aplikacija je već <span className="text-amber-400 font-semibold">100% konfigurisana</span> za automatsko objavljivanje na GitHub Pages! Ubačen je fajl <code className="text-amber-300 bg-stone-950/80 px-1 py-0.5 rounded">.github/workflows/deploy.yml</code> i podešena je relativna putanja u Vite konfiguraciji.
        </p>
      </div>

      {/* Step by step guide */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Koraci za objavu (U 3 klika):
        </h3>

        {/* Step 1 */}
        <div className="bg-stone-900/80 p-3.5 rounded-xl border border-stone-800 flex gap-3">
          <div className="w-6 h-6 rounded-full bg-amber-900/60 border border-amber-500/50 flex items-center justify-center text-xs font-bold text-amber-300 shrink-0">
            1
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-stone-200">Kreiraj novi GitHub repozitorijum</h4>
            <p className="text-xs text-stone-400">
              Otvori <span className="text-amber-300">github.com/new</span> i napravi novi repozitorijum (npr. <code className="text-stone-300">vinhos-deluxe-companion</code>). Može biti Public ili Private.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-stone-900/80 p-3.5 rounded-xl border border-stone-800 flex gap-3">
          <div className="w-6 h-6 rounded-full bg-amber-900/60 border border-amber-500/50 flex items-center justify-center text-xs font-bold text-amber-300 shrink-0">
            2
          </div>
          <div className="space-y-2 flex-1">
            <h4 className="text-sm font-semibold text-stone-200">Push-uj kod na GitHub</h4>
            <p className="text-xs text-stone-400">
              Pokreni ove komande u terminalu projekta:
            </p>
            <div className="relative bg-stone-950 p-2.5 rounded-lg border border-stone-800 text-stone-300 font-mono text-[11px] overflow-x-auto">
              <pre className="whitespace-pre">{gitCommands}</pre>
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 bg-stone-800 hover:bg-stone-700 text-amber-300 px-2 py-1 rounded text-[10px] flex items-center gap-1 border border-stone-700 transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Kopirano!' : 'Kopiraj'}
              </button>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-stone-900/80 p-3.5 rounded-xl border border-stone-800 flex gap-3">
          <div className="w-6 h-6 rounded-full bg-amber-900/60 border border-amber-500/50 flex items-center justify-center text-xs font-bold text-amber-300 shrink-0">
            3
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-stone-200">Uključi GitHub Pages sa Actions</h4>
            <p className="text-xs text-stone-400">
              U svom repozitorijumu na GitHub-u idi na:
              <br />
              <strong className="text-stone-300">Settings → Pages → Build and deployment → Source</strong>
              <br />
              Izaberi <span className="text-emerald-400 font-bold bg-emerald-950/40 px-1 py-0.5 rounded border border-emerald-800/40">GitHub Actions</span>!
            </p>
            <p className="text-xs text-stone-400 pt-1">
              🎉 Čim se workflow završi za ~40 sekundi, aplikacija će biti živa na tvojoj adresi:
              <br />
              <span className="text-amber-400 font-mono">https://tvoje-ime.github.io/vinhos-deluxe-companion/</span>
            </p>
          </div>
        </div>
      </div>

      {/* Verification check */}
      <div className="bg-emerald-950/30 border border-emerald-800/40 p-3.5 rounded-xl flex items-center gap-3">
        <Globe className="w-5 h-5 text-emerald-400 shrink-0" />
        <div className="text-xs text-emerald-200">
          <span className="font-bold">Pripremljeno:</span> Relativne putanje (<code className="text-emerald-300">base: './'</code>), TypeScript build proveren, i GitHub Actions CI/CD workflow spreman u <code className="text-emerald-300">.github/workflows/deploy.yml</code>.
        </div>
      </div>
    </div>
  );
};
