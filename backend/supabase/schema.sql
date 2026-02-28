-- =============================================
-- Antigravity App - Database Schema
-- Run this SQL in your Supabase SQL Editor
-- https://app.supabase.com -> SQL Editor -> New Query
-- =============================================

-- Enable UUID extension (usually already enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- SCANS TABLE
-- Stores each image scan and its AI suggestions
-- =============================================
CREATE TABLE IF NOT EXISTS scans (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    -- The raw text from Gemini AI
    suggestions TEXT        NOT NULL,
    -- Optional: store the image in Supabase Storage and link it here
    image_url   TEXT,
    -- Optional: link to a user account when you add auth
    user_id     UUID        REFERENCES auth.users(id) ON DELETE SET NULL
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT scans (no auth required for MVP)
CREATE POLICY "Allow scan inserts" ON scans
    FOR INSERT WITH CHECK (true);

-- Allow anyone to view their own scan by ID (for MVP, open read)
CREATE POLICY "Allow scan reads" ON scans
    FOR SELECT USING (true);

-- =============================================
-- INDEXES
-- =============================================
-- Index for fetching scans by user
CREATE INDEX IF NOT EXISTS idx_scans_user_id ON scans(user_id);
-- Index for chronological ordering
CREATE INDEX IF NOT EXISTS idx_scans_created_at ON scans(created_at DESC);

-- =============================================
-- PROFILES TABLE
-- Stores basic user info synced from auth.users
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
    id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    email       TEXT,
    full_name   TEXT,
    avatar_url  TEXT
);

-- =============================================
-- ROW LEVEL SECURITY FOR PROFILES
-- =============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read and update their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- =============================================
-- TRIGGER: Auto-create profile on new user signup
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger first if it already exists, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

