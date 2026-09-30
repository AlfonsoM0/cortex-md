# Cortex-MD: Memoria Continua para Agentes de IA

Cortex-MD es un framework de memoria persistente basado íntegramente en archivos Markdown. Resuelve la **"amnesia de sesión"** y la **"sobrecarga de contexto"** (_context bloat_) en agentes de IA que trabajan en el mismo proyecto día tras día — en Claude Cowork o Claude Code, Codex o ChatGPT Work, Antigravity, Hermes Agent, o cualquier herramienta que pueda leer y escribir archivos.

El sistema emula las estructuras de memoria del cerebro humano, separando la información en **memoria semántica** (el estado actual del proyecto) y **memoria episódica** (registro cronológico indexado), optimizando drásticamente el uso de tokens y previniendo alucinaciones por pérdida de contexto.

**Nació para el desarrollo de software, sirve para cualquier trabajo continuo:** stock, evaluación de proveedores, secretaría, atención al cliente, investigación. Los workflows hablan de la **fuente primaria** —el código en un repositorio, o los archivos del negocio y sistemas (planillas, facturas, ERP, CRM) en una operación administrativa— y de la **documentación en `docs/`** que los explica. Ver el [ejemplo de un agente administrativo](#ejemplo-memoria-de-un-agente-administrativo).

> 🌐 [Read in English (README.md)](README.md)

## ¿Por qué Cortex-MD?

- **🧬 Modelado sobre el cerebro humano:** el agente despierta, duerme, recuerda el día de ayer, busca recuerdos antiguos y ejercita su memoria — ver [la filosofía](#la-filosofía-de-cortex-md).
- **🧠 Resuelve un problema real:** cada sesión empieza de cero; Cortex-MD le da al agente una memoria estructurada sin dependencias externas.
- **📦 Zero dependency:** sin servidores, sin bases de datos, sin APIs. Solo archivos Markdown en tu carpeta; git es opcional.
- **🔄 Agnóstico del proveedor:** funciona con Claude, OpenAI, Google, o modelos abiertos a través de Hermes Agent. Cambiá de herramienta sin perder la memoria del proyecto.
- **🧭 Instalación guiada:** el agente lo instala con una entrevista amigable — el usuario no necesita saber qué es un LLM, un arnés o git.
- **🌱 Evoluciona con tu proyecto:** es un conjunto base de reglas; el agente adapta workflows y crea skills con tu aprobación.
- **🧩 Complementa `AGENTS.md`:** extiende la [convención AGENTS.md](https://agents.md) (Linux Foundation) con memoria temporal y workflows de ciclo de vida.

## La Filosofía de Cortex-MD

Cortex-MD se apoya en cinco fundamentos. Son la base sobre la cual cada usuario modela la memoria de su LLM como más le guste — agregando archivos, workflows o skills — y todos los workflows del framework los respetan: si un cambio rompe alguno, la memoria deja de funcionar bien.

### 1. Una memoria modelada sobre el cerebro humano

Un LLM pre-entrenado no puede cambiar sus pesos para recordar la conversación de ayer. Cortex-MD le da un cerebro externo hecho de archivos, con las mismas etapas que la memoria humana:

| El cerebro | En Cortex-MD |
| --- | --- |
| **Identidad** — saber quién sos | `AGENTS.md`: el ser del agente (fundamento 5) |
| **Despertar** — recordar quién sos, qué sabés y qué hiciste ayer | `start.md` |
| **Dormir** — consolidar el día en recuerdos y aprendizajes | `end.md` |
| **Recuerdos de ayer** | El registro de la última sesión (`episodic/YYYY/MM/DD.md`), que se lee al despertar |
| **Recuerdos recientes** | El timeline o "índice hipocampal" (`episodic/timeline.md`): una línea por sesión, las últimas 50 |
| **Recuerdos antiguos** | Las sesiones que salieron del timeline: siguen en `episodic/` y se buscan solo cuando hacen falta |
| **Aprendizajes** | La memoria semántica (reglas cortas del presente), `docs/` (conocimiento detallado) y las skills (habilidades) |
| **Ejercicios de memoria** | `defrag.md`: una revisión profunda que corrige lo que se consolidó mal; `maintenance.md` es el chequeo semanal que dice cuándo |
| **Atención** — la corteza prefrontal | La ventana de contexto: limpia y enfocada en la tarea actual |

### 2. Diseño modular: no saturar la memoria

El agente no carga toda su memoria: carga una base chica y amplía solo lo que la tarea necesita.

- **Conocimiento:** siempre lee las reglas cortas de la memoria semántica. Cada regla cita el doc que la amplía (`→ docs/...`), y los docs se citan entre sí y a las skills; el agente sigue esas citas solo cuando necesita más detalle.
- **Historia:** siempre lee el timeline y la última sesión. Si necesita más, sigue el timeline hasta las sesiones relevantes, y busca en las sesiones antiguas solo lo que la tarea pide.

```text
AGENTS.md — quién soy, y dónde está todo
 ├─ memoria semántica (reglas cortas) ──cita──▶ docs/ ──se citan entre sí──▶ docs/ · skills/
 └─ última sesión + timeline ──apunta a──▶ sesiones relevantes ──búsqueda──▶ sesiones antiguas
```

### 3. Economía de tokens

Lo que lee cada sesión — `AGENTS.md`, el puente, `start.md`, las reglas cortas, el timeline y la última sesión — es chico y estable, y tiene un presupuesto de tamaño (`defrag.md § Fase 1`, medido por `check-memory-contract.js`). Como es estable, aprovecha el **prompt caching** de los servicios de LLM: releerlo en cada turno cuesta una fracción del precio normal. Todo lo demás se paga solo cuando la tarea lo necesita, siguiendo las citas. La base es la memoria semántica: lo que el agente tiene que tener siempre presente.

Qué entra en esa base fija no lo decide cuán relevante es un archivo, sino **qué pasa si el agente no sabe que lo necesitaba**. Una sesión que olvida cargar un archivo que necesitaba falla en silencio; un archivo cargado de más solo cuesta tokens, y con prompt caching releer ese prefijo estable cuesta poco. El costo real de la memoria fija es de atención: cuanta más hay, más se diluye lo importante. Por eso las reglas del dominio (`business-rules`) se leen siempre, mientras que el estilo de la casa (`conventions`) y las etiquetas (`taxonomy`) se leen cuando la tarea los toca — y, ante la duda, el agente los lee: un archivo leído de más cuesta poco; uno que faltó puede costar una regla rota.

### 4. Aprendizaje continuo

Cada cierre de sesión (`end.md`) actualiza lo que cambió en la memoria semántica, en `docs/` y en las skills, para que el agente conozca siempre la realidad y el presente del proyecto — no lo que era cierto hace meses. La actualización nunca es perfecta: las reglas se acumulan, se repiten o dejan de ser ciertas. Por eso la memoria se **ejercita** cada tanto (`defrag.md`): se contrasta con la fuente primaria, se comprime y se corrige. El chequeo semanal (`maintenance.md`) lo propone cuando hace falta.

### 5. El ser: `AGENTS.md`

La personalidad, la identidad y la razón de ser del agente viven en `AGENTS.md`, junto con su relación con cada componente de su memoria. Desde ese archivo base — el primero que se carga en cada sesión — el agente entiende quién es, cuál es su propósito, cómo funciona su memoria, con qué habilidades y conocimientos cuenta, y cuáles son los workflows y las reglas más importantes. `AGENTS.md` es el enrutador que conecta todo el ser del agente con toda su memoria y sus conocimientos: guarda un mapa de ellos, no su contenido, y por eso se mantiene corto. Por ejemplo: _"Soy Ana, la asistente administrativa de una distribuidora de bebidas; mi propósito es que no se escape ningún pedido ni pago"_, o _"Soy un ingeniero principal con veinte años de experiencia; mi misión es construir este SaaS sin desperdiciar recursos"_.

## Inicio Rápido

**Qué necesitás:** una herramienta de IA que pueda leer y escribir archivos en una carpeta, con su modelo más capaz. El caso más común: **Claude Cowork** (para gestión) o **Claude Code** (para programar) — el mismo servicio de Claude en dos formas — con **Opus 5.5**.

### Opción A: instalación asistida (recomendada)

Abrí tu herramienta en la carpeta de tu negocio o proyecto, elegí el modelo más capaz de tu servicio y pegá:

```text
Leé el framework Cortex-MD en https://github.com/AlfonsoM0/cortex-md (empezá por INSTALL.es.md) e instalá su sistema de memoria en esta carpeta. Después ejecutá su workflow init.
```

El agente verifica que esté corriendo el modelo adecuado, descarga el framework en una carpeta temporal, copia solo el núcleo en tu idioma y empieza una **entrevista de alineación**: una charla para entender tu proyecto antes de escribir la memoria. Después conecta tu herramienta, te explica cómo funciona todo y te recomienda cerrar la sesión. Las instrucciones que sigue están en [`INSTALL.es.md`](INSTALL.es.md).

### Opción B: instalación manual

1. **Copiá solo el núcleo**, en un solo idioma ([`INSTALL.es.md § 3`](INSTALL.es.md) lo lista). En español, copiando las versiones `.es.md` sin el `.es`:

   ```bash
   git clone --depth 1 https://github.com/AlfonsoM0/cortex-md.git /tmp/cortex-md
   cd tu-proyecto
   mkdir -p .agents/workflows/references .agents/memory/semantic .agents/memory/episodic
   cp /tmp/cortex-md/AGENTS.es.md AGENTS.md
   cp /tmp/cortex-md/.agents/manifest.es.md .agents/manifest.md
   cp /tmp/cortex-md/.agents/check-memory-contract.js .agents/
   for f in init start end maintenance defrag; do cp /tmp/cortex-md/.agents/workflows/$f.es.md .agents/workflows/$f.md; done
   cp /tmp/cortex-md/.agents/workflows/references/alignment-interview.es.md .agents/workflows/references/alignment-interview.md
   cp /tmp/cortex-md/.agents/memory/maintenance-log.es.md .agents/memory/maintenance-log.md
   cp /tmp/cortex-md/.agents/memory/episodic/timeline.es.md .agents/memory/episodic/timeline.md
   for f in architecture stack conventions business-rules active-tasks taxonomy; do cp /tmp/cortex-md/.agents/memory/semantic/$f.es.md .agents/memory/semantic/$f.md; done
   ```

2. **Conectá tu herramienta** para que cada sesión cargue la memoria: [`docs/agent-bridges.es.md`](docs/agent-bridges.es.md).
3. **Ejecutá el bootstrap:** pedile a tu agente _"Leé y ejecutá `.agents/workflows/init.md`"_.

### Las dos primeras sesiones

1. **Instalación:** entrevista, memoria escrita, herramienta conectada y una guía de una página para vos (`docs/como-trabajar-con-tu-agente.md`). El agente recomienda cerrar la sesión: el contexto quedó lleno con la entrevista, y la próxima sesión prueba que la memoria se carga.
2. **Defrag + purga:** en la segunda sesión el agente propone revisar con ojos frescos lo que escribió (`defrag.md`) y borrar los archivos del framework que ya no hacen falta — el workflow de instalación, archivos en otros idiomas (`.agents/manifest.md` dice cuáles). Usá tu modelo más capaz.

### Día a día: no tenés que acordarte de nada

- **Al empezar**, el agente despierta: carga su memoria solo, incluido lo que pasó en la última sesión (`start.md`).
- **Al terminar**, cuando digas "listo" o "guardemos lo aprendido", se va a dormir: anota el día y lo convierte en aprendizajes (`end.md`).
- **Una vez por semana** — el día que elegiste en la entrevista; por defecto, **viernes** —, hace un chequeo liviano de la memoria (`maintenance.md`) y te propone, solo si hace falta, una limpieza, una optimización profunda (`defrag.md`) o una nueva charla de alineación. Nada se modifica sin tu sí.

**Buenos hábitos:** la memoria se guarda a partir de lo que la conversación todavía recuerda. Trabajá una tarea por sesión, cerrá con "guardemos lo aprendido" antes de que la conversación se alargue demasiado y, si la herramienta avisa que va a compactar el contexto, cerrá y empezá una sesión nueva.

## Entorno Recomendado

**Caso base: una persona, un LLM, una herramienta** — preferentemente un servicio por suscripción con su propio arnés agentil y prompt caching.

| Perfil | Herramientas | Modelo |
| --- | --- | --- |
| **Gestión** (documentos, planillas, proveedores, clientes) | Claude Cowork · ChatGPT Work | El de mayor razonamiento del servicio (p. ej. Opus 5.5) |
| **Desarrollo** (código) | Claude Code · Codex · Antigravity | El de mayor razonamiento del servicio |
| **Avanzado / código abierto** | [Hermes Agent](https://hermes-agent.nousresearch.com) + API key de cualquier proveedor (p. ej. DeepSeek) | Depende del proveedor |

Lo que el framework necesita del entorno, y por qué:

- **Prompt caching:** `AGENTS.md` y lo que carga `start.md` forman un prefijo estable que se relee en cada turno de la sesión. Con caché, esa relectura cuesta una fracción del precio normal; por eso el nivel siempre cargado tiene un presupuesto de tamaño (`defrag.md § Fase 1`).
- **Un arnés agentil con acceso al sistema de archivos:** `end.md` lee y escribe varios archivos, y `start.md` tiene que ejecutarse antes de responder. Un arnés lo hace solo y, si admite hooks de inicio de sesión, lo garantiza; una interfaz de chat obliga a copiar y pegar a mano.
- **Costo predecible:** cada sesión paga el ciclo `start` → `end` y, cada tanto, un `defrag`. Con tarifa plana ese costo fijo no se nota; con API se paga por token.
- **Una sola memoria:** las herramientas con memoria propia (la auto-memoria de Claude, la integrada de Hermes) la desactivan para el proyecto; cuando no se puede desactivar (Cowork, ChatGPT Work), se restringe a preferencias personales. Snippets en [`docs/agent-bridges.es.md`](docs/agent-bridges.es.md).

**Con arnés libre + API key**, además elegí un proveedor **con prompt caching** (sin caché, cada turno paga el contexto completo) y reservá el modelo más capaz para la instalación y `defrag.md`.

## Arquitectura de Directorios

Cortex-MD vive junto a tus archivos, en la convención `.agents/` que usan las herramientas compatibles con [AGENTS.md](https://agents.md). Nunca mueve ni modifica tus archivos del negocio ni tu código.

```text
/tu-carpeta/
├── AGENTS.md                            # Instrucciones base, se cargan en cada sesión
├── CLAUDE.md o .hermes.md               # Puente para tu herramienta, si lo necesita (lo crea init)
├── Proveedores/ Finanzas/ src/ …        # TUS archivos del negocio o tu código: la fuente primaria
├── docs/                                # Documentación que EXPLICA el proyecto; la memoria la cita
│   ├── 00-PROJECT-BRIEF.md              #   El por qué (de la entrevista de alineación)
│   ├── 01-GUIDELINES.md                 #   Cómo se decide
│   ├── agent-environment.md             #   Herramienta, modelo y cómo se carga la memoria
│   └── como-trabajar-con-tu-agente.md   #   Guía de una página para el usuario
└── .agents/
    ├── manifest.md                      # ★ Qué archivos son del framework (purga, adaptaciones)
    ├── check-memory-contract.js         # ★ Verificador del contrato de memoria (Node, sin dependencias)
    ├── workflows/
    │   ├── init.md                      # ★ Instalación y onboarding (la purga lo elimina)
    │   ├── references/
    │   │   └── alignment-interview.md   # ★ Banco de preguntas de la entrevista (también para re-alinear)
    │   ├── start.md                     # ★ Inicio de sesión ("Despertar")
    │   ├── end.md                       # ★ Fin de sesión ("Sueño")
    │   ├── maintenance.md               # ★ Chequeo semanal (liviano)
    │   ├── defrag.md                    # ★ Optimización, verificación y purga ("Defrag")
    │   └── deep-plan.md · audit.md · commit.md   # Extensiones para proyectos de software, a pedido
    ├── memory/
    │   ├── semantic/                    #   Neocorteza: el presente
    │   │   ├── stack.md                 #     Fuente primaria, entorno del agente, herramientas
    │   │   ├── architecture.md          #     Estructura, mapa del espacio de trabajo, flujos
    │   │   ├── conventions.md           #     Estilo de la casa
    │   │   ├── business-rules.md        #     Dominio y reglas invariables
    │   │   ├── active-tasks.md          #     Memoria de trabajo: qué falta hacer
    │   │   └── taxonomy.md              #     Lista cerrada de etiquetas del timeline
    │   ├── maintenance-log.md           #   Estado de la instalación, chequeo semanal, último defrag
    │   └── episodic/                    #   Hipocampo: recuerdos de ayer, recientes y antiguos
    │       ├── timeline.md              #     Recuerdos recientes: índice de las últimas 50 sesiones, por [Tags]
    │       └── YYYY/MM/DD.md · DD-s2.md #     Un registro por sesión (el último: ayer)
    ├── skills/                          # (Convención) Skills, se cargan bajo demanda
    ├── sync-mcp.js · mcp_config*.json   # Extensión: módulo de MCP, a pedido
    └── backups/                         # Solo sin git: copias antes de cada defrag

# Temporal, solo durante la instalación:
/.cortex-tmp/                            # Copia del framework y notas de la entrevista (init la borra)

# Solo en el repositorio del framework (no se copia a tu proyecto):
/INSTALL.md                              # Instrucciones de instalación para el agente
/docs/                                   # Guías del framework (agent-bridges, mcp-sync)
```

`AGENTS.md` es el ser del agente y el enrutador de su memoria (fundamento 5): identidad y propósito, autonomía, el mapa de la memoria y sus reglas, los workflows del ciclo de vida y el router de skills. Se mantiene corto porque cada sesión lo paga; los bloques que solo aplican a proyectos de software o a extensiones están marcados (`<!-- cortex:software-only -->`, `<!-- cortex:optional:<nombre> -->`) para que `init` y la purga los quiten.

## Los Principios de la Memoria

Lo que convierte una carpeta de Markdown en una memoria confiable no es la estructura de archivos: los cinco fundamentos se vuelven confiables con unas pocas reglas que los workflows aplican en cada ciclo.

1. **Tres capas, cada una en su lugar.** La **fuente primaria** son los archivos de trabajo: el código, o los archivos del negocio (un `proveedores.xlsx`, facturas, listas de precios). **`docs/`** explica cómo funciona el proyecto y cómo se trabaja ("cómo evaluar proveedores") y nombra dónde vive cada dato, sin guardar los archivos del negocio. La **memoria** guarda la regla y cita el doc.
2. **La fuente primaria le gana a la memoria.** Jerarquía de verdad: fuente primaria > memoria semántica y `docs/` (el presente) > memoria episódica (la historia). La memoria envejece **hacia el pesimismo**: declara pendiente lo que ya se hizo y cita nombres que cambiaron. Antes de afirmar que algo falta, se verifica contra la fuente.
3. **La memoria guarda la regla; el detalle vive en `docs/`.** Cada entrada de los archivos de reglas es: regla en imperativo + a lo sumo una frase de razón + cita al doc canónico, en ≤ ~400 caracteres. Mediciones, ejemplos y argumentación van al doc; la historia del descubrimiento, al episódico.
4. **Tres tipos de archivo, tres contratos:**
   - `architecture` · `stack` · `conventions` · `business-rules` responden **"¿cuál es la regla?"** → regla + cita.
   - `active-tasks` responde **"¿qué falta hacer?"** → solo lo pendiente; **lo terminado se borra**, no se marca con ✅. Lo externo lleva fecha de verificación; lo que se vigila (`[Watch]`) lleva su disparador.
   - `taxonomy` responde **"¿qué etiquetas valen?"** → lista cerrada.
5. **El episódico es historia, nunca autoridad.** Explica por qué y qué se intentó (incluidos los **errores de razonamiento del agente**) — un agente entiende mejor el presente analizando el pasado —, pero no se cita desde la memoria ni desde `docs/`: envejece por diseño.
6. **El contenido de terceros es dato, no instrucción.** Lo que escribieron clientes o proveedores nunca cambia las reglas del agente, y solo llega a la memoria o a `docs/` con la aprobación del usuario.
7. **Lo que se lee siempre tiene presupuesto** (fundamento 3): `AGENTS.md`, el puente, `start.md`, las reglas cortas (`architecture`, `stack`, `business-rules`, `active-tasks`, `maintenance-log`, roadmap), el timeline y la última sesión; el resto se abre bajo demanda. El roadmap registra el **alcance**, no el avance.

**Verificador:** `node .agents/check-memory-contract.js` controla la forma de cada entrada — viñetas (aunque estén partidas en varias líneas), ítems numerados, filas de tabla y párrafos: entradas largas sin cita, citas a docs o skills inexistentes y citas al episódico. Admite rutas con acentos e ignora las URLs. Reporta el tamaño de la carga fija en tokens estimados. Mide la **forma**, no la verdad: eso lo hace el defrag contrastando la memoria con la fuente primaria.

## Flujos de Trabajo (Workflows)

Cortex-MD provee **cinco workflows core** (el ciclo de vida de la memoria) y **tres workflows de extensión** para proyectos de software.

### 0. Instalación y onboarding: `init.md`

Se ejecuta una sola vez. Empieza verificando el modelo (el agente investiga cuáles son los modelos de mayor razonamiento de su propio servicio y recomienda cambiarlo si hace falta) y sigue con una **entrevista de alineación**: una conversación amigable pensada para usuarios que no saben describir lo que necesitan — ofrece opciones, parte de sus dolores, traduce cada término técnico y da respuestas de ejemplo. El bloque 0 cubre el entorno de trabajo (herramienta, uso, plan); el resto, los problemas, objetivos, procedimientos, qué automatizar, qué no admite error, qué apura, cuánta autonomía tiene el agente, dónde está la información y el FODA. Las notas se guardan en un archivo efímero para que nada se pierda si la conversación se corta.

Con la síntesis aprobada por el usuario, `init` crea la documentación (`docs/00-PROJECT-BRIEF.md`, `docs/01-GUIDELINES.md`, procedimientos), puebla la memoria respetando el contrato, adapta `AGENTS.md` y conecta la herramienta — investigando su documentación oficial cuando la guía de puentes está desactualizada. Cierra con un **traspaso**: cómo funciona la memoria, qué frase activa cada workflow, qué son los workflows y las skills y cómo pedir nuevos, y buenos hábitos. Deja dos señales para que la próxima sesión proponga el **defrag + purga**, y recomienda cerrar la sesión.

### 1. Despertar: `start.md`

- **Jerarquía de verdad** y la regla de contenido de terceros, antes de cargar nada.
- **Fase 1 (Lo que sé):** las reglas cortas del presente (`architecture`, `stack`, `business-rules`, `active-tasks`, `maintenance-log` y el roadmap si existe); `conventions` y `taxonomy` cuando la tarea los toca — ante la duda, los lee.
- **Fase 2 (Ayer y los recuerdos recientes):** siempre el timeline y la última sesión, empezando por su "Contexto para la Próxima Sesión".
- **Fase 3 (Recuerdos más antiguos):** solo si los dominios de la tarea coinciden con etiquetas del timeline, lee esas sesiones como historia, no como estado; busca en las sesiones antiguas cuando hace falta.
- **Fase 4:** recuerda lo que vence (P1 y `[Watch]` que vencen hoy o mañana) y recomienda a lo sumo una cosa — continuar una instalación incompleta, el defrag + purga post-instalación, registrar una sesión sin consolidar (solo con git) o el chequeo semanal.

### 2. Dormir: `end.md`

- **Episódico:** el día con cambios, decisiones y errores — incluidos los **errores de razonamiento propios**, los más caros de repetir.
- **Timeline:** una línea de ~200 caracteres con etiquetas de la taxonomía; `[CortexMD]` solo, únicamente para mantenimiento de la memoria.
- **Consolidación semántica** con el contrato de tres tipos de archivo; sin credenciales, datos personales ni texto de terceros sin aprobar.
- **Documentación y roadmap:** el comportamiento va a `docs/`, y los docs se citan entre sí; el roadmap cambia solo si cambió el alcance; **barrido de coherencia** cuando cambia un valor o un nombre.
- **Skills y workflows:** los patrones nuevos van a skills; las formas mejores de ejecutar un workflow se le proponen al usuario.
- **Flush de `active-tasks`:** borrar lo terminado, estados externos fechados, `[Watch]` con disparador, backlog Eisenhower + T-Shirt.
- **Cierre con el usuario:** los pendientes que solo una persona puede confirmar, y la oferta de commit cuando hay git.

### 3. Ejercitar la memoria: `defrag.md`

La consolidación es imperfecta, así que la memoria se ejercita a pedido, después de la instalación, o cuando lo recomienda el chequeo semanal. Además de comprimir y deduplicar:

- **Reversible:** commit o copia previa, e **inventario con la carga fija medida** (antes → después).
- **Contrato bloqueante:** el verificador debe dar cero hallazgos.
- **La memoria contra la fuente primaria (Fase 4.6):** contrasta nombres, límites y "únicos puntos de X" con el código o los archivos del negocio. Es lo único que detecta una memoria que describe un sistema que ya no existe.
- **Desvío de estado en `docs/`**, priorizando las afirmaciones que **subestiman el riesgo**.
- **Purga (Fase 6.5):** después de la instalación o a pedido, elimina los archivos del framework que el manifiesto marca como innecesarios — nunca archivos del negocio.
- **Reporte que separa lo cosmético de lo sustantivo**, y **revisión independiente** por otro agente o modelo.

> **Idempotente:** ejecutarlo sobre memoria ya optimizada no produce cambios.

### 4. El chequeo semanal: `maintenance.md`

`start.md` lo dispara solo en la primera sesión desde el **día de mantenimiento**. Es liviano y nunca reescribe la memoria: corre el verificador, busca sesiones sin consolidar (con git), pendientes vencidos, sesiones desde el último defrag, crecimiento de la carga fija, la antigüedad del brief y la de la verificación del entorno del agente. Hace **una recomendación, no una lista**, en tres líneas como máximo; si el usuario pospone, no insiste hasta la semana siguiente.

## Ejemplo: memoria de un agente administrativo

Un agente que lleva el stock, evalúa proveedores, responde a clientes y hace de secretario de una distribuidora de bebidas. No hay código: la **fuente primaria** son los archivos del negocio y el sistema de facturación; `docs/` explica los procedimientos y los criterios, y nombra dónde vive cada dato.

```text
Proveedores/proveedores.xlsx       # archivo del negocio: proveedores, contactos, precios (fuente primaria)
Stock/stock.xlsx                   # archivo del negocio: inventario y mínimos (fuente primaria)
Finanzas/facturas/                 # archivos del negocio: facturas y remitos
docs/
├── 00-PROJECT-BRIEF.md            # problemas, objetivos, FODA (de la entrevista de alineación)
├── 01-GUIDELINES.md               # criterios de decisión y lo que no admite error
├── sistemas.md                    # qué archivo o sistema guarda cada dato
├── procedimientos/reposicion.md   # cómo reponer stock
├── procedimientos/pagos.md        # cómo aprobar y registrar un pago
├── proveedores/evaluacion.md      # cómo evaluar proveedores
└── atencion/respuestas-tipo.md
.agents/memory/semantic/
└── taxonomy.md                    # [Stock] [Proveedores] [Clientes] [Pagos] [Docs] [CortexMD]
```

**`stack.md`**

```markdown
- **Fuente primaria:** `Stock/stock.xlsx` (inventario y mínimos), `Proveedores/proveedores.xlsx` (proveedores y precios) y el sistema de facturación (ventas). Ante una discrepancia, ganan ellos. → `docs/sistemas.md`
- **Entorno del agente:** Claude Cowork con Opus 5.5, plan de suscripción; puente `CLAUDE.md`. → `docs/agent-environment.md`
- **Pedidos a proveedores:** por correo desde la casilla de compras; WhatsApp solo para urgencias, con confirmación posterior por correo. → `docs/procedimientos/reposicion.md`
```

**`architecture.md`**

```markdown
- **Reposición:** alerta de stock bajo → pedido al proveedor preferido → recepción con remito → carga en la planilla → pago a 30 días. → `docs/procedimientos/reposicion.md`
- **Reclamos de clientes:** se registran en la planilla `Reclamos` antes de responder. → `docs/atencion/reclamos.md`
```

**`business-rules.md`**

```markdown
- **Nunca aprobar un pago sin remito conformado:** el faltante se reclama antes de pagar. → `docs/procedimientos/pagos.md §2`
- **Evaluar a los proveedores cada trimestre** por puntualidad, faltantes y precio; dos entregas tarde seguidas les bajan la prioridad. → `docs/proveedores/evaluacion.md`
- **El stock mínimo de cada producto lo define la planilla**, no la memoria: la memoria nombra la columna, nunca copia los valores.
```

**`conventions.md`**

```markdown
- **Responder a cada cliente en su idioma, en ≤ 5 líneas:** resultado, agradecimiento y despedida, sin jerga interna. → `docs/atencion/respuestas-tipo.md`
- **Todo mensaje a un cliente o proveedor lo aprueba una persona antes de enviarse.**
- **Nombrar los archivos** `AAAA-MM-DD_proveedor_tipo.pdf`.
```

**`active-tasks.md`**

```markdown
## 📍 Estado
- Stock conciliado con el conteo físico (verificado 2026-09-20 en la planilla).

## 🚀 Próximos Pasos
1. **[🚨 P1] [🟢 Snack]** Reclamar al Proveedor B las 12 unidades faltantes del remito 4521 antes del pago del viernes.

## 👀 Watch
- **[🧯 P3] [Watch]** El Proveedor A prometió entregar el 03/10: verificar la recepción ese día; si no llegó, pedir al Proveedor C.

## 📋 Backlog
- **[🧭 P2] [🟡 Sesión]** Evaluación trimestral de proveedores (T3).
```

**Una entrada del timeline y un error de razonamiento en el episódico:**

```markdown
- 2026-09-24: [Proveedores] [Pagos] Faltantes en el remito 4521 del Proveedor B: pago retenido hasta el reclamo; empezó la evaluación del T3.
```

```markdown
- **Error de razonamiento propio:** di por recibido el pedido 118 porque estaba el correo de despacho; la planilla no tenía la carga.
  - **Prevención:** la recepción se confirma en la planilla (fuente primaria), nunca por el aviso del proveedor.
```

Lo mismo aplica a cualquier otro dominio: cambiá qué es la fuente primaria, qué explica `docs/` y qué etiquetas usa la taxonomía. Los workflows no cambian.

## Workflows de Extensión: Modos de Ejecución Adaptativos

Para proyectos de software, `init` ofrece tres workflows de extensión: **`deep-plan.md`** (planificar antes de cambios grandes), **`audit.md`** (auditar al terminar) y **`commit.md`** (commitear con un mensaje claro). Los dos primeros se adaptan al modelo que los ejecuta:

| Tier del modelo | Modo de falla | Modo | Cómo funciona |
|---|---|---|---|
| **Ligero** (p. ej. Haiku 4.5 y equivalentes) | Amnesia de atención, evaluación perezosa | **`strict`** | Evidencia impresa completa y puertas bloqueantes entre fases. |
| **Medio** (p. ej. Sonnet 5.5 y equivalentes) | Saltos ocasionales por suposición | **`standard`** | Todas las fases, consolidadas; evidencia en checkpoints clave. |
| **Mayor razonamiento** (p. ej. Opus 5.5 y equivalentes) | La micro-gestión frena el razonamiento holístico | **`autonomous`** | Solo los objetivos de cada fase; el modelo elige cómo. |

Si el usuario no especifica un modo, **el agente propone el que corresponde a su propio modelo**. En `audit.md`, la validación técnica (lint, typecheck, build) es obligatoria en todos los modos siempre que el proyecto tenga toolchain.

- **`deep-plan.md`:** Descubrimiento → Restricciones → Partición. Usalo antes de un cambio que abarque más de 3 archivos o cruce límites entre módulos.
- **`audit.md`:** Inventario → Modularidad → Redundancia → Convenciones → Validación Técnica → Sincronización de Roadmap y Feature-Docs → Reporte. Usalo después de una feature, antes de `end.md`.

## AI Helpers: Pipeline de Ejecución Stepwise

Un módulo opcional (`ai-helpers/`), que se instala solo a pedido, que cubre el vacío operativo *durante* el desarrollo: un pipeline `Brief → Breakdown → Spec → Prompt → Audit`, en flujo manual u orquestado por un agente que delega en sub-agentes. Su contenido es efímero: lo que sigue siendo cierto pasa a `docs/` y a la memoria. Detalles: [Documentación de AI Helpers](ai-helpers/README.es.md).

## Equipos y Varios Agentes

El caso base es una persona, un LLM, una herramienta. Se pueden configurar varios proveedores y **usarlos de a uno** con la misma memoria. Trabajar en paralelo requiere orquestación — un agente líder que delega y es el único que consolida — y varias personas compartiendo una memoria generan conflictos en el episódico. Las dos cosas son complejas y quedan fuera del alcance de Cortex-MD; [`docs/agent-bridges.es.md`](docs/agent-bridges.es.md) menciona las reglas mínimas.

## Cómo Contribuir

Cortex-MD es una arquitectura abierta licenciada bajo [MIT](LICENSE). Las áreas de investigación actual incluyen:

- Optimización de la taxonomía de etiquetas en `taxonomy.md`.
- Evaluación del impacto en la retención de contexto en proyectos grandes y en operaciones administrativas de larga duración.
- **Métricas de tokens más precisas:** `check-memory-contract.js` estima la carga fija dividiendo bytes por 4; un tokenizador real por familia de modelos mejoraría la medición.
- **Verificación de secciones citadas:** el verificador confirma que el archivo citado existe, no que la sección (`§2`) trate el tema.
- **Cobertura de herramientas:** puentes verificados para herramientas y formas de uso nuevas ([`docs/agent-bridges.es.md`](docs/agent-bridges.es.md)); ya se incluye un helper opcional de MCP ([`docs/mcp-sync.es.md`](docs/mcp-sync.es.md)).
- **Investigación de workflows de extensión:** probar los modos de ejecución en distintas familias de modelos y tamaños de proyecto.

Si tenés mejoras para los prompts de los workflows, abrí un Pull Request o una Issue para debatir el enfoque cognitivo.
