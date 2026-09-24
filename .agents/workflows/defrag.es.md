---
description: Desfragmentación y Optimización de Memoria (Defrag)
---

# Workflow: Desfragmentación de Memoria (Defrag)

**Contexto del Sistema:** Mantenimiento profundo de la memoria: eliminar redundancias, comprimir formato, corregir inconsistencias entre archivos y — lo más valioso — **comprobar que lo escrito siga siendo cierto**. Es una operación avanzada: requiere un modelo de razonamiento fuerte y la confirmación del usuario. Se ejecuta a pedido o cuando el chequeo semanal (`maintenance.md`) lo recomienda.

## Fase 0: Puerta de Seguridad

Revisá qué cambió desde la última consolidación (con git: `git status`) y mostrá esta advertencia; **esperá una confirmación explícita del usuario**:

> ⚠️ **Optimización de la memoria** — voy a revisar a fondo y reordenar la memoria del proyecto (y los documentos relacionados), guardando antes una copia para poder deshacerlo. Conviene hacerlo con el modelo más capaz que tengas. ¿Procedo?

🔴 **El defrag tiene que poder deshacerse:**

- **Con git:** si hay cambios sin commitear, ofrecé commitearlos ANTES de proceder. Sin un commit previo, deshacer el defrag también se lleva el trabajo de la sesión.
- **Sin git (una carpeta común):** copiá `.agents/memory/` y los documentos de `docs/` que vas a tocar a `.agents/backups/AAAA-MM-DD/` antes de reescribir. Conservá las 3 copias más recientes y decile al usuario dónde quedó la de hoy.

## Fase 1: Inventario

Leé TODO antes de cambiar nada, para detectar degradación entre archivos a la vez:

0. Registrá el tamaño de cada archivo y la **carga fija** (`node .agents/check-memory-contract.js` la reporta en bytes y tokens estimados). Leé en bloques que no trunquen la salida: una lectura truncada no completa el inventario.
1. Los 6 archivos de `.agents/memory/semantic/`.
2. `.agents/memory/episodic/timeline.md` y los **3 registros más recientes**, incluidos los `DD-sN.md` (ordená por fecha y número de sesión, no alfabéticamente).
3. El roadmap maestro, si existe.

**Presupuesto de la carga fija:** lo que `start.md` lee siempre lo paga cada sesión. Si crece más allá de lo razonable para el proyecto, el defrag propone qué pasa a lectura bajo demanda (a `docs/`, con la regla y la cita en la memoria).

## Fase 2: Auditoría Semántica y Compresión

### 2.1 Eliminar

- **Redundancias** dentro de un archivo o entre archivos.
- **Temporalidad disfrazada de estado** ("recientemente migramos a…") → presente absoluto.
- **Implementación demasiado específica:** el paso a paso concreto va a una skill o al episódico. Una convención es una regla; una llamada a función o un clic en un menú es una implementación.
- **Referencias muertas:** archivos, módulos, herramientas o proveedores que ya no existen.
- **Argumentación y ejemplos duplicados de la doc.** Si el detalle existe en `docs/`, la entrada queda como **regla + cita**; si no existe, movelo al doc canónico (creándolo o extendiéndolo) y recién entonces comprimí. **Nunca borres un detalle que no viva en otro lado.** La historia del descubrimiento va al episódico del día, no a la doc.
- **Citas al episódico desde la memoria semántica o desde `docs/`:** hallazgo a corregir siempre. Reemplazalas por el doc canónico.
- **Datos sensibles** (credenciales, datos personales de terceros): se eliminan de la memoria y se nombra el sistema donde viven.

### 2.2 Comprimir formato

- Listas densas sobre prosa; tablas de 2 columnas → lista de definición.
- Sin relleno ("es importante notar que…"); voz imperativa; encabezados hasta H3.
- **Anatomía objetivo** (misma de `end.md § Fase 3`): regla en imperativo + a lo sumo una frase de razón + cita a `docs/`, ≤ ~400 caracteres.

### 2.3 Enrutar conocimiento a Skills

Lo que pertenece a una skill se mueve a su `SKILL.md` local, dejando a lo sumo una referencia. **Guarda de Skills Externas:** si la skill figura en `skills-lock.json`, no la modifiques — usá la skill local más cercana.

### 2.4 Reescribir

