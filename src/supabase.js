import { createClient } from "@supabase/supabase-js";

let _client = null;

const getUrl = () =>
  import.meta.env.VITE_SUPABASE_URL || localStorage.getItem("sb-url") || "";

const getKey = () =>
  import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem("sb-key") || "";

export const getSupabase = () => {
  if (_client) return _client;
  const url = getUrl();
  const key = getKey();
  if (!url || !key) return null;
  _client = createClient(url, key);
  return _client;
};

export const resetClient = () => { _client = null; };

export const isConfigured = () => !!(getUrl() && getKey());
