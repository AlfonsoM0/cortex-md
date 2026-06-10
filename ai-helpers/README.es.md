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

Diseñado para delegar el ciclo completo a un agente Orquestador con coordinación multi-agente (Context Provider, Architect, Code, Debug). `orchestator-memory.md` actúa como memoria de trabajo compartida durante el plan.

**Configuración de contexto para sub-agentes:** si tu herramienta de orquestación soporta reglas de contexto por agente o por modo (ej. Zoo Code con archivos en `.zoo/rules/`), configurá que todos los agentes lean `AGENTS.md` y ejecuten `start.md` automáticamente. Esto elimina la necesidad de copiar `conventions.md` en cada plan y permite reducir `orchestator-memory.md` a solo estado operativo. Ver la Nota de Contexto en `prompts/breakdown-orchestrator.md` para la cláusula de enfoque complementaria.

1.  Usás `01-generate-breakdown.md` para convertir el brief en el plan (`02-breakdown.md`).
2.  Invocás a tu agente Orquestador y le pasás el prompt maestro `prompts/breakdown-orchestrator.md`.
3.  El Orquestador ejecuta el ciclo completo:
    - **Paso 0:** Inicializa `orchestator-memory.md` (Context Provider + Architect).
    - **Por cada PR:** Context Provider escanea el área → Architect genera spec/prompt → Code implementa, valida y se auto-registra en `orchestator-memory.md`.
    - **Auditoría final:** Debug audita el plan completo contra `02-breakdown.md`.
4.  El usuario supervisa y recibe el resultado final auditado.
5.  Cuando lo considerés oportuno, ejecutás `.agents/workflows/end.md` para consolidar en Cortex-MD.

**QA bajo demanda:** una vez completado el plan, podés invocar `prompts/QA.md` para que Architect genere `QA-notes.md` con acciones de testing agrupadas por área.

### Opción 3: Independiente (Sin Pipeline Stepwise)

El agente principal del proyecto (con contexto global completo de la memoria semántica) gestiona la tarea directamente, sin usar los generadores. Se le piden los workflows globales directamente como `/deep-plan` o `/audit`, confiando en su capacidad para gestionar el contexto completo sin particionar el razonamiento en archivos separados.

> **¿Cuándo usarlo?** Cuando la tarea es suficientemente pequeña o el agente principal es lo suficientemente capaz como para no necesitar el scaffolding del pipeline.

## 4. Archivos del Pipeline

### `/idea-development/`

| Archivo | Descripción |
| --- | --- |
| `01-brief/` | Carpeta con el requerimiento inicial del usuario. |
| `02-breakdown.md` | Plan de PRs generado por `01-generate-breakdown.md`. Fuente de verdad del plan. |
| `03-spec.md` | Especificación técnica del PR actual (sobrescrita por PR). |
| `04-prompt.md` | Prompt de implementación del PR actual (sobrescrito por PR). |
| `05-audit.md` | Hallazgos de la auditoría del plan. |
| `orchestator-memory.md` | **[Flujo Orquestado]** Memoria de trabajo: estado de PRs, inventario anti-redundancia, convenciones críticas _(opcional si el orquestador inyecta contexto automáticamente)_ y notas de alerta. Efímero por plan. |
| `QA-notes.md` | **[Bajo demanda]** Acciones de QA manual generadas por `prompts/QA.md`. |

### `/generators/`

| Archivo | Descripción |
| --- | --- |
| `01-generate-breakdown.md` | Convierte el brief en el plan de PRs. |
| `02-generate-spec.md` | Genera la especificación técnica del PR actual. Produce dos secciones obligatorias: **Inventario Anti-Redundancia** y **Comandos de Validación**. |
| `03-generate-prompt.md` | Genera el prompt de implementación para el agente Code. |
| `04-generate-audit.md` | Audita un PR individual contra su spec (Flujo Manual). |

### `/prompts/`

| Archivo | Descripción |
| --- | --- |
| `breakdown-orchestrator.md` | Prompt maestro del Flujo Orquestado. Coordina Context Provider, Architect, Code y Debug en ciclos de PRs. |
| `QA.md` | Prompt bajo demanda. Instruye a Architect para generar `QA-notes.md` agrupado por área de UI, minimizando navegación y acciones repetidas. |
| `fix-edit-error.md` | Corrección de emergencia cuando Code falla editando el mismo archivo 3+ veces. El Orquestador lo inyecta automáticamente en el paso 1e. |

## 5. Reglas de Diseño

### A. Barrera de Contexto (`AGENTS.md` local)

Para proteger radicalmente la memoria de trabajo del agente principal, esta carpeta contiene su propio `AGENTS.md`. Actúa como una barrera, indicando a los agentes que **ignoren** todo el contenido de esta carpeta para la indexación global automática. Los archivos aquí se leen y sobrescriben estrictamente bajo demanda, evitando que borradores a medio terminar contaminen la memoria a largo plazo.

### B. Barrera Unidireccional

`ai-helpers` consume archivos de `.agents/workflows/` y `.agents/memory/`, pero **`.agents/` no conoce ni referencia a `ai-helpers/`**. Nunca modificar archivos de `.agents/` desde este módulo.

### C. Identidad y Desacople de Contexto

Por defecto, los sub-agentes invocados por el Orquestador arrancan sin memoria del proyecto: `orchestator-memory.md` (incluyendo Convenciones Críticas) es el vehículo de contexto. Si tu herramienta de orquestación inyecta el contexto base automáticamente en cada sub-agente, `orchestator-memory.md` se reduce a solo estado operativo del plan (PRs e inventario), y una cláusula de enfoque en cada mandato evita que los sub-agentes ejecuten fases irrelevantes de `start.md`. En el Flujo Manual, el usuario gestiona el contexto directamente.

### D. Escrituras Completas — Sin Costo de Limpieza

Todos los archivos del pipeline se sobrescriben completamente (no se parchean). Esto elimina el costo de tokens por contenido obsoleto y hace innecesarios los pasos de limpieza entre PRs. El próximo plan sobrescribe `orchestator-memory.md` desde cero en el Paso 0.

### E. Kanbanización

El archivo `02-breakdown.md` usa checkboxes de Markdown (`- [ ]`, `- [x]`). En el Flujo Orquestado, Code auto-registra su finalización en `orchestator-memory.md` de la misma forma.

### F. Inventario Anti-Redundancia

El output de `02-generate-spec.md` siempre incluye una sección de **Inventario Anti-Redundancia** antes de proponer nuevas abstracciones. Esto fuerza una verificación explícita de los paquetes existentes del proyecto y previene recrear componentes, hooks o utilidades que ya existen.

### G. Consolidación Manual

Al finalizar una característica, **es responsabilidad del usuario** ejecutar `.agents/workflows/end.md` para consolidar lo aprendido en la memoria semántica de Cortex-MD. Esto permite agrupar múltiples PRs en una sola sesión de memoria episódica, en lugar de consolidar después de cada PR individual.

## 6. Personalización

Los prompts en `generators/` y `prompts/` pueden y deben ser personalizados para adaptarse a las herramientas y convenciones específicas de tu equipo. Son simples archivos Markdown diseñados para ser modificados.

> **Nota sobre los modos de workflow:** Los workflows de extensión (`deep-plan.md`, `audit.md`) soportan tres modos (`strict`, `standard`, `autonomous`). Si tu equipo no utiliza modelos de razonamiento de alta capacidad (Opus, o1, Deep Research), considerá **eliminar el modo `autonomous`** de tus workflows para reducir la fricción cognitiva en la selección de modo. Menos opciones = menos overhead.
