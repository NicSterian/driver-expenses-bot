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

sequenceDiagram
  participant U as User
  participant TG as Telegram
  participant N as n8n
  participant AI as OpenAI (AI Agent)
  participant GS as Google Sheets

  U->>TG: "tyres 80"
  TG->>N: webhook update
  N->>AI: system prompt + message
  AI-->>N: JSON {date_iso, description, amount_gbp, ...}
  N->>N: Code node (normalize, guards)
  N->>N: IF (needs_clarification? == false)
  N->>GS: Append Row
  GS-->>N: OK
  N-->>TG: "Logged tyres £80 (Maintenance)"
