---
description: Bootstrap inicial (Onboarding)
---

# Workflow: Bootstrap del Proyecto (Onboarding Inicial)

**Contexto del Sistema:** Es la **primera vez** que Cortex-MD se activa en este proyecto y los archivos de memoria son plantillas vacías. Antes de escribir una sola regla, **alineate con el usuario**: una memoria poblada con suposiciones hace que el agente optimice lo que no importa. Asumí el peor caso — un usuario que no sabe qué es un LLM ni un arnés, ni exactamente qué necesita — y guialo. Ejecutá las fases en orden.

## Fase 0: Preparación silenciosa

1. **Chequeo del modelo.** Si la instalación no lo hizo (`INSTALL.es.md § 0` en el repositorio de Cortex-MD), hacelo ahora: identificá tu herramienta y tu modelo, investigá cuáles son los modelos de mayor razonamiento de tu propio proveedor y, si el activo no está entre ellos, recomendá cambiarlo (nunca a otro proveedor). Tené presentes la herramienta y el modelo para la Fase 8.
2. **Notas de la entrevista.** Creá `.cortex-tmp/interview-notes.md`. Init es la sesión más larga del proyecto: sus notas viven en un archivo para que nada se pierda si la conversación se corta o se compacta. Son efímeras: la Fase 9 las borra.
3. **Leé lo que ya existe**, para no preguntar lo que el proyecto ya dice:
   - **Software:** estructura de directorios, archivos de configuración (`package.json`, `pyproject.toml`, `go.mod`…), `README.md`, documentación.
   - **Otro tipo de proyecto:** las carpetas, documentos y planillas del espacio de trabajo — los archivos del negocio.
   - **La memoria nativa de la herramienta**, si tiene y podés leerla (la auto-memoria de Claude, las memorias de Codex, la memoria de un proyecto de Cowork, `~/.hermes/memories/`): puede tener conocimiento real sobre el usuario. Usala como hipótesis antes de que la Fase 7 la desactive o la restrinja.
4. Armá una lista breve de hipótesis ("parece un comercio mayorista que lleva el stock en una planilla") para **confirmarlas** en la entrevista, no para darlas por ciertas. Escribilas en las notas.

**¿Hay control de versiones?** Averiguá si la carpeta es un repositorio git. Cortex-MD funciona igual en una carpeta común: sin git, el defrag respalda la memoria copiándola antes de reescribir. Si el usuario no usa git, no lo exijas; a lo sumo ofrecelo en una frase ("permite deshacer cualquier cambio; es opcional") — salvo que la instalación ya lo haya hecho — y respetá la respuesta.

## Fase 1: Entrevista de alineación (conversación con el usuario)

Conducí una conversación amigable siguiendo **`.agents/workflows/references/alignment-interview.md`**, empezando por el bloque 0 (el entorno de trabajo del usuario). **Al cerrar cada bloque, agregá a las notas** los 3-5 puntos que el usuario confirmó; la síntesis se arma desde las notas, no desde el recuerdo de la conversación.

Al terminar, el agente tiene que poder responder, sin suponer:

- Con qué herramienta y modelo trabaja el usuario, y para qué (gestión o programación).
- Qué es el proyecto, para quién, en qué etapa y quién decide.
- Qué **problemas** resuelve y cuáles quiere resolver el usuario con el asistente.
- Qué **objetivos** persigue, cómo se mide el éxito y qué quedó afuera a propósito.
- Cómo son los **procedimientos actuales** y cuáles conviene automatizar — con un script, con el agente o con el agente y aprobación humana.
- Qué tareas son **importantes** (no admiten error, son irreversibles) y cuáles **urgentes** (fechas límite, bloqueos, temporadas).
- Cuánta **autonomía** tiene el agente: qué hace solo, qué propone y qué nunca.
- **Dónde está la información**: qué archivos del negocio, carpetas o sistemas son la fuente primaria de cada tipo de dato.
- El **FODA** del proyecto y los riesgos del pre-mortem.
- Las restricciones, los criterios de decisión y la forma de trabajo que prefiere el usuario.

🔴 **Puerta:** cerrá la fase con la síntesis de una página (lo que entendí · lo que no sé · lo que voy a hacer) y **esperá la confirmación explícita del usuario**. Sin síntesis aprobada no se escribe la memoria.

