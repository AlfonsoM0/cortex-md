# Arquitectura

> **Contrato:** cada entrada es una regla en imperativo + a lo sumo una frase de razón + cita al doc canónico (`→ docs/...`), ≤ ~400 caracteres. El detalle vive en `docs/`; la historia, en el episódico. Verificador: `node .agents/check-memory-contract.js`.

<!-- cortex:example — reemplazá los placeholders por entradas reales y borrá este bloque (init.md § Fase 4)
Software:
- **Monorepo:** `apps/web` (frontend) y `packages/db` (esquemas y migraciones); el frontend nunca consulta la base de datos directo. → `docs/architecture/overview.md`
Administrativo:
- **Mapa del espacio de trabajo:** `Proveedores/` y `Finanzas/` guardan los archivos del negocio; `docs/` explica los procedimientos; `.agents/` es la memoria del agente. → `docs/sistemas.md`
- **Reposición:** alerta de stock bajo → pedido al proveedor preferido → recepción con remito → carga en la planilla → pago a 30 días. → `docs/procedimientos/reposicion.md`
-->

## Visión General

_En 2-3 líneas: qué tipo de sistema u operación es, y su flujo principal (de datos, o de trabajo: pedido → recepción → pago)._

## Mapa del Espacio de Trabajo

_Qué carpeta guarda qué: los archivos del negocio y sus carpetas, `docs/` (documentación que explica el proyecto), `.agents/` (la memoria y los workflows del agente)._

## Áreas y Módulos

_Los módulos o paquetes principales del código — o las áreas funcionales de la operación — con su responsabilidad y responsable._

## Flujos Principales

_Los flujos críticos, cada uno como regla + cita al doc que lo detalla._
