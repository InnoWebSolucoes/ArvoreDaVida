import { getSupabase } from "./supabase";

// ── Tasks ──────────────────────────────────────────────────────────────────

export const dbLoadTasks = async () => {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from("tasks").select("*").order("id");
  if (error) throw error;
  return data.map(row => ({
    ...row,
    steps:   row.steps   ?? [],
    notes:   row.notes   ?? "",
    project: row.project ?? "",
  }));
};

export const dbUpsertTask = async (task) => {
  const sb = getSupabase();
  if (!sb) return;
  const { error } = await sb.from("tasks").upsert({
    id:     task.id,
    area:   task.area,
    prio:   task.prio,
    done:   task.done,
    title:  task.title,
    detail: task.detail ?? "",
    obj:    task.obj    ?? "",
    steps:   task.steps   ?? [],
    notes:   task.notes   ?? "",
    project: task.project ?? "",
  });
  if (error) console.error("upsertTask:", error.message);
};

export const dbDeleteTask = async (id) => {
  const sb = getSupabase();
  if (!sb) return;
  const { error } = await sb.from("tasks").delete().eq("id", id);
  if (error) console.error("deleteTask:", error.message);
};

export const dbUpsertAllTasks = async (tasks) => {
  const sb = getSupabase();
  if (!sb) return;
  const rows = tasks.map(t => ({
    id:     t.id,
    area:   t.area,
    prio:   t.prio,
    done:   t.done,
    title:  t.title,
    detail: t.detail ?? "",
    obj:    t.obj    ?? "",
    steps:   t.steps   ?? [],
    notes:   t.notes   ?? "",
    project: t.project ?? "",
  }));
  const { error } = await sb.from("tasks").upsert(rows);
  if (error) console.error("upsertAllTasks:", error.message);
};

// ── Diary ──────────────────────────────────────────────────────────────────

export const dbLoadDiary = async () => {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from("diary").select("*");
  if (error) throw error;
  return data.reduce((acc, row) => {
    acc[row.date] = {
      mood:    row.mood    ?? "",
      energy:  row.energy  ?? "",
      sleep:   row.sleep   ?? "",
      note:    row.note    ?? "",
      entries: row.entries ?? [],
    };
    return acc;
  }, {});
};

export const dbUpsertDiaryDay = async (date, day) => {
  const sb = getSupabase();
  if (!sb) return;
  const { error } = await sb.from("diary").upsert({
    date,
    mood:    day.mood    ?? "",
    energy:  day.energy  ?? "",
    sleep:   day.sleep   ?? "",
    note:    day.note    ?? "",
    entries: day.entries ?? [],
  });
  if (error) console.error("upsertDiaryDay:", error.message);
};

export const dbUpsertAllDiary = async (diary) => {
  const sb = getSupabase();
  if (!sb) return;
  const rows = Object.entries(diary).map(([date, day]) => ({
    date,
    mood:    day.mood    ?? "",
    energy:  day.energy  ?? "",
    sleep:   day.sleep   ?? "",
    note:    day.note    ?? "",
    entries: day.entries ?? [],
  }));
  const { error } = await sb.from("diary").upsert(rows);
  if (error) console.error("upsertAllDiary:", error.message);
};

// ── Plano diário ───────────────────────────────────────────────────────────

const planRow = (date, s) => ({
  date,
  slot:      s.slot,
  start:     s.start,
  end:       s.end,
  label:     s.label     ?? "",
  area:      s.area      ?? "",
  task_id:   s.taskId    ?? null,
  anchor:    s.anchor    ?? false,
  suggested: s.suggested ?? false,
  done:      s.done      ?? false,
  obs:       s.obs       ?? "",
});

const fromPlanRow = (row) => ({
  slot:      row.slot,
  start:     row.start,
  end:       row.end,
  label:     row.label     ?? "",
  area:      row.area      ?? "",
  taskId:    row.task_id   ?? null,
  anchor:    row.anchor    ?? false,
  suggested: row.suggested ?? false,
  done:      row.done      ?? false,
  obs:       row.obs       ?? "",
});

export const dbLoadPlan = async (date) => {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from("plan").select("*").eq("date", date).order("slot");
  if (error) throw error;
  if (!data || data.length === 0) return null;
  return data.map(fromPlanRow).sort((a, b) => a.start.localeCompare(b.start));
};

export const dbUpsertSlot = async (date, slot) => {
  const sb = getSupabase();
  if (!sb) return;
  const { error } = await sb.from("plan").upsert(planRow(date, slot));
  if (error) console.error("upsertSlot:", error.message);
};

export const dbUpsertAllPlan = async (date, slots) => {
  const sb = getSupabase();
  if (!sb) return;
  const { error } = await sb.from("plan").upsert(slots.map(s => planRow(date, s)));
  if (error) console.error("upsertAllPlan:", error.message);
};
