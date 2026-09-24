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

En tu repositorio principal, abrí `.agents/workflows/start.md`, `end.md` y `defrag.md` y reemplazá **todas** las rutas de la memoria episódica por la ruta relativa al repositorio de memoria personal:

```text
.agents/memory/episodic/   →   ../cortex-md-{nombre-proyecto}/episodic/
```

Afecta al índice (`timeline.md`) y a los registros diarios (`YYYY/MM/DD.md` y `DD-sN.md`). Buscalas con `grep -n "memory/episodic" .agents/workflows/*.md` y verificá que no quede ninguna: una ruta olvidada hace que el agente escriba el episódico en el repositorio compartido.

---

💡 *Nota de Orquestación:* Las herramientas de IA (como Roo Code o Antigravity CLI) operan en el repositorio del proyecto `./` usando rutas relativas hacia el repositorio de memoria personal `../cortex-md-{nombre-proyecto}/`. Esto permite al agente leer la memoria semántica global del repositorio principal y escribir sus registros episódicos en tu repositorio personal sin causar conflictos de Git para tus compañeros de equipo.
