# Workflow: Fin de Sesión (Consolidación Cognitiva)

**Contexto del Sistema:** Eres un agente de IA y la sesión de trabajo actual ha concluido. Es imperativo ejecutar un proceso de consolidación de memoria análogo al ciclo de sueño humano para evitar la degradación de tu contexto en futuras intervenciones. Debes evaluar qué información retener, qué indexar y cómo modificar el estado global del proyecto.

Ejecuta los siguientes pasos en estricto orden secuencial.

## Fase 1: Creación de Memoria Episódica

Genera el registro detallado de las experiencias y razonamientos de esta sesión para preservar el "qué" y el "por qué".

1. Determina la fecha actual en formato `YYYY`, `MM`, `DD`.
2. Crea o actualiza el archivo: `.agents/memory/episodic/YYYY/MM/DD.md`
   - **Múltiples sesiones por día:** Si hay más de una sesión distinta en el mismo día, agregá un slug descriptivo para mantenerlas separadas y buscables: `.agents/memory/episodic/YYYY/MM/DD-<slug>.md` (ej. `2026/06/04-inventory-redesign.md`). Usá un `DD.md` simple para la sesión única de rutina.
3. Utiliza el siguiente template como estructura obligatoria:

```markdown
# Sesión: YYYY-MM-DD

## Resumen

Breve descripción (2-3 líneas) del objetivo de la sesión y el resultado alcanzado.

## Archivos Modificados

| Archivo | Acción | Descripción del cambio |
|---|---|---|
| `ruta/al/archivo.ts` | Creado / Modificado / Eliminado | Qué se hizo y por qué |

## Control de Versiones

- **Rama:** `nombre-de-la-rama`
- **Commits:** `abc1234`, `def5678` (o indicar si no hubo commits)

## Decisiones Técnicas

- **Decisión:** Descripción de la decisión arquitectónica o de diseño tomada.
  - **Contexto:** Por qué se tomó esta decisión (alternativas evaluadas, restricciones).

## Errores Encontrados y Resoluciones

- **Error:** Descripción del bug o problema.
  - **Causa raíz:** Qué lo causaba.
  - **Solución:** Cómo se resolvió.
  - **Prevención:** Qué evitar en el futuro para no repetirlo.

## Contexto para la Próxima Sesión

Descripción clara de en qué punto quedó el trabajo y qué se debería hacer a continuación para retomarlo sin fricción.
```

4. Rellena todas las secciones aplicables. Si una sección no aplica (ej. no hubo errores), omítela del archivo generado.

## Fase 2: Actualización del Índice Hipocampal

Crea la "etiqueta sináptica" para que tu instancia futura pueda encontrar rápidamente la memoria episódica generada en la Fase 1.

1. **Lee el archivo:** `.agents/memory/semantic/taxonomy.md`
   - **Objetivo:** Obtener la lista estricta de etiquetas permitidas. Si ninguna etiqueta cubre el dominio trabajado, **recomienda una nueva al usuario y espera su aprobación** antes de usarla.
2. **Lee el archivo:** `.agents/memory/episodic/timeline.md`
3. Añade una nueva entrada al principio del archivo bajo el mes correspondiente.
   - **Formato estricto:** `- YYYY-MM-DD: [Tag1] [Tag2] Resumen de una sola línea de lo realizado.`
   - **Que sea autocontenido:** el resumen debe ser una línea ejecutiva densa — con suficiente scope (archivos/conceptos clave tocados) para que el enrutamiento hipocampal pueda decidir relevancia sin abrir el archivo diario. Agregá un marcador opcional `Pendiente: ...` si el trabajo quedó inconcluso.
4. **Límite de Crecimiento (Purga):** Revisa que el archivo `timeline.md` no contenga más de las **últimas 50 sesiones** registradas. Si supera este límite, elimina silenciosamente las sesiones más antiguas del final del archivo para mantener la economía de tokens.

## Fase 3: Consolidación Semántica (Neuroplasticidad)

Esta es la fase crítica del proceso. Debes evaluar si el trabajo de hoy alteró la "verdad absoluta" del sistema (el estado global).

1. Evalúa cognitivamente: ¿Las acciones de hoy implementaron una nueva tecnología, cambiaron un patrón de diseño global, modificaron la estructura, o alteraron las convenciones o reglas de negocio?
2. Si la respuesta es SÍ:
   - Identifica cuál de los archivos semánticos fue afectado (`architecture.md`, `conventions.md`, `business-rules.md`, `stack.md`).
   - Abre el archivo correspondiente y sobrescribe la información obsoleta. Modifica el documento para que refleje el estado arquitectónico y lógico actual.
   - **Advertencia estricta:** No agregues texto como si fuera un historial cronológico. La memoria semántica no tiene tiempo, debe ser una radiografía exacta del presente.

## Fase 4: Vaciado de la Corteza Prefrontal (Memoria de Trabajo)

Prepara el entorno para que la próxima sesión inicie sin fricción cognitiva.

