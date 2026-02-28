# PackWise — Developer Guide

This guide covers advanced setup for developers, including AI tool integration and database management.

---

## 🔌 AI Tool Integration (MCP)

This project supports the [Model Context Protocol (MCP)](https://modelcontextprotocol.io). Connecting your AI tool (Claude Desktop, Cursor, etc.) to Supabase allows the AI to:
- Directly query your `scans` and `profiles` tables.
- Help you write SQL migrations.
- Monitor logs and edge functions.

### Setup Instructions

1. **Get an Access Token**: Go to [Supabase Account Tokens](https://supabase.com/dashboard/account/tokens) and generate a new token named `PackWise-MCP`.
2. **Configure your Tool**:
   - **Claude Desktop**: Edit `%APPDATA%\Claude\claude_desktop_config.json`.
   - **Cursor**: Go to Settings -> Control Panel -> MCP.
3. **Add the Server**:
   Use the configuration found in [`mcp-config.example.json`](./mcp-config.example.json). **Important:** Copy it to `mcp-config.json` and replace `PASTE_YOUR_TOKEN_HERE` with your actual token.

---

## 🛠️ Database Management

### Running Migrations
We use raw SQL for the initial schema. You can find it in [`backend/supabase/schema.sql`](./backend/supabase/schema.sql).
- To update the schema, it's recommended to create a new `.sql` file in `backend/supabase/` and run it via the Supabase SQL Editor.

### Local Development vs. Production
- The `mobile_app` connects directly to the Supabase API via `EXPO_PUBLIC_SUPABASE_URL`.
- The `backend` uses `supabaseAdmin` with the `SERVICE_ROLE_KEY` for administrative tasks (like saving scans).

---

## 🧪 Testing

### Backend
- Run `npm test` (if implemented) or use `npx tsc --noEmit` to check for type errors.

### Mobile App
- Use `npm run lint` to check for styling issues.
- Test camera functionality on a physical device via Expo Go.
