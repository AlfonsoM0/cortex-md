---
description: Auditoría post-feature con validación basada en evidencia. Verifica cambios contra las reglas de la memoria semántica usando output real de herramientas. Soporta tres modos de ejecución (strict, standard, autonomous) para adaptarse a distintas capacidades de modelo. Nota: el modo autonomous puede eliminarse en proyectos que no usen modelos de alta capacidad.
---

# Workflow: Auditoría Post-Feature con Evidencia

**Contexto del Sistema:** Sos un agente de IA y el usuario completó una funcionalidad o bloque de trabajo. Tu trabajo es validar que todos los cambios cumplan con los estándares establecidos del proyecto antes de la consolidación.

## Fase 0: Selección de Modo

Determiná el modo de ejecución basándote en la solicitud del usuario.

**Revisá la instrucción del usuario.** Debería haber especificado uno de tres modos:

- **`strict`** — Cada check requiere evidencia impresa (output de herramientas, resultados de grep, conteos de líneas). Cada fase es un dominio cognitivo separado ejecutado secuencialmente. Diseñado para modelos ligeros (ej. Haiku, Flash, GPT-4o-mini).
- **`standard`** — Todas las fases se ejecutan pero la evidencia impresa se requiere solo en checkpoints clave. Las fases pueden consolidarse. Diseñado para modelos de rango medio (ej. Sonnet, GPT-4o, Gemini Pro).
- **`autonomous`** — Evaluación holística. Recibís los objetivos de auditoría pero elegís cómo verificarlos. Solo la fase de Validación Técnica (lint/build/typecheck) es obligatoria y bloqueante, sin importar el modo. Diseñado para modelos pesados (ej. Opus, o1, Deep Research).

**Si el usuario NO especificó un modo**, preguntale antes de continuar:

> Este workflow de auditoría soporta tres modos de ejecución:
>
> - **`strict`** — Cada check requiere evidencia impresa. Ideal para modelos rápidos/ligeros (Haiku, Flash, mini). Maximiza la rigurosidad.
> - **`standard`** — Balanceado. Todos los checks se ejecutan pero con flexibilidad. Ideal para modelos de rango medio (Sonnet, GPT-4o).
> - **`autonomous`** — Evaluación holística con máxima libertad. Ideal para modelos pesados de razonamiento (Opus, o1). Solo los gates de lint/build/typecheck son obligatorios.
>
> ¿Qué modo debo usar? (La próxima vez, podés especificarlo directamente, ej. "Ejecutá una auditoría estricta" o "Auditá autónomamente".)

**Esperá la respuesta del usuario antes de continuar.**

> **Personalización:** Si tu equipo no utiliza modelos de razonamiento de alta capacidad (Opus, o1, Deep Research), podés eliminar el modo `autonomous` de este workflow para reducir la fricción en la selección. Menos opciones = menos overhead cognitivo para el usuario.

---

## Fase 1: Inventario de Cambios

Construí un mapa preciso de qué cambió antes de auditar.

1. **Identificá todos los archivos creados o modificados** durante esta sesión. Usá herramientas de control de versiones (ej. `git diff --name-status`, `git status`) o pedile la lista al usuario.
2. **Imprimí la lista de archivos** en tu contexto.
3. **Categorizá cada archivo** por tipo: código fuente, configuración, documentación, test, archivo de memoria/workflow.

**Output:** Una tabla de archivos cambiados con sus categorías. Este es tu scope de auditoría.

### Comportamiento por modo

- **`strict`:** Imprimí el output crudo de `git diff` y construí una tabla categorizada. Esta tabla es tu referencia para todas las fases subsiguientes.
- **`standard`:** Imprimí una tabla resumen categorizada. El output crudo de git es opcional.
- **`autonomous`:** Construí el inventario como consideres apropiado. Podés integrarlo con las fases subsiguientes.

---

## Fase 2: Modularidad y Tamaño

Verificá que los archivos respeten los estándares de modularidad del proyecto.

1. **Para cada archivo de código fuente en el inventario:**
   - Contá las líneas de código (excluyendo comentarios y líneas en blanco).
   - Si algún archivo excede el umbral de tamaño del proyecto (consultá `conventions.md` para el límite; default: 200 líneas como indicador de alerta, 500 líneas como tope duro):
     - **Analizá:** ¿La longitud se debe a tipos/interfaces/comentarios, o mezcla múltiples responsabilidades?
     - **Si mezcla responsabilidades:** Señalá como hallazgo con una división recomendada.
2. **Para cada componente, función o módulo nuevo:**
   - Verificá que tenga una responsabilidad única y clara.
   - Si maneja múltiples concerns (ej. fetch de datos + renderizado + validación), señalá para descomposición.

### Comportamiento por modo

- **`strict`:** Imprimí los conteos de líneas para CADA archivo revisado. Señalá cualquier archivo que exceda el umbral con evidencia impresa.
- **`standard`:** Imprimí conteos de líneas solo para archivos que excedan el umbral. Resumí los archivos que cumplen.
- **`autonomous`:** Evaluá la modularidad holísticamente. Reportá solo hallazgos (archivos que violan los estándares).

---

## Fase 3: Anti-Redundancia

Verificá que ningún código nuevo duplique funcionalidad existente.

