import { useState } from "react";
import { FREE_LABEL } from "../data";

const PRIO_COLORS = { regar:"#2A6FAA", nutrir:"#3A7D3A", podar:"#8B5E3C" };
const PRIO_EMOJI  = { regar:"💧", nutrir:"🌿", podar:"🌾" };

export default function Plan({
  slots, tasks, planDate,
  toggleSlot, updateSlot, updateObs, regenPlan, openTask,
  CAT_COLORS, CAT_LABELS,
}) {
  const [editSlot,  setEditSlot]  = useState(null);
  const [draft,     setDraft]     = useState("");
  const [expSlot,   setExpSlot]   = useState(null);
  const [picker,    setPicker]    = useState(null);

  const doneN = slots.filter(s => s.done).length;

  const startEdit = (s) => {
    setEditSlot(s.slot);
    setDraft(s.label === FREE_LABEL ? "" : s.label);
  };

  const commitEdit = (s) => {
    updateSlot(s.slot, { label: draft.trim() || FREE_LABEL, area:"", taskId:null, suggested:false });
    setEditSlot(null);
  };

  const pickTask = (t) => {
    updateSlot(picker, { label:t.title, area:t.area, taskId:t.id, suggested:false });
    setPicker(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Cabeçalho */}
      <div className="sticky top-0 bg-[#faf8f5] z-10 px-4 pt-4 pb-2 border-b border-stone-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-stone-700">{prettyDate(planDate)}</p>
            <p className="text-[11px] text-stone-400 mt-0.5">
              {doneN} feitos · {slots.length - doneN} restantes
            </p>
          </div>
          <button
            onClick={regenPlan}
            className="text-xs px-3 py-1.5 rounded-full border border-stone-200 text-stone-500 bg-white hover:bg-stone-50 transition-colors shrink-0"
          >
            ↺ Novas sugestões
          </button>
        </div>
        <div className="h-1 bg-stone-200 rounded-full overflow-hidden mt-2.5">
          <div
            className="h-full bg-stone-700 rounded-full transition-all duration-500"
            style={{ width: `${Math.round(doneN / Math.max(slots.length, 1) * 100)}%` }}
          />
        </div>
      </div>

      {/* Blocos */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
        {slots.map(s => {
          const isFree   = s.label === FREE_LABEL;
          const aColor   = CAT_COLORS[s.area] || "#d6d3d1";
          const barColor = s.done ? "#4ade80" : s.anchor ? "#d0a030" : isFree ? "#e7e5e4" : aColor;
          const isEditing = editSlot === s.slot;
          const isExp     = expSlot === s.slot;

          return (
            <div
              key={s.slot}
              className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all ${
                s.done ? "border-stone-100 opacity-60" : s.anchor ? "border-amber-100" : "border-stone-200"
              }`}
            >
              <div className="flex">
                <div className="w-1 shrink-0" style={{ background: barColor }} />

                <div className="flex-1 p-3">
                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => toggleSlot(s.slot)}
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                        s.done ? "border-green-400 bg-green-400" : "border-stone-300"
                      }`}
                    >
                      {s.done && <span className="text-white text-xs leading-none">✓</span>}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Meta */}
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        <span className={`text-[10px] font-semibold ${s.anchor ? "text-amber-600" : "text-stone-400"}`}>
                          {s.start}
                        </span>
                        {s.anchor && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 font-medium">
                            âncora
                          </span>
                        )}
                        {s.suggested && !s.done && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 font-medium">
                            sugerido
                          </span>
                        )}
                        {s.area && !isFree && (
                          <span className="text-[9px] text-stone-400 ml-auto">{CAT_LABELS[s.area]}</span>
                        )}
                      </div>

                      {/* Rótulo ou edição */}
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            value={draft}
                            onChange={e => setDraft(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") commitEdit(s); if (e.key === "Escape") setEditSlot(null); }}
                            placeholder="O que vai fazer?"
                            autoFocus
                            className="w-full text-sm border border-stone-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-stone-400"
                          />
                          <div className="flex gap-2">
                            <button onClick={() => commitEdit(s)}
                              className="text-xs bg-stone-800 text-white px-3 py-1.5 rounded-lg font-medium">Salvar</button>
                            <button onClick={() => { setPicker(s.slot); setEditSlot(null); }}
                              className="text-xs text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg">Da árvore</button>
                            <button onClick={() => setEditSlot(null)}
                              className="text-xs text-stone-400 px-3 py-1.5 rounded-lg">Cancelar</button>
                          </div>
                        </div>
                      ) : s.taskId ? (
                        <button
                          onClick={() => openTask(s.taskId)}
                          className="text-left w-full group"
                        >
                          <p className={`text-sm leading-snug ${
                            s.done ? "line-through text-stone-400" : "font-medium text-stone-800 group-hover:text-stone-950"
                          }`}>
                            {s.label}
                            <span className="text-stone-300 text-xs ml-1.5">›</span>
                          </p>
                        </button>
                      ) : (
                        <p className={`text-sm leading-snug ${
                          s.done ? "line-through text-stone-400"
                            : isFree ? "italic text-stone-300"
                            : "font-medium text-stone-800"
                        }`}>
                          {s.label}
                        </p>
                      )}

                      {/* Observação */}
                      {isExp && !isEditing && (
                        <ObsField slot={s} onSave={obs => updateObs(s.slot, obs)} />
                      )}
                    </div>

                    {/* Ações */}
                    {!isEditing && (
                      <div className="flex flex-col gap-1 shrink-0">
                        <button onClick={() => startEdit(s)}
                          className="text-[10px] text-stone-400 px-1.5 py-0.5 rounded border border-stone-200">editar</button>
                        <button onClick={() => setExpSlot(isExp ? null : s.slot)}
                          className={`text-[10px] px-1.5 py-0.5 rounded border ${
                            s.obs ? "text-blue-600 border-blue-200 bg-blue-50" : "text-stone-400 border-stone-200"
                          }`}>
                          {isExp ? "▲" : "📝"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Seletor de tarefas */}
      {picker && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center p-3"
          onClick={e => { if (e.target === e.currentTarget) setPicker(null); }}
        >
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[70vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 shrink-0">
              <p className="text-sm font-semibold text-stone-800">Escolher tarefa para este bloco</p>
              <button onClick={() => setPicker(null)} className="text-stone-400 text-xl leading-none">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              {tasks.filter(t => !t.done && t.area !== "frutos").map(t => (
                <button
                  key={t.id}
                  onClick={() => pickTask(t)}
                  className="w-full text-left flex items-center gap-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 transition-colors"
                >
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white font-medium shrink-0"
                    style={{ background: PRIO_COLORS[t.prio] }}>
                    {PRIO_EMOJI[t.prio]}
                  </span>
                  <span className="text-xs text-stone-700 flex-1 leading-snug">{t.title}</span>
                  <span className="text-[9px] text-stone-400 shrink-0">{CAT_LABELS[t.area]}</span>
                </button>
              ))}
              {tasks.filter(t => !t.done && t.area !== "frutos").length === 0 && (
                <p className="text-center text-stone-400 text-sm py-6">Nenhuma tarefa pendente.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ObsField({ slot, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(slot.obs || "");

  if (!editing) {
    return (
      <div
        onClick={() => { setDraft(slot.obs || ""); setEditing(true); }}
        className={`mt-2 pt-2 border-t border-stone-100 text-xs cursor-pointer leading-relaxed ${
          slot.obs ? "text-stone-600" : "text-stone-300 italic"
        }`}
      >
        {slot.obs || "+ observação"}
      </div>
    );
  }

  return (
    <div className="mt-2 pt-2 border-t border-stone-100 space-y-2">
      <textarea
        value={draft}
        onChange={e => setDraft(e.target.value)}
        rows={3}
        autoFocus
        placeholder="O que aconteceu? Dose, insight, quanto tempo, como se sentiu…"
        className="w-full text-xs border border-stone-200 rounded-xl p-2.5 focus:outline-none focus:border-stone-400 bg-white"
      />
      <div className="flex gap-2">
        <button onClick={() => { onSave(draft); setEditing(false); }}
          className="text-xs bg-stone-800 text-white px-3 py-1.5 rounded-lg font-medium">Salvar</button>
        <button onClick={() => setEditing(false)}
          className="text-xs text-stone-400 px-3 py-1.5 rounded-lg">Cancelar</button>
      </div>
    </div>
  );
}

const DAYS = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
const MONTHS = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

function prettyDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return `${DAYS[dt.getDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
}
