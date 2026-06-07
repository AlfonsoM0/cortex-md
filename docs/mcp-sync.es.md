# Sync de MCP Multi-IDE (Módulo Opcional)

> 🌐 [Read in English (mcp-sync.md)](mcp-sync.md)

El core de Cortex-MD es **Markdown zero-dependency**. Esta página documenta un helper **opcional** y separable para proyectos que usan servidores [MCP](https://modelcontextprotocol.io) en varios IDEs y se cansaron de mantener a mano un archivo de config por herramienta.

## El problema

Cada IDE agéntico espera su config de MCP en un archivo y forma distintos:

| IDE         | Archivo            | Forma                                     |
| ----------- | ------------------ | ----------------------------------------- |
| Zoo Code    | `.zoo/mcp.json`    | `{ "mcpServers": { ... } }`               |
| VS Code     | `.vscode/mcp.json` | `{ "servers": { ..., "type": "stdio" } }` |
| Claude Code | `.mcp.json`        | `{ "mcpServers": { ... } }`               |

Mantenerlos a mano produce drift: un servidor agregado en un IDE se olvida en otro.

## El patrón: config canónica + overrides por IDE

Mantené **una sola fuente de verdad** y generá el resto:

- `.agents/mcp_config.json` — la lista canónica de servidores (`mcpServers`).
- `.agents/mcp_config.<ide>-overrides.json` — deltas opcionales por IDE (ej. `alwaysAllow`, `disabled`, `type`) que se mergean sobre la base, por servidor.
- `.agents/sync-mcp.js` — lee lo anterior y escribe el archivo de cada IDE.

```bash
node .agents/sync-mcp.js
# ✓ .zoo/mcp.json synced
# ✓ .vscode/mcp.json synced
```

Agregar un nuevo IDE destino son ~5 líneas en `sync-mcp.js` (un loop de merge + un `write(...)`).

## Seguridad & .gitignore

- **Nunca commitees secretos reales** en `mcp_config.json`. Usá placeholders (`<YOUR_TOKEN_HERE>`) o variables de entorno (`"AUTH_HEADER": "Bearer ${MY_TOKEN}"`) resueltas por el IDE.
- Los archivos **generados** suelen contener rutas específicas de la máquina o tokens inyectados. Agregalos a `.gitignore`:

```gitignore
.zoo/mcp.json
.vscode/mcp.json
```

Commiteá solo la `mcp_config.json` canónica (con placeholders) y los archivos de overrides.

## Cuándo omitirlo

Si tu proyecto usa un solo IDE, o no usa servidores MCP, ignorá este módulo por completo — no es parte del ciclo de vida de la memoria de Cortex-MD.