1. **Abre el archivo:** `.agents/memory/semantic/active-tasks.md`
2. Limpia las tareas que fueron completadas exitosamente durante esta sesión.
3. **Clasificá el backlog:** Asegurate de que toda tarea restante esté organizada bajo la siguiente matriz (Prioridad + Esfuerzo):
   - **Jerarquía principal (Prioridad — Eisenhower):**
     - `🚨 P1: Crítico (Importante y Urgente)` — blockers, vulnerabilidades, fallas de facturación.
     - `🧭 P2: Estratégico (Importante, NO Urgente)` — refactors preventivos, core features / roadmap.
     - `🧯 P3: Ruido (Urgente, NO Importante)` — cambios cosméticos menores, issues de baja criticidad.
     - `🗄️ P4: Archivo (Ni Importante, Ni Urgente)` — icebox de ideas, deuda menor.
   - **Etiqueta secundaria (Esfuerzo — T-Shirt Sizing):** prefijá cada tarea con su esfuerzo:
     - `[🟢 Snack]` — (< 1 h) tarea rápida.
     - `[🟡 Sesión]` — (2-4 h) trabajo profundo de una tarde.
     - `[🔴 Épica]` — (> 1 día) tarea enorme que DEBE dividirse en sub-tareas antes de empezar.
4. **Define el próximo paso:** Escribe de manera clara y concisa cuál debería ser la primera acción lógica para la siguiente iteración, priorizando siempre las tareas de **P1: Crítico**.

> **Fuente única de deuda técnica:** toda deuda técnica detectada en la sesión se registra acá, en el backlog clasificado de `active-tasks.md`. Nunca permitas que la deuda se disperse en issues sin clasificar o notas sueltas — esto garantiza visibilidad clara de lo urgente, lo importante y lo que puede esperar.

## Fase 5: Enrutamiento de Conocimiento (Aprendizaje Continuo)

Si durante la sesión descubriste un nuevo patrón, una solución a un bug recurrente, o una mejora arquitectónica:

1. **NO lo agregues directamente a `AGENTS.md`.** El system prompt raíz debe mantenerse liviano y estable.
2. **Identificá el destino correcto:** Determiná si el aprendizaje pertenece a:
   - Un **archivo de memoria semántica** (`conventions.md`, `architecture.md`, `stack.md`, `business-rules.md`) — si altera una verdad global.
   - Un **archivo de skill** (`.agents/skills/[nombre]/SKILL.md`) — si es una técnica reutilizable o un patrón específico de dominio.
   - Un **archivo de documentación** (`docs/`) — si es una explicación o especificación a nivel de producto.
3. **Enrutá el conocimiento** al archivo apropiado. Solo agregá a `AGENTS.md` si constituye una nueva regla universal o requiere la creación de una nueva entrada de skill.

### Guarda de Skills Externas (Inmutable)

**NUNCA modifiques** archivos dentro de skills registradas en `skills-lock.json`. Esas carpetas son gestionadas por un CLI de skills externo (ej. `npx skills update`) y cualquier edición local se perderá en la próxima actualización.

- **Cómo identificarlas:** leé `skills-lock.json` en la raíz del proyecto. Cada clave bajo `"skills"` corresponde a una carpeta de solo-lectura en `.agents/skills/`.
- **Si el conocimiento descubierto pertenece al dominio de una skill externa:**
  1. **Específico del proyecto** (ej. "no usar el auth del proveedor X porque colisiona con nuestra config"): escribilo en la skill **local** más cercana a ese dominio.
  2. **Genérico de la tecnología** (ej. un bug conocido de upstream): no lo persistas — ya estará cubierto en la próxima actualización oficial de la skill.

*Fundamento: Esto previene el "system prompt bloat" — una inflación gradual del archivo raíz que degrada la economía de tokens y diluye las directivas centrales del agente — a la vez que protege el código gestionado externamente de pérdidas silenciosas.*

## Fase 6: Sincronización de Planificación y Feature-Docs (Opcional)

Si el proyecto mantiene un roadmap maestro, tablero de tareas o documento de planificación (ej. `docs/ROADMAP.md`, `docs/00-MASTER-ROADMAP.md`):

1. Revisá el documento de planificación.
2. Si la sesión de hoy completó un hito, marcálo como completado.
3. Si la sesión reveló nuevos pasos, bloqueos o pivotes arquitectónicos, actualizá el documento en consecuencia.
4. **El documento de planificación, como la memoria semántica, debe reflejar siempre la verdad actual** — no un registro histórico.

**Documentación de features (as-built):** Si los archivos modificados en esta sesión pertenecen a un dominio o feature con documentación dedicada (ej. `docs/features/*`), auditá y actualizá esos documentos para que reflejen la implementación final. Esto evita que la deuda de documentación "as-built" se acumule entre sesiones.

*Nota interna para el LLM: Una vez ejecutadas estas 6 fases y modificados los archivos correspondientes en el sistema, informá al usuario con un mensaje breve que la memoria ha sido consolidada exitosamente y que la sesión puede cerrarse.*