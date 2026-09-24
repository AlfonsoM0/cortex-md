---
description: Bootstrap inicial (Onboarding)
---

# Workflow: Bootstrap del Proyecto (Onboarding Inicial)

**Contexto del Sistema:** Es la **primera vez** que Cortex-MD se activa en este proyecto y los archivos de memoria son plantillas vacías. Antes de escribir una sola regla, **alineate con el usuario**: una memoria poblada con suposiciones hace que el agente optimice lo que no importa. Ejecutá las fases en orden.

## Fase 0: Preparación silenciosa

Antes de preguntar nada, leé lo que ya existe para no preguntar lo que el proyecto ya dice:

- **Software:** estructura de directorios, archivos de configuración (`package.json`, `pyproject.toml`, `go.mod`…), `README.md`, documentación.
- **Otro tipo de proyecto:** los documentos, planillas o carpetas que el usuario haya compartido.

Armá una lista breve de hipótesis ("parece un comercio mayorista que lleva el stock en una planilla") para **confirmarlas** en la entrevista, no para darlas por ciertas.

**¿Hay control de versiones?** Averiguá si la carpeta es un repositorio git. Cortex-MD funciona igual en una carpeta común: sin git, el defrag respalda la memoria copiándola antes de reescribir. Si el usuario no usa git, no lo exijas; a lo sumo ofrecelo en una frase ("permite deshacer cualquier cambio; es opcional") y respetá la respuesta.

## Fase 1: Entrevista de alineación (conversación con el usuario)

Conducí una conversación amigable siguiendo **`.agents/workflows/references/alignment-interview.md`**. Al terminar, el agente tiene que poder responder, sin suponer:

- Qué es el proyecto, para quién, en qué etapa y quién decide.
- Qué **problemas** resuelve y cuáles quiere resolver el usuario con el asistente.
- Qué **objetivos** persigue, cómo se mide el éxito y qué quedó afuera a propósito.
- Cómo son los **procedimientos actuales** y cuáles conviene automatizar — con un script, con el agente o con el agente y aprobación humana.
- Qué tareas son **importantes** (no admiten error, son irreversibles) y cuáles **urgentes** (fechas límite, bloqueos, temporadas).
- Cuánta **autonomía** tiene el agente: qué hace solo, qué propone y qué nunca.
- **Dónde está la información**, cuál es la fuente de verdad de cada dato y cómo está organizada.
- El **FODA** del proyecto y los riesgos del pre-mortem.
- Las restricciones, los criterios de decisión y la forma de trabajo que prefiere el usuario.

🔴 **Puerta:** cerrá la fase con la síntesis de una página (lo que entendí · lo que no sé · lo que voy a hacer) y **esperá la confirmación explícita del usuario**. Sin síntesis aprobada no se escribe la memoria.

Si el usuario tiene poco tiempo, hacé las preguntas esenciales (★) y dejá el resto como pendiente en `active-tasks.md`: la entrevista puede completarse en sesiones siguientes.

## Fase 2: Análisis del proyecto

Con lo aprendido, profundizá donde la entrevista lo indicó:

- **Software:** estilo y convenciones reales del código, linters, módulos, flujo de datos.
- **Otro tipo de proyecto:** los sistemas y planillas nombrados, las plantillas en uso (emails, pedidos, facturas), los procedimientos escritos que existan.

Si el análisis contradice algo de la entrevista, preguntá: no elijas en silencio.

## Fase 3: Documentación canónica

La memoria cita documentos, así que los documentos van primero. Creá en `docs/` lo que la entrevista justificó (el destino de cada respuesta está en la tabla de síntesis de la referencia):

- `docs/00-PROJECT-BRIEF.md` — el **por qué**: proyecto, problemas, objetivos y métricas, no-objetivos, FODA, pre-mortem, restricciones.
- `docs/01-GUIDELINES.md` — **cómo se decide**: criterios ante conflictos, lo que no admite error, lo irreversible.
- Un documento por procedimiento o feature relevante, y `docs/glossary.md` si hay vocabulario propio.

Un roadmap (`docs/00-MASTER-ROADMAP.md`) solo si el proyecto tiene fases o alcance que gestionar.

## Fase 4: Memoria semántica

