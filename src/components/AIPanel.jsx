import { useState } from "react";

const DUMP_SYSTEM = `Personal life organiser. Extract tasks and return ONLY valid JSON.
Areas: raizes (past/base/identity), tronco (daily/house/kids), seiva (health/energy/mind), flores (becoming/work/future), frutos (achievements), seiva_elab (insights/dreams).
Priorities: regar (urgent), nutrir (important), podar (maintenance).
Format: {"tasks":[{"id":"u1","area":"tronco","prio":"regar","done":false,"title":"Short title","detail":"Context","obj":"Desired outcome","steps":["step1","step2"],"notes":""}]}
Generate unique IDs starting with u. Extract only actionable items. Return ONLY the JSON object, no other text. Write all text fields in Portuguese.`;

export default function AIPanel({ callAI, addTasks, notify }) {
  const [dump,    setDump]    = useState("");
  const [dLoad,   setDLoad]   = useState(false);
  const [dResult, setDResult] = useState(null);
  const [dError,  setDError]  = useState("");

  const handleDump = async () => {
    if (!dump.trim() || dLoad) return;
    setDLoad(true); setDResult(null); setDError("");
    try {
      const raw  = await callAI(dump.trim(), DUMP_SYSTEM, 1200);
      const json = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] || raw);
      setDResult(json.tasks || []);
    } catch (e) {
      setDError(e.message || "Falha ao interpretar a resposta.");
    } finally {
      setDLoad(false);
    }
  };

  const confirmDump = () => {
    if (!dResult) return;
    addTasks(dResult);
    notify(`${dResult.length} tarefa${dResult.length !== 1 ? "s" : ""} adicionada${dResult.length !== 1 ? "s" : ""}!`);
    setDump(""); setDResult(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">

      {/* Despejo mental */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-stone-800">🧠 Despejo Mental</h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Escreva tudo o que está na sua cabeça. A IA extrai as tarefas e coloca-as nas áreas certas.
          </p>
        </div>
        <textarea
          value={dump}
          onChange={e => setDump(e.target.value)}
          rows={6}
          className="w-full text-sm border border-stone-200 rounded-xl p-3 focus:outline-none focus:border-stone-400 bg-[#faf8f5]"
          placeholder="Preciso ligar para a escola, o pneu do carro ainda está baixo, devo marcar terapeuta…"
        />
        {dError && <p className="text-xs text-red-500">{dError}</p>}

        {/* Pré-visualização das tarefas extraídas */}
        {dResult && dResult.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-stone-500">
              {dResult.length} tarefa{dResult.length !== 1 ? "s" : ""} extraída{dResult.length !== 1 ? "s" : ""} — confirme para adicionar:
            </p>
            {dResult.map((t, i) => (
              <div key={i} className="flex items-start gap-2 bg-stone-50 rounded-xl p-3">
                <span className="text-[10px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded-full font-medium shrink-0">{t.area}</span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-stone-700">{t.title}</p>
                  {t.detail && <p className="text-[10px] text-stone-400 mt-0.5">{t.detail}</p>}
                </div>
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <button onClick={confirmDump} className="flex-1 bg-stone-800 text-white text-sm py-2.5 rounded-xl font-medium">
                Adicionar todas as tarefas
              </button>
              <button onClick={() => setDResult(null)} className="px-4 text-sm text-stone-400 border border-stone-200 rounded-xl">
                Descartar
              </button>
            </div>
          </div>
        )}

        {!dResult && (
          <button
            onClick={handleDump}
            disabled={!dump.trim() || dLoad}
            className="w-full bg-stone-800 text-white text-sm py-3 rounded-xl font-medium disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {dLoad ? <><Spinner /> Extraindo…</> : "Extrair tarefas"}
          </button>
        )}
      </section>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
