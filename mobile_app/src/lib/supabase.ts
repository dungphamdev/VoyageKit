import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = supabaseUrl && supabaseUrl !== 'your_supabase_url_here' && supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key_here';

if (!isSupabaseConfigured) {
    console.warn('⚠️ Supabase credentials missing or invalid. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to mobile_app/.env');
}

// Create a dummy client if not configured to avoid crashing the app on startup
export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    })
    : createClient('https://placeholder.supabase.co', 'placeholder', { auth: { persistSession: false } });
