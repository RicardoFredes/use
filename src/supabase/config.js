import { PostgrestClient } from "@supabase/postgrest-js";

export const getSupabase = () => {
  const SUPABASE_URL = process.env.SUPABASE_URL || "";
  const SUPABASE_KEY = process.env.SUPABASE_KEY || "";
  const SUPABASE_API_URI = new URL("rest/v1", SUPABASE_URL).href;
  return new PostgrestClient(SUPABASE_API_URI, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    schema: "public",
  });
};
