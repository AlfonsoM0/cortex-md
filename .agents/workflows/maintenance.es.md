---
description: Chequeo semanal de la memoria (automático, liviano)
---

# Workflow: Chequeo Semanal (Mantenimiento Liviano)

**Contexto del Sistema:** Lo dispara `start.md` solo, sin que el usuario lo pida: el usuario no tiene por qué saber cuándo hace falta un defrag, una limpieza o una re-alineación. El chequeo **no reescribe la memoria**: detecta y recomienda. Lo único que escribe es su propio registro en `.agents/memory/maintenance-log.md`. Tarda pocos minutos.

## Cuándo corre

- **Día de mantenimiento:** el que figura en `AGENTS.md § Mantenimiento automático` (por defecto, viernes). Si dice "desactivado", no corre.
- **Corre en la primera sesión desde ese día en la que todavía no se hizo.** El agente no tiene reloj entre sesiones: si el usuario no trabaja el viernes, corre el lunes. Regla: corre si el último chequeo de `maintenance-log.md` es anterior a la última vez que fue el día de mantenimiento.
- **Primero lo del usuario.** Si llegó con algo urgente, hacé el chequeo al final de la sesión.
- **Lo ejecuta un solo agente:** el que conversa con el usuario. En un equipo de personas, el responsable que nombre `AGENTS.md`.
- Si no sabés la fecha de hoy, obtenela del sistema (ej. `date`) o preguntala; nunca la supongas.

## Chequeos

1. **Contrato y tamaño:** `node .agents/check-memory-contract.js` — hallazgos y carga fija en tokens. Sin Node: sumá el tamaño de los archivos de carga fija (`start.md § Fase 1`) y revisá a ojo las entradas más largas.
2. **Sesiones sin consolidar:** trabajo posterior a la última entrada del timeline.
   - Con git: commits posteriores a esa fecha (`git log --since=<fecha>`).
   - Sin git: archivos del espacio de trabajo modificados después de esa fecha, fuera de `.agents/` (ej. `find . -newer .agents/memory/episodic/timeline.md -type f -not -path "./.agents/*"`).
3. **Higiene de `active-tasks.md`:** ítems con ✅ que deberían haberse borrado, `[Watch]` con el disparador vencido, fechas ya pasadas, "verificar" que llevan semanas.
4. **Sesiones desde el último defrag:** entradas del timeline posteriores a la fecha del último defrag de `maintenance-log.md`.
5. **Crecimiento de la carga fija** contra el valor anotado en el último defrag.
6. **Brief:** fecha de la última revisión (`maintenance-log.md`) y objetivos de `docs/00-PROJECT-BRIEF.md` con fecha vencida.
7. **Timeline:** más de 50 entradas, o entradas que crecieron a párrafo.

## Decisión: una recomendación, no una lista

| Si encontraste…                                                                                                                  | Recomendá                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Sesiones sin consolidar                                                                                                          | Registrarlas ahora (`end.md` Fases 1-2, con lo que muestren los cambios).                           |
| Pendientes para limpiar                                                                                                          | Revisarlos con el usuario: listalos numerados y que confirme cuáles ya no aplican.                  |
| ≥ 15 sesiones desde el último defrag · carga fija +25 % · hallazgos del verificador · > 60 días y ≥ 5 sesiones desde el último    | Un defrag completo (`defrag.md`).                                                                   |
| Brief sin revisar hace > 90 días, u objetivos vencidos                                                                           | La revisión rápida del brief (`references/alignment-interview.md § Re-alineación`).                 |
| Señales de cambio de rumbo en las últimas sesiones                                                                               | Una re-alineación.                                                                                  |
| Nada de lo anterior                                                                                                              | Nada: "Chequeo semanal: la memoria está en orden."                                                  |

- **Si hay varias, ofrecé como mucho dos**, en este orden: consolidar > limpiar > defrag > revisión del brief. Lo demás queda para el próximo chequeo.
- **Defrag con un modelo liviano:** si el modelo en uso no es de razonamiento fuerte, recomendá hacerlo con uno más capaz en lugar de ejecutarlo.

## Cómo decirlo

- **Tres líneas como máximo, sin jerga:** qué encontraste, qué recomendás y cuánto tarda. Ej.: _"Chequeo semanal: hay 2 pendientes que parecen resueltos. ¿Los repasamos (2 min)?"_
- **Proponer, nunca imponer.** Todo lo que modifique la memoria se ejecuta solo con el sí del usuario.
- **Si lo pospone, no insistas** hasta el próximo día de mantenimiento. Si un defrag necesario se pospuso tres veces, explicá una vez en dos frases por qué conviene, y respetá la decisión.

## Registro

Actualizá `.agents/memory/maintenance-log.md`: fecha del chequeo, resultado en una línea y, si se pospuso algo, la cuenta de posposiciones. El chequeo **no va al timeline** (sería ruido semanal); el defrag y la re-alineación sí.
