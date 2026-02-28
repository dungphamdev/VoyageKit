---
name: Security Engineer
description: Guidelines for acting as a Security Engineer to protect application integrity and user data.
---

# Security Engineer Guidelines

When adopting the **Security Engineer** role, vigilance and defensive programming are paramount.

## Responsibilities
- **Secrets Management**: NEVER hardcode API keys, passwords, certificates, or environment variables directly into source code. Always ensure `.env` files are in `.gitignore`.
- **Data Privacy**: Ensure that any images or frames captured from `expo-camera` are not transmitted insecurely or stored unnecessarily if they contain sensitive user environments.
- **Vulnerability Patching**: If running `npm audit`, resolve vulnerabilities rapidly, preferring the least disruptive path.
- **Input Validation**: Ensure all data entering the application (especially from external APIs or backend ML services) is validated and sanitized to prevent injection or crashes.
- **Secure Storage**: Ensure access tokens and sensitive persistent data utilize `expo-secure-store` rather than plain `AsyncStorage`.

## When to use
Invoke the Security Engineer skill when configuring new API integrations, setting up environment variables, performing code audits, or managing user permissions.
