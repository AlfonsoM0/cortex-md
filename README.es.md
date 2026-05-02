# Cortex-MD: Sistema de Memoria Continua para LLMs en Repositorios de Código

Cortex-MD es un framework de memoria persistente basado íntegramente en archivos Markdown. Está diseñado para resolver la **"amnesia de sesión"** y la **"sobrecarga de contexto"** (*context bloat*) en Modelos de Lenguaje Grande (LLMs) que operan en entornos de desarrollo de software complejos (como Claude Code, Cursor, Gemini CLI, o agentes personalizados).

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

| Herramienta | Configuración |
|---|---|
| **Claude Code** | Lee `AGENTS.md` automáticamente desde la raíz. Sin configuración necesaria. |
| **Cursor** | Agrega `AGENTS.md` a las reglas del proyecto, o coloca el contenido en `.cursorrules`. |
| **Gemini CLI** | En `.gemini/settings.json`: `{ "context": { "fileName": "AGENTS.md" } }` |
| **Aider** | En `.aider.conf.yml`: `read: AGENTS.md` |
| **VS Code Copilot** | Agrega referencia en `.github/copilot-instructions.md`. |
| **Otros agentes** | Instruye al agente a leer `AGENTS.md` como su primera acción. |

### 4. Usa los workflows diarios

- **Inicio de sesión:** El agente lee `AGENTS.md` → ejecuta `start.md` → carga contexto.
- **Fin de sesión:** Dile al agente: *"Consolida memoria"* o *"Ejecuta `.agents/workflows/end.md`"*.

## Fundamentos Neurocientíficos del Sistema

Los LLMs pre-entrenados carecen de neuroplasticidad; no pueden alterar sus pesos paramétricos para recordar una conversación de ayer. Para mitigar esto, Cortex-MD estructura un "cerebro externo" (exocórtex) utilizando el sistema de archivos del repositorio:

- **Corteza Prefrontal (Ventana de Contexto):** Se mantiene limpia y enfocada estrictamente en la tarea actual.
- **Neocorteza (Memoria Semántica):** Almacena el "estado de las cosas" (arquitectura, convenciones, reglas de negocio, stack y taxonomía). No es un registro histórico, es la verdad absoluta y actual del proyecto. Se divide en múltiples archivos modulares para escalar sin generar *context bloat*.
- **Hipocampo (Memoria Episódica):** Guarda el registro diario de acciones y razonamientos (vinculado a commits de Git), indexado de manera eficiente en un timeline limitado (últimas 50 sesiones) para una rápida recuperación cuando el contexto profundo es necesario.

## Arquitectura de Directorios

Cortex-MD se integra dentro de la convención estándar `.agents/` (basada en convenciones de [Anthropic](https://docs.anthropic.com) y [AGENTS.md](https://agents.md)) para agentes de IA en repositorios. El directorio `.agents/` es un espacio escalable y estandarizado; Cortex-MD aporta la carpeta `memory/` y los workflows de ciclo de vida:

```text
/.agents/                              # Directorio estándar para agentes de IA
├── skills/                            # (Convención) Habilidades reutilizables (instrucciones + código)
│   └── ...
├── workflows/                         # Flujos de orquestación del agente
│   ├── init.md                        # ★ Cortex-MD: Bootstrap inicial ("Onboarding")
│   ├── start.md                       # ★ Cortex-MD: Inicio de sesión ("Despertar")
│   └── end.md                         # ★ Cortex-MD: Fin de sesión ("Dormir")
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
└── .mcp.json                          # (Convención) Configuración de servidores MCP local
```

Adicionalmente, `AGENTS.md` se ubica en la **raíz del repositorio**. Actúa como el punto de entrada (*system prompt*) que el IDE inyecta automáticamente al agente, y es responsable de dirigir al LLM hacia los workflows de Cortex-MD. Esto sigue el [estándar AGENTS.md](https://agents.md) adoptado por más de 60k proyectos open source y soportado por herramientas como Codex, Jules, Cursor, VS Code Copilot, y muchas más.

## Flujos de Trabajo (Workflows)

El núcleo de Cortex-MD consiste en tres workflows:

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

## Cómo Contribuir

Cortex-MD es una arquitectura abierta licenciada bajo [MIT](LICENSE). Las áreas de investigación actual incluyen:

- Optimización de la taxonomía de etiquetas en `taxonomy.md`.
- Creación de scripts de automatización (Bash/Node.js) para inicializar la estructura de carpetas.
- Evaluación de impacto en la retención de contexto en proyectos de más de 100k líneas de código.

Si tienes mejoras en los prompts de los workflows, por favor abre un Pull Request o inicia una Issue para debatir el enfoque cognitivo.
