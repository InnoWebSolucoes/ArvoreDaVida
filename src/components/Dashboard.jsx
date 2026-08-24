const HOUR_GREETING = (h) =>
  h < 5  ? "Boa noite"
: h < 13 ? "Bom dia"
: h < 20 ? "Boa tarde"
         : "Boa noite";

export default function Dashboard({ tasks, AREAS, slots, openTask, openArea, setTab }) {
  const active = tasks.filter(t => t.area !== "frutos");
  const total  = active.length;
  const done   = active.filter(t => t.done).length;
  const pct    = total > 0 ? Math.round((done / total) * 100) : 0;
  const urgent = active.filter(t => !t.done && t.prio === "regar");

  const now  = new Date();
  const hour = now.getHours();

  // Bloco do plano a decorrer agora.
  const nowHM = `${String(hour).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const currentSlot = (slots || []).find(s => s.start <= nowHM && nowHM < s.end);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">

      {/* Saudação */}
      <header className="pt-1">
        <h1 className="text-xl font-semibold text-stone-800 tracking-tight">
          {HOUR_GREETING(hour)}
        </h1>
        <p className="text-xs text-stone-400 mt-1">{prettyToday(now)}</p>
      </header>

      {/* A seguir — o bloco do plano a decorrer */}
      {currentSlot && (
        <button
          onClick={() => setTab("plan")}
          className="w-full text-left bg-stone-800 rounded-2xl p-4 text-white hover:bg-stone-700 transition-colors"
        >
          <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1.5">Agora</p>
          <div className="flex items-baseline gap-2.5">
            <span className="text-xs font-medium text-stone-400 shrink-0">{currentSlot.start}</span>
            <p className={`text-sm leading-snug ${currentSlot.done ? "line-through text-stone-500" : "text-white"}`}>
              {currentSlot.label}
            </p>
          </div>
        </button>
      )}

      {/* Progresso */}
      <button
        onClick={() => setTab("tasks")}
        className="w-full text-left bg-white rounded-2xl p-5 shadow-sm border border-stone-100 hover:border-stone-300 transition-colors"
      >
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-stone-600">A sua árvore</p>
            <p className="text-xs text-stone-400 mt-0.5">{done} de {total} tarefas</p>
          </div>
          <span className="text-3xl font-semibold text-stone-800 leading-none tabular-nums">{pct}%</span>
        </div>
        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: "linear-gradient(90deg,#3A7D3A,#2A7A55)" }}
          />
        </div>
      </button>

      {/* Precisa de atenção */}
      {urgent.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
            Precisa de atenção
          </h2>
          {urgent.slice(0, 4).map(t => (
            <button
              key={t.id}
              onClick={() => openTask(t.id)}
              className="w-full text-left bg-white rounded-xl px-4 py-3 shadow-sm border border-stone-100 flex items-center gap-3 hover:border-stone-300 active:bg-stone-50 transition-colors"
            >
              <span className="text-base shrink-0">💧</span>
              <p className="text-sm text-stone-700 leading-snug min-w-0 flex-1">{t.title}</p>
              <span className="text-stone-300 text-xs shrink-0">›</span>
            </button>
          ))}
          {urgent.length > 4 && (
            <button onClick={() => setTab("tasks")} className="text-xs text-stone-400 pl-1 hover:text-stone-600 transition-colors">
              e mais {urgent.length - 4}
            </button>
          )}
        </section>
      )}

      {/* Por área */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Por área</h2>
        {AREAS.map(area => {
          const aAll  = tasks.filter(t => t.area === area.key);
          const aDone = aAll.filter(t => t.done).length;
          const aPct  = aAll.length > 0 ? Math.round((aDone / aAll.length) * 100) : 0;
          const aUrg  = aAll.filter(t => !t.done && t.prio === "regar").length;

          return (
            <button
              key={area.key}
              onClick={() => openArea(area.key)}
              className="w-full text-left bg-white rounded-2xl p-4 shadow-sm border border-stone-100 hover:border-stone-300 active:bg-stone-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-semibold text-stone-800 truncate">{area.label}</span>
                  {aUrg > 0 && (
                    <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full font-medium shrink-0">
                      {aUrg}
                    </span>
                  )}
                </div>
                <span className="text-xs text-stone-400 shrink-0 tabular-nums">{aDone}/{aAll.length}</span>
              </div>
              <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${aPct}%`, background: area.color }}
                />
              </div>
            </button>
          );
        })}
      </section>

      {/* Conquistas recentes */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Feito recentemente</h2>
        {tasks.filter(t => t.done).slice(-3).reverse().map(t => (
          <button
            key={t.id}
            onClick={() => openTask(t.id)}
            className="w-full text-left bg-white rounded-xl px-4 py-3 shadow-sm border border-stone-100 flex items-center gap-3 hover:border-stone-300 active:bg-stone-50 transition-colors"
          >
            <span className="w-5 h-5 rounded-full bg-green-400 text-white text-xs flex items-center justify-center shrink-0">✓</span>
            <p className="text-sm text-stone-600 truncate min-w-0 flex-1">{t.title}</p>
            <span className="text-stone-300 text-xs shrink-0">›</span>
          </button>
        ))}
        {tasks.filter(t => t.done).length === 0 && (
          <p className="text-sm text-stone-400 text-center py-6">Ainda nada. Comece por uma coisa pequena.</p>
        )}
      </section>
    </div>
  );
}

const DAYS = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
const MONTHS = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

function prettyToday(d) {
  return `${DAYS[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
}
