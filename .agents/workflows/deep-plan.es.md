---
description: Planificación profunda con Prueba de Trabajo. Fuerza al LLM a mapear el repo, contrastar con reglas de arquitectura y particionar el trabajo en tareas atómicas. Soporta tres modos de ejecución (strict, standard, autonomous) para adaptarse a distintas capacidades de modelo. Nota: el modo autonomous puede eliminarse en proyectos que no usen modelos de alta capacidad.
---

# Workflow: Planificación Profunda con Prueba de Trabajo

**Contexto del Sistema:** Sos un agente de IA encargado de crear un plan de ejecución detallado para una funcionalidad compleja o un cambio grande. Este workflow fundamenta cada decisión en evidencia real del repositorio, previniendo alucinaciones y evaluación perezosa.

## Fase 0: Selección de Modo

Determiná el modo de ejecución basándote en la solicitud del usuario.

**Revisá la instrucción del usuario.** Debería haber especificado uno de tres modos:

- **`strict`** — Evidencia impresa completa y puertas bloqueantes en cada fase. Diseñado para modelos ligeros y rápidos (ej. Haiku, Flash, GPT-4o-mini) que se benefician del razonamiento externalizado.
- **`standard`** — Todas las fases se ejecutan pero pueden consolidarse. Evidencia impresa requerida solo en checkpoints clave. Diseñado para modelos de rango medio (ej. Sonnet, GPT-4o, Gemini Pro).
- **`autonomous`** — Ejecución holística. Recibís los objetivos de cada fase pero elegís cómo alcanzarlos. Solo el formato de salida final es obligatorio. Diseñado para modelos pesados de razonamiento (ej. Opus, o1, Deep Research).

**Si el usuario NO especificó un modo**, preguntale antes de continuar:

> Este workflow soporta tres modos de ejecución que se adaptan a distintas capacidades de modelo:
>
> - **`strict`** — Paso a paso con puertas de evidencia. Ideal para modelos rápidos/ligeros (Haiku, Flash, mini). Maximiza la precisión a costa de la velocidad.
> - **`standard`** — Balanceado. Todas las fases se ejecutan pero con flexibilidad para consolidar pasos. Ideal para modelos de rango medio (Sonnet, GPT-4o).
> - **`autonomous`** — Análisis holístico con máxima libertad. Ideal para modelos pesados de razonamiento (Opus, o1). Maximiza velocidad y profundidad.
>
> ¿Qué modo debo usar? (La próxima vez, podés especificarlo directamente, ej. "Creá un plan estricto" o "Planificá esto autónomamente".)

**Esperá la respuesta del usuario antes de continuar.**

> **Personalización:** Si tu equipo no utiliza modelos de razonamiento de alta capacidad (Opus, o1, Deep Research), podés eliminar el modo `autonomous` de este workflow para reducir la fricción en la selección. Menos opciones = menos overhead cognitivo para el usuario.

---

## Fase 1: Descubrimiento (Mapear el Territorio)

Antes de proponer cualquier código, debés entender el estado actual del repositorio.

1. **Listá la estructura del proyecto:** Usá una herramienta de listado de directorios para imprimir la estructura de nivel superior del repositorio. Examinala.
2. **Localizá las áreas afectadas:** Basándote en el pedido del usuario, usá herramientas de búsqueda (`grep`, `glob`, listado de archivos) para encontrar cada archivo, módulo o componente que será impactado.
3. **Leé archivos clave:** Abrí y leé los archivos más críticos identificados (puntos de entrada, schemas, implementaciones existentes de funcionalidades relacionadas).
4. **Producí un Resumen de Descubrimiento:**
   - Listá cada archivo/módulo encontrado que sea relevante.
   - Señalá implementaciones existentes que se superpongan con la funcionalidad solicitada.
   - Identificá dependencias entre las áreas encontradas.

### Comportamiento por modo

- **`strict`:** Imprimí TODOS los resultados de búsqueda y output de herramientas explícitamente en tu contexto. No afirmes que un archivo existe o no existe sin mostrar el output de la herramienta. **Puerta bloqueante:** NO avances a la Fase 2 hasta haber impreso el resumen de descubrimiento completo con rutas de archivos explícitas y evidencia.
- **`standard`:** Ejecutá las búsquedas pero imprimí un resumen consolidado (no output crudo de herramientas). Podés avanzar a la Fase 2 sin puerta bloqueante.
- **`autonomous`:** Ejecutá el descubrimiento como consideres apropiado. Podés combinar esta fase con la Fase 2 en una sola pasada de análisis holístico.

---

## Fase 2: Restricciones (Contrastar con Reglas)

