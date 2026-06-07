---
description: Desfragmentación y Optimización de Memoria (Defrag)
---

# Workflow: Desfragmentación y Optimización de Memoria (Defrag)

**Contexto del Sistema:** Eres un agente de IA y el usuario ha solicitado una operación de mantenimiento profundo sobre el sistema de memoria Cortex-MD. A lo largo de múltiples sesiones, los archivos de memoria acumulan redundancias, ineficiencias de formato e inconsistencias entre archivos. Este workflow reestructura y comprime la memoria para un consumo óptimo por parte del LLM.

**Crítico:** Esta es una operación avanzada que requiere capacidades de razonamiento fuertes. NO procedas sin confirmación explícita del usuario.

## Fase 0: Puerta de Seguridad

Antes de comenzar, debés asegurarte de que las condiciones son correctas para esta operación.

1. **Mostrá esta advertencia al usuario:**

> ⚠️ **Desfragmentación de Memoria**
>
> Este workflow ejecuta una auditoría profunda y reestructuración de todos los archivos de memoria de Cortex-MD. Requiere un LLM con fuertes capacidades de razonamiento y análisis para ejecutarse correctamente.
>
> **Antes de continuar, confirmá:**
>
> - Estás usando tu modelo de razonamiento de mayor capacidad.
> - No tenés trabajo sin guardar (esto modifica archivos en `.agents/memory/`).
>
> Respondé **"Proceder"** para continuar.

2. **Esperá la confirmación explícita del usuario.** No procedas hasta que confirme.

## Fase 1: Inventario Completo de Memoria

Leé cada archivo del sistema de memoria para construir una imagen completa antes de hacer cualquier cambio.

1. **Leé TODOS los archivos de memoria semántica:**
   - `.agents/memory/semantic/architecture.md`
   - `.agents/memory/semantic/stack.md`
   - `.agents/memory/semantic/conventions.md`
   - `.agents/memory/semantic/business-rules.md`
   - `.agents/memory/semantic/active-tasks.md`
   - `.agents/memory/semantic/taxonomy.md`
2. **Leé el índice episódico:** `.agents/memory/episodic/timeline.md`
3. **Leé los 3 registros episódicos más recientes** (archivos diarios) referenciados en el timeline.
4. **Leé el roadmap (si existe):** ej. `docs/00-MASTER-ROADMAP.md` — para validar la alineación entre las tareas activas y el estado real del proyecto.

_Objetivo: Cargar el estado completo de la memoria para detectar patrones de degradación a través de todos los archivos simultáneamente._

## Fase 2: Auditoría Semántica y Compresión

Para **cada** archivo de memoria semántica, evaluá y reescribí aplicando estos principios de optimización:

### 2.1 Detectar y Eliminar

- **Información redundante:** Reglas, hechos o patrones que aparecen en más de un archivo o más de una vez dentro del mismo archivo.
- **Información temporal disfrazada de estado:** Frases como "Recientemente migramos a..." o "En la última sesión..." — la memoria semántica no tiene dimensión temporal. Reescribí en tiempo presente absoluto.
- **Detalles de implementación demasiado específicos:** Patrones de código concretos que pertenecen a un archivo de skill o registro episódico, no al estado global. Una convención es una regla; una llamada a función específica es una implementación.
- **Referencias muertas:** Menciones a archivos, módulos o tecnologías que ya no existen en el proyecto.

### 2.2 Comprimir Formato

Reescribí cada archivo aplicando estas reglas de formato para un consumo óptimo de tokens por el LLM:

- **Preferí listas densas sobre prosa.** Reemplazá párrafos narrativos con listas `clave: valor` estructuradas o viñetas compactas.
- **Minimizá el padding de tablas.** Si una tabla tiene solo 2 columnas, considerá convertirla a lista de definición (`- **Término:** Definición`).
- **Eliminá palabras de relleno.** Remové frases como "Es importante notar que", "Como se mencionó arriba", "Asegurate de que". Sé directo.
- **Usá voz imperativa.** "Usar X" en vez de "Se debería considerar usar X cuando sea apropiado".
- **Mantené headers poco profundos.** Evitá anidar más allá de H3 (`###`). Aplaná jerarquías profundas.

### 2.3 Enrutamiento de Conocimiento

Si durante la auditoría detectás información que pertenece a una skill:

1. Identificá qué skill de `.agents/skills/` debería contenerla.
2. **Guarda de Skills Externas:** verificá `skills-lock.json`. Si la skill destino está registrada ahí, **no la modifiques** — redirigí el conocimiento a la skill local más cercana.
3. Movéla al `SKILL.md` correspondiente (solo si es local). En el archivo semántico, dejá una referencia compacta si hace falta.

