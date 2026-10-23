# Taxonomía de Etiquetas (Cortex-MD)

Este documento define la lista **estricta** de etiquetas `[Tags]` que pueden usarse en la línea índice de cada registro de sesión — y por lo tanto en `timeline.md`, que se genera con esas líneas.

**Regla para el agente:** usá solo las etiquetas listadas acá. Si ninguna etiqueta existente cubre adecuadamente el dominio trabajado, **recomendá una nueva al usuario y esperá su aprobación** antes de agregarla a este archivo y usarla.

**Una etiqueta en uso nunca se renombra ni se borra:** los registros viejos la conservan en su línea índice, y la memoria episódica no se reescribe. Marcala como retirada, nombrando a su sucesora (`[Auth]` — retirada, ahora `[Seguridad]`), y buscá por las dos: `--history Auth Seguridad`.

## Etiquetas Permitidas

> Las etiquetas del proyecto salen de las áreas que surgieron en la entrevista de alineación, aprobadas por el usuario. `[Docs]` y `[CortexMD]` se conservan siempre.

- `[Docs]`: Documentación del proyecto (`docs/`), sesiones de alineación y re-alineación, README.
- `[CortexMD]`: Sesiones de mantenimiento de la memoria (defrag, purga, optimización). Las sesiones etiquetadas **únicamente** con `[CortexMD]` no son relevantes para el proyecto y se omiten durante el enrutamiento hipocampal.

<!-- cortex:example — sugerencias para init; no valen hasta que el usuario las apruebe
Software: [Core] configuración raíz y tooling · [UI] interfaz y estilos · [Auth] autenticación y seguridad · [DB] base de datos y migraciones · [API] endpoints e integraciones · [Testing] tests y QA · [DevOps] CI/CD e infraestructura · [Refactor] reestructuración sin cambios funcionales · [Bugfix] corrección de errores
Administrativo: [Stock] · [Proveedores] · [Clientes] · [Pagos] · [Agenda] · [Procedimientos]
-->
