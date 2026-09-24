---
description: Fin de sesión (Consolidación)
---

# Workflow: Fin de Sesión (Consolidación Cognitiva)

**Contexto del Sistema:** La sesión terminó — porque el usuario lo pidió, o porque lo ofreciste ante señales de cierre y aceptó (`AGENTS.md § Mantenimiento automático`). Consolidá la memoria para que tu instancia futura herede un conocimiento preciso: qué retener, qué indexar y qué cambió del estado global. Ejecutá las fases en orden.

> **Quién consolida:** en un equipo de varios agentes, consolida **solo el agente que conversa con el usuario** (el líder). Los ayudantes le reportan; si todos escriben la memoria, se pisan y se contradicen. Lo operativo de los agentes (cuotas, costos, preferencias de reparto) no es memoria del proyecto: va a un archivo propio del líder.

## Fase 0: Higiene previa

- Revisá qué cambió (con git: `git status`; en una carpeta común: los archivos modificados durante la sesión) y corré la validación que corresponda al alcance. No repitas chequeos ya aprobados si nada relevante cambió.
- Si vas a tocar la memoria semántica, al final corré `node .agents/check-memory-contract.js`.

## Fase 1: Memoria Episódica

1. Creá o actualizá `.agents/memory/episodic/YYYY/MM/DD.md`. Para otra sesión distinta el mismo día usá `DD-s2.md`, `DD-s3.md`… sin pisar la anterior (el sufijo numérico ordena solo y el timeline lo nombra).
2. Usá esta estructura y omití las secciones que no apliquen:

```markdown
# Sesión: YYYY-MM-DD

## Resumen

2-3 líneas: objetivo y resultado.

## Cambios

| Archivo / registro | Acción                          | Descripción           |
| ------------------ | ------------------------------- | --------------------- |
| `ruta/al/archivo`  | Creado / Modificado / Eliminado | Qué se hizo y por qué |

## Control de Versiones

- **Rama:** `rama` · **Commits:** `abc1234`, … (o "sin commits")

## Decisiones

- **Decisión:** qué se decidió.
  - **Contexto:** por qué (alternativas, restricciones, quién decidió).

## Errores y Resoluciones

- **Error:** descripción.
  - **Causa raíz:** … · **Solución:** … · **Prevención:** …

## Contexto para la Próxima Sesión

Dónde quedó el trabajo y qué sigue.
```

> **Registrá también los errores de razonamiento propios**, no solo los del sistema: una hipótesis que el usuario corrigió, un dato que diste por cierto sin verificar, un "bloqueante" que no existía. Son los más caros de repetir y ningún test los detecta. Anotá **qué lo causó** (una doc desactualizada, un registro de otro entorno, asumir un error donde había una decisión) y **cómo evitarlo**.

En un proyecto sin control de versiones, "Control de Versiones" se reemplaza por la referencia al registro afectado (ej. número de pedido, fila de la planilla, id del ticket).

## Fase 2: Índice Hipocampal (timeline)

1. Leé `.agents/memory/semantic/taxonomy.md`. Si ninguna etiqueta cubre el dominio, **recomendá una al usuario y esperá su aprobación**.
2. Agregá una entrada al **inicio** de `.agents/memory/episodic/timeline.md`:
   - Formato: `- YYYY-MM-DD: [Tag1] [Tag2] Resumen de una línea.`
   - **~200 caracteres en total**, densa y autocontenida, para decidir relevancia sin abrir el día. Nombrá el archivo (`DD-s2.md`) si hubo varias sesiones.
   - El detalle vive en el episódico; no lo dupliques en el índice.
3. Límite: **50 sesiones**. Si se excede, eliminá las más antiguas del final.

## Fase 3: Consolidación Semántica (Neuroplasticidad)

¿Lo de hoy cambió la verdad vigente (herramienta nueva, estructura, patrón, convención, regla del dominio)? **Sí →** sobrescribí la información obsoleta en el archivo afectado. La memoria semántica no tiene tiempo: es una foto del presente, no una crónica.

🔴 **Tres tipos de archivo, tres contratos. Identificá cuál tocás ANTES de escribir:**

| Archivo                                                     | Responde              | Contrato                                                                                                          |
| ----------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `architecture` · `stack` · `conventions` · `business-rules` | ¿cuál es la regla?    | **Regla + cita a `docs/`**, ≤ ~400 caracteres. Describe algo que ya existe, así que siempre hay doc donde citar. |
| `active-tasks`                                              | ¿qué falta hacer?     | Tarea en 1-2 frases, sin cita obligatoria. **Lo terminado se borra** (Fase 6).                                    |
| `taxonomy`                                                  | ¿qué etiquetas valen? | Lista cerrada; una etiqueta nueva exige aprobación.                                                               |

**Anatomía de una entrada de reglas:** regla en imperativo + a lo sumo **una** frase de razón + cita al doc canónico. Ejemplo: _"Nunca aprobar un pago sin remito conformado: el faltante se reclama antes de pagar. → `docs/procedimientos/pagos.md §2`"_.

