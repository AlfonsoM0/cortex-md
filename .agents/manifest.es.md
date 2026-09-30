# Manifiesto de Cortex-MD

> Qué archivos de este espacio de trabajo pertenecen al framework Cortex-MD. Todo lo demás — archivos del negocio, código, documentos propios del proyecto — es del proyecto, y el framework nunca lo mueve ni lo borra. Lo leen `defrag.md § Fase 6.5` (purga) y el agente antes de adaptar un workflow. No se carga en cada sesión.

## Instalación

- **Fecha:** _AAAA-MM-DD_ · **Idioma:** _…_ · **Herramienta y modelo:** _…_
- **Extensiones instaladas:** _ninguna (o: deep-plan, audit, commit, ai-helpers, sincronización de MCP)_
- **Última purga:** _nunca_

## Archivos

| Ruta | Categoría | En la purga |
| --- | --- | --- |
| `AGENTS.md` | uso diario (adaptado por `init`) | Se queda. Quitar los bloques que no aplican: `<!-- cortex:software-only -->` en un proyecto que no es de software; `<!-- cortex:optional:<nombre> -->` de extensiones no instaladas. |
| `.agents/workflows/start.md`, `end.md`, `maintenance.md`, `defrag.md` | uso diario | Se quedan. |
| `.agents/workflows/references/alignment-interview.md` | uso diario (re-alineación) | Se queda. |
| `.agents/check-memory-contract.js` | uso diario | Se queda. |
| `.agents/manifest.md` | uso diario | Se queda; quitar las filas purgadas. |
| `.agents/memory/` | memoria del proyecto (es del proyecto desde `init`) | Se queda; quitar solo los ejemplos de plantilla que quedaron (`<!-- cortex:example … -->`) y los placeholders sin completar. |
| `.agents/workflows/init.md` | solo instalación | **Borrar.** |
| `.cortex-tmp/` | solo instalación (temporal) | **Borrar** si quedó. |
| Archivos en un idioma que no se usa (`*.es.md` en una instalación en inglés, u originales duplicados) | variante de idioma | **Borrar.** |
| `.agents/workflows/deep-plan.md`, `audit.md`, `commit.md` | extensión (software) | Se quedan solo si se instalaron. |
| `ai-helpers/` | extensión | Se queda solo si se instaló. |
| `.agents/sync-mcp.js`, `.agents/mcp_config*.json` | extensión | Se quedan solo si se instalaron. |
| Archivos puente (`CLAUDE.md`, `.hermes.md`, `.claude/settings.json`, `.claude/hooks/session-start.json`…) | puente (creado o fusionado por `init`) | Se quedan. |
| `docs/agent-environment.md`, `docs/como-trabajar-con-tu-agente.md` | documentación del proyecto creada por `init` | Se quedan: son del proyecto. |
| `.agents/backups/` | copias del defrag (sin git) | Conservar las 3 más recientes. |
