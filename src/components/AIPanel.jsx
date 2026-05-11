import { useState } from "react";

const DUMP_SYSTEM = `Personal life organiser. Extract tasks and return ONLY valid JSON.
Areas: raizes (past/base/identity), tronco (daily/house/kids), seiva (health/energy/mind), flores (becoming/work/future), frutos (achievements), seiva_elab (insights/dreams).
Priorities: regar (urgent), nutrir (important), podar (maintenance).
Format: {"tasks":[{"id":"u1","area":"tronco","prio":"regar","done":false,"title":"Short title","detail":"Context","obj":"Desired outcome","steps":["step1","step2"],"notes":""}]}
Generate unique IDs starting with u. Extract only actionable items. Return ONLY the JSON object, no other text.`;

const PANIC_SYSTEM = `You are a calm, grounding companion for someone experiencing overwhelm, panic, or crisis.
They may have ADHD, anxiety, or be going through major life transitions.
Be warm but concise. First: acknowledge the feeling in one sentence.
Then provide 3-5 immediate, simple, physical or grounding steps they can take RIGHT NOW.
Then one gentle reframe. Keep your entire response under 200 words. Use plain text, minimal formatting.`;

export default function AIPanel({ callAI, addTasks, notify, AREAS }) {
  const [dump,   setDump]   = useState("");
  const [dLoad,  setDLoad]  = useState(false);
  const [dResult,setDResult]= useState(null);
  const [dError, setDError] = useState("");

  const [panic,  setPanic]  = useState("");
  const [pLoad,  setPLoad]  = useState(false);
  const [pSteps, setPSteps] = useState([]);
  const [pWhy,   setPWhy]   = useState("");
  const [pError, setPError] = useState("");

  const handleDump = async () => {
    if (!dump.trim() || dLoad) return;
    setDLoad(true); setDResult(null); setDError("");
    const txt = dump.trim();
    try {
      const raw = await callAI(txt, DUMP_SYSTEM, 1200);
      const json = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] || raw);
      setDResult(json.tasks || []);
    } catch (e) {
      setDError(e.message || "Failed to parse response.");
    } finally {
      setDLoad(false);
    }
  };

  const confirmDump = () => {
    if (!dResult) return;
    addTasks(dResult);
    notify(`Added ${dResult.length} task${dResult.length !== 1 ? "s" : ""}!`);
    setDump(""); setDResult(null);
  };

  const handlePanic = async () => {
    if (!pWhy.trim() || pLoad) return;
    setPLoad(true); setPSteps([]); setPError("");
    try {
      const raw = await callAI(pWhy, PANIC_SYSTEM, 400);
      const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);
      setPSteps(lines);
    } catch (e) {
      setPError(e.message || "Something went wrong.");
    } finally {
      setPLoad(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">

      {/* Brain dump */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-stone-800">🧠 Brain Dump</h2>
          <p className="text-xs text-stone-400 mt-0.5">Write anything on your mind. AI extracts tasks and places them in the right areas.</p>
        </div>
        <textarea
          value={dump}
          onChange={e => setDump(e.target.value)}
          rows={5}
          className="w-full text-sm border border-stone-200 rounded-xl p-3 focus:outline-none focus:border-stone-400 bg-[#faf8f5]"
          placeholder="I need to call the school, the car tyre is still low, should book therapist…"
        />
        {dError && <p className="text-xs text-red-500">{dError}</p>}

        {/* Extracted preview */}
        {dResult && dResult.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-stone-500">{dResult.length} task{dResult.length !== 1 ? "s" : ""} extracted — confirm to add:</p>
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
                Add all tasks
              </button>
              <button onClick={() => setDResult(null)} className="px-4 text-sm text-stone-400 border border-stone-200 rounded-xl">
                Discard
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
            {dLoad ? <><Spinner /> Extracting…</> : "Extract tasks"}
          </button>
        )}
      </section>

      {/* Panic button */}
      <section className="bg-red-50 rounded-2xl p-4 border border-red-100 space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-red-800">🆘 Overwhelmed?</h2>
          <p className="text-xs text-red-400 mt-0.5">Tell me what's happening. Get immediate grounding steps.</p>
        </div>
        <textarea
          value={pWhy}
          onChange={e => setPWhy(e.target.value)}
          rows={3}
          className="w-full text-sm border border-red-200 rounded-xl p-3 focus:outline-none focus:border-red-300 bg-white"
          placeholder="I feel overwhelmed because…"
        />
        {pError && <p className="text-xs text-red-600">{pError}</p>}

        {pSteps.length > 0 && (
          <div className="space-y-2">
            {pSteps.map((s, i) => (
              <p key={i} className="text-sm text-red-800 leading-relaxed">{s}</p>
            ))}
            <button onClick={() => { setPSteps([]); setPWhy(""); }} className="text-xs text-red-400 mt-1">
              Clear
            </button>
          </div>
        )}

        {pSteps.length === 0 && (
          <button
            onClick={handlePanic}
            disabled={!pWhy.trim() || pLoad}
            className="w-full bg-red-600 text-white text-sm py-3 rounded-xl font-semibold disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {pLoad ? <><Spinner color="white" /> Getting support…</> : "Get grounding steps"}
          </button>
        )}
      </section>
    </div>
  );
}

function Spinner({ color = "currentColor" }) {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke={color} strokeWidth="4" />
      <path className="opacity-75" fill={color} d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
