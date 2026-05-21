# Generador: Código → Auditoría

## Entrada
Lee la especificación en `ai-helpers/idea-development/03-spec.es.md`.

## Proceso
Audita los cambios realizados de acuerdo a la especificación y verifica que hayan 
sido implementados correctamente. Escribe los hallazgos en el archivo de salida.

## Gancho de Salida (Exit Hook)
Si la auditoría es 100% exitosa:
1. Marca el PR actual como completado (`- [x]`) en 
   `ai-helpers/idea-development/02-breakdown.es.md`.
2. Procede inmediatamente a ejecutar el ciclo de Sueño llamando a 
   `.agents/workflows/end.es.md` para consolidar lo aprendido en el Hipocampo.

## Salida
Escribe los hallazgos de la auditoría en `ai-helpers/idea-development/05-audit.es.md`.
