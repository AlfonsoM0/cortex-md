# Workflow: Inicio de Sesión (Despertar Cognitivo)

**Contexto del Sistema:** Eres un agente de IA operando en este repositorio. Acabas de iniciar una nueva sesión de trabajo y tu contexto actual está vacío. Para evitar alucinaciones, errores arquitectónicos y pérdida de continuidad, DEBES ejecutar los siguientes pasos de recuperación de memoria en el orden exacto antes de escribir código o responder al usuario.

## Fase 1: Carga de Memoria Semántica (Estado Global)

Tu primera tarea es entender "dónde estás" y "cuáles son las reglas".

1. **Baseline obligatorio — LEE SIEMPRE estos dos archivos:**
   - `.agents/memory/semantic/architecture.md` — Para entender la estructura del sistema.
   - `.agents/memory/semantic/stack.md` — Para conocer las tecnologías en uso.
2. **Carga selectiva — Lee estos si son relevantes para la tarea del usuario:**
   - `.agents/memory/semantic/conventions.md` — Si vas a escribir o modificar código.
   - `.agents/memory/semantic/business-rules.md` — Si la tarea involucra lógica de dominio o flujos de negocio.
   - `.agents/memory/semantic/taxonomy.md` — Si necesitarás buscar o actualizar el timeline episódico.
3. **Lee el archivo:** `.agents/memory/semantic/active-tasks.md`
   - **Objetivo:** Cargar en tu memoria de trabajo las tareas que quedaron pendientes de la sesión anterior y el objetivo inmediato.
4. **Opcional — brújula del proyecto:** Si el proyecto mantiene un roadmap maestro (ej. `docs/00-MASTER-ROADMAP.md`), leelo para entender la fase de desarrollo actual.

## Fase 2: Enrutamiento Hipocampal (Búsqueda de Contexto)

Analiza la solicitud inicial que te ha dado el usuario para esta sesión. Extrae mentalmente los dominios clave (ej. Autenticación, Base de Datos, Interfaz de Usuario, Pagos).

1. **Lee el archivo:** `.agents/memory/episodic/timeline.md`
   - **Objetivo:** Escanear el índice histórico buscando exclusivamente las etiquetas (`[Tags]`) que coincidan con los dominios de tu tarea actual.
   - **Regla estricta:** No leas todo el historial, haz una búsqueda visual (*pattern matching*) de las etiquetas relevantes.
   - **Regla de omisión:** Ignorá las entradas etiquetadas exclusivamente con `[CortexMD]` — son sesiones de mantenimiento de memoria y no contienen contexto relevante para el proyecto.

## Fase 3: Recuperación Episódica Selectiva (Deep Context)

Si en la Fase 2 encontraste fechas en el `timeline.md` que contienen etiquetas relevantes para tu tarea actual:

1. **Lee los registros diarios:** Abre los registros diarios específicos indicados por las fechas encontradas en `.agents/memory/episodic/YYYY/MM/DD.md`.
   - **Objetivo:** Entender por qué se tomaron decisiones pasadas en ese módulo específico, qué errores se cometieron previamente, cómo se resolvieron y revisar los commits o código asociado.
   - **Condición:** Si la tarea es completamente nueva y no hay etiquetas relevantes en el timeline, omite este paso para ahorrar tokens en tu ventana de contexto.

## Fase 4: Confirmación y Ejecución

Una vez completadas las fases anteriores, tu ventana de contexto está optimizada.

1. Responde al usuario con un mensaje breve confirmando que has cargado el contexto del proyecto y estás listo para comenzar con la tarea asignada.
2. Inicia tu trabajo de análisis o codificación basado en la instrucción del usuario.

*Nota interna para el LLM: Durante tu trabajo, mantén presente que al finalizar la sesión se te pedirá ejecutar `.agents/workflows/end.md` para consolidar lo que aprendas hoy.*