# 🚖 Driver Expenses Bot

A lightweight **chat-to-spreadsheet assistant** for self-employed drivers (Uber, Bolt, etc.).

💬 Example: Send `tyres 80` to Telegram → AI parses it → Bot asks clarifications (if needed) → Appends to Google Sheets → Confirms back in chat.

---

## 🧠 Architecture

**Telegram** → `n8n Trigger` → **AI Agent** (OpenAI) → `Code Node` (validate/normalize)
→ IF `needs_clarification?`
├─ Yes → Telegram (ask)
└─ No → Google Sheets (append) → Telegram (confirm)

👉 See [`docs/architecture.md`](docs/architecture.md) for PlantUML diagrams and data model.

---

## 🧰 Stack

* **n8n** – workflow automation
* **Telegram Bot API** – chat interface
* **OpenAI API** – natural language parsing
* **Google Sheets API** – storage
* **PlantUML** – diagrams

---

## 📁 What’s in this repo

```text
driver-expenses-bot/
├── [README.md](README.md)                # main docs
├── [TESTING.md](TESTING.md)              # detailed testing instructions
├── [package.json](package.json)          # Node project metadata
├── [env/.env.example](env/.env.example)  # example environment vars
├── [prompts/ai-agent-system.md](prompts/ai-agent-system.md)
├── [prompts/expense.schema.json](prompts/expense.schema.json)
├── [workflow/driver-expenses-bot.json](workflow/driver-expenses-bot.json)
├── [tests/validate-fixtures.mjs](tests/validate-fixtures.mjs)
├── [tests/fixtures/](tests/fixtures/)    # input/output examples
├── [docs/architecture.md](docs/architecture.md)
├── [docs/code-node-snippet.js](docs/code-node-snippet.js)
├── [docs/sample-sheet.csv](docs/sample-sheet.csv)
├── [docs/diagrams/](docs/diagrams/)      # UML sources
├── [docs/screenshots/](docs/screenshots/) # demo screenshots
└── [tools/plantuml.jar](tools/plantuml.jar)
```

---

## ⚙️ Prerequisites

* Git
* Docker (or VPS / n8n.cloud)
* Telegram Bot token ([@BotFather](https://t.me/BotFather))
* OpenAI API key
* Google Sheets API credentials
* Node.js **20+** (recommend: `nvm use`)

---

## 🚀 Quick Setup

1. Copy `.env.example` → `.env` and fill in credentials.
2. In n8n: import `workflow/driver-expenses-bot.json`.
3. Paste JS from [`docs/code-node-snippet.js`](docs/code-node-snippet.js) into Code node.
4. Set up Google Sheet (or import [`docs/sample-sheet.csv`](docs/sample-sheet.csv)).
5. Start workflow and test via Telegram.

---

## 🧪 Testing

For detailed testing steps (schema validation + end-to-end n8n run), see:
👉 [TESTING.md](TESTING.md)

---

## 📸 Screenshots

* ![AI Output](docs/screenshots/ai_agent_output.jpg)
* ![Prompt](docs/screenshots/ai_agent_prompt.jpg)
* ![JSON Clarification](docs/screenshots/json_output_clarification.jpg)
* ![Google Sheets](docs/screenshots/google_sheets_data.png)
* ![Telegram Interaction](docs/screenshots/telegram_interaction.png)
* ![n8n Workflow](docs/screenshots/n8n_workflow.jpg)
* ![Clarification](docs/screenshots/telegram_clarification.jpg)

---

## 🔐 Ethics & Security

* ✅ No secrets in repo (`.env` or n8n credentials only)
* ✅ Minimum Google permissions
* ⚠️ Remind users data is stored in Sheets
* 🛑 For **personal academic use only** (not production)

---

## 📄 License

MIT License

---

## 🎓 Academic Note

Project developed for **Professional Development module** at **Elizabeth School of London**, in partnership with **Newcastle College Group**.

* [🔗 GitHub Repo](https://github.com/NicSterian/driver-expenses-bot)
* [🔗 LinkedIn](https://www.linkedin.com/in/nicolae-sterian)
