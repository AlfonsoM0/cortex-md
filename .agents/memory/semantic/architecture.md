# Architecture

> **Contract:** each entry is a rule in imperative mood + at most one sentence of rationale + citation to canonical doc (`→ docs/...`), ≤ ~400 characters. Details live in `docs/`; history lives in episodic memory. Checker: `node .agents/check-memory-contract.js`.

<!-- cortex:example — replace the placeholders with real entries and delete this block (init.md § Phase 4)
Software:
- **Monorepo:** `apps/web` (front end) and `packages/db` (schemas and migrations); the front end never queries the database directly. → `docs/architecture/overview.md`
Administrative:
- **Workspace map:** `Suppliers/` and `Finance/` hold the business files; `docs/` explains the procedures; `.agents/` is the agent's memory. → `docs/systems.md`
- **Restocking:** low-stock alert → order to the preferred supplier → receipt with delivery note → entry into the spreadsheet → payment at 30 days. → `docs/procedures/restocking.md`
-->

## Overview

_In 2-3 lines: what kind of system or operation this is, and its main flow (of data, or of work: order → receipt → payment)._

## Workspace Map

_Which folder holds what: the business files and their folders, `docs/` (documentation that explains the project), `.agents/` (the agent's memory and workflows)._

## Areas and Modules

_The main modules or packages of the code — or the functional areas of the operation — with their responsibility and owner._

## Main Flows

_The critical flows, each as a rule + citation to the doc that details it._