Si el usuario tiene poco tiempo, hacé las preguntas esenciales (★) y dejá el resto como pendiente en `active-tasks.md`: la entrevista puede completarse en sesiones siguientes.

**¿Cuándo está completa la instalación?** Cuando cada pregunta ★ tiene respuesta (o quedó registrada como incógnita), la síntesis está aprobada y las Fases 2-9 están hechas. Las preguntas sin ★ y los bloques que quedan para después no la impiden: quedan como pendientes en `active-tasks.md`.

## Fase 2: Análisis del proyecto

Con lo aprendido, profundizá donde la entrevista lo indicó:

- **Software:** estilo y convenciones reales del código, linters, módulos, flujo de datos.
- **Otro tipo de proyecto:** los archivos del negocio y sistemas nombrados, las plantillas en uso (emails, pedidos, facturas), los procedimientos escritos que existan.

Si el análisis contradice algo de la entrevista, preguntá: no elijas en silencio.

## Fase 3: Documentación canónica

La memoria cita documentos, así que los documentos van primero. El proyecto tiene **tres capas**; mantenelas separadas:

1. **Fuente primaria** — los archivos de trabajo: el código, o los archivos del negocio (p. ej. `proveedores.xlsx`, facturas, listas de precios). Se quedan en sus carpetas; Cortex-MD nunca los mueve.
2. **`docs/`** — documentación que **explica** cómo funciona el proyecto y cómo se trabaja (p. ej. "cómo evaluar proveedores"), y **nombra dónde vive cada dato** en la fuente primaria. No es el lugar de los archivos del negocio.
3. **Memoria** — la regla, más una cita al doc que la amplía.

Creá en `docs/` lo que la entrevista justificó (el destino de cada respuesta está en la tabla de síntesis de la referencia):

- `docs/00-PROJECT-BRIEF.md` — el **por qué**: proyecto, problemas, objetivos y métricas, no-objetivos, FODA, pre-mortem, restricciones.
- `docs/01-GUIDELINES.md` — **cómo se decide**: criterios ante conflictos, lo que no admite error, lo irreversible.
- Un documento por procedimiento o feature relevante, y `docs/glossary.md` si hay vocabulario propio.
- `docs/agent-environment.md` — el entorno de trabajo del bloque 0: herramienta y forma de uso, modelo, plan. La Fase 7 lo completa con el puente y la configuración.

Enlazá los docs relacionados entre sí y con las skills (`→ docs/...`), así el agente puede ampliar su memoria paso a paso.

Un roadmap (`docs/00-MASTER-ROADMAP.md`) solo si el proyecto tiene fases o alcance que gestionar.

## Fase 4: Memoria semántica

Escribí los archivos respetando el **contrato de los archivos de reglas** (`end.md § Fase 3`): regla en imperativo + a lo sumo una frase de razón + cita a `docs/`, ≤ ~400 caracteres por entrada. Reemplazá los placeholders de las plantillas (los párrafos guía en `_cursiva_` bajo cada encabezado) y borrá los ejemplos comentados (`<!-- cortex:example … -->`).

1. `stack.md` — **la fuente primaria en la primera línea** (qué archivo del negocio, carpeta o sistema manda para cada tipo de dato; puede estar fuera de la carpeta: nube, conector, sistema externo), después el entorno del agente (Fase 7) y las herramientas y servicios.
2. `architecture.md` — cómo está armado el sistema o la operación: módulos, o flujos de trabajo y sus responsables; y el mapa del espacio de trabajo (qué carpeta guarda qué).
3. `conventions.md` — el estilo de la casa: código, o formatos, tono y plantillas de comunicación.
4. `business-rules.md` — entidades del dominio y reglas invariables (lo que no admite error).
5. `taxonomy.md` — proponé las etiquetas según las áreas que surgieron en la entrevista (ej. `[Stock]`, `[Proveedores]`) y **esperá la aprobación del usuario**. `[Docs]` y `[CortexMD]` se conservan siempre.

🔴 **Nunca escribas en la memoria credenciales ni datos personales de terceros:** nombrá el sistema donde viven.

## Fase 5: Memoria de trabajo

Escribí `active-tasks.md` con:

