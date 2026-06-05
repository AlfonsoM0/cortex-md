# Generador de Notas de QA

Como agente **Architect**, generá las notas de QA para el plan implementado.

## Entrada

1. Leé `ai-helpers/idea-development/orchestator-memory.md` para identificar todos los PRs completados y los archivos que tocó cada uno.
2. Leé `ai-helpers/idea-development/02-breakdown.md` para entender el alcance y objetivos del plan.

## Principios de Diseño del QA

El listado debe minimizar el esfuerzo del tester aplicando dos reglas:

1. **Mínima Navegación:** Agrupá los casos por área de la aplicación (página, componente o flujo). Si múltiples PRs tocan la misma pantalla, sus casos van juntos en el mismo grupo. El tester llega a un lugar una sola vez y termina todo lo de esa área.

2. **Economía de Acciones:** Dentro de cada grupo, el orden debe aprovechar el estado generado por el paso anterior. Nunca rehacer algo que ya se tiene. Ejemplo correcto para CRUD: crear → editar (usa lo creado) → eliminar (usa lo editado). Ejemplo incorrecto: crear → eliminar → crear → editar.

## Proceso

Para cada área de la aplicación afectada por el plan:

- Identificá todos los casos de QA que corresponden a esa área (de todos los PRs que la tocan).
- Ordená los casos usando los dos principios anteriores: primero el caso dorado, luego los edge cases que surgen naturalmente del estado dejado por el caso dorado.
- Citá el PR al que corresponde cada caso.

## Salida

Escribí las notas en `ai-helpers/idea-development/QA-notes.md` con el siguiente formato:

```markdown
## Área: [nombre del área / pantalla]

> PRs relacionados: PR N, PR M

### QA-N — [título de la acción] (PR N)

**Pasos:**

1. ...
2. ...

**Resultado esperado:** ...

**Comentarios del tester:** _[espacio para completar]_
```
