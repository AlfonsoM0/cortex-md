# Generador: Brief → Breakdown

## Entrada

Leé los archivos disponibles dentro de la carpeta `ai-helpers/idea-development/01-brief/`.

- Si el usuario indicó explícitamente cuál brief trabajar, usá ese archivo.
- Si hay **un solo archivo** en la carpeta, usalo directamente.
- Si hay **múltiples archivos**, presentá la lista al usuario y preguntale cuál quiere procesar antes de continuar.

## Proceso

Desarrollá un plan de ejecución siguiendo el flujo `.agents/workflows/deep-plan.es.md`
en modo **standard**. El plan debe:

1. Descomponer el brief en PRs lógicos y atómicos.
2. Estructurar cada PR como un elemento con checkbox (`- [ ]`) para seguimiento tipo Kanban.
3. Ordenar los PRs por dependencia (cimientos primero, integraciones al final).
4. Incluir un PR final de auditoría.

## Salida

Escribí el plan completo en `ai-helpers/idea-development/02-breakdown.es.md`.
