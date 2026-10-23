# Taxonomía de Etiquetas (Cortex-MD)

Este documento define la lista **estricta** de etiquetas `[Tags]` que pueden usarse en la línea índice de cada registro de sesión — y por lo tanto en `timeline.md`, que se genera con esas líneas.

**Regla para el agente:** usá solo las etiquetas listadas acá. Si ninguna etiqueta existente cubre adecuadamente el dominio trabajado, **recomendá una nueva al usuario y esperá su aprobación** antes de agregarla a este archivo y usarla.

**Una etiqueta en uso nunca se renombra ni se borra:** los registros viejos la conservan en su línea índice, y la memoria episódica no se reescribe. Marcala como retirada, nombrando a su sucesora (`[Auth]` — retirada, ahora `[Seguridad]`), y buscá por las dos: `--history Auth Seguridad`. **Única excepción:** un re-etiquetado completo de la historia, aprobado por el usuario, puede borrarla.

**Etiquetas precisas:** una etiqueta que llevan casi todas las sesiones no filtra nada. Etiquetá primero *qué parte del proyecto* cambió (su dominio); una capa (`[UI]`, `[DB]`) solo cuando la capa es el tema; y a lo sumo un *tipo de trabajo* (`[Bugfix]`, `[Refactor]`). El verificador aplica los topes que declare la taxonomía: `(máx. N)` en el título `#` limita las etiquetas por línea, y en un encabezado `##`, las de ese grupo (p. ej. `## Trabajo (máx. 1)`). Sin topes, solo controla que cada etiqueta figure acá.

## Etiquetas Permitidas

> Las etiquetas del proyecto salen de las áreas que surgieron en la entrevista de alineación, aprobadas por el usuario. `[Docs]` y `[CortexMD]` se conservan siempre.

- `[Docs]`: Documentación del proyecto (`docs/`), sesiones de alineación y re-alineación, README.
- `[CortexMD]`: Sesiones de mantenimiento de la memoria (defrag, purga, optimización). Las sesiones etiquetadas **únicamente** con `[CortexMD]` no son relevantes para el proyecto y se omiten durante el enrutamiento hipocampal.

<!-- cortex:example — sugerencias para init; no valen hasta que el usuario las apruebe
Software, en grupos (título "(máx. 4 por línea)"): ## Dominio — una etiqueta por área del producto (p. ej. [Pedidos] · [Pagos] · [Auth]) · ## Técnica — [UI] sistema de diseño y estilos · [API] patrones de API e integraciones · [DB] schema y migraciones · [DevOps] plataforma, tooling, CI/CD y releases · ## Trabajo (máx. 1) — [Bugfix] · [Refactor] · [Testing] · [Docs]
Administrativo: [Stock] · [Proveedores] · [Clientes] · [Pagos] · [Agenda] · [Procedimientos]
-->
