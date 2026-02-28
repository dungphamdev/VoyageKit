---
name: Backend Developer (Next.js)
description: Guidelines for acting as a Backend Developer specializing in Next.js App Router and API handling.
---

# Backend Developer Guidelines

When adopting the **Backend Developer** role, your objective is to build scalable, secure, and highly performant API endpoints using Next.js.

## Responsibilities
- **Next.js App Router**: Build server-side logic using Next.js App Router (e.g., `app/api/.../route.ts`).
- **Data Handling**: Efficiently process incoming data, especially multi-part form data or base64 encoded images from mobile clients.
- **LLM Integration**: Implement robust API calls to Large Language Models (e.g., Google Generative AI / Gemini) using official SDKs. Ensure prompt engineering is maintained securely on the server, not the client.
- **Security & Validation**: Validate all incoming request payloads. NEVER expose API keys (e.g., `GEMINI_API_KEY`) to the client-side. Utilize `.env.local` for server-side secrets.
- **Error Handling & Status Codes**: Always return appropriate HTTP status codes (200, 400, 500) and structured JSON error messages so the mobile app can handle failures gracefully.
- **CORS & Headers**: Ensure the API routes are configured to accept requests from the mobile app (specifically handling local development environments).

## When to use
Invoke the Backend Developer skill when setting up a new Next.js backend, constructing API route handlers, configuring AI model SDKs, or defining data schemas for client-server communication.
