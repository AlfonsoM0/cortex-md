# Cortex-MD: Guía de Escalabilidad Multi-Desarrollador

Al trabajar en equipos con más de un desarrollador, usar Cortex-MD por defecto puede generar conflictos de mezcla (merge conflicts) en Git. Esto ocurre porque múltiples desarrolladores están escribiendo en los mismos archivos de memoria episódica (`timeline.md` y `YYYY/MM/DD.md`) simultáneamente.

Para solucionar esto, la arquitectura se divide en dos capas:

## 1. Neocorteza Centralizada (Repositorio del Proyecto)

- **Ubicación:** Raíz del monorepositorio principal.
- **Contenido:** Reglas de negocio, taxonomía, convenciones de código y los archivos de workflows (`start.md`, `end.md`, etc.).
- **Nivel de mutabilidad:** Bajo (Inmutable en el día a día). Esta memoria es compartida por todo el equipo y solo cambia cuando la arquitectura global o las reglas cambian.

## 2. Hipocampo Distribuido (Repositorio de Memoria Personal)

- **Ubicación:** Un repositorio independiente por cada desarrollador.
- **Contenido:** Memoria episódica exclusiva del desarrollador (registros diarios `YYYY/MM/DD.md` y su `timeline.md` personal).
- **Nivel de mutabilidad:** Alto (Lectura/Escritura autónoma al final de cada sesión).

---

## Configuración Paso a Paso

### 1. Convención de Nombres
Crea un nuevo repositorio para tu memoria personal. La convención es:
`cortex-md-{nombre-proyecto}` (ej., `cortex-md-miempresa`).

### 2. Estructura del Repositorio de Memoria Personal
Inicializa tu repositorio de memoria personal con la siguiente estructura mínima:

```text
/cortex-md-{nombre-proyecto}/
├── README.md                          # Instrucciones de configuración
└── episodic/
    └── timeline.md                    # Índice personal (misma estructura que el original)
```

### 3. Estrategia de Clonación
Clona ambos repositorios en el mismo directorio padre para que sean hermanos:

```text
/workspace/
├── {nombre-proyecto}/                 # Repo principal del proyecto (donde programas)
└── cortex-md-{nombre-proyecto}/       # Repo de memoria personal
```

## Adaptación de Workflows

Dado que Cortex-MD funciona con simples archivos Markdown, puedes adaptarlo a esta configuración distribuida simplemente modificando las rutas en tus workflows core.

En tu repositorio principal del proyecto, abre `.agents/workflows/start.es.md` y `.agents/workflows/end.es.md`, y cambia las rutas que apuntan a la memoria episódica para usar rutas relativas que apunten a tu repositorio de memoria personal hermano.

### Ejemplo: Modificando `start.es.md`

Cambia esta línea:
`1. **Lee el archivo:** .agents/memory/episodic/timeline.md`
Por:
`1. **Lee el archivo:** ../cortex-md-{nombre-proyecto}/episodic/timeline.md`

### Ejemplo: Modificando `end.es.md`

Cambia la ruta de creación de archivo:
`2. Crea o actualiza el archivo: .agents/memory/episodic/YYYY/MM/DD.md`
Por:
`2. Crea o actualiza el archivo: ../cortex-md-{nombre-proyecto}/episodic/YYYY/MM/DD.md`

Cambia la ruta de actualización del índice:
`2. **Lee el archivo:** .agents/memory/episodic/timeline.md`
Por:
`2. **Lee el archivo:** ../cortex-md-{nombre-proyecto}/episodic/timeline.md`

---

💡 *Nota de Orquestación:* Las herramientas de IA (como Roo Code o Antigravity CLI) operan en el repositorio del proyecto `./` usando rutas relativas hacia el repositorio de memoria personal `../cortex-md-{nombre-proyecto}/`. Esto permite al agente leer la memoria semántica global del repositorio principal y escribir sus registros episódicos en tu repositorio personal sin causar conflictos de Git para tus compañeros de equipo.