Cada archivo reescrito es completo y autocontenido (no un diff), de tamaño ≤ al original y semánticamente equivalente.

### 2.5 Verificar el contrato (bloqueante)

Corré `node .agents/check-memory-contract.js`. Objetivo: **cero hallazgos**. Cada hallazgo se corrige moviendo el detalle al doc y dejando regla + cita; no se silencia. ⚠️ Mide la **forma**, no la verdad: una entrada corta que miente pasa en verde. Eso lo cubre la Fase 4.6.

## Fase 3: Optimización Episódica

1. **Timeline:** máximo 50 sesiones; cada entrada de **una línea (~200 caracteres)** — si creció a párrafo, verificá que el detalle esté en el día y comprimila; solo etiquetas de `taxonomy.md`; entradas con 5+ etiquetas se **señalan** en el reporte (sesiones poco granulares), sin modificarlas.
2. **Límite episódico ↔ semántico:** lo episódico infiltrado en la semántica (fechas de sesión, "hoy hicimos X") vuelve a su día o se elimina. Que un día contenga algo ya promovido a la semántica es correcto: el episódico es un registro inmutable.

## Fase 4: Validación Cruzada

- `architecture` ↔ `stack`: cada herramienta reflejada en la estructura y viceversa.
- `conventions` ↔ `architecture`: sin contradicciones.
- `business-rules` ↔ `architecture`: entidades del dominio alineadas a la estructura.
- `taxonomy` ↔ `timeline`: toda etiqueta en uso existe en la taxonomía.
- `active-tasks` ↔ roadmap: la tarea actual es coherente con la fase.

**Contradicción →** decidí con la jerarquía de verdad (`start.md`): primero la fuente primaria y las instrucciones vigentes del usuario; la fecha de consolidación solo desempata entre memorias con igual respaldo. No conviertas un comportamiento defectuoso en política ni una fecha programada en un hecho confirmado.

## Fase 4.5: Sistema de Conocimiento (Skills y Workflows)

1. **Router de skills:** cada skill listada en `AGENTS.md` existe como carpeta y viceversa, y su descripción refleja el `SKILL.md` real. Las descripciones viven **solo** en el router; la memoria no las repite.
2. **Integridad de rutas:** las rutas a `.agents/` y `docs/` citadas desde workflows y `AGENTS.md` existen. Excluí los `SKILL.md` de este barrido: sus rutas son relativas a la carpeta de la skill.
3. **Workflow ↔ skill:** un workflow instruye un proceso; una skill contiene conocimiento. Conocimiento denso acumulado en un workflow → a la skill, con un puntero.
4. **Actualizar skills externas sin perder archivos propios** (si el proyecto usa un CLI de skills):
   - Inspeccioná primero qué borra o sobrescribe el comando de actualización. Si toca carpetas con archivos propios (skills locales, notas locales dentro de skills externas), **ejecutalo en una copia aislada** y trasladá solo los cambios revisados de las skills externas y su lock.
   - Revisá el diff real, no solo el hash del lock; separá lo sustantivo del formato. Si cambió la descripción de una skill, actualizá el router.
   - Sin red o sin permisos: informá la actualización como pendiente y completá las fases locales.
5. **Mejoras de proceso:** corregí contradicciones y rutas muertas en workflows y skills locales. No cambies permisos, decisiones del usuario ni dependencias por preferencia editorial.

## Fase 4.6: La memoria contra la FUENTE PRIMARIA (lo que ningún script puede hacer)

Los chequeos anteriores son internos (rutas que existen, etiquetas válidas, sin contradicciones): **pasan en verde mientras la memoria describe un sistema que ya no existe.**

Tomá las afirmaciones **verificables** de la memoria semántica — nombres, límites, valores, "único punto de X", proveedores, plazos — y contrastalas con la fuente primaria (buscar en el código; consultar el sistema de registro). Registrá afirmación, evidencia y corrección. Separá lo verificado en la fuente, lo que depende de un entorno o sistema externo, y lo que no pudiste verificar: esto último queda **fechado**, nunca declarado vigente por inferencia.

