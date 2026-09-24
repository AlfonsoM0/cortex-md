# Cortex-MD: Sistema de Memoria Continua para LLMs en Repositorios de Código

Cortex-MD es un framework de memoria persistente basado íntegramente en archivos Markdown. Está diseñado para resolver la **"amnesia de sesión"** y la **"sobrecarga de contexto"** (_context bloat_) en Modelos de Lenguaje Grande (LLMs) que operan en entornos de desarrollo de software complejos (como Claude Code, Cursor, Gemini CLI, o agentes personalizados).

El sistema emula las estructuras de memoria del cerebro humano, separando la información en **memoria semántica** (estado global del proyecto) y **memoria episódica** (registro cronológico indexado), optimizando drásticamente el uso de tokens y previniendo alucinaciones por pérdida de contexto.

**Nació para el desarrollo de software, pero sirve para cualquier agente que trabaje de forma continua:** control de stock, evaluación de proveedores, secretaría, atención al cliente, investigación. Los workflows hablan de la **fuente primaria** —el código en un repositorio, el sistema de registro (planilla, ERP, CRM) en una operación administrativa— y de una **base de conocimiento canónica** en `docs/`. Ver el [ejemplo de un agente administrativo](#ejemplo-memoria-de-un-agente-administrativo).

> 🌐 [Read in English (README.md)](README.md)

## ¿Por qué Cortex-MD?

- **🧠 Resuelve un problema real:** La amnesia de sesión es el dolor #1 reportado por desarrolladores que usan asistentes de código con IA. Cortex-MD proporciona una solución estructurada sin dependencias externas.
- **📦 Zero dependency:** Sin servidores, sin bases de datos, sin APIs. Solo archivos Markdown que viven en tu repositorio, versionados con Git.
- **🔄 Agnóstico del proveedor:** Funciona nativamente con Claude, GPT-4o, Gemini, o cualquier modelo local de código abierto. Cambia entre modelos sin perder la memoria del proyecto.
- **🧩 Complementa `AGENTS.md`:** No reemplaza el estándar de la industria — extiende la [convención AGENTS.md](https://agents.md) (Linux Foundation) añadiendo memoria temporal y workflows de ciclo de vida.
- **🧬 Metáfora cognitiva memorable:** Construido alrededor de conceptos neurocientíficos (Neocorteza, Hipocampo, Corteza Prefrontal) que hacen la arquitectura intuitiva y fácil de razonar.

## Inicio Rápido

### Opción A: instalación asistida (recomendada)

No hace falta saber programar ni usar git: funciona en una **carpeta común** con archivos. Abrí tu agente de IA en la carpeta donde vas a trabajar y pegale este prompt:

```text
Leé el framework Cortex-MD en https://github.com/AlfonsoM0/cortex-md (empezá por INSTALL.es.md) e instalá su sistema de memoria en este espacio de trabajo. Después ejecutá su workflow init.
```

El agente descarga el framework, copia solo lo necesario en tu idioma, conecta tu herramienta y empieza una **entrevista de alineación**: una charla para entender tu proyecto antes de escribir la memoria. Las instrucciones que sigue están en [`INSTALL.es.md`](INSTALL.es.md).

### Opción B: instalación manual

1. **Copiá la estructura** a tu proyecto — en tu idioma, renombrando `archivo.es.md` → `archivo.md` si usás las versiones en español ([`INSTALL.es.md`](INSTALL.es.md) detalla qué copiar):

   ```bash
   git clone --depth 1 https://github.com/AlfonsoM0/cortex-md.git /tmp/cortex-md
   cp -r /tmp/cortex-md/.agents/ tu-proyecto/.agents/
   cp /tmp/cortex-md/AGENTS.md tu-proyecto/AGENTS.md
   ```

2. **Conectá tus herramientas.** La memoria solo funciona si cada sesión la carga: cada herramienta tiene que **leer `AGENTS.md` al iniciar**, **ejecutar `start.md` antes de responder** y **no usar una memoria propia en paralelo**. Codex CLI lee `AGENTS.md` de forma nativa; **Claude Code** no (carga `CLAUDE.md`), así que necesita un archivo puente y admite un hook de inicio de sesión; Gemini CLI, Cursor, Aider y Copilot se configuran apuntando a `AGENTS.md`. Snippets listos para copiar: [`docs/agent-bridges.es.md`](docs/agent-bridges.es.md).

3. **Ejecutá el bootstrap:** pedile a tu agente _"Leé y ejecutá `.agents/workflows/init.md`"_.

### Día a día: no tenés que acordarte de nada

- **Al empezar**, el agente carga la memoria solo (`start.md`) y, si la sesión anterior se cerró sin guardar, ofrece registrarla.
- **Al terminar**, cuando le digas "listo" o "gracias", ofrece guardar lo aprendido (`end.md`).
- **Una vez por semana** — el día que elegiste en la entrevista; por defecto, **viernes** —, hace un chequeo liviano de la memoria (`maintenance.md`) y te propone, solo si hace falta, una limpieza, una optimización profunda (`defrag.md`) o una nueva charla de alineación. Nada se modifica sin tu sí.

## Entorno Recomendado: API Directa + Extensiones Agentiles

Para obtener el máximo rendimiento y la mejor relación costo-beneficio con Cortex-MD, recomendamos utilizar **herramientas agentiles conectadas directamente a la API de los modelos** en lugar de interfaces de chat o IDEs comerciales con suscripción.

- **Eficiencia en Prompt Caching (Start):** Cortex-MD inyecta contexto estático constante (`architecture.md`, `stack.md`, etc.) al inicio de cada sesión. Al usar APIs modernas, este contexto se almacena en caché y **reduce drásticamente el costo de lectura de tokens** (a menudo en más de un 90%). Las herramientas o IDEs comerciales no siempre garantizan un control predecible de este caché, consumiendo rápidamente tus cuotas premium de uso.
- **Autonomía para actualizar memoria (End):** El ciclo de finalización demanda lectura y escritura autónoma en múltiples archivos (`YYYY/MM/DD.md`, `timeline.md`, etc.). Una extensión agentil tiene permisos granulares para gestionar el sistema de archivos local y preparar commits. Las interfaces tradicionales suelen requerir copiado, pegado y creación de archivos de forma manual.
- **Ventanas de contexto intactas:** La planificación arquitectónica requiere la ventana de contexto íntegra (muchos modelos ofrecen hoy cientos de miles de tokens). La conexión cruda a la API te entrega el 100% de esta capacidad sin la compresión o el descarte silencioso de información que algunas herramientas aplican en segundo plano para ahorrar costos.
- **Ejecución estricta de workflows:** El protocolo requiere auditorías y validaciones rigurosas. Un agente autónomo bien configurado fuerza el cumplimiento de instrucciones sin desviarse. Las herramientas cerradas a veces priorizan la velocidad, lo que a menudo provoca que el modelo "olvide" o ignore instrucciones largas del sistema.

Para una implementación óptima, conecta tu propia llave de API a tu extensión agentil de preferencia y apunta el agente para que lea `AGENTS.md` en la raíz de tu repositorio.

## Fundamentos Neurocientíficos del Sistema

Los LLMs pre-entrenados carecen de neuroplasticidad; no pueden alterar sus pesos paramétricos para recordar una conversación de ayer. Para mitigar esto, Cortex-MD estructura un "cerebro externo" (exocórtex) utilizando el sistema de archivos del repositorio:

- **Corteza Prefrontal (Ventana de Contexto):** Se mantiene limpia y enfocada estrictamente en la tarea actual.
- **Neocorteza (Memoria Semántica):** Almacena el "estado de las cosas" (arquitectura, convenciones, reglas de negocio, stack y taxonomía). No es un registro histórico, es la verdad absoluta y actual del proyecto. Se divide en múltiples archivos modulares para escalar sin generar _context bloat_.
- **Hipocampo (Memoria Episódica):** Guarda el registro diario de acciones y razonamientos (vinculado a commits de Git), indexado de manera eficiente en un timeline limitado (últimas 50 sesiones) para una rápida recuperación cuando el contexto profundo es necesario.

## Arquitectura de Directorios

Cortex-MD se integra dentro de la convención estándar `.agents/` (basada en convenciones de [Anthropic](https://docs.anthropic.com) y [AGENTS.md](https://agents.md)) para agentes de IA en repositorios. El directorio `.agents/` es un espacio escalable y estandarizado; Cortex-MD aporta la carpeta `memory/` y los workflows de ciclo de vida:

```text
/.agents/                              # Directorio estándar para agentes de IA
├── skills/                            # (Convención) Habilidades reutilizables (instrucciones + código)
│   └── ...
├── workflows/                         # Flujos de orquestación del agente
│   ├── init.md                        # ★ Core: Bootstrap inicial ("Onboarding")
│   ├── references/
│   │   └── alignment-interview.md     # ★ Core: Banco de preguntas de la entrevista de alineación
│   ├── start.md                       # ★ Core: Inicio de sesión ("Despertar")
│   ├── maintenance.md                 # ★ Core: Chequeo semanal automático (liviano)
│   ├── end.md                         # ★ Core: Fin de sesión ("Dormir")
│   ├── defrag.md                      # ★ Core: Optimización y verificación de memoria ("Defrag")
│   ├── deep-plan.md                   # ★ Extensión: Planificación profunda con Prueba de Trabajo
│   ├── audit.md                       # ★ Extensión: Auditoría post-feature con evidencia
│   └── commit.md                      # ★ Opcional: revisión de staged + commit con intención
├── memory/                            # ★ Cortex-MD: Sistema de memoria persistente
│   ├── semantic/                      #   Neocorteza: Estado global del proyecto
│   │   ├── taxonomy.md                #     Taxonomía estricta de etiquetas para el índice
│   │   ├── architecture.md            #     Patrones de diseño y estructura de módulos
│   │   ├── stack.md                   #     Tecnologías, librerías y dependencias clave
│   │   ├── conventions.md             #     Convenciones de código y estilo
│   │   ├── business-rules.md          #     Lógica de negocio y reglas del dominio
│   │   └── active-tasks.md            #     Memoria de trabajo: tareas en curso
│   ├── maintenance-log.md             #   Fechas del chequeo semanal, del último defrag y de la revisión del brief
│   └── episodic/                      #   Hipocampo: Registro cronológico indexado
│       ├── timeline.md                #     Índice de búsqueda rápida por [Tags] (máx. 50 sesiones)
│       └── YYYY/
│           └── MM/
│               ├── DD.md              #     Registro detallado de la sesión (cambios, decisiones, errores)
│               └── DD-s2.md           #     Segunda sesión del mismo día
├── check-memory-contract.js           # ★ Cortex-MD: verificador del contrato de la memoria (Node, sin dependencias)
├── .mcp.json                          # (Convención) Configuración de servidores MCP local
├── sync-mcp.js                        # ★ Opcional (módulo MCP): genera configs por IDE desde una sola fuente
├── mcp_config.json                    # ★ Opcional (módulo MCP): lista canónica de servidores (placeholders, sin secretos)
├── mcp_config.zoo-overrides.json      # ★ Opcional (módulo MCP): ejemplo de overrides por IDE
└── backups/                           # Solo sin git: copias de la memoria antes de cada defrag (las 3 últimas)

/AGENTS.md                             # Instrucciones base, cargadas en cada sesión
/ai-helpers/                           # ★ Opcional: Módulo Pipeline de Ejecución Stepwise
/docs/                                 # Base de conocimiento canónica de TU proyecto: el detalle que la memoria cita

# Solo en el repositorio del framework (no se copian a tu proyecto):
/INSTALL.md                            # Instrucciones de instalación para el agente
/docs/                                 # Guías del framework (agent-bridges, mcp-sync, multi-dev)
```

Adicionalmente, `AGENTS.md` se ubica en la **raíz del repositorio**. Actúa como el punto de entrada (_system prompt_) que el IDE inyecta automáticamente al agente, y es responsable de dirigir al LLM hacia los workflows de Cortex-MD. También aloja el **Skill Router** (un índice categorizado y bajo-demanda de las skills del proyecto) y las **reglas inviolables** (modularidad estricta y anti-redundancia) — guardas que deben permanecer en el contexto siempre-cargado, ya que `conventions.md` y las skills se cargan solo selectivamente. Esto sigue el [estándar AGENTS.md](https://agents.md) adoptado por más de 60k proyectos open source y soportado por herramientas como Codex, Jules, Cursor, VS Code Copilot, y muchas más.

## Los Principios de la Memoria

Lo que convierte una carpeta de Markdown en una memoria confiable no es la estructura de archivos: son cinco reglas que los workflows aplican en cada ciclo.

1. **La fuente primaria le gana a la memoria.** Jerarquía de verdad: fuente primaria (código, sistema de registro) > memoria semántica > memoria episódica. La memoria envejece **hacia el pesimismo**: declara pendiente lo que ya se hizo y cita nombres que cambiaron. Antes de afirmar que algo falta, se verifica contra la fuente.
2. **La memoria guarda la regla; el detalle vive en `docs/`.** Cada entrada de los archivos de reglas es: regla en imperativo + a lo sumo una frase de razón + cita al doc canónico, en ≤ ~400 caracteres. Mediciones, ejemplos y argumentación van al doc; la historia del descubrimiento, al episódico. Así la memoria que se lee en cada sesión se mantiene chica sin perder nada.
3. **Tres tipos de archivo, tres contratos:**
   - `architecture` · `stack` · `conventions` · `business-rules` responden **"¿cuál es la regla?"** → regla + cita.
   - `active-tasks` responde **"¿qué falta hacer?"** → solo lo pendiente; **lo terminado se borra**, no se marca con ✅. Lo externo lleva fecha de verificación; lo que se vigila (`[Watch]`) lleva su disparador.
   - `taxonomy` responde **"¿qué etiquetas valen?"** → lista cerrada.
4. **El episódico es historia, nunca autoridad.** Explica por qué y qué se intentó (incluidos los **errores de razonamiento del agente**), pero no se cita desde la memoria ni desde `docs/`: envejece por diseño.
5. **Lo que se lee siempre tiene presupuesto.** `start.md` carga un nivel fijo (`architecture`, `stack`, `active-tasks`, roadmap) que paga cada sesión; el resto se abre bajo demanda. El roadmap registra el **alcance**, no el avance.

**Verificador:** `node .agents/check-memory-contract.js` controla la forma (entradas largas sin cita, citas a docs inexistentes, citas al episódico) y reporta el tamaño de la carga fija en tokens estimados. Mide la **forma**, no la verdad: eso lo hace el defrag contrastando la memoria con la fuente primaria.

## Flujos de Trabajo (Workflows)

Cortex-MD provee **cinco workflows core** (el ciclo de vida de la memoria) y **dos workflows de extensión** (metodología de desarrollo):

### 0. Bootstrap inicial: `init.md`

Se ejecuta una sola vez al adoptar Cortex-MD, y empieza por una **entrevista de alineación**: una conversación amigable en la que agente y usuario acuerdan qué problemas resuelve el proyecto, qué objetivos persigue y cómo se mide el éxito, cómo son los procedimientos actuales y cuáles automatizar, qué tareas no admiten error y cuáles apuran, cuánta autonomía tiene el agente, dónde está la información y cuál es su FODA. El banco de preguntas (`references/alignment-interview.md`) combina prácticas probadas —reunión inicial de proyecto, pre-mortem, criterios de automatización, niveles de autonomía según qué tan fácil es verificar y deshacer una tarea— y dice a qué documento o archivo de memoria va cada respuesta.

Con la síntesis aprobada por el usuario, `init` crea la documentación canónica (`docs/00-PROJECT-BRIEF.md`, `docs/01-GUIDELINES.md`, procedimientos), puebla la memoria respetando el contrato, adapta `AGENTS.md` (contexto, autonomía, comunicación) y la taxonomía, y conecta las herramientas para que cada sesión cargue la memoria. La entrevista se repite en parte cuando el proyecto cambia de etapa (**re-alineación**).

### 1. El ciclo de "Despertar": `start.md`

- **Jerarquía de verdad:** se lee antes de cargar nada.
- **Fase 1 (Carga semántica):** siempre el nivel fijo (`architecture`, `stack`, `active-tasks` y el roadmap si existe); `conventions`, `business-rules` y `taxonomy` según la tarea. La memoria da la regla: los docs citados se abren cuando la tarea los pide.
- **Fase 2 (Enrutamiento hipocampal):** busca en `timeline.md` las etiquetas de los dominios de la tarea.
- **Fase 3 (Recuperación episódica):** solo si hubo coincidencias, lee esos días (incluidos `DD-sN.md`) como historia, no como estado.

### 2. El ciclo de "Sueño y Consolidación": `end.md`

- **Higiene previa** y, en equipos de agentes, **consolida solo el líder**.
- **Episódico:** el día con cambios, decisiones y errores — incluidos los **errores de razonamiento propios**, los más caros de repetir.
- **Timeline:** una línea de ~200 caracteres con etiquetas de la taxonomía (máx. 50 sesiones).
- **Consolidación semántica** con el contrato de tres tipos de archivo; sin credenciales ni datos personales.
- **Documentación y roadmap:** el comportamiento va a `docs/`; el roadmap cambia solo si cambió el alcance; **barrido de coherencia** cuando cambia un valor o un nombre.
- **Skills** con la Guarda de Skills Externas.
- **Flush de `active-tasks`:** borrar lo terminado (verificando antes que su detalle viva en `docs/`), estados externos fechados, `[Watch]` con disparador, backlog Eisenhower + T-Shirt.
- **Cierre con el usuario:** lista los pendientes que solo una persona puede confirmar, para que marque los que ya no aplican.

### 3. Desfragmentación de Memoria: `defrag.md`

Bajo demanda, cada 15-20 sesiones. Además de comprimir y deduplicar:

- **Commit previo** para que sea reversible, e **inventario con la carga fija medida** (antes → después).
- **Contrato bloqueante:** el verificador debe dar cero hallazgos.
- **La memoria contra la fuente primaria (Fase 4.6):** contrasta nombres, límites y "únicos puntos de X" con el código o el sistema de registro. Es lo único que detecta una memoria que describe un sistema que ya no existe — y lo más valioso del reporte.
- **Desvío de estado en `docs/`:** afirmaciones que el tiempo volvió falsas, priorizando las que **subestiman el riesgo**.
- **Sistema de conocimiento:** router de skills, rutas muertas, actualización de skills externas sin perder archivos propios.
- **Higiene:** datos sensibles fuera del control de versiones.
- **Reporte que separa lo cosmético de lo sustantivo**, y **revisión independiente** del diff por otro agente o modelo antes de commitear.

> **Idempotente:** ejecutarlo sobre memoria ya optimizada no produce cambios.

### 4. Chequeo Semanal: `maintenance.md`

El usuario no tiene que saber cuándo optimizar la memoria o re-alinearse: lo decide este chequeo, que `start.md` dispara solo en la primera sesión desde el **día de mantenimiento** (lo elige el usuario en `init`; por defecto, viernes). Como el agente no tiene reloj entre sesiones, si ese día no se trabaja, corre en la sesión siguiente.

- **Liviano y sin reescribir la memoria:** corre el verificador, busca sesiones sin consolidar (por commits o, sin git, por archivos modificados), pendientes vencidos o marcados como hechos, sesiones desde el último defrag, crecimiento de la carga fija y la antigüedad del brief.
- **Una recomendación, no una lista:** consolidar, limpiar, **defrag solo cuando hace falta** (≥ 15 sesiones, carga fija +25 %, hallazgos del verificador, o > 60 días), revisión rápida del brief (> 90 días) o re-alineación ante señales de cambio.
- **Proponer, nunca imponer:** tres líneas como máximo; si el usuario pospone, no insiste hasta la semana siguiente. Su estado vive en `.agents/memory/maintenance-log.md`.

## Ejemplo: memoria de un agente administrativo

Un agente que lleva el stock, evalúa proveedores, responde a clientes y hace de secretario de un comercio mayorista. No hay código: la **fuente primaria** es la planilla de stock y el sistema de facturación, y `docs/` guarda los procedimientos y las fichas de proveedores.

```text
.agents/memory/semantic/
├── stack.md            # sistemas en uso y cuál es la fuente primaria
├── architecture.md     # áreas y flujos de trabajo
├── conventions.md      # el estilo de la casa
├── business-rules.md   # reglas del negocio
├── active-tasks.md     # pendientes, con estado fechado
└── taxonomy.md         # [Stock] [Proveedores] [Clientes] [Pagos] [Agenda] [Docs] [CortexMD]
docs/
├── 00-PROJECT-BRIEF.md            # problemas, objetivos, FODA (de la entrevista de alineación)
├── 01-GUIDELINES.md               # criterios de decisión y lo que no admite error
├── procedimientos/reposicion.md
├── procedimientos/pagos.md
├── proveedores/evaluacion.md
└── atencion/respuestas-tipo.md
```

**`stack.md`**

```markdown
- **Fuente primaria:** planilla `Stock` (existencias y mínimos) y el sistema de facturación (ventas y cobros). Ante una discrepancia, ganan ellos. → `docs/sistemas.md`
- **Pedidos a proveedores:** por email desde la casilla de compras; WhatsApp solo para urgencias, con confirmación posterior por email. → `docs/procedimientos/reposicion.md`
```

**`architecture.md`**

```markdown
- **Reposición:** alerta de mínimo → pedido al proveedor preferido → recepción con remito → carga en la planilla → pago a 30 días. → `docs/procedimientos/reposicion.md`
- **Reclamos de clientes:** se registran en la planilla `Reclamos` antes de responder. → `docs/atencion/reclamos.md`
```

**`business-rules.md`**

```markdown
- **Nunca aprobar un pago sin remito conformado:** el faltante se reclama antes de pagar. → `docs/procedimientos/pagos.md §2`
- **Evaluar proveedores cada trimestre** por puntualidad, faltantes y precio; dos entregas tardías seguidas bajan su prioridad. → `docs/proveedores/evaluacion.md`
- **El stock mínimo de cada producto lo define la planilla**, no la memoria: la memoria nombra la columna, nunca copia los valores.
```

**`conventions.md`**

```markdown
- **Responder a cada cliente en su idioma, en ≤ 5 líneas:** resultado, agradecimiento y cierre, sin jerga interna. → `docs/atencion/respuestas-tipo.md`
- **Todo mensaje a un cliente o proveedor lo aprueba una persona antes de enviarse.**
- **Nombrar archivos** `AAAA-MM-DD_proveedor_tipo.pdf`.
```

**`active-tasks.md`**

```markdown
## 📍 Estado
- Stock conciliado con el recuento físico (verificado 2026-09-20 en la planilla).

## 🚀 Próximos Pasos
1. **[🚨 P1] [🟢 Snack]** Reclamar al Proveedor B las 12 unidades faltantes del remito 4521 antes del pago del viernes.

## 👀 Watch
- **[🧯 P3] [Watch]** El Proveedor A prometió entregar el 03/10: verificar la recepción ese día; si no llegó, pedir al Proveedor C.

## 📋 Backlog
- **[🧭 P2] [🟡 Sesión]** Evaluación trimestral de proveedores (Q3).
```

**Una entrada del timeline y un error de razonamiento en el episódico:**

```markdown
- 2026-09-24: [Proveedores] [Pagos] Faltante en el remito 4521 del Proveedor B: pago retenido hasta el reclamo; evaluación Q3 iniciada.
```

```markdown
- **Error de razonamiento propio:** di por recibido el pedido 118 porque figuraba el email de despacho; la planilla no tenía la carga.
  - **Prevención:** la recepción se confirma en la planilla (fuente primaria), nunca por el aviso del proveedor.
```

Lo mismo aplica a cualquier otro dominio: cambiá qué es la fuente primaria, qué guarda `docs/` y qué etiquetas usa la taxonomía. Los workflows no cambian.

## Workflows de Extensión: Modos de Ejecución Adaptativos

Mientras los cinco workflows core gestionan el ciclo de vida de la memoria, Cortex-MD también provee **workflows de extensión** que se adaptan a las capacidades del modelo que los ejecuta. Resuelven dos problemas simultáneamente:

1. **Degradación de calidad** cuando modelos ligeros (Haiku, Flash, mini) procesan tareas de ingeniería complejas.
2. **Overhead de latencia** cuando modelos pesados (Opus, o1) son forzados a través de pasos de micro-gestión innecesarios.

### El Espectro del Problema

Distintos modelos fallan de distintas formas:

| Tier del Modelo | Modo de Falla | Causa Raíz |
|---|---|---|
| **Ligero** (Haiku, Flash, mini) | Amnesia de atención, evaluación perezosa, alucinación de contexto | FLOPs limitados por token — no puede resolver complejidad en espacio latente |
| **Medio** (Sonnet, GPT-4o, Gemini Pro) | Salto ocasional basado en suposiciones | Profundidad suficiente pero puede desviarse sin checkpoints |
| **Pesado** (Opus, o1, Deep Research) | Penalización de latencia, razonamiento holístico suprimido | La micro-gestión bloquea el pensamiento arquitectónico paralelo |

### La Solución: Tres Modos de Ejecución

Cada workflow de extensión soporta **tres modos** que el usuario selecciona al invocarlo (ej. "Creá un plan estricto", "Ejecutá una auditoría autónoma"). Si el usuario no especifica, el agente pregunta.

| Modo | Nivel de Confianza | Para Modelos Como | Cómo Funciona |
|---|---|---|---|
| **`strict`** | Bajo — externalizar todo | Haiku, Flash, mini | Evidencia impresa completa. Puertas bloqueantes entre fases. Cada afirmación requiere output impreso de herramienta. Compensa profundidad de razonamiento limitada. |
| **`standard`** | Medio — confiar con checkpoints | Sonnet, GPT-4o, Gemini Pro | Todas las fases se ejecutan pero pueden consolidarse. Evidencia requerida en checkpoints clave, no en todos lados. Balance entre velocidad y rigor. |
| **`autonomous`** | Alto — confiar en el juicio del modelo | Opus, o1, Deep Research | Ejecución holística. El modelo recibe los objetivos de cada fase pero elige cómo alcanzarlos. Máxima velocidad y profundidad arquitectónica. |

> **Innegociable en todos los modos:** El gateway de Validación Técnica (lint, typecheck, build) es siempre obligatorio y bloqueante. Ningún modelo — sin importar su capacidad — puede saltear la verificación objetiva del compilador.

### 5. Planificación Profunda: `deep-plan.md`

Un workflow de planificación estructurada con tres fases (Descubrimiento → Restricciones → Partición) que adapta su rigor:

- **`strict`:** Resultados de búsqueda impresos, puertas bloqueantes entre fases, etapas de máx 3-5 archivos.
- **`standard`:** Resúmenes consolidados, sin puertas bloqueantes, etapas de hasta 8-10 archivos.
- **`autonomous`:** Análisis holístico, fases pueden combinarse, planes monolíticos permitidos si se justifican.

> **Cuándo usarlo:** Antes de implementar cualquier funcionalidad que abarque más de 3 archivos o cruce límites entre módulos.

### 6. Auditoría Post-Feature: `audit.md`

Un workflow de validación basado en evidencia con siete fases (Inventario → Modularidad → Redundancia → Convenciones → Validación Técnica → Sincronización de Roadmap y Feature-Docs → Reporte):

- **`strict`:** Output de grep para cada check, conteo de líneas para cada archivo, evidencia impresa en cada fase.
- **`standard`:** Evidencia impresa solo para hallazgos y violaciones de umbrales. Formato resumen.
- **`autonomous`:** Evaluación holística con herramientas usadas solo en áreas de incertidumbre. Solo la fase gateway es obligatoria.

> **Cuándo usarlo:** Después de completar cualquier funcionalidad o bloque de trabajo significativo, antes de la consolidación de memoria (`end.md`).

## AI Helpers: Pipeline de Ejecución Stepwise

Mientras que Cortex-MD destaca en la gestión de memoria global y contexto episódico, no prescribe cómo hacer la programación real *durante* la sesión. El módulo **AI Helpers** (`ai-helpers/`) llena este vacío operacional.

El módulo soporta **tres modos de trabajo**:

- **Flujo Manual:** El usuario controla cada paso del pipeline (`Brief → Breakdown → Spec → Prompt → Audit`).
- **Flujo Orquestado:** Un agente Orquestador ejecuta el ciclo completo delegando a sub-agentes especializados (Architect, Code, Debug).
- **Independiente:** El agente principal gestiona la tarea directamente con los workflows globales (`/deep-plan`, `/audit`), sin el pipeline stepwise.

La carpeta `01-brief/` actúa como un **backlog de ideas**, permitiendo acumular múltiples briefs en paralelo. La consolidación en memoria episódica (via `end.md`) es **decisión del usuario**, no automática, para poder agrupar varios PRs en una sola sesión.

Para todos los detalles, lee la [Documentación de AI Helpers](file:///home/alfonsom0/repos/cortex-md/ai-helpers/README.es.md).

## Escalabilidad Multi-Desarrollador

Al trabajar en equipos con más de un desarrollador, usar Cortex-MD por defecto puede generar conflictos de mezcla (merge conflicts) en Git en los archivos de memoria episódica (`timeline.md` y `YYYY/MM/DD.md`).

Para solucionar esto, la arquitectura puede dividirse en dos capas:
1. **Neocorteza Centralizada (Repo del Proyecto):** Memoria semántica compartida por el equipo.
2. **Hipocampo Distribuido (Repo de Memoria Personal):** Un repositorio independiente para los registros episódicos diarios de cada desarrollador.

Para instrucciones de configuración, lee la [Guía Multi-Desarrollador](file:///home/alfonsom0/repos/cortex-md/docs/multi-dev-guide.es.md).

## Cómo Contribuir

Cortex-MD es una arquitectura abierta licenciada bajo [MIT](LICENSE). Las áreas de investigación actual incluyen:

- Optimización de la taxonomía de etiquetas en `taxonomy.md`.
- Creación de scripts de automatización (Bash/Node.js) para inicializar la estructura de carpetas. _(Ya se incluye un helper opcional en Node, `sync-mcp.js`, para generar configs de MCP por IDE desde una única fuente canónica — ver [docs/mcp-sync.es.md](docs/mcp-sync.es.md).)_
- Evaluación de impacto en la retención de contexto en proyectos de más de 100k líneas de código.
- **Métricas de tokens más precisas:** `check-memory-contract.js` estima la carga fija dividiendo bytes por 4; un tokenizador real por familia de modelos mejoraría la medición.
- **Verificación de secciones citadas:** el verificador confirma que el archivo citado existe, no que la sección (`§2`) trate el tema.
- **Investigación de workflows de extensión:** Testear y refinar la metodología de Prueba de Trabajo en distintas familias de modelos (Claude, GPT, Gemini, open-source) y distintos tamaños de proyecto.

Si tienes mejoras en los prompts de los workflows, por favor abre un Pull Request o inicia una Issue para debatir el enfoque cognitivo.
