# AI Helpers — Barrera de Contexto

Esta carpeta guarda el material de trabajo del pipeline por pasos (briefs, breakdowns, specs, prompts, auditorías).

**Agentes e IDEs:** NO indexen ni lean esta carpeta por iniciativa propia. Léanla y escríbanla **solo cuando el usuario o un prompt del pipeline lo pida** (p. ej. `prompts/breakdown-orchestrator.md`, `generators/*`): en ese caso, trabajen acá con normalidad.

Leerla automáticamente contaminaría la ventana de contexto con borradores de trabajo irrelevantes.

**Cuando un plan termina:** su conocimiento se traslada a `docs/` y a la memoria (`end.md`), y sus archivos acá se borran. Antes de borrar, rescatá cualquier **artefacto aprobado que todavía espere su fecha** (un texto legal aprobado, un copy aprobado) en un borrador dentro de `docs/` que ningún script de publicación lea. `docs/` y la memoria nunca citan rutas de esta carpeta ni la numeración interna de un plan ("PR 5"): citan el doc canónico.
