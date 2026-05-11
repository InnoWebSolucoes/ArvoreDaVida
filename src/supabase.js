import { createClient } from "@supabase/supabase-js";

let _client = null;

export const getSupabase = () => {
  if (_client) return _client;
  const url = localStorage.getItem("sb-url");
  const key = localStorage.getItem("sb-key");
  if (!url || !key) return null;
  _client = createClient(url, key);
  return _client;
};

export const resetClient = () => { _client = null; };

export const isConfigured = () =>
  !!(localStorage.getItem("sb-url") && localStorage.getItem("sb-key"));