- **Lo que NO entra** (va al doc que la entrada cita): mediciones, ejemplos y contraejemplos; argumentación de más de una frase. La **historia del descubrimiento** ("se detectó cuando…", "reemplaza a la regla anterior") ni siquiera va al doc: es narrativa de sesión y vive solo en el episódico.
- **Test rápido:** si al dejar solo la regla y la cita la entrada sigue siendo accionable, el resto sobraba.
- **Sin doc donde citar → crealo o extendé uno en `docs/`** y recién entonces escribí la entrada. La memoria nunca es el único lugar donde vive un detalle importante.
- **Citá `docs/` (comportamiento, procedimientos) o una skill local (conocimiento técnico); nunca el episódico.** El episódico envejece por diseño: citarlo inyecta datos viejos en la foto del presente.
- **Nunca en la memoria:** credenciales, tokens ni datos personales de terceros (clientes, empleados, proveedores). La memoria se versiona y se comparte: nombrá el sistema donde viven, no el dato.
- **Lo verifica `node .agents/check-memory-contract.js`:** entradas largas sin cita, citas a docs inexistentes y citas al episódico. Mide la **forma**, no si lo escrito es cierto.

## Fase 4: Documentación y Roadmap

1. **`docs/` es el destino por defecto del comportamiento vigente.** Si lo que cambió tiene doc propio (una feature, un procedimiento), actualizalo para que refleje lo que existe ahora.
2. **El roadmap solo cambia si cambió el ALCANCE** (algo entra, sale o se reclasifica). 🔴 **El avance de ejecución no va al roadmap:** se lee en toda sesión (`start.md`), así que lo que se le agrega lo pagan todas las sesiones futuras. Terminar una tarea o cerrar una verificación va a `docs/` y a `active-tasks.md`.
3. **Barrido de coherencia** (obligatorio si cambió un valor, un límite o un nombre): buscá el valor VIEJO en `docs/` y en la memoria semántica, y corregí cada aparición. Aplica también a lo que se **elimina**: una pieza borrada suele sobrevivir en varios documentos que nadie volvió a mirar.

## Fase 5: Aprendizaje Continuo (Skills)

Un patrón nuevo, la solución a un problema recurrente o una mejora de método va al `SKILL.md` del dominio, **no a `AGENTS.md`** (salvo una regla universal nueva o el alta de una skill). `AGENTS.md` se carga siempre: todo lo que se le agrega lo paga cada sesión.

**Guarda de Skills Externas (inmutable):** nunca modifiques skills registradas en `skills-lock.json`; las gestiona un CLI externo y toda edición local se pierde.

- Conocimiento **específico del proyecto** en el dominio de una skill externa → escribilo en la skill **local** más cercana.
- Conocimiento **genérico de la tecnología** → no lo persistas: llegará con la actualización oficial.

## Fase 6: Flush de la Memoria de Trabajo (`active-tasks.md`)

1. 🔴 **Borrá lo TERMINADO, no lo marques como hecho.** Este archivo responde "¿qué falta?": un ítem cerrado ya migró su conocimiento a `docs/` y a las reglas, y dejarlo lo convierte en basura que todas las sesiones pagan al leerlo.
   - **Un ✅ en este archivo es un hallazgo**, salvo que califique algo que sigue pendiente (ej. "el formulario ✅ existe; falta publicarlo").
   - **Antes de borrar, verificá que su detalle viva en `docs/`**; si no, movelo primero (Fase 4).
2. **Estados externos con fecha y entorno de verificación.** Lo que vive fuera de la fuente primaria (configuración de terceros, una entrega prometida, un pago programado) envejece sin que nada lo delate: anotá cuándo y dónde se verificó. Una fecha programada no prueba que algo ocurrió; al vencer, queda "verificar" hasta tener evidencia.
3. **Ítems `[Watch]`:** algo que no se hace hoy pero hay que vigilar, con su **disparador** para retomarlo (una fecha, un umbral, un evento). Sin disparador, es ruido.
4. **Clasificá el backlog** por Prioridad (Eisenhower) + Esfuerzo (T-Shirt):
   - `🚨 P1` Crítico (importante y urgente) · `🧭 P2` Estratégico (importante, no urgente) · `🧯 P3` Ruido (urgente, no importante) · `🗄️ P4` Archivo (icebox).
   - `[🟢 Snack]` < 1 h · `[🟡 Sesión]` 2-4 h · `[🔴 Épica]` > 1 día (se divide antes de empezar) · `[Watch]` sin esfuerzo propio, con disparador.
5. Escribí el **próximo paso** lógico, priorizando P1.

**Estilo:** cada ítem en 1-2 frases; si necesita más, citá el doc. El detalle exhaustivo vive en el episódico del día.

> **Fuente única de pendientes y deuda:** todo lo pendiente se registra acá, clasificado — nunca disperso en notas sueltas.

## Fase 7: Cierre con el usuario

Informá en pocas líneas que la memoria quedó consolidada. Si hay pendientes cuyo cierre **solo puede confirmar una persona** (una verificación manual, una decisión, algo que pasó fuera del sistema), listalos numerados y pedile que marque los que ya no aplican: la fuente primaria no los delata, y sin esa pregunta sobreviven indefinidamente.
