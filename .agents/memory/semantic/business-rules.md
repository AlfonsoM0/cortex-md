# Business Rules

> **Contract:** each entry is a rule in imperative mood + at most one sentence of rationale + citation to canonical doc (`→ docs/...`), ≤ ~400 characters. Details live in `docs/`; history lives in episodic memory. Checker: `node .agents/check-memory-contract.js`.

## Primary Domain

*Describe in 2-3 lines the business domain (e.g. fintech, e-commerce, B2B SaaS) and the problem it solves.*

## Key Entities

| Entity | Description | Relationships |
|---|---|---|
| *User* | *Example: Person registered on the platform* | *Has many Orders* |
| *Order* | *Example: Purchase request* | *Belongs to a User* |

## Invariable Rules

*List the constraints that the system (or operator) must always respect, without exception.*

- *E.g.: A user cannot have a negative balance.*
- *E.g.: Every transaction must record a concept.*

## Critical Business Flows

*Describe the main processes step by step (e.g. checkout flow, onboarding flow).*
