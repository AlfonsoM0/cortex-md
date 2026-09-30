# Stack y Sistemas

> **Contrato:** cada entrada es una regla en imperativo + a lo sumo una frase de razón + cita al doc canónico (`→ docs/...`), ≤ ~400 caracteres. El detalle vive en `docs/`; la historia, en el episódico. Verificador: `node .agents/check-memory-contract.js`.

<!-- cortex:example — reemplazá los placeholders por entradas reales y borrá este bloque (init.md § Fase 4)
Software:
- **Fuente primaria:** el código de este repositorio, y la base de datos de producción para los datos vivos. Le ganan a la memoria. → `docs/architecture/overview.md`
- **Entorno del agente:** Claude Code con Opus, plan de suscripción; puente `CLAUDE.md` + hook de inicio de sesión. → `docs/agent-environment.md`
- **Stack:** TypeScript, Next.js, PostgreSQL en Supabase; pnpm, ESLint, Vitest. → `docs/architecture/overview.md`
Administrativo:
- **Fuente primaria:** `Proveedores/proveedores.xlsx` (proveedores y precios) y el sistema de facturación (ventas). Le ganan a la memoria. → `docs/sistemas.md`
- **Entorno del agente:** Claude Cowork con Opus, plan de suscripción; puente `CLAUDE.md`. → `docs/agent-environment.md`
- **Pedidos a proveedores:** por correo desde la casilla de compras; WhatsApp solo para urgencias. → `docs/procedimientos/reposicion.md`
-->

## Fuente Primaria

_La primera entrada de este archivo: qué archivos o sistemas tienen la verdad de cada tipo de dato — el código, o los archivos del negocio (p. ej. una planilla de proveedores), incluidos los que están fuera de la carpeta (nube, conector, sistema en línea). Le ganan a la memoria ante una discrepancia._

## Entorno del Agente

_La herramienta y su forma de uso, el modelo y cómo se carga la memoria; citá el doc de entorno que crea init._

## Herramientas y Servicios

_Lenguajes, frameworks y herramientas de desarrollo — o los sistemas, apps y proveedores en los que se apoya la operación._
