# Architecture

## Data Flow (High Level)
![Data Flow](diagrams/architecture.png)

## Sequence (Happy Path: "tyres 80")
![Sequence (Happy Path)](diagrams/sequence_happy_path.png)

## Context Map
![Context Map](diagrams/context_map.png)

## Data Model (Sheet headers)
- **Date (ISO)** – YYYY-MM-DD (UTC calendar date)
- **Personal/Business** – `"Personal"` or `"Business"`
- **Description** – short human text
- **Amount (GBP)** – number (2dp)
- **Type** – one of the allowed categories

> Source `.puml` files are in `docs/diagrams/` if you want to edit and re-export.
