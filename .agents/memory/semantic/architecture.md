# System Architecture

> **Contract:** each entry is a rule in imperative mood + at most one sentence of rationale + citation to canonical doc (`→ docs/...`), ≤ ~400 characters. Details live in `docs/`; history lives in episodic memory. Checker: `node .agents/check-memory-contract.js`.

## Overview

*Describe in 2-3 lines what type of system this is (monolith, monorepo… or, in an administrative operation, what areas and systems comprise it) and the main flow (data, or workflow: order → receipt → payment).*

## Module Structure

*List the main modules or packages of the project and their responsibility.*

| Module | Responsibility |
|---|---|
| *`apps/web`* | *Example: Next.js Frontend* |
| *`packages/db`* | *Example: Schemas and migrations with DrizzleORM* |

## Global Design Patterns

*Document the patterns applied transversally across the project (e.g., Repository Pattern, Dependency Injection, Event-Driven, etc.).*

## Data Flow Diagram

*Describe or reference the main flow: user input → processing → persistence → response.*