- El **estado** verificado, con fecha.
- Como primer P1: **`[🚨 P1] [🟡 Sesión] Defrag + purga post-instalación, con el modelo más capaz del servicio.`** Se lee en toda sesión, así que sobrevive aunque falle otra señal.
- Las **urgencias** como P1 y lo que hay que vigilar como `[Watch]` con su disparador (fechas límite, riesgos del pre-mortem).
- Los **candidatos a automatizar**, clasificados por prioridad y esfuerzo, indicando si van con script, con el agente o con aprobación humana.
- Las **incógnitas** de la entrevista, como pendientes a verificar, y los bloques de la entrevista que hayan quedado sin hacer.
- El **próximo paso** acordado.

## Fase 6: Adaptar `AGENTS.md`

`AGENTS.md` es el ser del agente — quién es, para qué está, cómo funciona su memoria, con qué habilidades y conocimientos cuenta — y el enrutador que conecta todo. Se carga en toda sesión: guarda solo lo que tiene que estar siempre presente.

- **Identidad y propósito** (el encabezado, en primera persona): nombre, personalidad y experiencia; propósito (los problemas que resuelve, del brief); a quién sirve y cómo decide (bloques 1, 2 y 13).
- **Proyecto:** un resumen de 3-5 líneas, citando `docs/00-PROJECT-BRIEF.md`.
- **Autonomía:** qué hace solo, qué propone y espera aprobación, y qué nunca — tal como se acordó en la entrevista. Reemplaza la regla genérica de "Autonomía Limitada".
- **Comunicación:** idioma, tono y cómo consultar al usuario.
- **Criterios de decisión:** un puntero a `docs/01-GUIDELINES.md`.
- **Fuente primaria:** reemplazá la línea genérica por los archivos o sistemas reales (la primera entrada de `stack.md`).
- **Bloques condicionales:** si el proyecto no es de software, quitá los bloques marcados `<!-- cortex:software-only -->`. Los bloques `<!-- cortex:optional:<nombre> -->` se resuelven en la Fase 7, cuando se deciden las extensiones.
- **Router de skills:** reemplazá o eliminá los placeholders según las skills reales del proyecto.
- **Mantenimiento automático:** anotá el día de mantenimiento que eligió el usuario en la entrevista (bloque 13; por defecto, **viernes**, para cerrar la semana) o "desactivado".

## Fase 7: Integración con la herramienta

La memoria solo funciona si cada sesión la carga. Configurá **solo la herramienta con la que trabaja el usuario** (el caso base es un LLM y un arnés); si algún día cambia de herramienta, la nueva conecta Cortex-MD con la misma guía.

1. **Leé la guía de puentes:** `.cortex-tmp/framework/docs/agent-bridges.es.md`, o `https://raw.githubusercontent.com/AlfonsoM0/cortex-md/main/docs/agent-bridges.es.md` si la carpeta no existe.
2. **Investigá antes de configurar** cuando la herramienta no figura en la guía, su fecha de "Verificado" tiene más de 90 días o lo que observás no coincide: buscalo en la documentación oficial de la herramienta (web). Sin acceso web, usá la guía y avisale al usuario que puede estar desactualizada.
3. **Aplicá las tres condiciones** de la guía: la herramienta lee `AGENTS.md` al iniciar (nativo o mediante un archivo puente), ejecuta `start.md` antes de responder (un hook de inicio de sesión si lo hay), y su memoria nativa está desactivada — o, si no se puede desactivar, restringida a preferencias personales. Fusioná con los archivos existentes, nunca los reemplaces (en JSON, combiná claves y agregá a arreglos como `hooks.SessionStart`); la configuración global, solo con permiso.
4. **Completá** `docs/agent-environment.md` (creado en la Fase 3): puente y configuración aplicados, cómo se trató la memoria nativa, fuentes consultadas y fecha de verificación. `stack.md` lo cita.
5. **Extensiones:** si el proyecto es de software, ofrecé `deep-plan`, `audit` y `commit` en una línea cada uno (planificar antes de cambios grandes · auditar al terminar · commitear con un mensaje claro). Copiá solo lo que el usuario acepte, desde `.cortex-tmp/framework/` (o desde la URL raw del paso 1). `ai-helpers/` y el módulo de MCP, solo si el usuario los pide. Después quitá de `AGENTS.md` los bloques `<!-- cortex:optional:<nombre> -->` de las extensiones que no se instalaron.

## Fase 8: Registro y confirmación

