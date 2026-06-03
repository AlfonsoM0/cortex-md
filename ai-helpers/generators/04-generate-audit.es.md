# Generador: Código → Auditoría

## Entrada

Leé la especificación en `ai-helpers/idea-development/03-spec.es.md`.

## Proceso

Auditá los cambios realizados de acuerdo a la especificación y verificá que hayan
sido implementados correctamente. Escribí los hallazgos en el archivo de salida.

## Gancho de Salida (Exit Hook)

Si la auditoría es 100% exitosa:

1. Marcá el PR actual como completado (`- [x]`) en
   `ai-helpers/idea-development/02-breakdown.es.md`.
2. Informá al usuario que el PR fue completado exitosamente y recordále que debe
   ejecutar `.agents/workflows/end.es.md` cuando considere que la sesión está
   completa. Esto le permite agrupar múltiples PRs en una sola entrada episódica
   en lugar de consolidar después de cada PR individual.

Si la auditoría **no** es exitosa, escribí los hallazgos detallados en
`ai-helpers/idea-development/05-audit.es.md` y esperá instrucciones del usuario.

## Salida

Escribí los hallazgos de la auditoría en `ai-helpers/idea-development/05-audit.es.md`.
