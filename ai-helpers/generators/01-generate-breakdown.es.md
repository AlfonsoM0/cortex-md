# Generador: Brief → Breakdown

## Entrada
Lee el brief del usuario en `ai-helpers/idea-development/01-brief.es.md`.

## Proceso
Desarrolla un plan de ejecución siguiendo el flujo `.agents/workflows/deep-plan.es.md` 
en modo **standard**. El plan debe:

1. Descomponer el brief en PRs lógicos y atómicos.
2. Estructurar cada PR como un elemento con checkbox (`- [ ]`) para seguimiento tipo Kanban.
3. Ordenar los PRs por dependencia (cimientos primero, integraciones al final).
4. Incluir un PR final de auditoría.

## Salida
Escribe el plan completo en `ai-helpers/idea-development/02-breakdown.es.md`.
