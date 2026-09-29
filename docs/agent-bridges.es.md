# Integración con las herramientas de IA

> 🌐 [Read in English (agent-bridges.md)](agent-bridges.md)

Cortex-MD es agnóstico, pero **la memoria solo funciona si cada sesión la carga**. Tres condiciones por herramienta:

1. **Lee `AGENTS.md` al iniciar** — algunas lo hacen solas; otras necesitan un archivo puente.
2. **Ejecuta `start.md` antes de responder** — una instrucción escrita se puede saltear; un hook de inicio de sesión la recuerda en cada sesión.
3. **No usa una memoria propia en paralelo** — dos memorias sobre el mismo proyecto divergen y el agente no sabe cuál creer.

## Claude Code

Claude Code carga `CLAUDE.md`, no `AGENTS.md`. Usá un `CLAUDE.md` puente que **no duplique contenido**: solo importa `AGENTS.md` y agrega lo específico de Claude.

```markdown
# Puente de contexto para Claude Code

@AGENTS.md

## Arranque de sesión (obligatorio)

Antes de responder el primer mensaje, ejecutá `.agents/workflows/start.md` en silencio.

## Memoria

La memoria del proyecto vive en `.agents/memory/`. No uses la memoria automática de Claude Code.
Al terminar una sesión ofrecé consolidar con `.agents/workflows/end.md`; el chequeo semanal
lo dispara `start.md` (`AGENTS.md § Mantenimiento automático`).
```

**Hook de inicio de sesión** (`.claude/settings.json`) — inyecta el recordatorio en cada sesión nueva, sin depender de que el modelo lea la instrucción:

```json
{
  "autoMemoryEnabled": false,
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cat \"${CLAUDE_PROJECT_DIR:-.}/.claude/hooks/session-start.json\""
          }
        ]
      }
    ]
  }
}
```

`.claude/hooks/session-start.json`:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "PROTOCOLO DE ARRANQUE: antes de responder el primer mensaje, leé AGENTS.md y ejecutá .agents/workflows/start.md. La memoria vive en .agents/memory/; no uses la memoria automática."
  }
}
```

`autoMemoryEnabled: false` desactiva la memoria automática de Claude Code para el proyecto. Revisá la documentación de tu versión por otras funciones de memoria o consolidación automática.

## Hermes Agent (arnés libre + API key)

[Hermes Agent](https://hermes-agent.nousresearch.com) no lee `AGENTS.md` de forma nativa: se rutea con un `.hermes.md` en la raíz, que tiene prioridad sobre cualquier otro archivo de contexto (Hermes carga solo el primero que encuentra). El puente no duplica contenido:

```markdown
# Puente de contexto para Hermes Agent

Como primera acción de cada sesión, leé `AGENTS.md` completo y seguí sus instrucciones;
después ejecutá `.agents/workflows/start.md` en silencio antes de responder.

La memoria del proyecto vive en `.agents/memory/`. No uses la memoria integrada de Hermes para este proyecto.
```

Además, su memoria integrada (`~/.hermes/memories/`) es paralela a la del proyecto: desactivala en `~/.hermes/config.yaml`.

```yaml
memory:
  memory_enabled: false
  user_profile_enabled: false
```

Ese archivo es global: el cambio afecta a todos los proyectos que abras con Hermes. Configurá un proveedor con prompt caching (ver `README.es.md § Entorno Recomendado`).

## Otras herramientas

| Herramienta         | Cómo carga `AGENTS.md`                                                                  |
| ------------------- | --------------------------------------------------------------------------------------- |
| **Codex CLI**       | Lo lee de forma nativa desde la raíz.                                                   |
| **Gemini CLI**      | En `.gemini/settings.json`: `{ "context": { "fileName": "AGENTS.md" } }`.               |
| **Cursor**          | Agregá `AGENTS.md` a las reglas del proyecto.                                           |
| **Aider**           | En `.aider.conf.yml`: `read: AGENTS.md`.                                                |
| **VS Code Copilot** | Referencialo desde `.github/copilot-instructions.md`.                                   |
| **Otros**           | Instruí al agente a leer `AGENTS.md` como primera acción; usá un hook si la herramienta lo admite. |

Verificá el comportamiento en tu versión: las herramientas cambian rápido. La prueba es simple: abrí una sesión nueva y preguntá qué dice `active-tasks.md` sin nombrarlo.

## Varios agentes sobre el mismo proyecto

- **Un solo agente consolida:** el que conversa con el usuario (el líder). Los ayudantes (sub-agentes, otros CLIs a los que se delega) reportan y no escriben la memoria.
- **Lo operativo no es memoria del proyecto:** cuotas, costos por ciclo o preferencias de reparto entre agentes van a un archivo propio del líder, fuera de `.agents/memory/`.
- **Configuración por agente:** cada herramienta tiene su propio archivo de MCP y de permisos. Si querés una sola fuente, ver [`mcp-sync.es.md`](mcp-sync.es.md).
- **Orquestadores con modos** (Zoo Code, Roo Code y similares): configurá sus reglas globales para que cada modo lea `AGENTS.md` y ejecute `start.md`.
