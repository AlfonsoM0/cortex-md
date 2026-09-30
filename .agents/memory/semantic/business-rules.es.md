# Reglas de Negocio

> **Contrato:** cada entrada es una regla en imperativo + a lo sumo una frase de razón + cita al doc canónico (`→ docs/...`), ≤ ~400 caracteres. El detalle vive en `docs/`; la historia, en el episódico. Verificador: `node .agents/check-memory-contract.js`.

<!-- cortex:example — reemplazá los placeholders por entradas reales y borrá este bloque (init.md § Fase 4)
Software:
- **Un usuario nunca tiene saldo negativo:** cada débito valida fondos en la misma transacción. → `docs/features/payments.md`
Administrativo:
- **Nunca aprobar un pago sin remito conformado:** el faltante se reclama antes de pagar. → `docs/procedimientos/pagos.md §2`
- **El stock mínimo de cada producto lo define la planilla**, no la memoria: la memoria nombra la columna, nunca copia sus valores. → `docs/sistemas.md`
-->

## Dominio

_En 2-3 líneas: el dominio del negocio y el problema que resuelve._

## Entidades Clave

_Las entidades principales y cómo se relacionan (p. ej. cliente, pedido, proveedor, producto)._

## Reglas Invariables

_Las restricciones que el sistema — o quien lo opera — respeta siempre, sin excepción (lo que no admite error)._

## Flujos Críticos

_Los procesos donde un error sale caro, cada uno como regla + cita._
