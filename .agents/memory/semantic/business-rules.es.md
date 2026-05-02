# Reglas de Negocio

## Dominio Principal

*Describe en 2-3 líneas el dominio del negocio (ej. fintech, e-commerce, SaaS B2B) y el problema que resuelve.*

## Entidades Clave

| Entidad | Descripción | Relaciones |
|---|---|---|
| *Usuario* | *Ejemplo: Persona registrada en la plataforma* | *Tiene muchas Órdenes* |
| *Orden* | *Ejemplo: Solicitud de compra* | *Pertenece a un Usuario* |

## Reglas Invariables

*Lista las restricciones de negocio que el código debe respetar siempre, sin excepción.*

- *Ej: Un usuario no puede tener un balance negativo.*
- *Ej: Toda transacción debe registrar un concepto.*

## Flujos de Negocio Críticos

*Describe los procesos principales paso a paso (ej. flujo de checkout, flujo de onboarding).*
