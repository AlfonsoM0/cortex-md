# Tag Taxonomy (Cortex-MD)

This document defines the **strict** list of `[Tags]` that can be used in `timeline.md`.

**Rule for the agent:** use only the tags listed here. If no existing tag adequately covers the domain worked on, **recommend a new tag to the user and wait for their approval** before adding it to this file and using it in the timeline.

## Allowed Tags

> The project's tags come from the domains that emerged in the alignment interview, approved by the user. `[Docs]` and `[CortexMD]` are always retained.

- `[Docs]`: Project documentation (`docs/`), alignment and re-alignment sessions, README.
- `[CortexMD]`: Memory maintenance sessions (defrag, purge, optimization). Sessions tagged **only** with `[CortexMD]` are not relevant to the project and must be skipped during hippocampal routing.

<!-- cortex:example — suggestions for init; they are not valid until the user approves them
Software: [Core] root configuration and tooling · [UI] interface and styles · [Auth] authentication and security · [DB] database and migrations · [API] endpoints and integrations · [Testing] tests and QA · [DevOps] CI/CD and infrastructure · [Refactor] restructuring without functional changes · [Bugfix] error fixes
Administrative: [Stock] · [Suppliers] · [Customers] · [Payments] · [Calendar] · [Procedures]
-->
