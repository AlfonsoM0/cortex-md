# Instalación de Cortex-MD (instrucciones para el agente)

> 🌐 [Read in English (INSTALL.md)](INSTALL.md)

**Si sos un agente de IA y un usuario te pidió instalar Cortex-MD en su espacio de trabajo, seguí estos pasos.** El usuario puede no saber programar ni usar git: explicá cada paso en lenguaje simple, sin jerga, y pedí permiso antes de crear o modificar archivos.

## 1. Conseguí el framework (en una carpeta temporal)

Nunca descargues el repositorio dentro del espacio de trabajo del usuario. Usá el primer camino que funcione:

1. **Con git:** `git clone --depth 1 https://github.com/AlfonsoM0/cortex-md <carpeta-temporal>`.
2. **Sin git, con terminal:** descargá `https://github.com/AlfonsoM0/cortex-md/archive/refs/heads/main.zip` y descomprimilo en una carpeta temporal.
3. **Sin terminal:** leé cada archivo del paso 3 desde `https://raw.githubusercontent.com/AlfonsoM0/cortex-md/main/<ruta>` y crealo en el espacio de trabajo.

## 2. Elegí el idioma

Cada archivo existe en inglés (`archivo.md`) y en español (`archivo.es.md`). Usá **el idioma del usuario**:

- **Español:** copiá las versiones `.es.md` **renombrándolas sin el `.es`** (`start.es.md` → `start.md`). Los workflows se citan entre sí por esos nombres.
- **Inglés:** copiá las versiones `.md`.
- **Otro idioma:** copiá las versiones en inglés y ofrecé traducirlas, conservando los nombres de archivo.

Nunca instales las dos versiones de un mismo archivo.

## 3. Qué copiar

| Copiar | Para qué |
| --- | --- |
| `AGENTS.md` | Instrucciones base que el agente lee en cada sesión. |
| `.agents/workflows/` — `init`, `start`, `end`, `maintenance`, `defrag` y `references/alignment-interview` | El ciclo de vida de la memoria. |
| `.agents/memory/` — las plantillas de `semantic/`, `maintenance-log` y `episodic/timeline` | La memoria vacía, lista para poblar. |
| `.agents/check-memory-contract.js` | El verificador (necesita Node ≥ 18; si no hay Node, el agente revisa el contrato a mano). |

**Solo si el usuario los necesita** (explicale qué son antes de copiarlos):

- `.agents/workflows/deep-plan`, `audit` y `commit` — metodología para proyectos de software.
- `ai-helpers/` — el pipeline de desarrollo por etapas.
- `.agents/sync-mcp.js` y `.agents/mcp_config*.json` — configuración de MCP compartida entre herramientas.

**No copiar:** `README`, `INSTALL`, `LICENSE`, `docs/` (son guías del framework, no del proyecto) ni `.git/`.

## 4. No pises nada

- Si ya existe un `AGENTS.md`, **fusioná**: agregá las secciones de Cortex-MD al archivo existente y mostrale al usuario qué cambió.
- Si ya existen `.agents/` o `docs/`, agregá solo lo que falta. Ante cualquier archivo con el mismo nombre, preguntá.

## 5. Carpeta común o repositorio git

Cortex-MD funciona igual en una **carpeta común**: no hace falta git. Sin git, el defrag respalda la memoria copiándola antes de reescribir (`.agents/backups/`). Podés ofrecer activar git en una frase ("permite deshacer cualquier cambio; es opcional"), pero no lo exijas.

## 6. Limpiá y seguí con `init`

1. Borrá la carpeta temporal.
2. Conectá la herramienta del usuario para que cargue la memoria en cada sesión: la guía está en `docs/agent-bridges.md` de este repositorio (por ejemplo, Claude Code necesita un `CLAUDE.md` puente).
3. Ejecutá `.agents/workflows/init.md`: empieza con una **entrevista de alineación** con el usuario. Antes, avisale en una frase que vas a hacerle algunas preguntas sobre su proyecto y cuánto puede tardar.
