# Generador: Elemento de Breakdown → Spec

## Entrada
Leé el PR indicado por el usuario desde el desglose en 
`ai-helpers/idea-development/02-breakdown.md`.

## Proceso
Desarrollá una especificación técnica precisa siguiendo el flujo 
`.agents/workflows/deep-plan.md` en modo **strict**. La especificación debe:

1. Listar cada archivo a crear/modificar con rutas exactas.
2. Limitar las etapas a un máximo de 3-5 archivos.
3. Verificar explícitamente si algo ya existe en los paquetes compartidos del proyecto — si existe, marcarlo para reutilización y nunca recrearlo.

## Salida
Escribí la especificación en `ai-helpers/idea-development/03-spec.md`, incluyendo las siguientes dos secciones obligatorias:

### Inventario Anti-Redundancia

Listá los componentes, hooks, utilidades y schemas ya presentes en el proyecto que DEBEN reutilizarse en este PR. Para cada uno, incluí la ruta exacta de importación.

### Comandos de Validación

Comandos que el agente Code debe ejecutar al finalizar la implementación. Especificá los comandos exactos para este proyecto (ej.: typecheck, lint, build, test).
