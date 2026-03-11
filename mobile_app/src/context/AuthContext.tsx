import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { supabase } from '../lib/supabase';

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    signInWithGoogle: async () => { },
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

const getUrlParams = (url: string) => {
    const parsedUrl = new URL(url);
    const hash = parsedUrl.hash.startsWith('#') ? parsedUrl.hash.slice(1) : parsedUrl.hash;
    const hashParams = new URLSearchParams(hash);

    return {
        code: parsedUrl.searchParams.get('code') || hashParams.get('code'),
        accessToken: parsedUrl.searchParams.get('access_token') || hashParams.get('access_token'),
        refreshToken: parsedUrl.searchParams.get('refresh_token') || hashParams.get('refresh_token'),
    };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get the current session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen to auth state changes (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const redirectUrl = AuthSession.makeRedirectUri({ scheme: 'voyagekit', path: 'auth/callback' });

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: redirectUrl,
                    skipBrowserRedirect: true,
                },
            });

            if (error) throw error;
            if (!data.url) throw new Error('No OAuth URL returned');

            const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

            if (result.type === 'success') {
                const { code, accessToken, refreshToken } = getUrlParams(result.url);

                if (code) {
                    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
                    if (exchangeError) throw exchangeError;
                    return;
                }

                if (accessToken && refreshToken) {
                    await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
                    return;
                }

                throw new Error('OAuth callback did not include a code or session tokens');
            }

            if (result.type !== 'cancel' && result.type !== 'dismiss') {
                throw new Error(`OAuth flow ended with status: ${result.type}`);
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, user, loading, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
