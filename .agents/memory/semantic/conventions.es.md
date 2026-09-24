# Convenciones de Código

> **Contrato:** cada entrada es una regla en imperativo + a lo sumo una frase de razón + cita al doc canónico (`→ docs/...`), ≤ ~400 caracteres. El detalle vive en `docs/`; la historia, en el episódico. Verificador: `node .agents/check-memory-contract.js`.

> En un proyecto no técnico, este archivo guarda el **estilo de la casa**: formatos de documentos, tono y plantillas de comunicación, nomenclatura de archivos y registros.

## Estilo General

- **Indentación:** *Ej: 2 espacios*
- **Comillas:** *Ej: Simples (`'`)*
- **Punto y coma:** *Ej: Sí / No*

## Nombrado

| Elemento | Convención | Ejemplo |
|---|---|---|
| *Componentes* | *PascalCase* | *`UserProfile.tsx`* |
| *Funciones/variables* | *camelCase* | *`getUserById`* |
| *Archivos de utilidad* | *kebab-case* | *`date-utils.ts`* |
| *Constantes* | *UPPER_SNAKE_CASE* | *`MAX_RETRY_COUNT`* |

## Estructura de Componentes

*Describe el patrón estándar para crear un componente (ej. dónde va la lógica, dónde los estilos, uso de barrel exports, etc.).*

## Reglas de Importación

*Describe el orden de imports y si se usan alias de rutas (ej. `@/`).*

## Patrones Prohibidos

*Lista prácticas que NO deben usarse en el proyecto (ej. `any` en TypeScript, `!important` en CSS, etc.).*
