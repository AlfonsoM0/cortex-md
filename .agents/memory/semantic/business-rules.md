# Business Rules

## Primary Domain

*Describe in 2-3 lines the business domain (e.g., fintech, e-commerce, B2B SaaS) and the problem it solves.*

## Key Entities

| Entity | Description | Relationships |
|---|---|---|
| *User* | *Example: Person registered on the platform* | *Has many Orders* |
| *Order* | *Example: Purchase request* | *Belongs to a User* |

## Invariable Rules

*List the business constraints that the code must always respect, without exception.*

- *E.g.: A user cannot have a negative balance.*
- *E.g.: Every transaction must record a concept.*

## Critical Business Flows

*Describe the main processes step by step (e.g., checkout flow, onboarding flow).*
