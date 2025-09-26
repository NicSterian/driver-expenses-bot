# ✅ Testing Guide

This guide shows how to verify the project locally **without** any secrets, and how to do an end-to-end check in **n8n** with Telegram + Google Sheets.

---

## 1) Local Schema Tests (no APIs needed)

These tests validate that sample AI outputs match the JSON schema in `prompts/expense.schema.json`.

### Prerequisites

* **Node.js 20+**
* **Git**

### Steps

```bash
git clone https://github.com/NicSterian/driver-expenses-bot.git
cd driver-expenses-bot
npm install
npm test
```

### Expected output

```bash
✅ tyres 80 matches schema
✅ parking (missing amount) matches schema
```

> You can also run the validator directly:

```bash
node tests/validate-fixtures.mjs
```

---

## 2) Add Your Own Test Cases (optional)

1. Create a new input prompt file, e.g.:

   ```
   tests/fixtures/cleaning_12.in.txt
   ```
2. Create the expected JSON next to it:

   ```
   tests/fixtures/cleaning_12.out.json
   ```
3. Re-run:

```bash
node tests/validate-fixtures.mjs
```

---

## 3) End-to-End Test in n8n

This checks the actual workflow import, AI parsing, clarifications, and Google Sheets append.

### Prerequisites

* Running **n8n** (Docker or VM)
* **Telegram bot token** (from @BotFather)
* **OpenAI API key**
* **Google Sheets** service account with **Editor** access to your target sheet
* A Google Sheet with headers (row 1):

  ```
  Date (ISO) | Personal/Business | Description | Amount (GBP) | Type
  ```

### Steps

1. **Import the workflow**
   *n8n UI → Menu (☰) → Import*
   Select: `workflow/driver-expenses-bot.json`

2. **Paste the Code node script**
   Open the **Code** node and paste contents of:
   `docs/code-node-snippet.js`

3. **Set credentials**

   * Telegram (bot token)
   * OpenAI (API key)
   * Google Sheets (service account; share the Sheet with the service account email)

4. **Start the workflow** and send test messages to your Telegram bot:

   * `tyres 80` → should **append** a row (Maintenance)
   * `parking` → bot should ask: *“What was the amount (GBP)?”*

     * Reply `7` → should complete and append a Parking row

5. **Check Google Sheets** for appended rows.

---

## 4) Troubleshooting Quick Reference

| Issue                       | Fix                                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `No columns found` (Sheets) | Ensure header row exists and service account has **Editor** access.                                  |
| Bot doesn’t respond         | Webhook not reachable; verify n8n URL / reverse proxy; try `ngrok http 5678` for local.              |
| Clarification loop          | Make sure the **Code** node script is pasted correctly and the **AI Agent** is returning valid JSON. |
| Wrong date format           | The code normalizes to **YYYY-MM-DD** (UTC). Fixtures must use that format.                          |
| Chat ID missing             | Map `{{$json._chat_id}}` from Code node or `{{$node["Telegram Trigger"].json.message.chat.id}}`.     |

---

## 5) Optional: Local n8n + ngrok (quick test)

Run a throwaway n8n locally:

```bash
docker run -it --rm -p 5678:5678 n8nio/n8n
```

Expose it to Telegram:

```bash
ngrok http 5678
```

Update your Telegram bot **webhook URL** to the `https` ngrok URL.

> ⚠️ **Note:** Free ngrok sessions reset on restart, so the URL changes. For a persistent URL use a paid plan or a different tunnel (e.g., Cloudflare Tunnel).

---

## 6) CI Tests (GitHub Actions)

Every push to **main** runs the schema validator in CI.
You can view the status under **GitHub → Actions → CI**.

---

## 7) What the Tests Cover

* **Required fields** exist (`date_iso`, `personal_or_business`, `description`, `amount_gbp`, `type`, `needs_clarification`, `clarification_question`)
* **Types & enums** are correct (e.g., `amount_gbp` number/null; `type` is from the allowed list)
* **Date pattern** is strictly `YYYY-MM-DD`
* **No extra properties** slip into the JSON
