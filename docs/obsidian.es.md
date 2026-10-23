# Obsidian y Cortex-MD

> 🌐 [Read in English (obsidian.md)](obsidian.md)

_Documento accesorio, no forma parte del core. Verificado en 2026-10 contra Obsidian 1.12 y su ayuda oficial. Responde dos preguntas: por qué la memoria de un agente debería ser Cortex-MD y no Obsidian, y qué no hacer si decidís sumar Obsidian a un proyecto Cortex-MD._

**En resumen:** Obsidian es una app para personas; Cortex-MD es un protocolo de memoria para un agente. En todos los criterios que importan al agente, gana Cortex-MD. Obsidian se puede sumar como ventana opcional para el humano, siempre que nunca cambie cómo se escribe, se lee o se verifica la memoria (§ 2).

## 1. Por qué Cortex-MD es la memoria del agente

[Obsidian](https://obsidian.md) es un editor de Markdown que trabaja sobre una carpeta de archivos locales — una _bóveda_ (vault) — con un índice de búsqueda, un grafo de enlaces y vistas sobre las propiedades de las notas. Guarda y muestra notas; no decide nada. Cortex-MD decide qué lee el agente al empezar una sesión (`start.md`), qué escribe al terminarla (`end.md`), cómo se comprime y se corrige la memoria (`defrag.md`) y cómo se controla su forma (`check-memory-contract.js`). Son cosas de distinto tipo, así que la comparación justa es **una bóveda de Obsidian usada como memoria del agente** — a través de su CLI, skills de agente o un servidor MCP — contra Cortex-MD.

| Criterio | Bóveda de Obsidian como memoria | Cortex-MD | Veredicto |
| --- | --- | --- | --- |
| Carga al inicio de la sesión | No define nada: alguien tiene que escribir un `CLAUDE.md` que diga qué leer | `start.md` + puente + hook; una carga fija con tamaño medido | Cortex-MD |
| Consolidar al cerrar | Nada: el agente escribe notas sueltas si se lo piden | `end.md`: registro de sesión con su línea índice, timeline generado, reglas, docs, skills, limpieza de tareas | Cortex-MD |
| Tamaño del contexto | Sin presupuesto: la bóveda crece y el grafo invita a leer más | Pirámide, presupuesto para lo que se lee siempre, los docs grandes se parten | Cortex-MD |
| Envejecimiento y verdad | Las notas envejecen en silencio | Jerarquía de verdad, las tareas terminadas se borran, defrag contra la fuente primaria | Cortex-MD |
| Integridad | Enlaces sin resolver y huérfanos | Verificador: contrato, citas muertas y laterales, presupuesto, timeline sincronizado | Cortex-MD |
| Encontrar recuerdos | Un índice exacto de texto completo más una caché de metadatos — no es RAG, que solo llega con plugins de la comunidad | `grep` sobre rutas planas, el timeline y `--history <Tag>` sobre toda la historia | Cortex-MD, para el agente |
| Agentes en la nube o sin interfaz | Solo quedan los archivos: la CLI necesita la app de escritorio abierta | Cualquier herramienta que lea archivos | Cortex-MD |
| Contenido de terceros | Sin reglas; el Web Clipper invita a traerlo | Una regla explícita: es dato, no instrucción | Cortex-MD |
| Portabilidad | Wikilinks y embeds solo funcionan en Obsidian | Markdown plano | Cortex-MD |
| Lectura y edición humana | Excelente | Los visores de Markdown de los arneses de agentes | Fuera de la comparación: no es un criterio de la memoria del agente |
| Visualización | Grafo, Bases, Canvas | Ninguna | Fuera de la comparación: la auditoría lee los cambios, no un grafo |
| Madurez | Madura — en la toma de notas humana | Joven | No comparable: dominios distintos |

**Veredicto:** como memoria de un agente, Cortex-MD. Obsidian queda, como mucho, como ventana opcional para el humano.

### Por qué las fortalezas de Obsidian no cuentan acá

1. **Búsqueda.** La búsqueda de Obsidian es exacta, pero no le da al agente nada que `grep` no le dé. Las citas de Cortex-MD son rutas planas, así que `grep` ya es un índice de backlinks; el timeline guía la memoria reciente; y cada registro de sesión empieza con su línea índice (`# YYYY-MM-DD: [Etiquetas] resumen`), así que `--history <Etiqueta>` encuentra cualquier sesión por etiqueta en toda la historia. La memoria de largo plazo se necesita poco por diseño, porque `end.md` sube lo que perdura a las reglas y a `docs/`.
2. **Lectura y edición humana.** Los arneses de agentes ya renderizan Markdown. Y para la memoria, que una persona edite directamente es un riesgo, no una ventaja: la edición saltea el contrato y no deja registro. Pedírselo al agente conserva las dos cosas.
3. **Visualización.** Lo que se audita es el cambio — el git diff, o la tabla Cambios de cada registro de sesión —, no el grafo. El verificador controla la estructura de la pirámide mejor que una mirada a un grafo, que en un proyecto grande es una maraña.
4. **Madurez.** Obsidian es maduro en otro dominio. No existe un protocolo maduro de Obsidian para la memoria de agentes: quien usa una bóveda como memoria del agente empieza escribiendo sus propias reglas — reinventando Cortex-MD sin verificador. Maduro no significa mejor para este propósito.

### Lo que queda abierto

Frente a un ideal, no frente a Obsidian: todavía no hay mediciones del efecto de Cortex-MD en proyectos reales; el verificador no detecta docs huérfanos; y los workflows dependen de que el modelo los siga — los hooks de inicio de sesión ayudan, no garantizan.

## 2. Si sumás Obsidian: qué no hacer

Abrir la carpeta del proyecto como bóveda es seguro: Obsidian renderiza `AGENTS.md` y `docs/`, oculta los comentarios HTML y toma en vivo los cambios del agente. Usalo como **lector**. Esto es lo que lo convierte en un riesgo para la memoria.

### Visibilidad

- **No renombres ni muevas `.agents/` para hacerla visible.** Obsidian ignora toda carpeta cuyo nombre empieza con punto, así que la memoria no aparece. Renombrarla rompe la convención compartida con las herramientas de agentes y todas las rutas del framework. Para ver la memoria, revelá **solo** `.agents` con un plugin como [Hidden Folders Access](https://community.obsidian.md/plugins/hidden-folders-access) u [OpenLoops Hidden Files](https://community.obsidian.md/plugins/openloops-hidden-files) — solo de escritorio, construidos sobre internos no documentados que una actualización de Obsidian puede romper.
- **No uses un symlink en su lugar.** Obsidian desaconseja los symlinks, y los cambios hechos fuera de Obsidian a través de uno no se vigilan: lo que escribe el agente puede dejar el índice desactualizado.
- **No reveles otras carpetas con punto** — `.git`, `.env`, cualquier cosa con credenciales. Los archivos revelados quedan visibles para todos los plugins, incluidos los de sincronización.

### Escritura

- **No edites la memoria a mano — sobre todo mientras el agente consolida** (`end.md`). Una edición directa saltea el contrato (largo, citas, presupuesto de 🔴) y no deja registro; dos escritores sobre un mismo archivo pierden cambios. Pedile al agente que cambie la regla.
- **No edites el timeline.** Se genera con las líneas índice de los registros de sesión (`--timeline`): una edición a mano se pisa, o se reporta como desactualizada.
- **No apuntes las Notas diarias a `.agents/memory/episodic/`.** Con el formato `YYYY/MM/DD`, "la nota de hoy" recibe el nombre de un registro de sesión, y la próxima sesión leería una nota humana como el recuerdo de ayer. El verificador lo reporta recién después.
- **No instales plugins que reescriben archivos en masa** — linters, formateadores, "agregar frontmatter a todas las notas". Editar una propiedad desde la vista de Propiedades también puede reformatear el YAML. Después de cualquier cambio masivo, corré `node .agents/check-memory-contract.js`.

### Sintaxis de Obsidian dentro de la memoria

- **No embebas** (`![[…]]`) en la memoria ni en los docs que cita. El archivo en disco solo contiene la referencia: el agente lee la referencia, no la regla — una falla silenciosa.
- **No conviertas las citas en wikilinks.** Mantené `` → `docs/….md` ``. El verificador reporta un `[[docs/x]]` válido sin `.md` como cita muerta y no ve un `[[stack]]` lateral; los comentarios `%% %%` y el frontmatter YAML en los archivos de reglas producen hallazgos falsos.
- **No reemplaces las `[Etiquetas]` por `#etiquetas` ni por propiedades.** El enrutamiento (`start.md`), el generador del timeline y `--history` leen solo la `[Etiqueta]` de la línea índice de cada registro.
- **No uses casillas de tareas en `active-tasks.md`** (`- [ ]`, `- [x]`): el trabajo terminado se borra, no se tilda (principio 4).
- **No pongas reglas en `%%comentarios%%` ni en callouts.** Los comentarios son invisibles en la vista de lectura pero el agente los lee, así que una persona que revisa en Obsidian no ve lo que el agente obedece; y el verificador saltea las citas, así que una regla dentro de un callout escapa al contrato.

### Dependencias y sincronización

- **No hagas que nada dependa de Obsidian** — su CLI, un plugin, una Base. El agente puede correr en la nube o sin escritorio, donde solo existen los archivos, y la CLI necesita la app de escritorio abierta. Toda vista de Obsidian sigue siendo opcional.
- **No dejes que las skills de agente para Obsidian pisen el contrato.** Paquetes como [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) recomiendan wikilinks, embeds y callouts para cualquier bóveda; en un proyecto Cortex-MD, ganan `AGENTS.md` y los workflows.
- **No dependas de Obsidian Sync para la memoria.** Excluye las carpetas con punto, `.agents/` incluida. Usá git o una herramienta de sincronización de archivos — nunca dos sistemas de sincronización sobre la misma carpeta.
- **No trates los recortes del Web Clipper como instrucciones.** Son contenido de terceros: datos, no instrucciones, y llegan a la memoria o a `docs/` solo con la aprobación del usuario (principio 6).
- **No commitees los archivos de diseño de Obsidian.** Agregá `.obsidian/workspace.json`, `.obsidian/workspace-mobile.json` y `.obsidian/workspaces.json` a `.gitignore`: cambian cada vez que se abre un archivo.

## Fuentes

_Consultadas el 2026-10-22._

- Ayuda de Obsidian: [Cómo guarda los datos Obsidian](https://obsidian.md/help/data-storage) · [Enlaces internos](https://obsidian.md/help/links) · [Propiedades](https://obsidian.md/help/properties) · [Enlaces simbólicos](https://obsidian.md/help/symlinks) · [Configuración de Sync](https://obsidian.md/help/sync/settings) · [CLI](https://obsidian.md/help/cli) · [Notas diarias](https://obsidian.md/help/plugins/daily-notes)
- Carpetas con punto: [Hidden Folders Access](https://community.obsidian.md/plugins/hidden-folders-access) · [OpenLoops Hidden Files](https://community.obsidian.md/plugins/openloops-hidden-files) · [Surfacing hidden folders in Obsidian](https://www.dsebastien.net/surfacing-hidden-folders-in-obsidian-and-building-an-ai-base-on-top/) (dsebastien, 2026)
- [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills)
