# Cortex-MD: Sistema de Memoria Continua para LLMs en Repositorios de Código

Cortex-MD es un framework de memoria persistente basado íntegramente en archivos Markdown. Está diseñado para resolver la **"amnesia de sesión"** y la **"sobrecarga de contexto"** (_context bloat_) en Modelos de Lenguaje Grande (LLMs) que operan en entornos de desarrollo de software complejos (como Claude Code, Cursor, Gemini CLI, o agentes personalizados).

El sistema emula las estructuras de memoria del cerebro humano, separando la información en **memoria semántica** (estado global del proyecto) y **memoria episódica** (registro cronológico indexado), optimizando drásticamente el uso de tokens y previniendo alucinaciones por pérdida de contexto.

> 🌐 [Read in English (README.md)](README.md)

## ¿Por qué Cortex-MD?

- **🧠 Resuelve un problema real:** La amnesia de sesión es el dolor #1 reportado por desarrolladores que usan asistentes de código con IA. Cortex-MD proporciona una solución estructurada sin dependencias externas.
- **📦 Zero dependency:** Sin servidores, sin bases de datos, sin APIs. Solo archivos Markdown que viven en tu repositorio, versionados con Git.
- **🔄 Agnóstico del proveedor:** Funciona nativamente con Claude, GPT-4o, Gemini, o cualquier modelo local de código abierto. Cambia entre modelos sin perder la memoria del proyecto.
- **🧩 Complementa `AGENTS.md`:** No reemplaza el estándar de la industria — extiende la [convención AGENTS.md](https://agents.md) (Linux Foundation) añadiendo memoria temporal y workflows de ciclo de vida.
- **🧬 Metáfora cognitiva memorable:** Construido alrededor de conceptos neurocientíficos (Neocorteza, Hipocampo, Corteza Prefrontal) que hacen la arquitectura intuitiva y fácil de razonar.

## Inicio Rápido

### 1. Copia la estructura a tu proyecto

Copia el directorio `.agents/` y `AGENTS.md` de este repositorio a la raíz de tu proyecto:

```bash
# Clonar y copiar
git clone https://github.com/YOUR_USER/cortex-md.git /tmp/cortex-md
cp -r /tmp/cortex-md/.agents/ tu-proyecto/.agents/
cp /tmp/cortex-md/AGENTS.md tu-proyecto/AGENTS.md
```

### 2. Ejecuta el bootstrap inicial

Pide a tu agente de IA que ejecute el workflow de bootstrap para poblar la memoria semántica analizando tu codebase existente:

```
Lee y ejecuta .agents/workflows/init.md
```

### 3. Configura tu IDE

Asegúrate de que tu IDE/agente lea `AGENTS.md` automáticamente al iniciar una sesión:

| Herramienta         | Configuración                                                                          |
| ------------------- | -------------------------------------------------------------------------------------- |
| **Claude Code**     | Lee `AGENTS.md` automáticamente desde la raíz. Sin configuración necesaria.            |
| **Cursor**          | Agrega `AGENTS.md` a las reglas del proyecto, o coloca el contenido en `.cursorrules`. |
| **Gemini CLI**      | En `.gemini/settings.json`: `{ "context": { "fileName": "AGENTS.md" } }`               |
| **Aider**           | En `.aider.conf.yml`: `read: AGENTS.md`                                                |
| **VS Code Copilot** | Agrega referencia en `.github/copilot-instructions.md`.                                |
| **Otros agentes**   | Instruye al agente a leer `AGENTS.md` como su primera acción.                          |

### 4. Usa los workflows diarios

- **Inicio de sesión:** El agente lee `AGENTS.md` → ejecuta `start.md` → carga contexto.
- **Fin de sesión:** Dile al agente: _"Consolida memoria"_ o _"Ejecuta `.agents/workflows/end.md`"_.

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
│   ├── start.md                       # ★ Core: Inicio de sesión ("Despertar")
│   ├── end.md                         # ★ Core: Fin de sesión ("Dormir")
│   ├── defrag.md                      # ★ Core: Optimización de memoria ("Defrag")
│   ├── deep-plan.md                   # ★ Extensión: Planificación profunda con Prueba de Trabajo
│   └── audit.md                       # ★ Extensión: Auditoría post-feature con evidencia
├── memory/                            # ★ Cortex-MD: Sistema de memoria persistente
│   ├── semantic/                      #   Neocorteza: Estado global del proyecto
│   │   ├── taxonomy.md                #     Taxonomía estricta de etiquetas para el índice
│   │   ├── architecture.md            #     Patrones de diseño y estructura de módulos
│   │   ├── stack.md                   #     Tecnologías, librerías y dependencias clave
│   │   ├── conventions.md             #     Convenciones de código y estilo
│   │   ├── business-rules.md          #     Lógica de negocio y reglas del dominio
│   │   └── active-tasks.md            #     Memoria de trabajo: tareas en curso
│   └── episodic/                      #   Hipocampo: Registro cronológico indexado
│       ├── timeline.md                #     Índice de búsqueda rápida por [Tags] (máx. 50 sesiones)
│       └── YYYY/
│           └── MM/
│               └── DD.md              #     Registro detallado de la sesión (archivos, commits, decisiones)
├── .mcp.json                          # (Convención) Configuración de servidores MCP local
├── ai-helpers/                        # ★ Cortex-MD: Módulo Pipeline de Ejecución Stepwise
└── docs/                              # ★ Cortex-MD: Guías y documentación
```

Adicionalmente, `AGENTS.md` se ubica en la **raíz del repositorio**. Actúa como el punto de entrada (_system prompt_) que el IDE inyecta automáticamente al agente, y es responsable de dirigir al LLM hacia los workflows de Cortex-MD. Esto sigue el [estándar AGENTS.md](https://agents.md) adoptado por más de 60k proyectos open source y soportado por herramientas como Codex, Jules, Cursor, VS Code Copilot, y muchas más.

## Flujos de Trabajo (Workflows)

Cortex-MD provee **cuatro workflows core** (el ciclo de vida de la memoria) y **dos workflows de extensión** (metodología de desarrollo):

### 0. Bootstrap inicial: `init.md`

Se ejecuta una sola vez al adoptar Cortex-MD en un proyecto existente. El LLM analiza el codebase y puebla todos los archivos de memoria semántica automáticamente.

### 1. El ciclo de "Despertar": `start.md`

Cuando inicias una nueva sesión, el LLM lee `.agents/workflows/start.md` y realiza un RAG (Retrieval-Augmented Generation) manual y eficiente:

- **Paso 1 (Lectura Semántica):** Siempre lee `architecture.md` y `stack.md` como baseline obligatorio. Carga selectivamente `conventions.md`, `business-rules.md` y `taxonomy.md` según la tarea.
- **Paso 2 (Enrutamiento Hipocampal):** Escanea `episodic/timeline.md` buscando etiquetas (ej. `[Auth]`, `[UI]`, `[DB]`) relacionadas con el objetivo actual.
- **Paso 3 (Recuperación Episódica):** Solo si encuentra coincidencias relevantes, abre los archivos diarios (`YYYY/MM/DD.md`) correspondientes para recuperar el razonamiento previo y hashes de commits.

### 2. El ciclo de "Sueño y Consolidación": `end.md`

Al finalizar tu sesión de código, el LLM consolida la memoria a largo plazo:

- **Generación Episódica:** Crea el archivo del día (`DD.md`) con un template estructurado documentando archivos modificados, hashes de commits, decisiones técnicas y resolución de errores.
- **Actualización del Índice:** Añade una entrada etiquetada a `timeline.md` (máx. 50 sesiones). Las etiquetas provienen estrictamente de `taxonomy.md`.
- **Consolidación Semántica (Crítico):** Evalúa si las acciones de hoy alteraron la arquitectura, reglas o convenciones globales. De ser así, sobrescribe el archivo semántico correspondiente.
- **Vaciado de Memoria de Trabajo:** Actualiza `active-tasks.md` para la próxima sesión.
- **Enrutamiento de Conocimiento:** Si se descubrió un nuevo patrón o solución a un bug, lo enruta al archivo correcto (memoria semántica, skill o docs) en vez de inflar `AGENTS.md`.
- **Sincronización de Planificación (Opcional):** Si el proyecto tiene un roadmap o documento de planificación maestro, lo actualiza para reflejar hitos completados o nuevos pasos.

### 3. Desfragmentación de Memoria: `defrag.md`

Se ejecuta bajo demanda cuando el usuario detecta que los archivos de memoria han crecido con redundancias, ineficiencias de formato o inconsistencias entre archivos. Es análogo a la desfragmentación de disco — reorganizar datos para un rendimiento óptimo sin perder información.

- **Puerta de Seguridad:** Advierte al usuario y requiere confirmación explícita de que un modelo de razonamiento de alta capacidad está activo.
- **Inventario Completo:** Lee toda la memoria semántica y los registros episódicos recientes para construir una imagen completa.
- **Compresión Semántica:** Reescribe cada archivo semántico para un consumo óptimo de tokens — listas densas sobre prosa, voz imperativa, cero palabras de relleno.
- **Optimización Episódica:** Audita el timeline por inflación de etiquetas y aplica el límite de 50 sesiones.
- **Validación Cruzada:** Detecta contradicciones y desalineaciones entre `architecture.md`, `stack.md`, `conventions.md` y `business-rules.md`.
- **Reporte de Defrag:** Presenta un resumen de todos los cambios para revisión del usuario.

> **Cuándo ejecutarlo:** Cada 15-20 sesiones, o cuando los archivos de memoria semántica crezcan más allá de lo razonable para la complejidad del proyecto. El workflow es idempotente — ejecutarlo sobre memoria ya optimizada no produce cambios.

## Workflows de Extensión: Modos de Ejecución Adaptativos

Mientras los cuatro workflows core gestionan el ciclo de vida de la memoria, Cortex-MD también provee **workflows de extensión** que se adaptan a las capacidades del modelo que los ejecuta. Resuelven dos problemas simultáneamente:

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

### 4. Planificación Profunda: `deep-plan.md`

Un workflow de planificación estructurada con tres fases (Descubrimiento → Restricciones → Partición) que adapta su rigor:

- **`strict`:** Resultados de búsqueda impresos, puertas bloqueantes entre fases, etapas de máx 3-5 archivos.
- **`standard`:** Resúmenes consolidados, sin puertas bloqueantes, etapas de hasta 8-10 archivos.
- **`autonomous`:** Análisis holístico, fases pueden combinarse, planes monolíticos permitidos si se justifican.

> **Cuándo usarlo:** Antes de implementar cualquier funcionalidad que abarque más de 3 archivos o cruce límites entre módulos.

### 5. Auditoría Post-Feature: `audit.md`

Un workflow de validación basado en evidencia con seis fases (Inventario → Modularidad → Redundancia → Convenciones → Validación Técnica → Reporte):

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
- Creación de scripts de automatización (Bash/Node.js) para inicializar la estructura de carpetas.
- Evaluación de impacto en la retención de contexto en proyectos de más de 100k líneas de código.
- **Métricas de tokens para defrag:** Agregar un conteo estimado de tokens (antes vs. después) al reporte de desfragmentación ayudaría a los usuarios a cuantificar el impacto de la optimización. Esto podría implementarse como una fase opcional en `defrag.md`.
- **Investigación de workflows de extensión:** Testear y refinar la metodología de Prueba de Trabajo en distintas familias de modelos (Claude, GPT, Gemini, open-source) y distintos tamaños de proyecto.

Si tienes mejoras en los prompts de los workflows, por favor abre un Pull Request o inicia una Issue para debatir el enfoque cognitivo.
