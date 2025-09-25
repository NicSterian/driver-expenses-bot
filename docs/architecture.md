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
