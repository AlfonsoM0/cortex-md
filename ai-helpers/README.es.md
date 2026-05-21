# Cortex-MD: Módulo AI Helpers

El módulo **AI Helpers** provee un pipeline de ejecución stepwise (por pasos) diseñado para llenar el vacío operacional entre el `start.md` (Despertar) y el `end.md` (Dormir) de una sesión de trabajo. Permite a los desarrolladores y orquestadores de IA tomar una idea de alto nivel y transformarla en código auditado a través de un proceso iterativo y repetible.

## 1. ¿Qué es el Pipeline de Ejecución Stepwise?

Mientras que Cortex-MD destaca en la gestión de memoria global y contexto episódico, no prescribe cómo hacer la programación real *durante* la sesión. El pipeline stepwise divide el ciclo de desarrollo de software en cinco fases explícitas.

Al separar el razonamiento (planificación) de la ejecución (codificación), se previene la "amnesia" en modelos ligeros y la "sobrecarga de contexto" en modelos pesados.

## 2. Arquitectura

El módulo se divide en dos áreas distintas:

1.  **`/generators/` (Los Motores):** Contiene los prompts activos. Son las herramientas que el usuario ejecuta para transformar la información de un paso al siguiente.
2.  **`/idea-development/` (La Mesa de Trabajo):** Contiene los templates estáticos. Es el espacio de trabajo donde la idea evoluciona hasta convertirse en código auditado.

## 3. El Flujo

La secuencia de ejecución estándar es:

1.  **Brief:** El usuario escribe los requerimientos de negocio en `idea-development/01-brief.md`.
2.  **Breakdown:** El usuario ejecuta `generators/01-generate-breakdown.md` para dividir el brief en PRs atómicos en `02-breakdown.md`.
3.  **Spec:** Para un PR específico, el usuario ejecuta `generators/02-generate-spec.md` para crear una especificación técnica estricta en `03-spec.md`.
4.  **Prompt:** El usuario ejecuta `generators/03-generate-prompt.md` para generar una instrucción de delegación en `04-prompt.md`.
5.  **Ejecución:** El agente orquestador (ej., Roo Code, Cline, Cursor) ejecuta el código basado en el prompt generado.
6.  **Audit:** El usuario ejecuta `generators/04-generate-audit.md` para validar el código. Si es exitoso, dispara el ciclo de consolidación vía `.agents/workflows/end.md`.

## 4. Reglas de Diseño

Este módulo depende de varias reglas arquitectónicas estrictas para funcionar correctamente sin colisionar con el resto de Cortex-MD:

### A. Desacople de Contexto (La Regla del Prompt)
El prompt generado (`04-prompt.md`) **JAMÁS** debe contener referencias al `AGENTS.md` raíz o a las reglas globales del sistema. El agente orquestador ya tiene su "Corteza Prefrontal" cargada mediante el system prompt del IDE. Duplicar estas reglas genera *context bloat* y distrae al modelo de la ejecución del código puro.

### B. Barrera de Contexto (`AGENTS.md` local)
Para proteger radicalmente la memoria de trabajo del orquestador, esta carpeta contiene su propio `AGENTS.md`. Actúa como una barrera, indicando a los agentes que **ignoren** todo el contenido de esta carpeta para la indexación global. Los archivos aquí se invocan estrictamente bajo demanda.

### C. Commits Enriquecidos
En lugar de crear múltiples carpetas para cada feature (lo cual infla el repo), los archivos del pipeline se mantienen como un único "espacio de trabajo estático" que se sobrescribe en cada iteración.
¿Cómo se mantiene la trazabilidad temporal? **Enriqueciendo los commits.**
Al enviar los cambios, toda la cadena de razonamiento autónomo generada en estos archivos debe inyectarse directamente en el cuerpo del commit o en la descripción del PR. El historial de Git se convierte en la máxima Memoria Episódica inmutable.

### D. Kanbanización
El archivo `02-breakdown.md` se estructura usando checkboxes de Markdown (`- [ ]`, `- [x]`). Esto actúa como el Neocortex de corto plazo, permitiendo que múltiples sub-agentes trabajen en paralelo y mantengan sincronizado el estado de la tarea sin colisionar.

### E. El Exit Hook (Gancho de Salida)
El último paso (`05-audit.md`) contiene una instrucción de salida explícita:
> *"Si la auditoría es 100% exitosa, procede inmediatamente a ejecutar el ciclo de Sleep llamando a `.agents/workflows/end.md` para consolidar lo aprendido en el Hipocampo."*

## 5. Cómo Usar

1.  Escribe tu idea en `idea-development/01-brief.md`.
2.  Pide a tu agente: "Ejecuta `ai-helpers/generators/01-generate-breakdown.md`".
3.  Revisa el desglose. Elige el primer PR.
4.  Pide a tu agente: "Ejecuta `ai-helpers/generators/02-generate-spec.md` para el PR 1".
5.  Pide a tu agente: "Ejecuta `ai-helpers/generators/03-generate-prompt.md`".
6.  *Pasa el prompt resultante a tu agente/CLI de código para implementar el feature.*
7.  Una vez terminado el código, pide a tu agente: "Ejecuta `ai-helpers/generators/04-generate-audit.md`".
8.  Si la auditoría pasa, el agente llamará automáticamente a `end.md`. Haz commit de tu código.
9.  Para el próximo feature, sobrescribe `01-brief.md` y empieza de nuevo.

## 6. Personalización

Los prompts en la carpeta `generators/` pueden y deben ser personalizados para adaptarse a las herramientas y convenciones específicas de tu equipo. Son simples archivos Markdown diseñados para ser modificados.
