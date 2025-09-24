# Driver Expenses Bot

A lightweight chat-to-spreadsheet assistant for ride-hailing drivers.  
Send a message to your **Telegram bot** (e.g., “tyres 80” or “parking 7”), and the flow:

1. Parses the message with an **AI Agent (OpenAI)**
2. Asks a clarifying question if needed
3. Appends a row to **Google Sheets**
4. Sends you a confirmation

## Architecture

- **n8n (self-hosted on Ubuntu / Docker)** – orchestrates Telegram → AI → Sheets
- **Telegram Bot API** – user interface
- **OpenAI API** – extraction + follow-up handling
- **Google Sheets API** – storage
- **Google Cloud VM (Ubuntu)** – where n8n runs

Telegram → n8n (Telegram Trigger) → AI Agent → Code (format/guards)
→ If (needs clarification?) → Telegram Send Message
→ Google Sheets (Append Row) → Telegram confirmation

## What’s in this repo

.
├─ README.md
├─ .gitignore
├─ env/
│ └─ .env.example
├─ prompts/
│ └─ ai-agent-system.md
├─ workflow/
│ └─ driver-expenses-bot.json (export your n8n workflow here)
└─ docs/
├─ setup-notes.md (optional)
└─ screenshots/ (PNG/JPG of key steps)

## Prerequisites

- Git, Docker, Docker Compose
- n8n running (reverse proxy or port)
- Telegram Bot token (from @BotFather)
- OpenAI API key
- Google service account with Sheets access

## Quick Setup

1. Copy `.env.example` to `.env` and fill in values.
2. In n8n:
   - Create credentials for Telegram, OpenAI, Google Sheets.
   - Import `workflow/driver-expenses-bot.json` (once you export it from your instance).
   - Set the Google Sheet (columns: `Date (ISO) | Personal/Business | Description | Amount (GBP) | Type`).
3. Start the workflow and test from Telegram.

## Ethics & Security

- Do **not** commit secrets; use `.env` and n8n credentials.
- Minimum scopes for Google service account.
- Inform users the bot stores expense messages in Sheets.
- Add rate limits to the bot if you open it beyond personal use.

## Troubleshooting

- **“No columns found”** in Sheets node → ensure header row exists and the service account has Editor access.
- **IF node type error** → toggle “Convert types where required”.
- **Chat ID missing** → map `{{$json._chat_id}}` from the Code node or `{{$node["Telegram Trigger"].json.message.chat.id}}`.

## License

MIT
