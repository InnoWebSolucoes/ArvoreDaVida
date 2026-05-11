import { useState } from "react";

const fmtDate = (d) => {
  if (!d) return "";
  const p = d.split("-");
  const ms = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(d + "T12:00:00").getDay()]
    + " " + parseInt(p[2]) + " " + ms[parseInt(p[1]) - 1];
};

const MOODS   = ["😊","🙂","😐","😔","😢","😤","😰"];
const ENERGIES = ["⚡","🔥","✨","😴","🪫"];

export default function Diary({ diary, setDiary, CAT_COLORS, CAT_LABELS, today, AREAS }) {
  const todayStr = today();
  const [selDate,    setSelDate]    = useState(todayStr);
  const [addEntry,   setAddEntry]   = useState(false);
  const [entryText,  setEntryText]  = useState("");
  const [entryTime,  setEntryTime]  = useState(new Date().toTimeString().slice(0,5));
  const [entryCat,   setEntryCat]   = useState("tronco");
  const [editDay,    setEditDay]    = useState(false);

  const day = diary[selDate] || { mood:"", energy:"", sleep:"", note:"", entries:[] };
  const dates = Object.keys(diary).sort().reverse();

  const updateDay = (patch) => setDiary(selDate, patch);

  const addEntryFn = () => {
    if (!entryText.trim()) return;
    const newEntry = { time: entryTime, cat: entryCat, text: entryText.trim() };
    const entries = [...(day.entries || []), newEntry].sort((a,b) => a.time.localeCompare(b.time));
    updateDay({ entries });
    setEntryText(""); setAddEntry(false);
  };

  const delEntry = (i) => {
    const entries = day.entries.filter((_, idx) => idx !== i);
    updateDay({ entries });
  };

  const initDay = () => {
    if (!diary[selDate]) updateDay({ mood:"", energy:"", sleep:"", note:"", entries:[] });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Date selector */}
      <div className="sticky top-0 bg-[#faf8f5] z-10 px-4 pt-4 pb-2 border-b border-stone-200">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {/* Today first */}
          <DateChip date={todayStr} sel={selDate} onClick={() => { setSelDate(todayStr); initDay(); }} />
          {/* Other dates */}
          {dates.filter(d => d !== todayStr).map(d => (
            <DateChip key={d} date={d} sel={selDate} onClick={() => setSelDate(d)} />
          ))}
          {/* Custom date input */}
          <input
            type="date"
            onChange={e => { if (e.target.value) { setSelDate(e.target.value); initDay(); }}}
            className="shrink-0 text-xs border border-stone-200 rounded-full px-3 py-1 bg-white text-stone-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Day header */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-stone-800">{fmtDate(selDate)}</p>
              <p className="text-xs text-stone-400">{selDate}</p>
            </div>
            <button onClick={() => setEditDay(v => !v)} className="text-xs text-stone-400 border border-stone-200 rounded-full px-3 py-1">
              {editDay ? "Done" : "Edit"}
            </button>
          </div>

          {/* Mood / Energy / Sleep */}
          {editDay ? (
            <div className="space-y-3">
              <PickRow label="Mood" items={MOODS} val={day.mood} onPick={v => updateDay({ mood: v })} />
              <PickRow label="Energy" items={ENERGIES} val={day.energy} onPick={v => updateDay({ energy: v })} />
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 w-14">Sleep</span>
                <input
                  type="text" placeholder="e.g. 6h"
                  value={day.sleep || ""}
                  onChange={e => updateDay({ sleep: e.target.value })}
                  className="text-xs border border-stone-200 rounded-lg px-2 py-1 w-20 focus:outline-none"
                />
              </div>
              <div>
                <p className="text-xs text-stone-500 mb-1">Summary note</p>
                <textarea
                  value={day.note || ""}
                  onChange={e => updateDay({ note: e.target.value })}
                  rows={3}
                  className="w-full text-xs border border-stone-200 rounded-xl p-2.5 focus:outline-none bg-white"
                  placeholder="How was today overall?"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-3 text-sm">
                {day.mood    && <span title="Mood">{day.mood}</span>}
                {day.energy  && <span title="Energy">{day.energy}</span>}
                {day.sleep   && <span className="text-xs text-stone-400 self-center">💤 {day.sleep}</span>}
              </div>
              {day.note && <p className="text-xs text-stone-500 leading-relaxed">{day.note}</p>}
              {!day.mood && !day.note && (
                <p className="text-xs text-stone-300 italic">No summary yet — tap Edit to add.</p>
              )}
            </div>
          )}
        </div>

        {/* Timeline entries */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Timeline</h2>
            <button
              onClick={() => setAddEntry(v => !v)}
              className="text-xs bg-stone-800 text-white px-3 py-1.5 rounded-full font-medium"
            >
              {addEntry ? "Cancel" : "+ Add entry"}
            </button>
          </div>

          {/* Add entry form */}
          {addEntry && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <p className="text-[10px] text-stone-400 mb-1">Time</p>
                  <input
                    type="time"
                    value={entryTime}
                    onChange={e => setEntryTime(e.target.value)}
                    className="text-xs border border-stone-200 rounded-lg px-2 py-1.5 w-full focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-stone-400 mb-1">Area</p>
                  <select
                    value={entryCat}
                    onChange={e => setEntryCat(e.target.value)}
                    className="text-xs border border-stone-200 rounded-lg px-2 py-1.5 w-full focus:outline-none bg-white"
                  >
                    {AREAS.map(a => <option key={a.key} value={a.key}>{a.label}</option>)}
                  </select>
                </div>
              </div>
              <textarea
                value={entryText}
                onChange={e => setEntryText(e.target.value)}
                rows={3}
                className="w-full text-xs border border-stone-200 rounded-xl p-2.5 focus:outline-none bg-white"
                placeholder="What happened?"
                autoFocus
              />
              <button
                onClick={addEntryFn}
                disabled={!entryText.trim()}
                className="w-full text-sm bg-stone-800 text-white py-2.5 rounded-xl font-medium disabled:opacity-40"
              >
                Save entry
              </button>
            </div>
          )}

          {/* Entry list */}
          {(day.entries || []).length === 0 && !addEntry && (
            <p className="text-center text-stone-300 text-xs py-6">No entries for this day.</p>
          )}
          {(day.entries || []).map((e, i) => {
            const color = CAT_COLORS[e.cat] || "#6b7280";
            const label = CAT_LABELS[e.cat] || e.cat;
            return (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="flex">
                  <div className="w-1 shrink-0" style={{ background: color }} />
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-mono text-stone-400">{e.time}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white font-medium" style={{ background: color }}>
                          {label}
                        </span>
                      </div>
                      <button onClick={() => delEntry(i)} className="text-stone-200 hover:text-red-400 text-xs shrink-0 transition-colors">✕</button>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{e.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DateChip({ date, sel, onClick }) {
  const isToday = date === new Date().toISOString().slice(0,10);
  const active  = date === sel;
  const parts   = date.split("-");
  const ms      = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const label   = isToday ? "Today" : parseInt(parts[2]) + " " + ms[parseInt(parts[1])-1];
  return (
    <button
      onClick={onClick}
      className={`shrink-0 text-xs px-3 py-1 rounded-full border font-medium transition-colors ${
        active ? "bg-stone-800 text-white border-stone-800" : "bg-white border-stone-200 text-stone-500"
      }`}
    >
      {label}
    </button>
  );
}

function PickRow({ label, items, val, onPick }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-stone-500 w-14">{label}</span>
      <div className="flex gap-1.5 flex-wrap">
        {items.map(item => (
          <button
            key={item}
            onClick={() => onPick(item === val ? "" : item)}
            className={`text-lg leading-none p-1 rounded-lg transition-colors ${val === item ? "bg-stone-100" : "opacity-40 hover:opacity-70"}`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
