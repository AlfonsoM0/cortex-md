# Cortex-MD: Módulo AI Helpers

El módulo **AI Helpers** provee un pipeline de ejecución stepwise (por pasos) diseñado para aislar el proceso de desarrollo de características del contexto general del sistema. Permite tomar una idea de alto nivel y transformarla en código auditado a través de un proceso iterativo y repetible.

## 1. ¿Qué es el Pipeline de Ejecución Stepwise?

Mientras que Cortex-MD destaca en la gestión de memoria global y contexto episódico, no prescribe cómo hacer la programación real *durante* la sesión. El pipeline stepwise divide el ciclo de desarrollo de software en cinco fases explícitas.

Al separar el razonamiento (planificación) de la ejecución (codificación), se previene la "amnesia" en modelos ligeros y la "sobrecarga de contexto" en modelos que trabajan con grandes ventanas de contexto.

## 2. Arquitectura

El módulo se divide en tres áreas:

1.  **`/generators/` (Los Motores):** Contiene los prompts activos. Son las herramientas que se ejecutan para transformar la información de un paso al siguiente.
2.  **`/idea-development/` (La Mesa de Trabajo):** Es el espacio de trabajo donde la idea evoluciona hasta convertirse en código auditado. La carpeta `01-brief/` actúa como un backlog de ideas: puede contener múltiples briefs en paralelo.
3.  **`/prompts/` (Prompts de Orquestación):** Contiene prompts maestros para la ejecución automatizada multi-agente.

## 3. Modos de Trabajo

Existen tres formas principales de operar con la IA. Elegí la que mejor se adapte a tu nivel de control deseado y a las capacidades del modelo que estés usando.

### Opción 1: Flujo Manual (Control Total)

El usuario interactúa paso a paso con cada generador. Ideal para tener visibilidad y control absoluto sobre cada fase.

1.  Escribís tu requerimiento en un archivo dentro de `01-brief/` (ej. `01-brief/mi-feature.md`).
2.  Pedís generar el desglose con `01-generate-breakdown.md` → crea `02-breakdown.md`.
3.  Para cada PR del desglose, invocás `02-generate-spec.md` → crea `03-spec.md`.
4.  Invocás `03-generate-prompt.md` → crea `04-prompt.md`.
5.  Pasás ese prompt a tu agente de código para que implemente el feature.
6.  Ejecutás `04-generate-audit.md` para verificar que el código cumple con la especificación.
7.  Cuando decidís que la sesión está completa (puede abarcar múltiples PRs), ejecutás `.agents/workflows/end.md` para consolidar en el Hipocampo.

### Opción 2: Flujo Orquestado (Máxima Automatización)

Diseñado para delegar el ciclo completo a un Orquestador.

1.  Usás `01-generate-breakdown.md` para convertir el brief en el plan (`02-breakdown.md`).
2.  Invocás a tu agente Orquestador y le pasás el prompt maestro `prompts/breakdown-orchestrator.md`.
3.  El Orquestador se encarga de invocar a los distintos **sub-agentes** (Architect, Code, Debug) en un bucle automatizado para cada PR del breakdown.
4.  El usuario solo supervisa y recibe el resultado final una vez que el Orquestador ha resuelto todos los PRs y superado la auditoría del agente Debug.

### Opción 3: Independiente (Sin Pipeline Stepwise)

El agente principal del proyecto (con contexto global completo de la memoria semántica) gestiona la tarea directamente, sin usar los generadores. Se le piden los workflows globales directamente como `/deep-plan` o `/audit`, confiando en su capacidad para gestionar el contexto completo sin particionar el razonamiento en archivos separados.

> **¿Cuándo usarlo?** Cuando la tarea es suficientemente pequeña o el agente principal es lo suficientemente capaz como para no necesitar el scaffolding del pipeline.

## 4. Reglas de Diseño

Este módulo depende de varias reglas arquitectónicas estrictas para funcionar correctamente sin colisionar con el resto de Cortex-MD:

### A. Barrera de Contexto (`AGENTS.md` local)

Para proteger radicalmente la memoria de trabajo del agente principal, esta carpeta contiene su propio `AGENTS.md`. Actúa como una barrera, indicando a los agentes que **ignoren** todo el contenido de esta carpeta para la indexación global automática. Los archivos aquí se leen y sobrescriben estrictamente bajo demanda, evitando que borradores a medio terminar contaminen la memoria a largo plazo.

### B. Identidad y Desacople de Contexto

- El **agente principal** es la IA con el contexto global completo (memoria semántica cargada).
- Cuando actúa como Orquestador e invoca a **sub-agentes** (Architect, Code, Debug), esos sub-agentes nacen como "tablas rasas" (sin memoria del proyecto).
- Por esta razón, los prompts generados como `04-prompt.md` **no incluyen reglas globales**. Es responsabilidad del Orquestador "nutrir" a esos sub-agentes pasándoles solo el contexto estrictamente necesario para su tarea, protegiéndolos del _context bloat_.

### C. Commits Enriquecidos

En lugar de crear múltiples carpetas para cada feature (lo cual infla el repo), los archivos del pipeline se mantienen como un único "espacio de trabajo estático" que se sobrescribe en cada iteración. Al enviar los cambios, toda la cadena de razonamiento autónomo generada en estos archivos debe inyectarse directamente en el cuerpo del commit o en la descripción del PR. El historial de Git se convierte en la máxima Memoria Episódica inmutable.

### D. Kanbanización

El archivo `02-breakdown.md` se estructura usando checkboxes de Markdown (`- [ ]`, `- [x]`). Esto actúa como el Neocortex de corto plazo, permitiendo mantener sincronizado el estado de la tarea sin colisionar.

### E. Consolidación Manual

A diferencia del proceso automático, al finalizar con éxito una característica mediante este módulo, **es responsabilidad del usuario** decidir cuándo ejecutar `.agents/workflows/end.md` para consolidar lo aprendido en la memoria semántica. Esto permite agrupar múltiples PRs lógicos en una sola sesión de memoria episódica, en lugar de crear una entrada por cada PR.

## 5. Personalización

Los prompts en la carpeta `generators/` y `prompts/` pueden y deben ser personalizados para adaptarse a las herramientas y convenciones específicas de tu equipo. Son simples archivos Markdown diseñados para ser modificados.

> **Nota sobre los modos de workflow:** Los workflows de extensión (`deep-plan.md`, `audit.md`) soportan tres modos (`strict`, `standard`, `autonomous`). Si tu equipo no utiliza modelos de razonamiento de alta capacidad (Opus, o1, Deep Research), considera **eliminar el modo `autonomous`** de tus workflows para reducir la fricción cognitiva en la selección de modo. Menos opciones = menos overhead.
