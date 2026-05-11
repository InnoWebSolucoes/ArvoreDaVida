import { useState } from "react";

const SQL = `-- Run this once in Supabase → SQL Editor

create table if not exists tasks (
  id     text primary key,
  area   text,
  prio   text,
  done   boolean default false,
  title  text,
  detail text default '',
  obj    text default '',
  steps  jsonb default '[]',
  notes  text default ''
);

create table if not exists diary (
  date    text primary key,
  mood    text default '',
  energy  text default '',
  sleep   text default '',
  note    text default '',
  entries jsonb default '[]'
);

-- Row Level Security (allow all — personal app)
alter table tasks enable row level security;
alter table diary enable row level security;

create policy "allow all" on tasks for all using (true) with check (true);
create policy "allow all" on diary for all using (true) with check (true);`;

export default function Settings({ apiKey, setApiKey, notify, AREAS, sbReady, syncing, onSupabaseSaved }) {
  const [apiDraft, setApiDraft] = useState(apiKey);
  const [showApi,  setShowApi]  = useState(false);

  const [sbUrl,    setSbUrl]    = useState(() => import.meta.env.VITE_SUPABASE_URL || localStorage.getItem("sb-url") || "");
  const [sbKey,    setSbKey]    = useState(() => import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem("sb-key") || "");
  const [showSb,   setShowSb]   = useState(false);
  const [showSql,  setShowSql]  = useState(false);
  const [copied,   setCopied]   = useState(false);

  const envAiKey = import.meta.env.VITE_AI_KEY || "";
  const saveApi = () => { setApiKey(apiDraft.trim()); notify("OpenAI key saved"); };

  const saveSupabase = async () => {
    const url = sbUrl.trim();
    const key = sbKey.trim();
    if (!url || !key) { notify("Both URL and key are required"); return; }
    localStorage.setItem("sb-url", url);
    localStorage.setItem("sb-key", key);
    await onSupabaseSaved();
  };

  const copySql = () => {
    navigator.clipboard.writeText(SQL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">

      {/* Supabase */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-stone-800">🗄️ Supabase Database</h2>
            <p className="text-xs text-stone-400 mt-0.5">Get URL + Anon Key from your Supabase project → Settings → API.</p>
          </div>
          {sbReady  && <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">● Connected</span>}
          {syncing  && <span className="text-xs text-amber-500 font-medium bg-amber-50 px-2 py-1 rounded-full">⟳ Syncing</span>}
          {!sbReady && !syncing && <span className="text-xs text-stone-400 bg-stone-50 px-2 py-1 rounded-full">Not set</span>}
        </div>

        {/* Step 1: SQL */}
        <div className="bg-stone-50 rounded-xl p-3 space-y-2">
          <p className="text-xs font-semibold text-stone-600">Step 1 — Create tables in Supabase</p>
          <p className="text-xs text-stone-400">Go to your Supabase project → SQL Editor → paste and run this:</p>
          <button
            onClick={() => setShowSql(v => !v)}
            className="text-xs text-stone-500 underline"
          >
            {showSql ? "Hide SQL" : "Show SQL"}
          </button>
          {showSql && (
            <div className="relative">
              <pre className="text-[9px] bg-stone-900 text-green-300 rounded-xl p-3 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {SQL}
              </pre>
              <button
                onClick={copySql}
                className="absolute top-2 right-2 text-[10px] bg-stone-700 hover:bg-stone-600 text-white px-2 py-1 rounded-lg transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
        </div>

        {/* Step 2: credentials */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-stone-600">Step 2 — Enter your credentials</p>
          <input
            type="url"
            value={sbUrl}
            onChange={e => setSbUrl(e.target.value)}
            placeholder="https://xxxxxxxxxxxx.supabase.co"
            className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-stone-400"
          />
          <div className="flex gap-2">
            <input
              type={showSb ? "text" : "password"}
              value={sbKey}
              onChange={e => setSbKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…"
              className="flex-1 text-sm border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-stone-400 font-mono text-xs"
            />
            <button onClick={() => setShowSb(v => !v)} className="text-xs text-stone-400 border border-stone-200 rounded-xl px-3 shrink-0">
              {showSb ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          onClick={saveSupabase}
          disabled={!sbUrl.trim() || !sbKey.trim() || syncing}
          className="w-full bg-stone-800 text-white text-sm py-2.5 rounded-xl font-medium disabled:opacity-40"
        >
          {syncing ? "Syncing…" : "Save & sync to Supabase"}
        </button>
        <p className="text-[10px] text-stone-400 text-center">Saves credentials in your browser, then uploads all data to Supabase.</p>
      </section>

      {/* OpenAI API Key */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-stone-800">🔑 OpenAI API Key</h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Required for Brain Dump and Grounding. Get it at platform.openai.com → API Keys.
            </p>
          </div>
          {(apiKey || envAiKey) && <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">● Set</span>}
        </div>
        {envAiKey && (
          <p className="text-[10px] text-green-700 bg-green-50 rounded-lg px-3 py-2">
            ✓ Key loaded from environment — no need to enter manually.
          </p>
        )}
        {!envAiKey && (
          <>
            <div className="flex gap-2">
              <input
                type={showApi ? "text" : "password"}
                value={apiDraft}
                onChange={e => setApiDraft(e.target.value)}
                placeholder="sk-proj-…"
                className="flex-1 text-sm border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-stone-400 font-mono text-xs"
              />
              <button onClick={() => setShowApi(v => !v)} className="text-xs text-stone-400 border border-stone-200 rounded-xl px-3 shrink-0">
                {showApi ? "Hide" : "Show"}
              </button>
            </div>
            <button onClick={saveApi} className="w-full bg-stone-800 text-white text-sm py-2.5 rounded-xl font-medium">
              Save key
            </button>
          </>
        )}
      </section>

      {/* Keys reference */}
      <section className="bg-amber-50 rounded-2xl p-4 border border-amber-100 space-y-2">
        <h2 className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Keys you need</h2>
        <KeyRow emoji="🔑" label="OpenAI API Key"     where="platform.openai.com → API Keys" usedFor="Brain Dump, Panic/Grounding" />
        <KeyRow emoji="🗄️" label="Supabase URL"       where="Supabase project → Settings → API" usedFor="Database (all data)" />
        <KeyRow emoji="🗄️" label="Supabase Anon Key"  where="Supabase project → Settings → API" usedFor="Database (all data)" />
      </section>

      {/* Area guide */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Area Guide</h2>
        {AREAS.map(a => (
          <div key={a.key} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: a.color }} />
              <span className="text-sm font-semibold text-stone-800">{a.label}</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed pl-4">{a.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 text-center space-y-1">
        <p className="text-sm font-semibold text-stone-700">🌳 Árvore da Vida</p>
        <p className="text-xs text-stone-400">A living personal organiser — roots, trunk, sap, flowers, fruits.</p>
      </section>
    </div>
  );
}

function KeyRow({ emoji, label, where, usedFor }) {
  return (
    <div className="flex items-start gap-2 py-1.5 border-b border-amber-100 last:border-0">
      <span className="shrink-0">{emoji}</span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-amber-900">{label}</p>
        <p className="text-[10px] text-amber-700">From: {where}</p>
        <p className="text-[10px] text-amber-600">Used for: {usedFor}</p>
      </div>
    </div>
  );
}
