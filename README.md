# Driver Expenses Bot

A lightweight chat-to-spreadsheet assistant for self-employed drivers (e.g., Uber, Bolt, etc.).

💬 Send a Telegram message like `tyres 80`, and the bot:

1. Parses the message with an AI Agent (OpenAI)
2. Asks a clarifying question if needed
3. Appends the data to Google Sheets
4. Sends you a confirmation

---

## 🧠 Architecture

**Flow Overview**:

Telegram → n8n (Trigger) → AI Agent (OpenAI) → Code (validate/normalize)
→ IF (needs_clarification?) ├─ yes → Telegram (ask)
└─ no → Google Sheets (append) → Telegram (confirm)


👉 See [`docs/architecture.md`](docs/architecture.md) for full **PlantUML diagrams** and **data model**.

---

## 🧰 Stack

- **n8n** (self-hosted) – workflow automation (Telegram → AI → Sheets)
- **Telegram Bot API** – user interface
- **OpenAI API** – natural language parsing
- **Google Sheets API** – data storage
- **Google Cloud VM / VPS** – hosting environment
- **PlantUML** – system architecture diagrams

---

## 📁 What’s in this repo

driver-expenses-bot/
├── README.md
├── package.json
├── .gitignore
├── env/
│ └── .env.example
├── prompts/
│ ├── ai-agent-system.md # system prompt
│ └── expense.schema.json # expected JSON structure
├── workflow/
│ └── driver-expenses-bot.json # n8n export
├── tests/
│ ├── validate-fixtures.mjs
│ └── fixtures/
│ ├── tyres_80.in.txt
│ ├── tyres_80.out.json
│ ├── parking_missing_amount.in.txt
│ └── parking_missing_amount.out.json
├── docs/
│ ├── architecture.md # system description + diagrams
│ ├── code-node-snippet.js # validation JS for n8n Code node
│ ├── sample-sheet.csv # template for Google Sheet
│ ├── diagrams/ # PlantUML files
│ │ ├── architecture.puml
│ │ ├── sequence_happy_path.puml
│ │ └── context_map.puml
│ └── screenshots/
│ ├── ai_agent_output.jpg
│ ├── ai_agent_prompt.jpg
│ ├── json_output_clarification.jpg
│ ├── Google_Sheets_data.PNG
│ └── telegram_clarification.jpg
├── tools/
│ └── plantuml.jar # optional CLI rendering


---

## ⚙️ Prerequisites

- Git, Docker (or VPS with n8n)
- Telegram Bot token (via [@BotFather](https://t.me/BotFather))
- OpenAI API key
- Google Sheets API + service account with Editor access

---

## 🚀 Quick Setup

1. Copy `.env.example` to `.env` and fill in your credentials.
2. In **n8n**:
   - Add credentials for Telegram, OpenAI, and Google Sheets.
   - Import `workflow/driver-expenses-bot.json`.
   - Paste JS from `docs/code-node-snippet.js` into the Code node.
3. Set up your Google Sheet with the following headers (row 1):

Date (ISO) | Personal/Business | Description | Amount (GBP) | Type


✅ Or import `docs/sample-sheet.csv` as a template.

4. Start the workflow and test via Telegram.

---

## ❓ Clarifying Questions

If the user message is incomplete (e.g., missing amount), the bot asks one follow-up question like:

> “What was the amount (GBP)?”

When the user replies (e.g., `50`), the system completes the previous entry.

---

## 🔐 Ethics & Security

- ✅ No secrets in repo – all sensitive data via `.env` or n8n credentials
- ✅ Minimum permissions for Google service accounts
- ⚠️ Remind users that their data is being stored (ethical design)
- 🛑 Currently designed for **personal** use only – not multi-user

---

## 🧪 Troubleshooting

| Error | Fix |
|------|-----|
| `No columns found` | Ensure Sheet has header row + service account has Editor access |
| `IF node type mismatch` | Enable “Convert types where required” |
| Chat ID missing | Use `{{$json._chat_id}}` or `{{$node["Telegram Trigger"].json.message.chat.id}}` |

---

## 📸 Screenshots

- `docs/screenshots/ai_agent_output.jpg`
- `docs/screenshots/telegram_clarification.jpg`
- `docs/screenshots/json_output_clarification.jpg`
- `docs/screenshots/Google_Sheets_data.PNG`

---

## 📄 License

MIT License

---

## 🎓 Academic Note

This project was developed as part of the **Professional Development module** at **Elizabeth School of London**, in partnership with **Newcastle College Group** (NCG).

- [🔗 GitHub Repo](https://github.com/NicSterian/driver-expenses-bot)
- [🔗 LinkedIn Profile](https://www.linkedin.com/in/your-link-here)
- 📎 CV available on LinkedIn or on request

---
