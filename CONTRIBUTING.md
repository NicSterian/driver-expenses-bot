# Contributing

Thanks for considering contributing!

## Dev setup
1. Clone the repo.
2. `npm i` (for dev tools like the schema validator).
3. Run `npm run test:fixtures` to validate fixture outputs against the JSON Schema.

## Workflow
- Create a feature branch from `main`.
- Add or update fixtures in `tests/fixtures/` when changing the agent output format.
- Update `prompts/expense.schema.json` if you add fields.
- Update `README.md` and `CHANGELOG.md` in the same PR.

## Code of Conduct
Be respectful and constructive. Report security issues privately (see `SECURITY.md`).
