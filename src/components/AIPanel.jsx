import { useState } from "react";

const DUMP_SYSTEM = `Organizador de vida pessoal. Extrai tarefas e devolve APENAS JSON valido.

Areas: raizes (passado/base/identidade), tronco (dia-a-dia/casa/filhos), seiva (saude/energia/mente), flores (tornar-se/trabalho/futuro), frutos (conquistas), seiva_elab (insights/sonhos).
Prioridades: regar (urgente), nutrir (importante), podar (manutencao).

Formato: {"tasks":[{"id":"u1","area":"tronco","prio":"regar","done":false,"title":"Titulo curto","detail":"Contexto","obj":"Resultado desejado","steps":["passo1","passo2"],"notes":""}]}

REGRAS DE ESCRITA (importantes):
- Escreve tudo em portugues europeu, natural e direto.
- NUNCA uses travessoes nem hifens longos. Usa virgulas, pontos ou parenteses.
- Nao uses dois pontos para explicar dentro do titulo.
- Titulos curtos, como uma pessoa os escreveria numa lista. Comeca por um verbo.
- Sem linguagem de assistente: nada de "Certifique-se de", "Nao se esqueca de", "E importante".
- Sem emojis, sem markdown, sem asteriscos, sem aspas decorativas.
- Escreve como a propria pessoa escreveria a si mesma, nao como um relatorio.

Gera IDs unicos comecados por u. Extrai apenas itens acionaveis. Devolve APENAS o objeto JSON, sem mais texto.`;

// Remove tracos tipo IA e outros artefactos do texto devolvido pelo modelo.
const clean = (v) => {
  if (typeof v !== "string") return v;
  return v
    .replace(/\s*[—–]\s*/g, ", ")   // travessao e meia-risca
    .replace(/\*\*/g, "")                     // negrito markdown
    .replace(/^[\s"'“”]+|[\s"'“”]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
};

const cleanTask = (t) => ({
  ...t,
  title:  clean(t.title),
  detail: clean(t.detail),
  obj:    clean(t.obj),
  notes:  clean(t.notes),
  steps:  Array.isArray(t.steps) ? t.steps.map(clean).filter(Boolean) : [],
});

export default function AIPanel({ callAI, addTasks, notify, CAT_COLORS, CAT_LABELS }) {
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
      setDResult((json.tasks || []).map(cleanTask));
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
          <h2 className="text-base font-semibold text-stone-800">Despejo Mental</h2>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed">
            Escreva tudo o que lhe pesa na cabeça, sem ordem nem cuidado.
            As tarefas são separadas e arrumadas nas áreas certas.
          </p>
        </div>
        <textarea
          value={dump}
          onChange={e => setDump(e.target.value)}
          rows={6}
          className="w-full text-sm border border-stone-200 rounded-xl p-3 focus:outline-none focus:border-stone-400 bg-[#faf8f5]"
          placeholder="Preciso de ligar para a escola, o pneu ainda está baixo, tenho de marcar a terapeuta…"
        />
        {dError && <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{dError}</p>}

        {/* Pré-visualização das tarefas extraídas */}
        {dResult && dResult.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-stone-500">
              {dResult.length} tarefa{dResult.length !== 1 ? "s" : ""} encontrada{dResult.length !== 1 ? "s" : ""}. Confirme para adicionar.
            </p>
            {dResult.map((t, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-stone-50 rounded-xl p-3 border border-stone-100">
                <span
                  className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                  style={{ background: CAT_COLORS[t.area] || "#a8a29e" }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-stone-800 leading-snug">{t.title}</p>
                  {t.detail && <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">{t.detail}</p>}
                  <p className="text-[10px] text-stone-400 mt-1.5">{CAT_LABELS[t.area] || t.area}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <button onClick={confirmDump} className="flex-1 bg-stone-800 text-white text-sm py-2.5 rounded-xl font-medium">
                Adicionar tudo
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
            {dLoad ? <><Spinner /> A ler…</> : "Organizar isto"}
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
