import { getSupabase } from "./supabase";

// ── Tasks ──────────────────────────────────────────────────────────────────

export const dbLoadTasks = async () => {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from("tasks").select("*").order("id");
  if (error) throw error;
  return data.map(row => ({
    ...row,
    steps: row.steps ?? [],
    notes: row.notes ?? "",
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
    steps:  task.steps  ?? [],
    notes:  task.notes  ?? "",
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
    steps:  t.steps  ?? [],
    notes:  t.notes  ?? "",
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
