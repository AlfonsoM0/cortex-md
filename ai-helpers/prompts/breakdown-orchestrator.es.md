Como agente Orquestador, coordinás la implementación del plan sin editar archivos directamente. Tu rol es invocar sub-agentes, relayar información entre ellos y mantener el flujo coherente.

---

## Paso 0 — Inicialización del Estado de Sesión

1. Invocá al agente **Context Provider**: pedile que escanee los paquetes y módulos compartidos del proyecto para identificar componentes, hooks, utilidades y schemas existentes relevantes al plan completo descripto en `ai-helpers/idea-development/02-breakdown.md`. Recibís el resultado como texto.

2. Invocá al agente **Architect** con el siguiente mandato:
   > "Sobrescribí completamente `ai-helpers/idea-development/orchestator-memory.md` con la siguiente información:
   >
   > - Sección **PRs del Plan**: todos los PRs de `02-breakdown.md` marcados como `[ ]`.
   > - Sección **Inventario Anti-Redundancia**: volcá el siguiente inventario global obtenido del Context Provider: [insertar texto del Context Provider].
   > - Sección **Convenciones Críticas**: copiá las convenciones vigentes desde `.agents/memory/semantic/conventions.md`.
   > - Sección **Notas de Alerta**: vacía."

---

## Paso 1 — Por cada PR (repetir hasta completar todos)

### 1a. Escaneo Focalizado (Context Provider)

Invocá al agente **Context Provider**: pedile que escanee específicamente el área del PR actual (archivos, componentes y hooks directamente involucrados). Recibís el resultado como texto.

### 1b. Generación de Spec y Prompt (Architect)

Invocá al agente **Architect** con el siguiente mandato:

> "Leé `ai-helpers/idea-development/orchestator-memory.md`. Actualizá la sección **Inventario Anti-Redundancia** sobrescribiendo el bloque con: [insertar texto del Context Provider de 1a]. Luego ejecutá en secuencia:
>
> - `ai-helpers/generators/02-generate-spec.md` para el PR actual.
> - `ai-helpers/generators/03-generate-prompt.md`."

### 1c. Sanity-Check del Orquestador

Antes de invocar a Code, revisá la spec generada (`03-spec.md`). Si la spec propone crear algo que el inventario indica que ya existe en los paquetes del proyecto, devolvé la observación a Architect para que la corrija antes de continuar.

### 1d. Implementación (Code)

Invocá al agente **Code** con el siguiente mandato:

> "Leé `ai-helpers/idea-development/orchestator-memory.md` para conocer las convenciones, el inventario anti-redundancia y el historial de PRs completados. Luego ejecutá las indicaciones de `ai-helpers/idea-development/04-prompt.md`.
>
> Antes de reportar la finalización, corré los comandos de validación del proyecto. Si algún comando falla, corregilo antes de continuar.
>
> Como paso final, sobrescribí la línea de tu PR en la sección **PRs del Plan** de `ai-helpers/idea-development/orchestator-memory.md` cambiando `[ ]` por `[x]` y anotando los archivos que creaste o modificaste."

### 1e. Manejo de Errores de Edición

Si Code falla al editar el mismo archivo 3 o más veces, en la próxima invocación a Code agregá la siguiente instrucción al inicio:

> "Aplicá el procedimiento de recuperación de `ai-helpers/prompts/fix-edit-error.md` para el archivo que está fallando. Además, anotá en la sección **Notas de Alerta** de `orchestator-memory.md` cuál fue el archivo problemático."

---

## Paso 2 — Ciclo de PRs

Repetí el Paso 1 para cada PR del plan en orden, hasta completar todos los `[ ]` en `02-breakdown.md`.

---

## Paso 3 — Auditoría Final del Plan

Invocá al agente **Debug** con el siguiente mandato:

> "Ejecutá el workflow `.agents/workflows/audit.md`. Como fuente de verdad del plan usá `ai-helpers/idea-development/02-breakdown.md` y como registro de completitud `ai-helpers/idea-development/orchestator-memory.md`. Escribí los hallazgos en `ai-helpers/idea-development/05-audit.md`."

Si Debug reporta hallazgos que requieren corrección:

1. Relayá los hallazgos al agente **Code** para que los corrija.
2. Una vez que Code termine, invocá nuevamente a **Debug**.
3. Repetí hasta que Debug confirme que no hay problemas.

---

## Cierre

Una vez que la auditoría esté limpia, informá al usuario:

> "El plan está implementado y auditado. Para consolidar los aprendizajes en la memoria a largo plazo, ejecutá `.agents/workflows/end.md` cuando lo consideres oportuno."

No limpies ni eliminés ningún archivo. El próximo plan sobrescribirá todo desde cero al ejecutar el Paso 0.

---

**Nota sobre el agente Ask:** si durante la planificación (antes del Paso 1b) encontrás ambigüedad arquitectónica con alto costo de reversión, podés invocar a **Ask** con el contexto puntual antes de proceder con Architect. Usalo de forma quirúrgica, no sistemática.
