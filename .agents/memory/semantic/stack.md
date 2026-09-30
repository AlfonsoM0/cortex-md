# Stack and Systems

> **Contract:** each entry is a rule in imperative mood + at most one sentence of rationale + citation to canonical doc (`→ docs/...`), ≤ ~400 characters. Details live in `docs/`; history lives in episodic memory. Checker: `node .agents/check-memory-contract.js`.

<!-- cortex:example — replace the placeholders with real entries and delete this block (init.md § Phase 4)
Software:
- **Primary source:** this repository's code, and the production database for live data. They beat memory. → `docs/architecture/overview.md`
- **Agent environment:** Claude Code with Opus, subscription plan; bridge `CLAUDE.md` + session start hook. → `docs/agent-environment.md`
- **Stack:** TypeScript, Next.js, PostgreSQL on Supabase; pnpm, ESLint, Vitest. → `docs/architecture/overview.md`
Administrative:
- **Primary source:** `Suppliers/suppliers.xlsx` (suppliers and prices) and the billing system (sales). They beat memory. → `docs/systems.md`
- **Agent environment:** Claude Cowork with Opus, subscription plan; bridge `CLAUDE.md`. → `docs/agent-environment.md`
- **Supplier orders:** by email from the purchasing inbox; WhatsApp only for emergencies. → `docs/procedures/restocking.md`
-->

## Primary Source

_The first entry of this file: which files or systems hold the truth for each data type — the code, or the business files (e.g. a suppliers spreadsheet), including those outside the folder (cloud, connector, online system). They beat memory in case of discrepancy._

## Agent Environment

_The tool and its form of use, the model, and how memory is loaded; cite the environment doc created by init._

## Tools and Services

_Languages, frameworks, and development tools — or the systems, apps, and suppliers the operation relies on._