- 🔴 **El desvío tiene dirección conocida: es PESIMISTA.** La memoria envejece declarando pendiente lo ya hecho, y eso hace rehacer trabajo que existe.
- 🔴 **Exige criterio, no un script:** una memoria bien escrita nombra lo que NO existe (deudas, antipatrones), así que "ausente de la fuente" y "correctamente documentado como ausente" solo se distinguen leyendo la frase.
- **Priorizá lo que costaría caro creer:** un "único punto de cálculo" que ya tiene dos, un límite que cambió de valor, un proveedor reemplazado. Un hallazgo acá vale más que diez de formato.
- **`active-tasks.md` también se contrasta:** cada pendiente se busca en la fuente. Lo que la fuente no puede confirmar (una verificación manual, algo ocurrido fuera del sistema) se lista para que el usuario decida (Fase 7).

## Fase 5: Documentación

1. Auditá `docs/` con los principios de la Fase 2.
2. Nada contradice la verdad consolidada en la memoria.
3. 🔴 **Cazá desvío de ESTADO, no solo de forma:** afirmaciones que el tiempo volvió falsas, sobre todo las que **prometen una acción futura** ("antes del lanzamiento", "cuando tengamos clientes", "todavía en modo prueba", "hay que hacerlo antes de…"). Armá un patrón de búsqueda con las frases de tu proyecto; los patrones amplios ("pendiente", "todavía no") solo devuelven ruido y se dejan de correr.
   - **Priorizá la dirección CARA:** un doc que **subestima el riesgo** (dice "entorno de prueba" donde ya hay datos o dinero reales) daña mucho más que uno simplemente viejo.
   - La búsqueda propone; **el veredicto lo das vos**, sabiendo el estado real.
4. Un doc archivado que ya no representa nada vigente y cuyo valor histórico está cubierto → proponé su eliminación al usuario.
5. **¿El brief sigue vigente?** Si `docs/00-PROJECT-BRIEF.md` tiene objetivos ya cumplidos o vencidos, o más de seis meses sin revisión, proponé una **re-alineación** (`references/alignment-interview.md`).

## Fase 6: Higiene y Entorno

1. **Datos sensibles:** con git, cada carpeta con credenciales, sesiones o datos personales tiene que estar ignorada y sin archivos versionados — algo versionado es un hallazgo **crítico**. Sin git, igual: si la carpeta se sincroniza con la nube o se comparte, la memoria no contiene datos sensibles.
2. **Cachés (opcional):** si el proyecto acumula cachés pesadas, purgalas con el comando de tu herramienta — verificando antes qué borra (algunas tareas `clean` también borran dependencias).
3. Si trabajás en un disco virtual (ej. WSL2), recordá en el reporte que recuperar espacio puede requerir compactar la imagen desde el sistema anfitrión.

## Fase 7: Reporte

Resumí al usuario:

- Archivos reescritos (una línea cada uno) y **tamaño de la carga fija antes → después**.
- Redundancias eliminadas y entradas comprimidas a regla + cita (con el doc de destino), y el resultado del verificador.
- **Afirmaciones que la fuente primaria desmintió (Fase 4.6)** — lo más importante del reporte.
- Desvío de estado corregido en `docs/`, marcando el que subestimaba riesgo.
- Router, rutas muertas y skills actualizadas; salud del timeline y distribución de etiquetas; higiene.
- **Pendientes que solo el usuario puede confirmar**, numerados, para que marque los que ya no aplican.
- Próximo defrag sugerido (ej. tras 15-20 sesiones).

🔴 **Separá lo COSMÉTICO de lo sustantivo.** Un recuento de archivos tocados no dice cuánto cambió el conocimiento, y un número inflado por reformateos hace desconfiar de todo el trabajo.

## Fase 8: Revisión independiente

Si hay otro agente o modelo disponible, pedile que revise los cambios del defrag antes de darlo por cerrado (con git, el diff antes de commitear): que verifique que cada cita apunte a la **sección** que trata el tema y que cada corrección tenga evidencia en la fuente. El verificador solo confirma que el archivo citado existe. Sin revisor, hacé vos una segunda pasada con ese foco.

## Fase 9: Registro

- Entrada en el timeline etiquetada **solo** `[CortexMD]` (así el enrutamiento la omite).
- En `.agents/memory/maintenance-log.md`: fecha del último defrag, carga fija resultante en tokens, y posposiciones en cero.

_Idempotente: ejecutarlo dos veces seguidas no debería producir más cambios. Si la memoria ya está óptima, informalo y omití reescrituras innecesarias._
