import { useState } from "react";

export default function Settings({ apiKey, setApiKey, notify, AREAS, sbReady, syncing, onSupabaseSaved }) {
  // As credenciais vêm do ambiente na app publicada. O painel técnico existe
  // apenas como recurso caso algo falhe — fica escondido por omissão.
  const [showTech, setShowTech] = useState(false);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">

      {/* Estado — linguagem simples, sem jargão */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
        <div className="flex items-center gap-3">
          <span className="text-2xl shrink-0">{syncing ? "⟳" : sbReady ? "✅" : "📱"}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-stone-800">
              {syncing ? "A guardar…" : sbReady ? "Tudo guardado" : "Guardado neste aparelho"}
            </p>
            <p className="text-xs text-stone-500 leading-relaxed mt-0.5">
              {syncing
                ? "A sincronizar as suas alterações."
                : sbReady
                  ? "As suas tarefas, o diário e o plano são guardados automaticamente. Pode fechar a app sem perder nada."
                  : "As suas notas ficam guardadas neste aparelho. Aparecem aqui sempre que voltar."}
            </p>
          </div>
        </div>
      </section>

      {/* Guia de áreas */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Guia de Áreas</h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          Cada tarefa vive numa parte da árvore. Se estiver em dúvida sobre onde colocar algo, veja aqui.
        </p>
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

      {/* Prioridades */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">As três prioridades</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 space-y-2.5">
          <PrioRow emoji="💧" label="Regar"  text="Urgente. Precisa de atenção agora, ou algo se perde." />
          <PrioRow emoji="🌿" label="Nutrir" text="Importante, mas sem pressa. É o que faz crescer." />
          <PrioRow emoji="🌾" label="Podar"  text="Pode esperar. Faça quando houver espaço e vontade." />
        </div>
      </section>

      {/* Sobre */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 text-center space-y-1">
        <p className="text-sm font-semibold text-stone-700">🌳 Árvore da Vida</p>
        <p className="text-xs text-stone-400">Um organizador pessoal vivo — raízes, tronco, seiva, flores, frutos.</p>
      </section>

      {/* Painel técnico — escondido por omissão */}
      <div className="pt-2 text-center">
        <button
          onClick={() => setShowTech(v => !v)}
          className="text-[10px] text-stone-300 hover:text-stone-400 transition-colors"
        >
          {showTech ? "Ocultar definições avançadas" : "Definições avançadas"}
        </button>
      </div>

      {showTech && (
        <TechPanel
          apiKey={apiKey} setApiKey={setApiKey} notify={notify}
          sbReady={sbReady} syncing={syncing} onSupabaseSaved={onSupabaseSaved}
        />
      )}
    </div>
  );
}

function PrioRow({ emoji, label, text }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="shrink-0 text-base leading-tight">{emoji}</span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-stone-700">{label}</p>
        <p className="text-xs text-stone-500 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

// ── Painel técnico ─────────────────────────────────────────────────────────
// Só é montado quando alguém abre as definições avançadas de propósito.

function TechPanel({ apiKey, setApiKey, notify, sbReady, syncing, onSupabaseSaved }) {
  const [apiDraft, setApiDraft] = useState(apiKey);
  const [showApi,  setShowApi]  = useState(false);
  const [sbUrl,    setSbUrl]    = useState(() => localStorage.getItem("sb-url") || "");
  const [sbKey,    setSbKey]    = useState(() => localStorage.getItem("sb-key") || "");
  const [showSb,   setShowSb]   = useState(false);

  const envAiKey = import.meta.env.VITE_AI_KEY || "";
  const envSb    = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

  const saveApi = () => { setApiKey(apiDraft.trim()); notify("Chave OpenAI guardada"); };

  const saveSupabase = async () => {
    const url = sbUrl.trim(), key = sbKey.trim();
    if (!url || !key) { notify("URL e chave são obrigatórios"); return; }
    localStorage.setItem("sb-url", url);
    localStorage.setItem("sb-key", key);
    await onSupabaseSaved();
  };

  return (
    <div className="space-y-4 border-t border-stone-200 pt-4">
      <p className="text-[10px] text-stone-400 leading-relaxed">
        Estas definições já estão configuradas na app publicada. Só são necessárias
        se estiver a instalar a app de raiz. O esquema da base de dados está em
        <code className="mx-1 text-stone-500">supabase_schema.sql</code> no repositório.
      </p>

      <section className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-stone-800">🗄️ Base de dados</h2>
          {envSb
            ? <span className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-full shrink-0">● Do ambiente</span>
            : sbReady
              ? <span className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-full shrink-0">● Conectado</span>
              : <span className="text-[10px] text-stone-400 bg-stone-50 px-2 py-1 rounded-full shrink-0">Não configurado</span>}
        </div>

        {envSb ? (
          <p className="text-[10px] text-green-700 bg-green-50 rounded-lg px-3 py-2">
            ✓ Credenciais carregadas do ambiente — nada a fazer aqui.
          </p>
        ) : (
          <>
            <input
              type="url" value={sbUrl} onChange={e => setSbUrl(e.target.value)}
              placeholder="https://xxxxxxxxxxxx.supabase.co"
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-stone-400"
            />
            <div className="flex gap-2">
              <input
                type={showSb ? "text" : "password"} value={sbKey} onChange={e => setSbKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…"
                className="flex-1 text-sm border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-stone-400 font-mono text-xs"
              />
              <button onClick={() => setShowSb(v => !v)} className="text-xs text-stone-400 border border-stone-200 rounded-xl px-3 shrink-0">
                {showSb ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <button
              onClick={saveSupabase}
              disabled={!sbUrl.trim() || !sbKey.trim() || syncing}
              className="w-full bg-stone-800 text-white text-sm py-2.5 rounded-xl font-medium disabled:opacity-40"
            >
              {syncing ? "A sincronizar…" : "Guardar e sincronizar"}
            </button>
          </>
        )}
      </section>

      <section className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-stone-800">🔑 Chave OpenAI</h2>
          {(apiKey || envAiKey) && <span className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-full shrink-0">● Configurada</span>}
        </div>
        {envAiKey ? (
          <p className="text-[10px] text-green-700 bg-green-50 rounded-lg px-3 py-2">
            ✓ Chave carregada do ambiente — nada a fazer aqui.
          </p>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                type={showApi ? "text" : "password"} value={apiDraft} onChange={e => setApiDraft(e.target.value)}
                placeholder="sk-proj-…"
                className="flex-1 text-sm border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-stone-400 font-mono text-xs"
              />
              <button onClick={() => setShowApi(v => !v)} className="text-xs text-stone-400 border border-stone-200 rounded-xl px-3 shrink-0">
                {showApi ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <button onClick={saveApi} className="w-full bg-stone-800 text-white text-sm py-2.5 rounded-xl font-medium">
              Guardar chave
            </button>
          </>
        )}
      </section>
    </div>
  );
}
