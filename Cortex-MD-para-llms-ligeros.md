# Propuesta de Optimización: Emulación de Razonamiento Profundo en Modelos Ligeros mediante Cortex-MD

## 1. El Problema Actual del Framework

El diseño fundamental de `cortex-md` resuelve exitosamente la retención de contexto a largo plazo mediante la separación de memoria semántica y episódica. Sin embargo, los flujos de trabajo operativos (como `deep-plan.md` y `audit.md`, ver repo del proyecto "aimenu" para encontrar estos ejemplos) están estructurados asumiendo que el LLM subyacente posee una alta dimensionalidad paramétrica (ej. Claude Opus).

Cuando estos flujos de trabajo densos son ejecutados por modelos ligeros y de baja latencia (ej. Claude Haiku), el sistema experimenta una degradación cualitativa caracterizada por:

- **Amnesia de atención intrínseca:** El modelo pierde el rastro de las restricciones arquitectónicas iniciales (ej. fronteras entre paquetes, configuración de Next.js o validadores compartidos) al intentar procesar demasiados dominios cognitivos simultáneamente.
- **Evaluación perezosa (_Lazy Evaluation_):** Ante checklists extensos, el modelo asume que el código cumple las normativas y marca las tareas como completadas sin ejecutar una verificación cruzada real ni invocar las herramientas de lectura necesarias.
- **Alucinación de contexto:** Al carecer de profundidad para inferir relaciones complejas en repositorios grandes, el modelo inventa soluciones o dependencias en lugar de mapear el estado real del proyecto.

## 2. Diagnóstico Técnico

La brecha de calidad entre un modelo pesado y uno ligero no radica en su comprensión del lenguaje, sino en el volumen de operaciones de coma flotante (FLOPs) que invierten por cada token generado.

- Un modelo pesado resuelve la complejidad en su **espacio latente interno**, procesando múltiples variables y ejecutando una heurística profunda antes de emitir una respuesta.
- Un modelo ligero prioriza la velocidad probabilística. Si se le entrega un prompt monolítico con seis fases de auditoría (desde modularidad TypeScript hasta leyes UX/UI), colapsará la instrucción priorizando el formato de salida requerido sobre la precisión del análisis subyacente.

Para igualar la calidad, la carga computacional debe ser externalizada. El modelo ligero debe ser forzado a resolver la complejidad en el **espacio de contexto externo** (la ventana de tokens), utilizando la memoria local administrada por `cortex-md` como su red neuronal extendida.

## 3. Propuesta de Solución: Arquitectura de Estados Finitos y "Prueba de Trabajo"

Los workflows de `cortex-md` deben ser reescritos para abandonar el formato de "lista de instrucciones densa" y adoptar un modelo de "embudo atómico iterativo".

### A. Segmentación Estricta de Dominios (Micro-Workflows)

No agrupar validaciones dispares. La auditoría de la lógica de negocio (ej. endpoints TRPC, esquemas Drizzle o autenticación) debe ejecutarse de forma independiente a la auditoría de interfaces o reglas de diseño.

### B. Planificación Determinista en 3 Fases Bloqueantes

El flujo `deep-plan.md` debe forzar al modelo a detenerse y probar su avance:

1.  **Mapeo (Discovery):** El modelo ejecuta comandos de búsqueda en el repositorio y está obligado a imprimir el árbol de archivos existente antes de proponer código.
2.  **Contraste (Strategy):** El modelo cruza el árbol impreso con las reglas de `architecture.md` y redacta las restricciones explícitas de la tarea actual.
3.  **Partición:** Generación del plan en PRs atómicos de no más de 3 archivos, inyectando el contexto de la memoria episódica en cada paso.

### C. Auditoría por Evidencia Criptográfica (_Proof of Work_)

Reemplazar la verificación de confirmación abstracta (`- [ ]`) por validación basada en evidencias impresas en el contexto:

- **Prevención de redundancia:** En lugar de "verifica si existe el componente", exigir: _"Ejecuta un comando grep en la ruta específica e imprime el output del terminal. Basado en ese output explícito, determina si existe duplicación"_.
- **Puertas lógicas (Gateways):** Forzar la ejecución de linters (`pnpm lint`) o builds estáticos como primer paso. Si el comando falla en la terminal, el workflow se aborta y se inicia un ciclo de corrección de forma autónoma.

## 4. Conclusiones y Ventajas Competitivas

La implementación de esta reestructuración en `cortex-md` transforma a modelos ligeros en agentes de ingeniería de alta precisión, obteniendo los siguientes beneficios:

- **Eficiencia de Tokens Optimizada:** Al segmentar las tareas, el modelo procesa casi exclusivamente tokens de alta señal, reduciendo a cero el ruido introducido por reglas irrelevantes para la tarea en curso.
- **Sinergia con Prompt Caching:** La inyección atómica de los archivos estáticos de `cortex-md` (arquitectura, convenciones) permite a las APIs modernas mantener este contexto en caché. Esto habilita iteraciones de auditoría ultra-rápidas a un costo computacional y económico fraccionario.
- **Trazabilidad Continua:** Al obligar al modelo a imprimir su cadena de pensamiento y la salida de la terminal en la ventana de contexto, cada decisión arquitectónica queda documentada de forma transparente y lista para ser consolidada en la memoria episódica del framework.
- **Equidad de Rendimiento (Opus-Level Quality):** Se elimina la necesidad de depender de modelos costosos y lentos para el desarrollo diario, compensando la falta de profundidad latente con un rigor metodológico automatizado en la gestión de la memoria local.
