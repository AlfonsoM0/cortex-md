# Generador: Spec → Prompt de Delegación

## Entrada
Lee el micro-plan en `ai-helpers/idea-development/03-spec.es.md`.

## Proceso
Genera un prompt de delegación para el agente orquestador. El prompt debe contener:

1. Una explicación de contexto indicando qué PRs ya han sido completados 
   (referencia `ai-helpers/idea-development/02-breakdown.es.md` para el estado actual).
2. Una instrucción para ejecutar el micro-plan en `ai-helpers/idea-development/03-spec.es.md`.
3. Cualquier referencia a flujos de trabajo específicos del dominio que sean relevantes 
   para la tarea (ej., guías UX/UI si el PR involucra frontend).

## Regla Crítica: Desacople de Contexto
El prompt NO DEBE contener referencias a `AGENTS.md` ni a ningún archivo dentro de `.agents/`.
El contexto global ya está disponible para el sub-agente: ya sea vía el prompt del sistema de su IDE, vía archivos de reglas inyectados por la herramienta de orquestación, o vía `orchestator-memory.md`. Duplicarlo en el prompt genera sobrecarga de contexto y distrae al modelo de la ejecución pura de código.

## Salida
Escribe el prompt de delegación en `ai-helpers/idea-development/04-prompt.es.md`.
