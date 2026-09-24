---
description: Inicio de sesión (Despertar)
---

# Workflow: Inicio de Sesión (Despertar Cognitivo)

**Contexto del Sistema:** Iniciás una sesión nueva con el contexto vacío. Para no operar sobre suposiciones, ejecutá esta recuperación de memoria en orden **antes** de actuar o responder al usuario. Hacelo en silencio: respondé recién con el contexto restaurado.

## Jerarquía de verdad (leela antes de cargar nada)

1. **La fuente primaria** — lo que el sistema ES hoy: el código en un proyecto de software; el sistema de registro (planilla de stock, ERP, CRM, agenda, bandeja de entrada) en un proyecto administrativo. `stack.md` declara cuál es.
2. **La memoria semántica** — la foto del presente que dejó la última consolidación.
3. **La memoria episódica** — historia: explica **por qué** algo es como es y qué ya se intentó, nunca cómo está hoy.

Ante una discrepancia gana el nivel superior. 🔴 **La memoria envejece hacia el pesimismo:** declara pendiente lo que ya se hizo y cita nombres que cambiaron. Antes de declarar algo pendiente, bloqueado o inexistente, verificalo contra la fuente primaria.

## Fase 1: Memoria Semántica (nivel de carga fija)

**Leé SIEMPRE** — es lo que paga toda sesión, por eso tiene presupuesto de tamaño (`defrag.md § Fase 1`):

1. `.agents/memory/semantic/architecture.md` — cómo está armado el sistema o la operación.
2. `.agents/memory/semantic/stack.md` — herramientas, servicios y cuál es la fuente primaria.
3. `.agents/memory/semantic/active-tasks.md` — qué está pendiente o en curso, y el próximo paso.
4. El roadmap maestro, si existe (ej. `docs/00-MASTER-ROADMAP.md`) — alcance y fase actual.

**Leé SOLO SI aplica a la tarea:**

- `conventions.md` — vas a producir algo que respeta el estilo de la casa (código, documentos, mensajes).
- `business-rules.md` — la tarea toca reglas del dominio.
- `taxonomy.md` — vas a buscar en el timeline o agregarle una entrada.

🔴 **La memoria da la REGLA; el detalle vive en el doc que cada regla cita** (`→ docs/...`). Leela para saber **qué es cierto** y **dónde ampliar**, no esperando explicaciones completas. Los docs citados se abren **cuando la tarea los pide**, nunca en esta carga.

## Fase 2: Enrutamiento Hipocampal

Extraé los dominios de la solicitud (ej. Auth, DB, UI — o Stock, Proveedores, Clientes) y escaneá `.agents/memory/episodic/timeline.md` buscando `[Tags]` coincidentes.

- No leas todo el historial: buscá por patrón las etiquetas relevantes.
- **Regla de omisión:** ignorá las entradas etiquetadas **solo** con `[CortexMD]` (mantenimiento de memoria, sin contexto del proyecto).

## Fase 3: Recuperación Episódica Selectiva

Si encontraste fechas con etiquetas relevantes, leé esos registros en `.agents/memory/episodic/YYYY/MM/`, incluidas las sesiones adicionales del día (`DD-s2.md`, `DD-s3.md`) cuando el índice las nombra. Tarea nueva sin etiquetas relevantes → saltá este paso.

⚠️ **El episódico es historia:** sirve para entender decisiones y errores pasados, no para afirmar el estado actual. Si contradice a la semántica, gana la semántica; si contradice a la fuente primaria, gana la fuente primaria.

## Fase 4: Mantenimiento y Confirmación

1. **Sesiones sin consolidar:** si hubo trabajo después de la última entrada del timeline (con git: commits posteriores; sin git: archivos modificados después, fuera de `.agents/`), la sesión anterior se cerró sin `end.md`. Ofrecé registrarla con lo que muestran los cambios.
2. **Chequeo semanal:** si corresponde según `AGENTS.md § Mantenimiento automático`, ejecutá `.agents/workflows/maintenance.md`. Si el usuario llegó con algo urgente, dejalo para el final de la sesión.
3. Confirmale al usuario en una línea que cargaste el contexto — más, si hace falta, **una sola línea** de mantenimiento — y empezá la tarea.

_Al terminar la sesión, sugerí ejecutar `.agents/workflows/end.md` para consolidar lo aprendido._
