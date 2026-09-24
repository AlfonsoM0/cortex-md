# Reglas de Negocio

> **Contrato:** cada entrada es una regla en imperativo + a lo sumo una frase de razón + cita al doc canónico (`→ docs/...`), ≤ ~400 caracteres. El detalle vive en `docs/`; la historia, en el episódico. Verificador: `node .agents/check-memory-contract.js`.

## Dominio Principal

*Describe en 2-3 líneas el dominio del negocio (ej. fintech, e-commerce, SaaS B2B) y el problema que resuelve.*

## Entidades Clave

| Entidad | Descripción | Relaciones |
|---|---|---|
| *Usuario* | *Ejemplo: Persona registrada en la plataforma* | *Tiene muchas Órdenes* |
| *Orden* | *Ejemplo: Solicitud de compra* | *Pertenece a un Usuario* |

## Reglas Invariables

*Lista las restricciones que el sistema (o quien opera) debe respetar siempre, sin excepción.*

- *Ej: Un usuario no puede tener un balance negativo.*
- *Ej: Toda transacción debe registrar un concepto.*

## Flujos de Negocio Críticos

*Describe los procesos principales paso a paso (ej. flujo de checkout, flujo de onboarding).*
