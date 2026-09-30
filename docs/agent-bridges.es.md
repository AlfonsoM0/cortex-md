# Integración con las herramientas de IA

> 🌐 [Read in English (agent-bridges.md)](agent-bridges.md)

Cortex-MD es agnóstico, pero **la memoria solo funciona si cada sesión la carga**. Tres condiciones por herramienta:

1. **Lee `AGENTS.md` al iniciar** — algunas lo hacen solas; otras necesitan un archivo puente.
2. **Ejecuta `start.md` antes de responder** — una instrucción escrita se puede saltear; un hook de inicio de sesión la recuerda en cada sesión.
3. **No usa una memoria propia en paralelo** — dos memorias del mismo proyecto divergen y el agente no sabe cuál creer. Si la memoria de la herramienta no se puede desactivar, restringila a preferencias personales (la **regla de convivencia**, más abajo).

**Caso base: una persona, un LLM, una herramienta.** `init` configura solo la herramienta con la que trabaja el usuario. Si algún día cambia de herramienta, le pide a la nueva que conecte Cortex-MD con esta guía.

**Las herramientas cambian rápido.** Cada sección dice cuándo se verificó. Si pasaron más de 90 días, o lo que observás no coincide, buscá la documentación oficial de la herramienta antes de configurar, y registrá el resultado en `docs/agent-environment.md` del proyecto.

## Perfiles

| Perfil | Herramientas | Modelo |
| --- | --- | --- |
| **Gestión** (documentos, planillas, proveedores, clientes) | Claude Cowork · ChatGPT Work | El de mayor razonamiento del servicio |
| **Desarrollo** (código) | Claude Code · Codex · Antigravity | El de mayor razonamiento del servicio |
| **Avanzado / código abierto** | Hermes Agent + API key de cualquier proveedor (p. ej. DeepSeek) | Depende del proveedor |

Claude Code y Claude Cowork son el mismo servicio en dos formas de uso; lo mismo Codex y ChatGPT Work. El agente recomienda la forma que corresponde al trabajo, sin exigirla.

**Cambiar el modelo** (la instalación y el defrag piden el más capaz): en las CLIs, normalmente el comando `/model` (Claude Code, Codex); en las apps de escritorio (Claude Cowork, ChatGPT Work), el selector de modelo junto al cuadro de mensaje; en Antigravity, su configuración (`agy models` lista los disponibles); en Hermes, la configuración de proveedor y modelo. Las interfaces cambian: verificalo en la documentación de la herramienta antes de indicárselo al usuario.

**Regla de convivencia** (para herramientas cuya memoria no se puede desactivar) — agregala al puente o a las instrucciones de la herramienta:

```markdown
La memoria del proyecto vive en `.agents/memory/` (Cortex-MD). Usá tu propia memoria solo para
las preferencias personales del usuario; nunca para el estado, las reglas o las tareas de este proyecto.
```

## Claude — Code y Cowork

