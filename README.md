# Driver Expenses Bot

A lightweight chat-to-spreadsheet assistant for ride-hailing drivers.

Send a message to your Telegram bot (e.g., `tyres 80` or `parking 7`), and the flow:

- Parses the message with an AI Agent (OpenAI)
- Asks a clarifying question if needed
- Appends a row to Google Sheets
- Sends you a confirmation

## Architecture

Telegram → n8n (Trigger)
→ AI Agent (OpenAI)
→ Code (validate/normalize)
→ IF (needs_clarification?)
├─ yes → Telegram (ask) ⟂
└─ no → Google Sheets (append) → Telegram (confirm)


**Stack**

- n8n (self-hosted on Ubuntu / Docker) – orchestrates Telegram → AI → Sheets  
- Telegram Bot API – user interface  
- OpenAI API – extraction + follow-up handling  
- Google Sheets API – storage  
- Google Cloud VM (Ubuntu) – where n8n runs

## What’s in this repo

.
├─ README.md
├─ .gitignore
├─ env/
│ └─ .env.example
├─ prompts/
│ ├─ ai-agent-system.md
│ └─ expense.schema.json
├─ workflow/
│ └─ driver-expenses-bot.json # export your n8n workflow here
├─ docs/
│ ├─ code-node-snippet.js
│ ├─ sample-sheet.csv
│ └─ screenshots/ # PNG/JPG of key steps
└─ tests/
└─ fixtures/
├─ tyres_80.in.txt
├─ tyres_80.out.json
├─ parking_missing_amount.in.txt
└─ parking_missing_amount.out.json


## Prerequisites

- Git, Docker, Docker Compose
- n8n running (reverse proxy or port)
- Telegram Bot token (from @BotFather)
- OpenAI API key
- Google service account with Sheets access

## Quick Setup

1. Copy `env/.env.example` to `.env` and fill in values.  
2. In n8n:
   - Create credentials for Telegram, OpenAI, Google Sheets.
   - Import `workflow/driver-expenses-bot.json` (export from your instance).
   - Set the Google Sheet with **exact headers** (row 1):  
     `Date (ISO) | Personal/Business | Description | Amount (GBP) | Type`  
     Or import `docs/sample-sheet.csv`.
   - Paste the **Code** from `docs/code-node-snippet.js` into the Code node.
3. Start the workflow and test from Telegram.

## Clarifying Questions

If the amount is missing or unparseable, the bot asks one short question (e.g., “What was the amount (GBP)?”) and will complete the last expense when you reply with just the number.

## Ethics & Security

- Do not commit secrets; use `.env` and n8n credentials.
- Minimum scopes for Google service account.
- Inform users the bot stores expense messages in Sheets.
- Consider rate limits if you open it beyond personal use.

## Troubleshooting

- **“No columns found”** in Sheets node → ensure header row exists and the service account has *Editor* access.  
- **IF node type error** → toggle “Convert types where required”.  
- **Chat ID missing** → map `{{$json._chat_id}}` from the Code node or `{{$node["Telegram Trigger"].json.message.chat.id}}`.

## Known Limitations

- Text-only (no receipt images yet).
- Single-user memory scope (per Telegram chat).
- Dates are calendar **UTC** (YYYY-MM-DD only).

## License

MIT
