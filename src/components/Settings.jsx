import { useState } from "react";

export default function Settings({ apiKey, setApiKey, notify, AREAS }) {
  const [draft,  setDraft]  = useState(apiKey);
  const [show,   setShow]   = useState(false);

  const save = () => {
    setApiKey(draft.trim());
    notify("API key saved");
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">

      {/* API Key */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-stone-800">🔑 Anthropic API Key</h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Required for Brain Dump and grounding features. Stored only in your browser.
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type={show ? "text" : "password"}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="sk-ant-…"
            className="flex-1 text-sm border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-stone-400 font-mono"
          />
          <button onClick={() => setShow(v => !v)} className="text-xs text-stone-400 border border-stone-200 rounded-xl px-3">
            {show ? "Hide" : "Show"}
          </button>
        </div>
        <button
          onClick={save}
          className="w-full bg-stone-800 text-white text-sm py-2.5 rounded-xl font-medium"
        >
          Save key
        </button>
        {apiKey && (
          <p className="text-[10px] text-green-600 text-center">✓ Key is set</p>
        )}
      </section>

      {/* Area reference */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Area Guide</h2>
        {AREAS.map(a => (
          <div key={a.key} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: a.color }} />
              <span className="text-sm font-semibold text-stone-800">{a.label}</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed pl-4">{a.desc}</p>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 text-center space-y-1">
        <p className="text-sm font-semibold text-stone-700">🌳 Árvore da Vida</p>
        <p className="text-xs text-stone-400">A living personal organiser — roots, trunk, sap, flowers, fruits.</p>
        <p className="text-[10px] text-stone-300 mt-2">All data stays in your browser.</p>
      </section>
    </div>
  );
}
