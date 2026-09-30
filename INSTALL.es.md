# Instalación de Cortex-MD (instrucciones para el agente)

> 🌐 [Read in English (INSTALL.md)](INSTALL.md)

**Si sos un agente de IA y un usuario te pidió instalar Cortex-MD en su espacio de trabajo, seguí estos pasos.** Asumí el peor caso: el usuario puede no saber qué es un LLM, un arnés o git, ni cómo describir lo que necesita. Explicá cada paso en lenguaje simple, sin jerga, y pedí permiso antes de crear o modificar archivos.

El espacio de trabajo es la carpeta que el usuario eligió para vos — normalmente la carpeta de su negocio o proyecto. Cortex-MD vive junto a sus archivos (`AGENTS.md`, `.agents/`, `docs/`) y **nunca mueve, renombra ni edita los archivos propios del usuario**.

## 0. Antes de empezar: identificate y verificá el modelo

La instalación define la calidad de toda la memoria futura, así que conviene hacerla con el modelo más capaz de tu servicio.

1. **Identificate:** la herramienta en la que estás corriendo (Claude Code, Claude Cowork, Codex, ChatGPT Work, Antigravity, Hermes Agent…), su proveedor y el modelo activo. Tu system prompt suele decirlo; si no, consultalo en la herramienta o preguntale al usuario.
2. **Investigá cuáles son hoy los modelos de mayor razonamiento de TU proveedor** en su documentación oficial. Los modelos cambian cada pocos meses: no te apoyes en una lista fija. Ejemplos solo ilustrativos: Claude → Opus; ChatGPT/Codex → sus modelos de razonamiento más altos; Antigravity → el Gemini de mayor razonamiento; Hermes → depende del proveedor de la API key. Sin acceso web, usá lo que sabés de vos mismo y aclaralo ("según mi conocimiento, que puede estar desactualizado").
3. Si el modelo activo no es uno de esos, mostrá este aviso y explicá **cómo cambiarlo en esta herramienta**:

   > ⚠️ La instalación define la calidad de toda tu memoria futura, así que conviene hacerla con el modelo más capaz de tu servicio: **<modelo investigado>**. En <herramienta> se cambia en <dónde>. ¿Lo cambiamos o seguimos con el actual?

4. **Nunca recomiendes cambiar de proveedor** para instalar. Si el usuario no puede o no quiere cambiar, seguí: `init` registra el modelo usado y el defrag post-instalación (con el modelo avanzado) lo compensa.

## 1. Conseguí el framework (en `.cortex-tmp/`)

Algunas herramientas (Claude Cowork, ChatGPT Work) solo acceden a la carpeta elegida y pueden no tener git. Descargá en una carpeta temporal **dentro** del espacio de trabajo, `.cortex-tmp/framework/`; `init` la borra al final. Usá el primer camino que funcione:

1. **Con git:** `git clone --depth 1 https://github.com/AlfonsoM0/cortex-md .cortex-tmp/framework`.
2. **Sin git, con terminal:** descargá `https://github.com/AlfonsoM0/cortex-md/archive/refs/heads/main.zip` y descomprimilo en `.cortex-tmp/framework`.
3. **Sin terminal:** leé cada archivo del paso 3 desde `https://raw.githubusercontent.com/AlfonsoM0/cortex-md/main/<ruta>` con tu herramienta web y crealo directamente en el espacio de trabajo. Cuando `init` necesite `docs/agent-bridges.es.md`, leelo desde esa misma URL.

Si el espacio de trabajo usa git, no commitees `.cortex-tmp/`.

## 2. Elegí el idioma

Cada archivo existe en inglés (`archivo.md`) y en español (`archivo.es.md`). Usá **el idioma del usuario**:

- **Español:** copiá las versiones `.es.md` **renombrándolas sin el `.es`** (`start.es.md` → `start.md`). Los workflows se citan entre sí por esos nombres.
- **Inglés:** copiá las versiones `.md`.
- **Otro idioma:** copiá las versiones en inglés y ofrecé traducirlas, conservando los nombres de archivo.

Nunca instales las dos versiones de un mismo archivo.

## 3. Qué copiar: solo el núcleo

| Copiar | Para qué |
| --- | --- |
| `AGENTS.md` | Instrucciones base que el agente lee en cada sesión. |
| `.agents/workflows/` — `init`, `start`, `end`, `maintenance`, `defrag` y `references/alignment-interview` | El ciclo de vida de la memoria. |
| `.agents/memory/` — las plantillas de `semantic/`, `maintenance-log` y `episodic/timeline` | La memoria vacía, lista para poblar. |
| `.agents/manifest.md` | Qué archivos son del framework y qué hace la purga post-instalación con cada uno. |
| `.agents/check-memory-contract.js` | El verificador (necesita Node ≥ 18; sin Node, el agente revisa el contrato a mano). |

**Las extensiones no se copian ahora.** `init` las ofrece solo cuando tienen sentido:

- **Proyecto de programación:** `deep-plan`, `audit` y `commit` (metodología de desarrollo), explicados en una línea cada uno.
- **Solo si el usuario los pide:** `ai-helpers/` (pipeline de desarrollo por etapas) y el módulo de sincronización de MCP (`sync-mcp.js`, `mcp_config*.json`).

**No copiar:** `README`, `INSTALL`, `LICENSE`, el `docs/` de este repositorio (guías del framework, no documentación del proyecto) ni `.git/`.

## 4. No pises nada

- **Ya existe un `AGENTS.md`:** fusioná — agregá las secciones de Cortex-MD al archivo existente y mostrale al usuario qué cambió.
- **Ya existen archivos puente o de configuración de la herramienta** (`CLAUDE.md`, `.hermes.md`, `.claude/settings.json`, `.codex/config.toml`…): leelos primero y fusioná. En JSON, combiná claves y agregá a los arreglos como `hooks.SessionStart`; nunca reemplaces el archivo. Mostrale el diff al usuario.
- **La configuración global del usuario** (`~/.codex/`, `~/.hermes/`, `~/.gemini/`…) afecta a todos sus proyectos: leela antes de escribir y pedí permiso para cada cambio.
- **Ya existen `.agents/` o `docs/`:** agregá solo lo que falta. Ante cualquier archivo con el mismo nombre, preguntá.

## 5. Carpeta común o repositorio git

Cortex-MD funciona igual en una **carpeta común**: no hace falta git. Sin git, el defrag respalda la memoria copiándola antes de reescribir (`.agents/backups/`). Podés ofrecer activar git en una frase ("permite deshacer cualquier cambio; es opcional"), pero no lo exijas.

## 6. Seguí con `init`

Avisale al usuario en una frase que ahora le vas a hacer algunas preguntas sobre su proyecto, y cuánto tarda aproximadamente la parte esencial (20-40 minutos). Después ejecutá `.agents/workflows/init.md`.

**Todavía no borres `.cortex-tmp/`:** `init` usa la guía de puentes que contiene y guarda ahí sus notas de la entrevista; borra la carpeta cuando la instalación está completa.
