import { createClient } from "@supabase/supabase-js";

//eslint-disable-next-line
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

//eslint-disable-next-line
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

//eslint-disable-next-line
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
