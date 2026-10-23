# Tag Taxonomy (Cortex-MD)

This document defines the **strict** list of `[Tags]` that can be used in the index line of each session record — and so in `timeline.md`, which is generated from those lines.

**Rule for the agent:** use only the tags listed here. If no existing tag adequately covers the domain worked on, **recommend a new tag to the user and wait for their approval** before adding it to this file and using it.

**A tag in use is never renamed or deleted:** old records keep it in their index line, and episodic memory is not rewritten. Mark it as retired, naming its successor (`[Auth]` — retired, now `[Security]`), and search both: `--history Auth Security`. **Only exception:** a full re-tagging of the history, approved by the user, may delete it.

**Precise tags:** a tag that most sessions carry filters nothing. Tag first *what part of the project* changed (its domain); a layer (`[UI]`, `[DB]`) only when the layer itself is the topic; and at most one *kind of work* (`[Bugfix]`, `[Refactor]`). The checker enforces caps the taxonomy declares: `(max. N)` in the `#` title caps the tags per line, and in a `##` heading, the tags of that group (e.g. `## Work (max. 1)`). Without them, it only checks that every tag is listed here.

## Allowed Tags

> The project's tags come from the domains that emerged in the alignment interview, approved by the user. `[Docs]` and `[CortexMD]` are always retained.

- `[Docs]`: Project documentation (`docs/`), alignment and re-alignment sessions, README.
- `[CortexMD]`: Memory maintenance sessions (defrag, purge, optimization). Sessions tagged **only** with `[CortexMD]` are not relevant to the project and must be skipped during hippocampal routing.

<!-- cortex:example — suggestions for init; they are not valid until the user approves them
Software, in groups (title "(max. 4 per line)"): ## Domain — one tag per product area (e.g. [Orders] · [Payments] · [Auth]) · ## Technical — [UI] design system and styles · [API] API patterns and integrations · [DB] schema and migrations · [DevOps] platform, tooling, CI/CD and releases · ## Work (max. 1) — [Bugfix] · [Refactor] · [Testing] · [Docs]
Administrative: [Stock] · [Suppliers] · [Customers] · [Payments] · [Calendar] · [Procedures]
-->
