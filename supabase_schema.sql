-- Árvore da Vida — Supabase Schema
-- Run in: Supabase → SQL Editor → New query → Run
-- Safe to re-run: every statement is idempotent.

-- ── Tasks ──────────────────────────────────────────────────────────────────

create table if not exists tasks (
  id     text primary key,
  area   text not null,
  prio   text not null,
  done   boolean default false,
  title  text not null,
  detail text default '',
  obj    text default '',
  steps  jsonb default '[]',
  notes  text default ''
);

-- ── Diary ──────────────────────────────────────────────────────────────────

create table if not exists diary (
  date    text primary key,
  mood    text default '',
  energy  text default '',
  sleep   text default '',
  note    text default '',
  entries jsonb default '[]'
);

-- ── Row Level Security ─────────────────────────────────────────────────────
-- Personal app — allow all operations with the anon/publishable key

alter table tasks enable row level security;
alter table diary enable row level security;

drop policy if exists "allow all" on tasks;
create policy "allow all" on tasks for all using (true) with check (true);
drop policy if exists "allow all" on diary;
create policy "allow all" on diary for all using (true) with check (true);

-- ── Plan (daily 28 slots) ──────────────────────────────────────────────────
-- One row per slot per day. `date` + `slot` is the identity.

create table if not exists plan (
  date      text not null,
  slot      text not null,
  start_at  text not null,
  end_at    text not null,
  label     text default '',
  area      text default '',
  task_id   text,
  anchor    boolean default false,
  suggested boolean default false,
  done      boolean default false,
  obs       text default '',
  primary key (date, slot)
);

alter table plan enable row level security;

drop policy if exists "allow all" on plan;
create policy "allow all" on plan for all using (true) with check (true);

-- ── Migrations for earlier versions of this schema ────────────────────────

-- Renames the old start/"end" columns only if they are still present,
-- so this runs cleanly on both a fresh and an already-created database.
do $$
begin
  if exists (select 1 from information_schema.columns
             where table_name = 'plan' and column_name = 'start') then
    alter table plan rename column start to start_at;
  end if;
  if exists (select 1 from information_schema.columns
             where table_name = 'plan' and column_name = 'end') then
    alter table plan rename column "end" to end_at;
  end if;
end $$;

-- ── Projects on tasks ──────────────────────────────────────────────────────

alter table tasks add column if not exists project text default '';
