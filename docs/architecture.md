# Architecture

## Data Flow (High Level)

```mermaid
flowchart LR
  TG[Telegram User] -->|message| TGT[Telegram Trigger (n8n)]
  TGT --> AIA[AI Agent (OpenAI)]
  AIA --> CODE[Code Node (validate/normalize)]
  CODE --> IF{needs_clarification?}
  IF -- yes --> ASK[Telegram Send Message (clarifying question)]
  ASK -. waits for reply .- TGT
  IF -- no --> SHEETS[Google Sheets: Append Row]
  SHEETS --> CONF[Telegram Send Message (confirmation)]


## Context Map

```mermaid
graph TD
  P[prompts/ai-agent-system.md]:::file --> AIA[AI Agent (in n8n)]
  SC[prompts/expense.schema.json]:::file --> TESTS[Fixture Validator]
  FIX[tests/fixtures/*]:::file --> TESTS
  CODE[docs/code-node-snippet.js]:::file --> N8NCODE[n8n Code Node]
  WF[workflow/driver-expenses-bot.json]:::file --> N8NWF[n8n Workflow Import]
  SHEET[docs/sample-sheet.csv]:::file --> GSH[Google Sheets Template]

classDef file fill:#eef,stroke:#888,stroke-width:1px;