### 2.4 Reescritura

Tras el análisis, **reescribí cada archivo semántico** aplicando los principios anteriores. El resultado debe ser:

- Un documento completo y autocontenido (no un diff o parche).
- Más corto o igual al original en conteo de caracteres.
- Semánticamente equivalente — sin pérdida de información, solo optimización de formato y deduplicación.

## Fase 3: Optimización Episódica

1. **Auditoría del timeline:**
   - Verificá el límite de 50 sesiones. Eliminá las entradas más antiguas si se excede.
   - Señalá entradas con 5+ etiquetas — indican pobre granularidad de sesión. No las modifiques, pero anotálas en el reporte final.
   - Asegurate de que las entradas usen exclusivamente etiquetas de `taxonomy.md`.
2. **Verificación del límite episódico-semántico:**
   - Si un registro episódico (archivo diario) contiene información que también fue promovida a memoria semántica, eso es correcto y esperado — los registros episódicos son logs inmutables.
   - Si la memoria semántica contiene información que parece una entrada episódica (fechas específicas, referencias a sesiones, "hoy hicimos X"), extraéla de vuelta a su archivo episódico correspondiente o eliminála.

## Fase 4: Validación Cruzada entre Archivos

Verificá la consistencia a través de los archivos de memoria semántica:

1. **`architecture.md` ↔ `stack.md`:** Cada tecnología en `stack.md` debería estar reflejada arquitectónicamente. Cada módulo arquitectónico debería usar tecnologías listadas en `stack.md`.
2. **`conventions.md` ↔ `architecture.md`:** Las convenciones de código no deberían contradecir decisiones arquitectónicas.
3. **`business-rules.md` ↔ `architecture.md`:** Las entidades de dominio de negocio deberían alinearse con la estructura de módulos.
4. **`taxonomy.md` ↔ `timeline.md`:** Todas las etiquetas en uso en el timeline deben existir en la taxonomía.
5. **`active-tasks.md` ↔ roadmap (si existe):** La tarea actual debería ser coherente con la fase del roadmap.

Si se encuentran contradicciones, resolverlas tratando el **archivo semántico consolidado más recientemente** como fuente de verdad, y luego actualizar el archivo desactualizado.

## Fase 5: Optimización de Documentación de Features (Opcional)

Si el proyecto mantiene documentación detallada de features (ej. `docs/features/*`):

1. **Inventariá los docs de features.**
2. **Auditá y comprimí** aplicando los mismos principios de la Fase 2 (eliminar redundancia, optimizar tokens).
3. **Consistencia cruzada:** asegurate de que la arquitectura, flujos y decisiones descritas ahí no contradigan la "verdad absoluta" consolidada en la memoria semántica (`architecture.md`, `business-rules.md`).

## Fase 6: Limpieza de Entorno (Opcional)

Dado que este workflow se ejecuta periódicamente, es un buen momento para purgar cachés pesadas de build/tooling que se acumulan con el tiempo.

1. **Purgar cachés de build:** Ejecutá el comando de limpieza de caché de tu toolchain (ej. la tarea `clean` de tu build tool) para liberar espacio acumulado. Adaptá el comando a tu stack.
2. **Recordatorio de almacenamiento:** Si desarrollás dentro de un filesystem virtualizado (ej. WSL2), agregá al reporte final un recordatorio de que recuperar espacio en disco puede requerir compactar la imagen de disco virtual a nivel del SO.

> Omití esta fase por completo si tu proyecto no tiene cachés de build pesadas.

## Fase 7: Reporte de Desfragmentación

Presentá un resumen al usuario cubriendo:

1. **Archivos modificados:** Listá cada archivo semántico que fue reescrito, con una descripción de una línea de qué cambió.
2. **Redundancias eliminadas:** Ejemplos concretos de información duplicada o mal ubicada que fue limpiada.
3. **Conocimiento enrutado:** Si se movió información a skills, indicá qué se movió y a dónde.
4. **Problemas entre archivos encontrados:** Contradicciones o desalineaciones que fueron corregidas.
5. **Observaciones episódicas:** Salud del timeline, problemas de distribución de etiquetas.
6. **Entorno y Sistema:** Confirmá cualquier limpieza de caché realizada y dejá el recordatorio de compactación de almacenamiento si aplica.
7. **Recomendación:** Sugerí cuándo debería ejecutarse el próximo defrag (ej. "después de 15-20 sesiones más" o "cuando los archivos semánticos superen N líneas").

_Nota interna para el LLM: Este workflow es idempotente — ejecutarlo dos veces seguidas no debería producir más cambios. Si la memoria ya está optimizada, informálo al usuario y omití reescrituras innecesarias._
