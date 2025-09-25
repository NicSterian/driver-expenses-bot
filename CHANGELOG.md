# Changelog
All notable changes to this project will be documented in this file.

The format is inspired by [Keep a Changelog](https://keepachangelog.com/) and the project follows [SemVer](https://semver.org/) when possible.

## [Unreleased]
### Added
- (Planned) Fixture test harness with JSON Schema validation (`npm run test:fixtures`).
- (Planned) Multi-currency detection and (optional) FX conversion to GBP.
- (Planned) Receipt image OCR flow (Drive link + extra Sheets column).
- (Planned) Simple rate limiting guard in Code node.
- (Planned) Keyword → category autolearning map.

### Changed
- (Planned) More examples in the AI system prompt, including tricky edge cases.

### Fixed
- (Planned) Minor README clarifications based on user feedback.

---

## [0.1.0] — 2025-09-25
### Added
- **Prompt hardening** (`prompts/ai-agent-system.md`): clarified non-guessing rules, `amount_gbp` may be `null`, UTC date rule, non-expense/noise guard.
- **JSON Schema** (`prompts/expense.schema.json`) to define valid agent output.
- **Sample Google Sheet** (`docs/sample-sheet.csv`) with exact header order.
- **Code node snippet** (`docs/code-node-snippet.js`) fixing:
  - Use of `safeDate` for `date_iso`
  - Keep `amount_gbp: null` when unknown (no forced 0)
  - Default Personal/Business to **Business** unless clearly personal
- **Workflow export** (`workflow/driver-expenses-bot.json`) for portability.
- **Fixtures** (`tests/fixtures/…`) for docs/testing:
  - `tyres_80.*`, `parking_missing_amount.*`
- **Screenshots** (`docs/screenshots/…`) of AI output, clarifying message, Sheets result.
- **README** upgrade: architecture diagram, setup steps, limitations, screenshots.

### Changed
- README clarified header order and the clarifying-question flow.

### Fixed
- N/A

[0.1.0]: https://github.com/NicSterian/driver-expenses-bot
