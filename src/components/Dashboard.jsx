export default function Dashboard({ tasks, AREAS, CAT_COLORS, today }) {
  const todayStr = today();
  const total  = tasks.length;
  const done   = tasks.filter(t => t.done).length;
  const pct    = total > 0 ? Math.round((done / total) * 100) : 0;
  const urgent = tasks.filter(t => !t.done && t.prio === "regar").length;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total" value={total} color="#3A7D3A" />
        <StatCard label="Done"  value={done}  color="#2A7A55" />
        <StatCard label="💧 Urgent" value={urgent} color="#AA3020" />
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-stone-600">Overall Progress</span>
          <span className="text-sm font-bold text-stone-800">{pct}%</span>
        </div>
        <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: "#3A7D3A" }}
          />
        </div>
      </div>

      {/* Area cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">By Area</h2>
        {AREAS.map(area => {
          const aTotal = tasks.filter(t => t.area === area.key).length;
          const aDone  = tasks.filter(t => t.area === area.key && t.done).length;
          const aPct   = aTotal > 0 ? Math.round((aDone / aTotal) * 100) : 0;
          const aUrg   = tasks.filter(t => t.area === area.key && !t.done && t.prio === "regar").length;

          return (
            <div key={area.key} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-stone-800">{area.label}</span>
                    {aUrg > 0 && (
                      <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                        {aUrg} urgent
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 leading-snug line-clamp-2">{area.desc}</p>
                </div>
                <div className="ml-3 text-right shrink-0">
                  <span className="text-lg font-bold" style={{ color: area.color }}>{aPct}%</span>
                  <p className="text-xs text-stone-400">{aDone}/{aTotal}</p>
                </div>
              </div>
              <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${aPct}%`, background: area.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent done */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Recently Done</h2>
        {tasks.filter(t => t.done).slice(-3).reverse().map(t => (
          <div key={t.id} className="bg-white rounded-xl px-4 py-3 shadow-sm border border-stone-100 flex items-center gap-3">
            <span className="text-green-500 text-lg shrink-0">✓</span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-stone-700 truncate">{t.title}</p>
              {t.notes && <p className="text-xs text-stone-400 truncate">{t.notes}</p>}
            </div>
          </div>
        ))}
        {tasks.filter(t => t.done).length === 0 && (
          <p className="text-sm text-stone-400 text-center py-4">No completed tasks yet.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-stone-100 text-center">
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
      <p className="text-xs text-stone-500 mt-0.5">{label}</p>
    </div>
  );
}
