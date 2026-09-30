# Business Rules

> **Contract:** each entry is a rule in imperative mood + at most one sentence of rationale + citation to canonical doc (`→ docs/...`), ≤ ~400 characters. Details live in `docs/`; history lives in episodic memory. Checker: `node .agents/check-memory-contract.js`.

<!-- cortex:example — replace the placeholders with real entries and delete this block (init.md § Phase 4)
Software:
- **A user never has a negative balance:** every debit validates funds in the same transaction. → `docs/features/payments.md`
Administrative:
- **Never approve a payment without a signed delivery note:** shortages are claimed before paying. → `docs/procedures/payments.md §2`
- **The minimum stock of each product is defined by the spreadsheet**, not by memory: memory names the column, never copies its values. → `docs/systems.md`
-->

## Domain

_In 2-3 lines: the business domain and the problem it solves._

## Key Entities

_The main entities and how they relate (e.g. customer, order, supplier, product)._

## Invariable Rules

_The constraints that the system — or whoever operates it — always respects, without exception (zero-error items)._

## Critical Flows

_The processes where an error is expensive, each as a rule + citation._
