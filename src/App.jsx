import { useState, useEffect } from "react";
import { AREAS, PRIO, CAT_COLORS, CAT_LABELS, INIT_TASKS, INIT_DIARY, MODEL } from "./data";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import Diary from "./components/Diary";
import AIPanel from "./components/AIPanel";
import Settings from "./components/Settings";

const today = () => new Date().toISOString().slice(0, 10);

const lsGet = (k, fb) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

const NAV = [
  { key:"dashboard", label:"Tree",     icon:"🌳" },
  { key:"tasks",     label:"Tasks",    icon:"✅" },
  { key:"diary",     label:"Diary",    icon:"📖" },
  { key:"ai",        label:"AI",       icon:"🤖" },
  { key:"settings",  label:"Settings", icon:"⚙️" },
];

export default function App() {
  const [tasks,  setTasks]  = useState(() => lsGet("mytree-v2",    INIT_TASKS));
  const [diary,  setDiary]  = useState(() => lsGet("mydiary-v2",   INIT_DIARY));
  const [apiKey, setApiKey] = useState(() => lsGet("mytree-apikey", ""));
  const [tab,    setTab]    = useState("dashboard");
  const [notif,  setNotif]  = useState(null);

  useEffect(() => { lsSet("mytree-v2",    tasks);  }, [tasks]);
  useEffect(() => { lsSet("mydiary-v2",   diary);  }, [diary]);
  useEffect(() => { lsSet("mytree-apikey", apiKey); }, [apiKey]);

  const notify     = (m) => { setNotif(m); setTimeout(() => setNotif(null), 2500); };
  const toggleDone = (id) => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const delTask    = (id) => { setTasks(ts => ts.filter(t => t.id !== id)); notify("Removed"); };
  const saveNote   = (id, note) => setTasks(ts => ts.map(t => t.id === id ? { ...t, notes: note } : t));
  const addTasks   = (newTasks) => setTasks(ts => [...ts, ...newTasks]);

  const callClaude = async (messages, system, maxTokens = 1000) => {
    if (!apiKey) throw new Error("No API key. Add it in Settings.");
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages }),
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.error?.message || "API error"); }
    const d = await r.json();
    return d.content[0].text;
  };

  const shared = {
    tasks, diary, setDiary, apiKey,
    toggleDone, delTask, saveNote, addTasks,
    callClaude, notify,
    AREAS, PRIO, CAT_COLORS, CAT_LABELS, today,
  };

  return (
    <div className="flex flex-col h-screen bg-[#faf8f5] md:flex-row overflow-hidden">

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-52 shrink-0 bg-white border-r border-stone-200 py-6 gap-1">
        <div className="px-5 mb-4">
          <h1 className="text-lg font-semibold text-stone-800">🌳 Árvore da Vida</h1>
        </div>
        {NAV.map(n => (
          <button
            key={n.key}
            onClick={() => setTab(n.key)}
            className={`flex items-center gap-3 mx-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              tab === n.key
                ? "bg-stone-100 text-stone-900"
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
            }`}
          >
            <span className="text-base">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-stone-200 shrink-0">
          <h1 className="text-base font-semibold text-stone-800">🌳 Árvore da Vida</h1>
          <span className="text-xs text-stone-400 font-medium">{NAV.find(n => n.key === tab)?.label}</span>
        </header>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto tab-content">
          {tab === "dashboard" && <Dashboard {...shared} />}
          {tab === "tasks"     && <Tasks     {...shared} />}
          {tab === "diary"     && <Diary     {...shared} />}
          {tab === "ai"        && <AIPanel   {...shared} />}
          {tab === "settings"  && <Settings  apiKey={apiKey} setApiKey={setApiKey} notify={notify} AREAS={AREAS} />}
        </div>

        {/* Mobile bottom nav */}
        <nav className="md:hidden flex border-t border-stone-200 bg-white pb-safe shrink-0">
          {NAV.map(n => (
            <button
              key={n.key}
              onClick={() => setTab(n.key)}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
                tab === n.key ? "text-stone-900" : "text-stone-400"
              }`}
            >
              <span className="text-xl leading-none">{n.icon}</span>
              <span className="text-[9px] font-medium">{n.label}</span>
              {tab === n.key && <span className="w-1 h-1 rounded-full bg-stone-800" />}
            </button>
          ))}
        </nav>
      </main>

      {/* Toast notification */}
      {notif && (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50 pointer-events-none whitespace-nowrap">
          {notif}
        </div>
      )}
    </div>
  );
}
