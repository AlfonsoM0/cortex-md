# Arquitectura del Sistema

> **Contrato:** cada entrada es una regla en imperativo + a lo sumo una frase de razón + cita al doc canónico (`→ docs/...`), ≤ ~400 caracteres. El detalle vive en `docs/`; la historia, en el episódico. Verificador: `node .agents/check-memory-contract.js`.

## Visión General

*Describe en 2-3 líneas qué tipo de sistema es (monolito, monorepo… o, en una operación administrativa, qué áreas y sistemas la componen) y cuál es el flujo principal (de datos, o de trabajo: pedido → recepción → pago).*

## Estructura de Módulos

*Lista los módulos o paquetes principales del proyecto y su responsabilidad.*

| Módulo | Responsabilidad |
|---|---|
| *`apps/web`* | *Ejemplo: Frontend Next.js* |
| *`packages/db`* | *Ejemplo: Esquemas y migraciones con DrizzleORM* |

## Patrones de Diseño Globales

*Documenta los patrones que se aplican transversalmente al proyecto (ej. Repository Pattern, Dependency Injection, Event-Driven, etc.).*

## Diagrama de Flujo de Datos

*Describe o referencia el flujo principal: entrada del usuario → procesamiento → persistencia → respuesta.*
