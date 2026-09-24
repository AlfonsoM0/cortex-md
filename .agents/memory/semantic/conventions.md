# Code Conventions

> **Contract:** each entry is a rule in imperative mood + at most one sentence of rationale + citation to canonical doc (`→ docs/...`), ≤ ~400 characters. Details live in `docs/`; history lives in episodic memory. Checker: `node .agents/check-memory-contract.js`.

> In a non-technical project, this file stores the **house style**: document formats, communication tone and templates, file and record naming conventions.

## General Style

- **Indentation:** *E.g.: 2 spaces*
- **Quotes:** *E.g.: Single (`'`)*
- **Semicolons:** *E.g.: Yes / No*

## Naming

| Element | Convention | Example |
|---|---|---|
| *Components* | *PascalCase* | *`UserProfile.tsx`* |
| *Functions/variables* | *camelCase* | *`getUserById`* |
| *Utility files* | *kebab-case* | *`date-utils.ts`* |
| *Constants* | *UPPER_SNAKE_CASE* | *`MAX_RETRY_COUNT`* |

## Component Structure

*Describe the standard pattern for creating a component (e.g., where logic goes, where styles go, use of barrel exports, etc.).*

## Import Rules

*Describe the import order and whether path aliases are used (e.g., `@/`).*

## Prohibited Patterns

*List practices that MUST NOT be used in the project (e.g., `any` in TypeScript, `!important` in CSS, etc.).*
