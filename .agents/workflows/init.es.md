# Workflow: Bootstrap del Proyecto (Onboarding Inicial)

**Contexto del Sistema:** Eres un agente de IA y esta es la **primera vez** que Cortex-MD se activa en este repositorio. Los archivos de memoria semántica son templates vacíos. Tu trabajo es analizar el codebase existente y poblar el sistema de memoria para que las sesiones futuras puedan iniciar con contexto completo.

Ejecuta las siguientes fases en estricto orden secuencial.

## Fase 1: Análisis del Codebase

Escanea el proyecto para entender su estructura antes de escribir nada.

1. **Lee la raíz del proyecto:** Lista todos los archivos y directorios de nivel superior para identificar el tipo de proyecto (monorepo, aplicación única, librería, etc.).
2. **Identifica el stack:** Busca archivos de configuración (`package.json`, `tsconfig.json`, `Cargo.toml`, `requirements.txt`, `go.mod`, `Gemfile`, etc.) para determinar lenguajes, frameworks y dependencias clave.
3. **Identifica la arquitectura:** Busca patrones de directorios (`src/`, `apps/`, `packages/`, `lib/`, `routes/`, `controllers/`, `models/`, etc.) para entender la estructura de módulos.
4. **Identifica las convenciones:** Busca configuración de linting/formateo (`.eslintrc`, `.prettierrc`, `biome.json`, `rustfmt.toml`, etc.) y examina algunos archivos fuente representativos para detectar patrones de nombrado y estilo de código.
5. **Identifica las reglas de negocio:** Lee el `README.md` y cualquier documentación existente para entender el dominio y propósito del proyecto.

## Fase 2: Población de la Memoria Semántica

Escribe los hallazgos en los archivos de memoria semántica. Sigue la estructura del template ya definida en cada archivo.

1. **Escribe:** `.agents/memory/semantic/stack.md`
   - Completa los lenguajes, frameworks, librerías, base de datos, herramientas y servicios externos basándote en tu análisis.
2. **Escribe:** `.agents/memory/semantic/architecture.md`
   - Documenta la estructura de módulos, patrones de diseño observados y flujo de datos.
3. **Escribe:** `.agents/memory/semantic/conventions.md`
   - Documenta el estilo de código, convenciones de nombrado, reglas de importación y cualquier patrón prohibido encontrado en las configuraciones de linting.
4. **Escribe:** `.agents/memory/semantic/business-rules.md`
   - Documenta el dominio, entidades clave y cualquier regla de negocio inferida del codebase y la documentación.
5. **Escribe:** `.agents/memory/semantic/taxonomy.md`
   - Revisa las etiquetas por defecto. Si el proyecto tiene dominios obvios no cubiertos por los defaults (ej. `[Payments]`, `[i18n]`, `[Analytics]`), **recomienda adiciones al usuario** y espera su aprobación antes de agregarlas.

## Fase 3: Inicialización de la Memoria de Trabajo

1. **Escribe:** `.agents/memory/semantic/active-tasks.md`
   - Establece la tarea actual como "Onboarding inicial completado" y define el siguiente paso lógico basándote en la solicitud del usuario.

## Fase 4: Confirmación

1. Presenta un resumen breve al usuario de lo que se pobló en cada archivo de memoria semántica.
2. Pide al usuario que revise el contenido generado y corrija cualquier imprecisión.
3. Informa al usuario que el sistema está listo y que las sesiones futuras deben comenzar con `start.md`.

*Nota interna para el LLM: Este workflow debe ejecutarse solo una vez por proyecto. Después del bootstrap inicial, usa `start.md` y `end.md` para la gestión regular de sesiones.*
