import { useState, useEffect, useCallback } from "react";
import { AREAS, PRIO, CAT_COLORS, CAT_LABELS, INIT_TASKS, INIT_DIARY, AI_MODEL, AI_URL } from "./data";
import { isConfigured, resetClient } from "./supabase";
import {
  dbLoadTasks, dbUpsertTask, dbDeleteTask, dbUpsertAllTasks,
  dbLoadDiary, dbUpsertDiaryDay, dbUpsertAllDiary,
} from "./db";
import Dashboard from "./components/Dashboard";
import Tasks     from "./components/Tasks";
import Diary     from "./components/Diary";
import AIPanel   from "./components/AIPanel";
import Settings  from "./components/Settings";

const today = () => new Date().toISOString().slice(0, 10);

const lsGet = (k, fb) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } };
const lsSet = (k, v)  => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

const NAV = [
  { key:"dashboard", label:"Tree",     icon:"🌳" },
  { key:"tasks",     label:"Tasks",    icon:"✅" },
  { key:"diary",     label:"Diary",    icon:"📖" },
  { key:"ai",        label:"AI",       icon:"🤖" },
  { key:"settings",  label:"Settings", icon:"⚙️" },
];

export default function App() {
  const [tasks,   setTasks]   = useState(() => lsGet("mytree-v2",    INIT_TASKS));
  const [diary,   setDiary]   = useState(() => lsGet("mydiary-v2",   INIT_DIARY));
  const [apiKey,  setApiKey]  = useState(() => lsGet("mytree-apikey", ""));
  const [tab,     setTab]     = useState("dashboard");
  const [notif,   setNotif]   = useState(null);
  const [sbReady, setSbReady] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // ── Persist to localStorage ─────────────────────────────────────────────
  useEffect(() => { lsSet("mytree-v2",    tasks);  }, [tasks]);
  useEffect(() => { lsSet("mydiary-v2",   diary);  }, [diary]);
  useEffect(() => { lsSet("mytree-apikey", apiKey); }, [apiKey]);

  // ── Load from Supabase on mount ─────────────────────────────────────────
  useEffect(() => {
    if (!isConfigured()) return;
    setSyncing(true);
    Promise.all([dbLoadTasks(), dbLoadDiary()])
      .then(([t, d]) => {
        if (t && t.length > 0) setTasks(t);
        if (d && Object.keys(d).length > 0) setDiary(d);
        setSbReady(true);
      })
      .catch(e => notify("Supabase load error: " + e.message))
      .finally(() => setSyncing(false));
  }, []);

  const notify = (m) => { setNotif(m); setTimeout(() => setNotif(null), 2800); };

  // ── Task operations (sync to Supabase) ─────────────────────────────────
  const toggleDone = (id) => {
    setTasks(ts => {
      const updated = ts.map(t => t.id === id ? { ...t, done: !t.done } : t);
      const changed = updated.find(t => t.id === id);
      dbUpsertTask(changed);
      return updated;
    });
  };

  const delTask = (id) => {
    setTasks(ts => ts.filter(t => t.id !== id));
    dbDeleteTask(id);
    notify("Removed");
  };

  const saveNote = (id, note) => {
    setTasks(ts => {
      const updated = ts.map(t => t.id === id ? { ...t, notes: note } : t);
      const changed = updated.find(t => t.id === id);
      dbUpsertTask(changed);
      return updated;
    });
  };

  const addTasks = (newTasks) => {
    setTasks(ts => {
      const merged = [...ts, ...newTasks];
      dbUpsertAllTasks(newTasks);
      return merged;
    });
  };

  // ── Diary operations (sync to Supabase) ────────────────────────────────
  const updateDiaryDay = useCallback((date, patch) => {
    setDiary(d => {
      const newDay = { ...(d[date] || { mood:"", energy:"", sleep:"", note:"", entries:[] }), ...patch };
      dbUpsertDiaryDay(date, newDay);
      return { ...d, [date]: newDay };
    });
  }, []);

  // ── Called from Settings after Supabase credentials are saved ──────────
  const onSupabaseSaved = async () => {
    resetClient();
    setSyncing(true);
    try {
      await dbUpsertAllTasks(tasks);
      await dbUpsertAllDiary(diary);
      setSbReady(true);
      notify("Synced to Supabase ✓");
    } catch (e) {
      notify("Sync error: " + e.message);
    } finally {
      setSyncing(false);
    }
  };

  // ── OpenAI Responses API helper ─────────────────────────────────────────
  const resolvedAiKey = apiKey || import.meta.env.VITE_AI_KEY || "";

  const callAI = async (userContent, system, _maxTokens = 1000) => {
    if (!resolvedAiKey) throw new Error("No AI key. Add it in Settings.");
    const body = {
      model:        AI_MODEL,
      instructions: system,
      input:        userContent,
    };
    const r = await fetch(AI_URL, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${resolvedAiKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      const e = await r.json();
      throw new Error(e.error?.message || `API error ${r.status}`);
    }
    const data = await r.json();
    // OpenAI Responses API: data.output[0].content[0].text
    return data.output?.[0]?.content?.[0]?.text ?? data.output?.[0]?.content ?? "";
  };

  const shared = {
    tasks, diary,
    setDiary: updateDiaryDay,
    apiKey: resolvedAiKey,
    toggleDone, delTask, saveNote, addTasks,
    callAI, notify,
    AREAS, PRIO, CAT_COLORS, CAT_LABELS, today,
  };

  return (
    <div className="flex flex-col h-screen bg-[#faf8f5] md:flex-row overflow-hidden">

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-52 shrink-0 bg-white border-r border-stone-200 py-6 gap-1">
        <div className="px-5 mb-4">
          <h1 className="text-lg font-semibold text-stone-800">🌳 Árvore da Vida</h1>
          {sbReady && <p className="text-[10px] text-green-500 mt-0.5">● Supabase</p>}
          {syncing  && <p className="text-[10px] text-amber-500 mt-0.5">⟳ Syncing…</p>}
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
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold text-stone-800">🌳 Árvore da Vida</h1>
            {sbReady  && <span className="text-[9px] text-green-500 font-medium">● DB</span>}
            {syncing  && <span className="text-[9px] text-amber-500 font-medium">⟳</span>}
          </div>
          <span className="text-xs text-stone-400 font-medium">{NAV.find(n => n.key === tab)?.label}</span>
        </header>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto tab-content">
          {tab === "dashboard" && <Dashboard {...shared} />}
          {tab === "tasks"     && <Tasks     {...shared} />}
          {tab === "diary"     && <Diary     {...shared} />}
          {tab === "ai"        && <AIPanel   {...shared} />}
          {tab === "settings"  && (
            <Settings
              apiKey={apiKey} setApiKey={setApiKey}
              notify={notify} AREAS={AREAS}
              sbReady={sbReady} syncing={syncing}
              onSupabaseSaved={onSupabaseSaved}
            />
          )}
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

      {/* Toast */}
      {notif && (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50 pointer-events-none whitespace-nowrap">
          {notif}
        </div>
      )}
    </div>
  );
}
