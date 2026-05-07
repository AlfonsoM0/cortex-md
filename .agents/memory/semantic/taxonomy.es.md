# Taxonomía de Etiquetas (Cortex-MD)

Este documento define la lista **estricta** de etiquetas `[Tags]` que pueden utilizarse en `timeline.md`.

**Regla para el agente:** Debes usar exclusivamente las etiquetas listadas aquí. Si durante una sesión detectas que ninguna etiqueta existente cubre adecuadamente el dominio trabajado, **recomienda una nueva etiqueta al usuario y espera su aprobación** antes de registrarla en este archivo y usarla en el timeline.

## Etiquetas Permitidas

- `[Core]`: Cambios en la configuración raíz, inicialización, o tooling del proyecto.
- `[UI]`: Interfaz de usuario, componentes visuales, estilos, animaciones.
- `[Auth]`: Autenticación, autorización, gestión de sesiones, seguridad.
- `[DB]`: Base de datos, esquemas, migraciones, ORM.
- `[API]`: Endpoints, integraciones de red, webhooks, servicios externos.
- `[Testing]`: Tests unitarios, de integración, E2E, QA.
- `[DevOps]`: CI/CD, despliegues, infraestructura, contenedores.
- `[Refactor]`: Reestructuración de código sin cambios en funcionalidad externa.
- `[Bugfix]`: Resolución de errores y fallos detectados.
- `[Docs]`: Actualización de documentación, memoria semántica, README.
- `[CortexMD]`: Sesiones de mantenimiento de memoria (defrag, optimización). Las sesiones etiquetadas **únicamente** con `[CortexMD]` no son relevantes para el proyecto y deben omitirse durante el enrutamiento hipocampal.