Cruzá tu descubrimiento con las reglas arquitectónicas del proyecto.

1. **Leé la memoria semántica:**
   - `.agents/memory/semantic/architecture.md` — Patrones de diseño, límites entre módulos, flujo de datos.
   - `.agents/memory/semantic/conventions.md` — Estilo de código, naming, patrones prohibidos.
2. **Identificá las restricciones para esta tarea:** Basándote en la arquitectura y convenciones, listá las reglas específicas que aplican a la funcionalidad que se está planificando. Ejemplos:
   - Límites entre paquetes que no deben violarse.
   - Convenciones de nombrado para archivos/componentes nuevos.
   - Patrones de validación o testing requeridos.
   - Utilidades o componentes compartidos que deben reutilizarse (anti-redundancia).
3. **Producí un Resumen de Restricciones:**
   - Listá cada restricción con referencia a la regla fuente (ej. "Según `architecture.md`: la lógica de negocio debe residir en `packages/`, no en `apps/`").

### Comportamiento por modo

- **`strict`:** Imprimí el resumen de restricciones completo con referencias a las fuentes. **Puerta bloqueante:** NO avances a la Fase 3 hasta haber impreso el resumen de restricciones.
- **`standard`:** Imprimí el resumen de restricciones. Podés consolidarlo con el Resumen de Descubrimiento de la Fase 1 en un solo documento. Sin puerta bloqueante.
- **`autonomous`:** Integrá las restricciones en tu análisis holístico. No estás obligado a imprimir un resumen separado, pero las restricciones DEBEN reflejarse en el plan final.

---

## Fase 3: Partición (Plan de Tareas Atómicas)

Generá el plan de ejecución como una serie de tareas secuenciales.

1. **Dividí en etapas lógicas:** Cada etapa debe ser una unidad de trabajo autocontenida que pueda validarse independientemente.
2. **Para cada etapa, especificá:**
   - **Objetivo:** Una oración describiendo qué logra esta etapa.
   - **Archivos a crear/modificar:** Rutas exactas con una justificación de una línea para cada uno.
   - **Validación:** El/los comando(s) específico(s) a ejecutar para verificar que esta etapa es correcta (ej. `lint`, `typecheck`, `build`, `test`).
3. **Incluí un paso de auditoría:** La etapa final siempre debe ser una pasada de validación donde verificás el cambio completo contra las restricciones de la Fase 2.

### Comportamiento por modo

- **`strict`:** Etapas de no más de 3-5 archivos cada una. Usá el template estricto de abajo. Cada etapa debe tener comandos de validación explícitos.
- **`standard`:** Las etapas pueden ser más amplias (hasta 8-10 archivos). El template es recomendado pero flexible. Comandos de validación requeridos para cada etapa.
- **`autonomous`:** Podés generar etapas más amplias o un plan monolítico si justificás el enfoque. Los comandos de validación siguen siendo requeridos en checkpoints significativos.

### Formato de Salida del Plan

```markdown
# Plan: <Nombre de la Funcionalidad>

**Enfoque:** 1-3 oraciones sobre la estrategia técnica.
**Modo:** strict | standard | autonomous

## Scope

- **Incluido:** Qué cubre este plan.
- **Excluido:** Qué queda explícitamente fuera.

## Restricciones (de la Fase 2)

- [Restricción 1 con referencia a la fuente]
- [Restricción 2 con referencia a la fuente]

## Etapas de Ejecución

### Etapa 1: <Objetivo>

- [ ] Archivo: `ruta/al/archivo` — Razón
- [ ] Archivo: `ruta/al/archivo` — Razón
- **Validar:** `comando a ejecutar`

### Etapa 2: <Objetivo>

- [ ] Archivo: `ruta/al/archivo` — Razón
- **Validar:** `comando a ejecutar`

### Etapa Final: Auditoría

- [ ] Ejecutar validación completa (lint, build, typecheck)
- [ ] Verificar que todas las restricciones de la Fase 2 se cumplen

## Mapa de Archivos

| Archivo | Acción | Etapa | Justificación |
|---|---|---|---|
| `ruta/al/archivo` | Crear / Modificar | 1 | Por qué |
```

4. **Presentá el plan al usuario** y esperá su aprobación antes de ejecutar.

*Nota interna para el LLM: En modo `strict`, cada output intermedio (Resumen de Descubrimiento, Resumen de Restricciones) sirve como "memoria de trabajo" que compensa la profundidad de razonamiento limitada. No los borres ni resumas — mantenerlos en tu contexto. En modo `autonomous`, tenés libertad para procesarlos internamente, pero el plan final debe demostrar conciencia de las restricciones.*
