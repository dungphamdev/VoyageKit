# VoyageKit - AI Travel Prep Assistant

A modern, cross-platform mobile application that uses AI to help you pack for travel. Scan your room or gear in real time to detect objects and receive smart suggestions on what travel essentials you might be missing.

---

## Project Structure

- `backend/`: Next.js API server using Google Gemini AI for image analysis.
- `mobile_app/`: React Native (Expo) application with camera integration.
- `DEVELOPER_GUIDE.md`: Advanced setup, AI integration (MCP), and database tips.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Expo Go](https://expo.dev/expo-go) app on your physical device
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)
- A [Supabase](https://app.supabase.com) account (free tier is sufficient)

---

## Backend Setup (Next.js)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the `backend/` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here

   # Supabase - see Database Setup section below
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The backend will start at `http://localhost:3000`.

---

## Database Setup (Supabase)

This project uses [Supabase](https://supabase.com) (free tier) as its database. Follow these steps to set it up:

### 1. Create a Supabase Project

- Go to [app.supabase.com](https://app.supabase.com) and create a new project.
- Wait for the project to be provisioned (takes about 1 minute).

### 2. Run the Schema

- In your Supabase dashboard, go to **SQL Editor -> New Query**.
- Paste the entire contents of [`backend/supabase/schema.sql`](./backend/supabase/schema.sql) and click **Run**.
- This creates the `scans` table, `profiles` table, RLS policies, indexes, and an auto-create profile trigger.

### 3. Get Your API Keys

- Go to **Project Settings -> API**.
- Copy the following values into your `backend/.env.local`:

| Key | Where to find it |
|-----|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` / `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key *(keep this secret!)* |

> [!WARNING]
> Never expose `SUPABASE_SERVICE_ROLE_KEY` on the client side. It is only used in server-side API routes.

### 4. Restart the Backend

After updating `.env.local`, restart the dev server (`npm run dev`). Each scan result will now automatically be saved to the `scans` table.

---

## Mobile App Setup (Expo)

1. **Navigate to the mobile app directory**:
   ```bash
   cd mobile_app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `mobile_app/` directory:
   ```env
   EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:3000/api/analyze

   # Supabase (same project as backend)
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```
   Tip: Find your local IP using `ipconfig` on Windows or `ifconfig` on macOS/Linux.

4. **Run the app**:
   ```bash
   npm run start
   ```

5. **Scan the QR Code**:

- Open the **Expo Go** app on your phone.
- Scan the QR code shown in your terminal.

---

## Google SSO Setup

The app uses Google Sign-In via Supabase Auth. Follow these steps:

### 1. Enable Google Provider in Supabase

- Go to **Supabase Dashboard -> Authentication -> Providers -> Google**.
- Toggle it **Enabled**.
- Note the **Callback URL** shown, for example `https://<your-ref>.supabase.co/auth/v1/callback`.

### 2. Create Google OAuth Credentials

- Go to [Google Cloud Console](https://console.cloud.google.com) -> **APIs & Services -> Credentials**.
- Create an **OAuth 2.0 Client ID** with application type **Web application**.
- Add your Supabase callback URL from step 1 as an **Authorized Redirect URI**.
- Copy the **Client ID** and **Client Secret**.

### 3. Add Credentials to Supabase

- Paste the **Client ID** and **Client Secret** into the Supabase Google provider settings and save.

### 4. Add Mobile Redirect URL in Supabase

- Go to **Supabase Dashboard -> Authentication -> URL Configuration**.
- Add this redirect URL to **Redirect URLs**:
  - `voyagekit://auth/callback`
- Save changes.

> [!NOTE]
> For local testing, add your Google account as a **Test User** in Google Cloud Console -> OAuth Consent Screen.

---

## Troubleshooting (Network Issues)

If the app cannot reach the backend:

- Ensure both your phone and computer are on the same Wi-Fi network.
- Check that your computer's firewall allows incoming connections on port 3000.
- Verify `EXPO_PUBLIC_API_URL` uses your actual local IP (for example `192.168.1.x`), not `localhost`.

---

## Features

- [x] Real-time camera integration
- [x] AI-powered object analysis via Gemini Flash
- [x] Supabase database integration (scan history persistence)
- [x] Google SSO authentication with user profiles
- [ ] View scan history per user in the app
- [ ] Offline support for basic detection
