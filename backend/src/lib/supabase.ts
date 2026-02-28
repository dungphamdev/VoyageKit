import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        "⚠️  Supabase credentials are missing. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file."
    );
}

/**
 * Public Supabase client - use this for client-side or user-context operations.
 * Respects Row Level Security (RLS) policies.
 */
export const supabase = createClient(
    supabaseUrl || "",
    supabaseAnonKey || ""
);

/**
 * Admin Supabase client - use this for server-side API routes only.
 * Bypasses Row Level Security (RLS) policies.
 * NEVER expose this client on the client side.
 */
export const supabaseAdmin = createClient(
    supabaseUrl || "",
    supabaseServiceKey || supabaseAnonKey || ""
);
