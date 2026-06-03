Como agente orquestador, ejecutá tus tareas siguiendo rigurosamente los pasos a continuación.

## 0. Preparación y Verificación

Confirmá que el plan de desarrollo refinado (`ai-helpers/idea-development/02-breakdown.es.md`) está completo y aprobado por el usuario. Revisá el archivo para asegurar que todas las correcciones pendientes fueron incorporadas. Si el plan no está listo, notificalo antes de proceder.

## 1. Iteración por cada PR

Para el PR actual (iniciando con PR 1):

**a. Fase de Arquitectura (agente Architect):**
- Indicale al agente Architect que ejecute, en secuencia, los generadores:
  - `ai-helpers/generators/02-generate-spec.es.md`
  - `ai-helpers/generators/03-generate-prompt.es.md`
- Esperá a que el proceso del agente Architect concluya completamente antes de avanzar.

**b. Fase de Implementación (agente Code):**
- Indicale al agente Code que ejecute las indicaciones contenidas en `ai-helpers/idea-development/04-prompt.es.md` para el PR actual.
- Esperá a que el agente Code confirme la finalización antes de avanzar.

## 2. Ciclo de PRs

Al completar el paso 1, avanzá al siguiente PR del plan. Repetí esta iteración hasta que se hayan completado todos los PRs del breakdown.

## 3. PR Final: Validación con agente Debug

Cuando se haya completado el último PR del plan, invocá al agente Debug para realizar una revisión exhaustiva. Su objetivo es confirmar que no existen problemas, fallos ni regresiones.

- Si Debug detecta problemas: generá un resumen detallado de hallazgos a solucionar. Pasá esos hallazgos al agente Code para que implemente las soluciones. Una vez que Code termine, volvé a invocar a Debug. Repetí este ciclo hasta que Debug confirme que todo está correcto.

## 4. Manejo de Errores durante el Proceso

Durante cualquier etapa, si recibís feedback de errores:

1. Pedile al agente Debug que genere un resumen con los hallazgos a solucionar.
2. Pasá esos hallazgos al agente Code para que repare el código.
3. Una vez resuelta la incidencia, reanudá el flujo normal desde donde se detuvo, **sin saltar pasos**. Si en el PR X se detecta un error, corregí ese PR antes de avanzar al PR X+1.

## 5. Quality Assurance Final

Invocá al agente Architect para que escriba en el archivo `ai-helpers/QA-notes.es.md` una lista de acciones de QA manual para validar el correcto funcionamiento de la implementación. Las acciones deben ser:

- Claras y detalladas.
- Ordenadas lógicamente para facilitar su ejecución por un tester humano.
- Citando para cada acción el PR específico al que corresponde.
- Incluyendo un espacio para que el tester pueda añadir comentarios o resultados.

## Reglas Críticas

- **Nutrición de contexto:** Tus agentes invocados nacen sin memoria del proyecto. Debés nutrirlos con el contexto relevante obtenido de la memoria semántica, skills y workflows del proyecto, para asegurar una correcta implementación.
- **Comunicación estructurada:** Informá el avance después de cada PR completado y confirmá la finalización exitosa del proceso.
- **Desacople de contexto:** Los prompts pasados a sub-agentes NO deben contener referencias a `AGENTS.md` ni a ningún archivo dentro de `.agents/`. El contexto global ya está cargado por el sistema.
