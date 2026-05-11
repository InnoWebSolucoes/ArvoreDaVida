import { useState } from "react";

export default function Tasks({ tasks, toggleDone, delTask, saveNote, AREAS, PRIO, CAT_COLORS }) {
  const [areaFilter, setAreaFilter] = useState("all");
  const [prioFilter, setPrioFilter] = useState("all");
  const [showDone,   setShowDone]   = useState(false);
  const [expanded,   setExpanded]   = useState(null);
  const [editId,     setEditId]     = useState(null);
  const [noteDraft,  setNoteDraft]  = useState("");

  const filtered = tasks.filter(t => {
    if (!showDone && t.done) return false;
    if (areaFilter !== "all" && t.area !== areaFilter) return false;
    if (prioFilter !== "all" && t.prio !== prioFilter) return false;
    return true;
  });

  const startEdit = (t) => { setEditId(t.id); setNoteDraft(t.notes || ""); };

  return (
    <div className="flex flex-col h-full">
      {/* Filtros */}
      <div className="sticky top-0 bg-[#faf8f5] z-10 px-4 pt-4 pb-2 space-y-2 border-b border-stone-200">
        {/* Filtro por área */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <FilterChip active={areaFilter === "all"} onClick={() => setAreaFilter("all")} color="#6b7280">Todas</FilterChip>
          {AREAS.map(a => (
            <FilterChip key={a.key} active={areaFilter === a.key} onClick={() => setAreaFilter(a.key)} color={a.color}>
              {a.label}
            </FilterChip>
          ))}
        </div>
        {/* Filtro por prioridade + mostrar feitas */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 flex-1">
            <FilterChip active={prioFilter === "all"} onClick={() => setPrioFilter("all")} color="#6b7280" sm>Todas</FilterChip>
            {PRIO.map(p => (
              <FilterChip key={p.key} active={prioFilter === p.key} onClick={() => setPrioFilter(p.key)} color={p.color} sm>
                {p.emoji} {p.label}
              </FilterChip>
            ))}
          </div>
          <button
            onClick={() => setShowDone(v => !v)}
            className={`text-xs px-2.5 py-1 rounded-full border shrink-0 transition-colors ${
              showDone ? "bg-stone-200 border-stone-300 text-stone-700" : "border-stone-200 text-stone-400"
            }`}
          >
            {showDone ? "Ocultar feitas" : "Mostrar feitas"}
          </button>
        </div>
      </div>

      {/* Lista de tarefas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filtered.length === 0 && (
          <p className="text-center text-stone-400 text-sm py-8">Nenhuma tarefa para este filtro.</p>
        )}
        {filtered.map(t => (
          <TaskCard
            key={t.id}
            task={t}
            expanded={expanded === t.id}
            onToggleExpand={() => setExpanded(expanded === t.id ? null : t.id)}
            onToggleDone={() => toggleDone(t.id)}
            onDelete={() => delTask(t.id)}
            onSaveNote={(note) => { saveNote(t.id, note); setEditId(null); }}
            editId={editId}
            noteDraft={noteDraft}
            setNoteDraft={setNoteDraft}
            startEdit={() => startEdit(t)}
            CAT_COLORS={CAT_COLORS}
            PRIO_COLORS={{ regar:"#2A6FAA", nutrir:"#3A7D3A", podar:"#8B5E3C" }}
            PRIO_EMOJI={{ regar:"💧", nutrir:"🌿", podar:"🌾" }}
          />
        ))}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, color, children, sm }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border transition-colors font-medium whitespace-nowrap ${
        sm ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1"
      } ${active ? "text-white border-transparent" : "border-stone-200 text-stone-500 bg-white"}`}
      style={active ? { background: color, borderColor: color } : {}}
    >
      {children}
    </button>
  );
}

function TaskCard({ task: t, expanded, onToggleExpand, onToggleDone, onDelete, onSaveNote,
  editId, noteDraft, setNoteDraft, startEdit, CAT_COLORS, PRIO_COLORS, PRIO_EMOJI }) {

  const aColor = CAT_COLORS[t.area] || "#6b7280";
  const pColor = PRIO_COLORS[t.prio] || "#6b7280";
  const pEmoji = PRIO_EMOJI[t.prio] || "";

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all ${
      t.done ? "border-stone-100 opacity-60" : "border-stone-200"
    }`}>
      <div className="flex">
        <div className="w-1 shrink-0 rounded-l-2xl" style={{ background: aColor }} />

        <div className="flex-1 p-3">
          {/* Cabeçalho */}
          <div className="flex items-start gap-2">
            <button
              onClick={onToggleDone}
              className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                t.done ? "border-green-400 bg-green-400" : "border-stone-300"
              }`}
            >
              {t.done && <span className="text-white text-xs leading-none">✓</span>}
            </button>

            <div className="flex-1 min-w-0" onClick={onToggleExpand}>
              <p className={`text-sm font-medium leading-snug ${t.done ? "line-through text-stone-400" : "text-stone-800"}`}>
                {t.title}
              </p>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium text-white" style={{ background: pColor }}>
                  {pEmoji} {t.prio}
                </span>
                {t.notes && (
                  <span className="text-[10px] text-stone-400">📝 nota</span>
                )}
                {t.steps.length > 0 && (
                  <span className="text-[10px] text-stone-400">{t.steps.length} etapa{t.steps.length !== 1 ? "s" : ""}</span>
                )}
              </div>
            </div>

            <button onClick={onToggleExpand} className="shrink-0 text-stone-300 text-sm p-1">
              {expanded ? "▲" : "▼"}
            </button>
          </div>

          {/* Conteúdo expandido */}
          {expanded && (
            <div className="mt-3 space-y-3 pl-7">
              <p className="text-xs text-stone-500 leading-relaxed">{t.detail}</p>

              {/* Objetivo */}
              <div className="bg-stone-50 rounded-xl p-3">
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Objetivo</p>
                <p className="text-xs text-stone-600">{t.obj}</p>
              </div>

              {/* Etapas */}
              {t.steps.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Etapas</p>
                  <ol className="space-y-1">
                    {t.steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-600">
                        <span className="shrink-0 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white mt-0.5"
                          style={{ background: aColor }}>
                          {i+1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Notas */}
              <div>
                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Notas</p>
                {editId === t.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={noteDraft}
                      onChange={e => setNoteDraft(e.target.value)}
                      rows={3}
                      className="w-full text-xs border border-stone-200 rounded-xl p-2.5 focus:outline-none focus:border-stone-400 bg-white"
                      placeholder="Adicionar nota…"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button onClick={() => onSaveNote(noteDraft)}
                        className="text-xs bg-stone-800 text-white px-3 py-1.5 rounded-lg font-medium">Salvar</button>
                      <button onClick={() => {}}
                        className="text-xs text-stone-400 px-3 py-1.5 rounded-lg">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <p className="flex-1 text-xs text-stone-500 italic">{t.notes || "Sem notas ainda."}</p>
                    <button onClick={startEdit} className="text-stone-300 text-xs shrink-0">✏️</button>
                  </div>
                )}
              </div>

              {/* Remover */}
              <div className="pt-1">
                <button onClick={onDelete} className="text-[10px] text-red-400 hover:text-red-600 transition-colors">
                  Remover tarefa
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