Escribí los archivos respetando el **contrato de los archivos de reglas** (`end.md § Fase 3`): regla en imperativo + a lo sumo una frase de razón + cita a `docs/`, ≤ ~400 caracteres por entrada.

1. `stack.md` — herramientas, servicios y proveedores; **la fuente primaria en la primera línea** (y cuál manda para cada tipo de dato, si hay varias).
2. `architecture.md` — cómo está armado el sistema o la operación: módulos, o flujos de trabajo y sus responsables.
3. `conventions.md` — el estilo de la casa: código, o formatos, tono y plantillas de comunicación.
4. `business-rules.md` — entidades del dominio y reglas invariables (lo que no admite error).
5. `taxonomy.md` — proponé las etiquetas según las áreas que surgieron en la entrevista (ej. `[Stock]`, `[Proveedores]`) y **esperá la aprobación del usuario**. `[CortexMD]` se conserva siempre.

🔴 **Nunca escribas en la memoria credenciales ni datos personales de terceros:** nombrá el sistema donde viven.

## Fase 5: Memoria de trabajo

Escribí `active-tasks.md` con:

- El **estado** verificado, con fecha.
- Las **urgencias** como P1 y lo que hay que vigilar como `[Watch]` con su disparador (fechas límite, riesgos del pre-mortem).
- Los **candidatos a automatizar**, clasificados por prioridad y esfuerzo, indicando si van con script, con el agente o con aprobación humana.
- Las **incógnitas** de la entrevista, como pendientes a verificar, y los bloques de la entrevista que hayan quedado sin hacer.
- El **próximo paso** acordado.

## Fase 6: Adaptar `AGENTS.md`

`AGENTS.md` se carga en toda sesión: guarda solo lo que tiene que estar siempre presente.

- **Identidad y contexto:** el rol del agente y un resumen de 3-5 líneas del proyecto, citando `docs/00-PROJECT-BRIEF.md`.
- **Autonomía:** qué hace solo, qué propone y espera aprobación, y qué nunca — tal como se acordó en la entrevista. Reemplaza la regla genérica de "Autonomía Limitada".
- **Comunicación:** idioma, tono y cómo consultar al usuario.
- **Criterios de decisión:** un puntero a `docs/01-GUIDELINES.md`.
- **Router de skills:** reemplazá o eliminá los placeholders según las skills reales del proyecto.
- **Mantenimiento automático:** anotá el día de mantenimiento que eligió el usuario en la entrevista (bloque 13; por defecto, **viernes**, para cerrar la semana) o "desactivado". En equipos de varias personas, anotá quién es el responsable.

Creá `.agents/memory/maintenance-log.md` con la fecha de hoy como último chequeo y última revisión del brief, y "nunca" como último defrag.

## Fase 7: Integración con las herramientas

La memoria solo funciona si cada sesión la carga. Para cada herramienta que use el usuario, verificá:

1. **Que lea `AGENTS.md` al iniciar.** No todas lo hacen solas: algunas necesitan un archivo puente o una configuración. La guía `docs/agent-bridges.md` del repositorio de Cortex-MD (no se copia al proyecto) tiene los snippets.
2. **Que ejecute `start.md` antes de responder.** Si la herramienta admite un hook de inicio de sesión, usalo.
3. **Que su memoria nativa esté desactivada** (si la tiene): dos memorias sobre el mismo proyecto divergen.

## Fase 8: Registro y confirmación

1. Registrá la sesión de alineación con `end.md` (Fases 1 y 2): es el primer día del episódico, con las decisiones y aprendizajes de la entrevista.
2. Corré `node .agents/check-memory-contract.js` (Node ≥ 18; sin Node, revisá el contrato a mano).
3. Resumí al usuario qué quedó en cada archivo y pedile que corrija imprecisiones.
4. Explicale al usuario, en tres frases y sin jerga, qué va a pasar de ahora en más: el agente carga la memoria solo al empezar cada sesión; ofrece guardar lo aprendido cuando la sesión termina; y el día de mantenimiento revisa la memoria y propone, solo si hace falta, una optimización o una nueva charla de alineación. **No tiene que acordarse de nada.**

_Este workflow se ejecuta una sola vez por proyecto; la re-alineación, cuando el proyecto cambia._