1. **Para cada componente, hook, utilidad o validador nuevo** creado en esta sesión:
   - **Buscá en el codebase** usando grep o herramientas de búsqueda por nombres de funciones similares, nombres de archivos similares, o funcionalidad similar.
   - Si existe una implementación similar, señalá como hallazgo crítico con la ruta al código existente.
2. **Para cada nueva dependencia o import:**
   - Verificá que no duplique una utilidad ya disponible en los paquetes compartidos del proyecto.

### Comportamiento por modo

- **`strict`:** Imprimí el output del comando de búsqueda para CADA pieza de código nueva verificada. Sin excepciones.
- **`standard`:** Buscá cada pieza de código nueva pero imprimí resultados solo cuando se encuentren duplicados potenciales.
- **`autonomous`:** Evaluá la redundancia basándote en tu conocimiento del codebase. Usá herramientas de búsqueda solo en áreas de incertidumbre. Reportá hallazgos.

---

## Fase 4: Cumplimiento de Convenciones

Verificá que todos los cambios sigan las convenciones establecidas del proyecto.

1. **Leé:** `.agents/memory/semantic/conventions.md`
2. **Verificá cada archivo** contra las convenciones:
   - Patrones de nombrado (archivos, variables, funciones, componentes).
   - Orden y estructura de imports.
   - Patrones prohibidos (buscá `any`, `@ts-ignore`, `console.log`, valores hardcodeados, o lo que el archivo de convenciones prohíba).
3. **Para patrones prohibidos:** Usá grep/herramientas de búsqueda para verificar su ausencia en los archivos cambiados.

### Comportamiento por modo

- **`strict`:** Imprimí el output del grep confirmando la ausencia de CADA patrón prohibido en TODOS los archivos cambiados.
- **`standard`:** Ejecutá grep para patrones prohibidos e imprimí un resultado resumen (pass/fail por patrón).
- **`autonomous`:** Evaluá el cumplimiento de convenciones holísticamente. Usá grep solo para patrones de alto riesgo. Reportá hallazgos.

---

## Fase 5: Validación Técnica (Gateway)

> ⚠️ **Esta fase es OBLIGATORIA y BLOQUEANTE en TODOS los modos.** Ningún modelo — sin importar su capacidad — puede saltear la verificación objetiva del compilador y el linter.

Ejecutá las herramientas de validación automatizada del proyecto.

1. **Ejecutá el linter:** Corré el comando de lint del proyecto (ej. `pnpm lint`, `npm run lint`, `cargo clippy`). Imprimí el output.
   - Si hay errores: **STOP.** Reportá los errores y proponé fixes antes de continuar.
2. **Ejecutá el verificador de tipos:** Corré el comando de type check si aplica (ej. `pnpm typecheck`, `tsc --noEmit`). Imprimí el output.
   - Si hay errores: **STOP.** Reportá los errores y proponé fixes antes de continuar.
3. **Ejecutá el build:** Corré el comando de build (ej. `pnpm build`, `npm run build`, `cargo build`). Imprimí el output.
   - Si hay errores: **STOP.** Reportá los errores y proponé fixes antes de continuar.
4. **Ejecutá tests relacionados** si existen para los paquetes/módulos modificados.

**Regla de gateway:** Si cualquier comando en esta fase falla, NO avances al reporte. Corregí los problemas primero, luego volvé a ejecutar.

---

## Fase 6: Sincronización de Roadmap y Feature-Docs (Opcional)

Una vez que los cambios pasan la validación, mantené la documentación del proyecto alineada con la realidad as-built.

1. **Roadmap:** Si el proyecto mantiene un roadmap maestro (ej. `docs/00-MASTER-ROADMAP.md`), marcá los hitos completados, registrá pivotes arquitectónicos o agregá nuevos pasos.
2. **Feature docs:** Si los archivos modificados pertenecen a un dominio/feature documentado (ej. `docs/features/*`), actualizá esos documentos para reflejar la implementación final.

> **Composabilidad:** Este workflow puede referenciar checklists de dominio específicas del proyecto. Si tu proyecto define workflows de checklist especializados (ej. una checklist de UI/UX, una de seguridad, una de migración de datos) para los dominios tocados en esta sesión, consultalos/ejecutalos acá. Mantené esas checklists en el proyecto — el framework permanece agnóstico al dominio.

---

## Fase 7: Reporte de Auditoría

Presentá un resumen estructurado al usuario.

```
### ✅ Checks Pasados

- [Lista de checks que pasaron con referencia breve a la evidencia]

### ⚠️ Hallazgos

- [Severidad: Crítico/Advertencia/Info] [Descripción] [Fix sugerido]

### 📊 Métricas

- Modo de auditoría: strict | standard | autonomous
- Archivos auditados: N
- Líneas en el archivo más grande: N
- Componentes/módulos nuevos: N (duplicados encontrados: N)
- Lint: ✅/❌
- Tipos: ✅/❌
- Build: ✅/❌
```

*Nota interna para el LLM: En modo `strict`, la evidencia impresa en cada fase sirve como tu "prueba de trabajo" — te fuerza a ejecutar la verificación en vez de asumir cumplimiento. En modo `autonomous`, tenés libertad en CÓMO verificás, pero el gateway de Validación Técnica (Fase 5) sigue siendo innegociable.*
