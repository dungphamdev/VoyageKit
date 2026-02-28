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