_Verificado: 2026-09 · [Memoria de Claude Code](https://code.claude.com/docs/en/memory) · [Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)._

Las dos formas cargan `CLAUDE.md`, no `AGENTS.md`. Usá un `CLAUDE.md` puente que **no duplica contenido**: importa `AGENTS.md` y agrega la instrucción de arranque. La segunda línea cubre el caso en que la importación no esté soportada.

```markdown
# Puente de contexto para Claude

@AGENTS.md

Si el contenido de `AGENTS.md` no aparece arriba, leé primero `AGENTS.md` completo.

## Arranque de sesión (obligatorio)

Antes de responder el primer mensaje, ejecutá en silencio `.agents/workflows/start.md`.

## Memoria

La memoria del proyecto vive en `.agents/memory/` (Cortex-MD). Usá la memoria propia de Claude solo
para las preferencias personales del usuario, nunca para el estado, las reglas o las tareas del proyecto.
Al terminar una sesión, ofrecé consolidar con `.agents/workflows/end.md`.
```

### Claude Code

**Configuración** (`.claude/settings.json`; si existe, fusioná — no reemplaces): desactivá la auto-memoria y la consolidación automática, e inyectá el recordatorio de arranque con un hook.

```json
{
  "autoMemoryEnabled": false,
  "autoDreamEnabled": false,
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cat \"${CLAUDE_PROJECT_DIR:-.}/.claude/hooks/session-start.json\"",
            "statusMessage": "Cargando la memoria del proyecto (AGENTS.md + start.md)..."
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
    "additionalContext": "PROTOCOLO DE ARRANQUE: antes de responder el primer mensaje, leé AGENTS.md y ejecutá .agents/workflows/start.md. La memoria vive en .agents/memory/; no uses la auto-memoria."
  }
}
```

### Claude Cowork

- **Contexto:** Cowork lee el `CLAUDE.md` de la carpeta elegida al empezar cada tarea: usá el mismo puente. No tiene hooks, así que la instrucción de arranque vive en el puente.
- **Memoria:** los proyectos de Cowork tienen memoria automática propia, y la documentación no muestra cómo desactivarla. El párrafo de Memoria del puente ya aplica la **regla de convivencia**: no hay que agregar nada.
- **Acceso:** Cowork solo lee y escribe la carpeta conectada; por eso la instalación descarga el framework en `.cortex-tmp/` dentro de la carpeta.
- **Tareas programadas:** no tienen un final natural: si una debe actualizar la memoria, su prompt termina con _"consolidá con `.agents/workflows/end.md`"_.

## OpenAI — Codex y ChatGPT Work

_Verificado: 2026-09 · [AGENTS.md en Codex](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [Memorias](https://learn.chatgpt.com/docs/customization/memories.md)._

### Codex (CLI, app, extensión del IDE)

- **Contexto:** lee `AGENTS.md` de forma nativa (de la raíz y del directorio de trabajo). Con prompts triviales puede no ejecutar `start.md`; con tareas reales sigue `AGENTS.md`.
- **Memoria:** las memorias locales vienen **apagadas por defecto**. Si el usuario las activó, desactivalas con `[features] memories = false`.
- 🔴 **Trampa:** el `.codex/config.toml` del proyecto solo se lee si el proyecto figura como confiable en el `~/.codex/config.toml` global (`[projects."<ruta>"] trust_level = "trusted"`); si no, se **ignora en silencio**. Las claves que Codex no reconoce también se ignoran sin error.

### ChatGPT Work

- **Contexto:** trabaja sobre una carpeta local. Que lea `AGENTS.md` **no está confirmado** por la documentación oficial: verificalo con la prueba del final de esta guía. Si no lo lee, agregá a las instrucciones del proyecto: _"Al empezar cada tarea, leé `AGENTS.md` y seguilo."_
- **Memoria:** usa la memoria de la cuenta de ChatGPT (no una local): aplicá la **regla de convivencia**.

## Google Antigravity

_Verificado: 2026-09 (medido con `agy` 1.2)._

- **Contexto:** lee `AGENTS.md` de forma nativa; no lee la configuración de otras herramientas.
- **Memoria:** un `~/.gemini/GEMINI.md` global acumula "Gemini Added Memories" de todos los proyectos: aplicá la **regla de convivencia** y no consolides ahí.
- **Workflows:** Antigravity ejecuta workflows en Markdown como comandos con barra desde `.agent/workflows/` (en algunas versiones, `.agents/workflows/`). Si lista `/start`, `/end` o `/defrag`, son los workflows de Cortex-MD: sirven como atajos.

## Hermes Agent (avanzado: arnés libre + API key)

_Verificado: 2026-09 · [Archivos de contexto](https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files) · [DeepSeek + Hermes](https://api-docs.deepseek.com/quick_start/agent_integrations/hermes)._

Para usuarios avanzados: se configura a mano y corre con la API key de cualquier proveedor. Hermes carga **un solo** archivo de contexto del proyecto, el primero que encuentra: `.hermes.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules`. Usá un puente `.hermes.md`: tiene prioridad y agrega la instrucción de arranque; como reemplaza la carga de `AGENTS.md`, el puente ordena leerlo.

```markdown
# Puente de contexto para Hermes Agent

Como primera acción de cada sesión, leé `AGENTS.md` completo y seguí sus instrucciones;
después ejecutá `.agents/workflows/start.md` en silencio antes de responder.

La memoria del proyecto vive en `.agents/memory/`. No uses la memoria integrada de Hermes para este proyecto.
```

Su memoria integrada (`~/.hermes/memories/`) es paralela a la del proyecto: desactivala en `~/.hermes/config.yaml`. Ese archivo es global — el cambio afecta a todos los proyectos que se abran con Hermes —, así que pedí permiso antes.

```yaml
memory:
  memory_enabled: false
  user_profile_enabled: false
```

- **Proveedor:** elegí uno con prompt caching; sin él, cada turno paga el contexto completo. DeepSeek, por ejemplo, se agrega con una API key (`DEEPSEEK_API_KEY`) y aplica caché de contexto automáticamente (verificalo en su página de precios).
- **Canales de mensajería** (WhatsApp, Telegram): una conversación nunca "termina"; pedí explícitamente el cierre con _"guardemos lo aprendido"_ al final de cada bloque de trabajo.

## Otras herramientas

| Herramienta | Cómo carga `AGENTS.md` |
| --- | --- |
| **Gemini CLI** | En `.gemini/settings.json`: `{ "context": { "fileName": "AGENTS.md" } }`. |
| **Cursor** | Agregá `AGENTS.md` a las reglas del proyecto. |
| **Aider** | En `.aider.conf.yml`: `read: AGENTS.md`. |
| **VS Code Copilot** | Referencialo desde `.github/copilot-instructions.md`. |
| **Otros** | Instruí al agente a leer `AGENTS.md` como primera acción; usá un hook si la herramienta lo admite. |

## Buenos hábitos: sesiones y contexto

La memoria se guarda a partir de lo que la conversación todavía recuerda. Si la herramienta compacta el contexto (lo resume para seguir), se pierden detalles antes de que `end.md` pueda guardarlos. Enseñale al usuario:

- **Una tarea por sesión**, y cerrar con _"guardemos lo aprendido"_ antes de que la conversación se alargue demasiado.
- Si la herramienta avisa que el contexto está lleno o que va a compactarlo, **cerrar y empezar una sesión nueva**.
- En canales sin final natural (mensajería, tareas programadas), **pedir explícitamente** el cierre.

## Prueba de verificación

Abrí una sesión nueva y preguntá, sin nombrar el archivo: _"¿Cuál es la primera tarea pendiente?"_ Si el agente responde con el contenido de `active-tasks.md`, la memoria está cargada.

## Varios agentes o varias personas

El caso base es un LLM y una herramienta. Se pueden configurar varios proveedores y **usarlos de a uno** con la misma memoria. Trabajar en paralelo requiere orquestación — un agente líder que delega y es el único que consolida — y varias personas compartiendo una memoria generan conflictos en el episódico. Las dos cosas son complejas y quedan fuera del alcance de Cortex-MD.
