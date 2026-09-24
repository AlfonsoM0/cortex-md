# Tag Taxonomy (Cortex-MD)

This document defines the **strict** list of `[Tags]` that can be used in `timeline.md`.

**Rule for the agent:** You must exclusively use the tags listed here. If during a session you detect that no existing tag adequately covers the domain worked on, **recommend a new tag to the user and wait for their approval** before registering it in this file and using it in the timeline.

## Allowed Tags

> These are the default tags for a software project. In another domain, `init.md` proposes replacements or additions (e.g. `[Stock]`, `[Suppliers]`, `[Customers]`, `[Payments]`) and the user approves them. `[CortexMD]` is always preserved.

- `[Core]`: Changes to root configuration, initialization, or project tooling.
- `[UI]`: User interface, visual components, styles, animations.
- `[Auth]`: Authentication, authorization, session management, security.
- `[DB]`: Database, schemas, migrations, ORM.
- `[API]`: Endpoints, network integrations, webhooks, external services.
- `[Testing]`: Unit tests, integration tests, E2E, QA.
- `[DevOps]`: CI/CD, deployments, infrastructure, containers.
- `[Refactor]`: Code restructuring without changes to external functionality.
- `[Bugfix]`: Resolution of detected errors and bugs.
- `[Docs]`: Documentation updates, semantic memory, README.
- `[CortexMD]`: Memory maintenance sessions (defrag, optimization). Sessions tagged **only** with `[CortexMD]` are not relevant to the project and must be skipped during hippocampal routing.
