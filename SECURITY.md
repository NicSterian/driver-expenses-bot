# Security Policy

We take the privacy and integrity of user data seriously. This project connects Telegram → n8n → OpenAI → Google Sheets, so correct handling of secrets and scopes is essential.

## Supported Versions
- **v0.1.x** — actively maintained for security fixes.
- Older versions — upgrade recommended.

## Reporting a Vulnerability
Please open a **private GitHub security advisory** or, if that’s not available to you, open a regular issue with minimal detail and ask to convert it to a security advisory. We’ll follow up promptly.

## Operational Security Guidance

### Secrets
- **Never commit secrets**. Use environment variables / n8n Credentials.
- Keep a local `.env` (not committed) based on `env/.env.example`.
- Rotate API keys (Telegram, OpenAI, Google) on suspicion or regular intervals.

### Google Service Account
- Grant **least privilege**. Sheets scope: only what’s required for append/read.
- Share the target Sheet only with the service account email, not public links.
- Consider a dedicated service account per environment (dev/prod).

### Telegram Bot
- Treat chat IDs and usernames as **personal data**.
- If you share logs/screenshots, **redact identifiers**.
- Consider enabling message rate limits if opening the bot beyond personal use.

### n8n
- Restrict access to the n8n editor and credentials (reverse proxy, auth).
- Keep n8n and dependencies updated with security patches.
- Back up workflow JSON and credentials securely (encrypted at rest).

### Data Minimization
- Store only what is required:
  - Date (ISO), Personal/Business, Description, Amount (GBP), Type
- Avoid storing raw prompts or entire message history unless necessary.

### Logging
- Avoid logging full JSON payloads that contain identifiers.
- If logs are needed, **redact** chat IDs and keys before persisting.

### Third-Party Models
- The system prompt enforces **no guessing** for sensitive fields and uses **UTC** dates.
- If switching models, re-validate behavior with fixtures and the JSON Schema.

## Disclosure Timeline
- We aim to acknowledge within 48 hours and provide a remediation plan as soon as practical. Critical issues may result in revoking credentials while a fix is deployed.