1. **Registrá la sesión de alineación** con `end.md` (Fases 1 y 2): es el primer día del episódico, con las decisiones y aprendizajes de la entrevista. **Etiquetala con `[Docs]` más las etiquetas de dominio aprobadas — nunca solo `[CortexMD]`**, o el enrutamiento de `start.md` la saltearía.
2. **Actualizá `.agents/memory/maintenance-log.md`:** la fecha de hoy como último chequeo semanal y última revisión del brief; "nunca" como último defrag; `Init: completo` (o `incompleto`, listando los bloques o fases pendientes); `Post-instalación: pendiente — defrag + purga (instalado con <herramienta y modelo>)`.
3. **Actualizá `.agents/manifest.md § Instalación`:** fecha, idioma, herramienta y modelo, extensiones instaladas.
4. Corré `node .agents/check-memory-contract.js` (Node ≥ 18; sin Node, revisá a mano las tres reglas: `end.md § Fase 3`).
5. Resumí al usuario qué quedó en cada archivo y pedile que corrija imprecisiones.

## Fase 9: Traspaso al usuario

1. **Forma de uso:** si el uso no coincide con la forma de uso de la herramienta (p. ej. gestión desde Claude Code, cuya variante para gestión es Claude Cowork — el mismo servicio en otra forma), **solo recomendalo**, en una frase. Nunca bloquees ni exijas el cambio.
2. **Cómo funciona la memoria**, en lenguaje simple y con el cerebro como imagen (≤ 8 líneas): al empezar cada sesión el agente **despierta** — lee quién es (`AGENTS.md`), las reglas cortas del presente y lo que pasó ayer y en las últimas sesiones —; al terminar **duerme** — anota el día y lo convierte en aprendizajes (reglas, `docs/`, skills) —; los recuerdos más antiguos los busca solo cuando hacen falta; cada tanto **ejercita su memoria** (defrag) para corregir lo que consolidó mal. `docs/` explica el proyecto, y los archivos del negocio son siempre la verdad.
3. **Los workflows y la frase que los activa**, en el idioma del usuario:

   | Decí… | El agente… |
   | --- | --- |
   | (nada: al empezar cada sesión) | Carga la memoria (`start`) |
   | "guardemos lo aprendido" / "terminamos" | Consolida la sesión (`end`) |
   | (nada: el día de mantenimiento) | Revisa la memoria y propone, solo si hace falta, una limpieza (`maintenance`) |
   | "optimizá la memoria" | Revisión y limpieza profunda (`defrag`), con el modelo más capaz |

4. **Workflows y skills, para no expertos:** un *workflow* es una receta paso a paso que el agente sigue cuando se la pedís (vive en `.agents/workflows/`); una *skill* es conocimiento especializado que el agente carga solo cuando la tarea lo necesita (`.agents/skills/`). El usuario puede pedirle al agente que los cree: _"convertí lo que hacemos cada cierre de mes en un workflow"_, _"creá una skill con cómo evaluamos proveedores"_. El framework es un conjunto base de reglas: evoluciona con el proyecto.
5. **Buenos hábitos** (por qué importan: la memoria se guarda a partir de lo que la conversación todavía recuerda): una tarea por sesión; cerrar con "guardemos lo aprendido" antes de que la conversación se alargue demasiado; si la herramienta avisa que el contexto está lleno o que va a compactarlo, cerrar y empezar una sesión nueva; en canales de mensajería o tareas programadas, donde no hay un final natural, pedir el cierre explícitamente.
6. **Creá `docs/como-trabajar-con-tu-agente.md`** (una página, en el idioma del usuario) con los puntos 2-5, para que el usuario pueda releerlo. No se carga en cada sesión.
7. **Borrá `.cortex-tmp/`** (copia del framework y notas de la entrevista) si `Init: completo`. Si la entrevista quedó incompleta, conservá las notas: la próxima sesión sigue desde ahí.
8. **Recomendá cerrar la sesión**, con dos razones: el contexto quedó cargado con la entrevista, y la próxima sesión es la prueba de que la herramienta carga la memoria. Dale la prueba ("en la próxima sesión, preguntame: _¿cuál es la primera tarea pendiente?_") y anticipale que el agente va a proponer un **defrag + purga**: una revisión con ojos frescos de lo escrito hoy, y la eliminación de los archivos del framework que ya no hacen falta (como este workflow de instalación).

_Este workflow se ejecuta una sola vez por proyecto; la re-alineación, cuando el proyecto cambia. La purga post-instalación lo elimina._
