# Entrevista de Alineación (referencia de `init.md`)

**Para qué:** que el agente y el usuario compartan la misma imagen del proyecto — qué problema resuelve, qué se quiere lograr, cómo se trabaja hoy, qué no admite error, qué apura, dónde está la información y cuánta autonomía tiene el agente. Sin esa imagen, la memoria registra suposiciones y el agente optimiza lo que no importa.

Sirve para cualquier proyecto: un producto de software, un comercio, una consultora, una investigación o la vida administrativa de una persona. Las preguntas usan palabras de negocio; adaptalas al dominio.

## Cómo conducirla

- **Conversación, no formulario.** Dos o tres preguntas por turno, empezando por las abiertas. Seguí el hilo del usuario: si al contestar una pregunta ya responde otras, no las repitas.
- **Primero leé, después preguntá.** Lo que ya dicen el repositorio, el README o los documentos compartidos no se pregunta: se **confirma** ("Entiendo que X, ¿es así?").
- **Pedí lo concreto.** Ante una respuesta vaga, pedí un ejemplo, un número o "la última vez que pasó". _"Los proveedores fallan"_ → _"¿Cuál fue el último que falló, y qué costó?"_
- **Reflejá al cerrar cada bloque:** 3-5 viñetas con lo que entendiste, y pedí que corrija. Es donde se detectan los malentendidos.
- **Respetá el tiempo.** Al empezar, preguntá de cuánto tiempo dispone. Las preguntas ★ son esenciales; el resto profundiza. La entrevista puede repartirse en varias sesiones: lo que falte queda como pendiente en `active-tasks.md`.
- **"No sé" es una respuesta válida.** Registrala como incógnita a verificar; nunca la completes con una suposición.
- **Nunca pidas credenciales ni datos personales de terceros.** Preguntá **dónde** viven, no qué dicen.
- **Profundidad proporcional al riesgo.** Un proyecto personal chico puede quedarse en los bloques 1, 2, 3, 6 y 9; uno que maneja dinero, datos de terceros o clientes recorre todos.

## Bloques de preguntas

### 1. El proyecto y su gente

- ★ ¿Qué es el proyecto, en dos frases, y para quién es?
- ★ ¿En qué etapa está: idea, en construcción, operando, creciendo, en crisis?
- ★ ¿Cuál es tu rol, y quién más participa o se ve afectado (socios, empleados, clientes, proveedores, otros agentes de IA)?
- ¿Quién decide qué? ¿Hay alguien más a quien el agente deba rendir cuentas o consultar?

### 2. Problemas

- ★ ¿Qué problema resuelve el proyecto para sus clientes o destinatarios?
- ★ ¿Qué problema querés resolver **vos** con la ayuda de un asistente? ¿Qué te quita más tiempo, dinero o tranquilidad hoy?
- ¿Cuándo fue la última vez que ese problema te costó algo concreto? ¿Cuánto?
- ¿Qué pasa si no se resuelve en los próximos meses?

### 3. Objetivos y éxito

- ★ ¿Qué querés lograr en 3, 6 y 12 meses? (Buscá objetivos específicos, medibles y con fecha.)
- ★ ¿Cómo vas a saber que funcionó? ¿Qué número o señal lo prueba?
- ¿Qué **no** es un objetivo? ¿Qué quedó afuera a propósito?
- Cuando velocidad, calidad y costo chocan, ¿cuál gana, y en qué casos cambia?
- ¿Qué significa "terminado" o "suficientemente bueno" en tu proyecto?

### 4. Procedimientos actuales

Recorré con el usuario **una semana típica**, y para cada procedimiento que aparezca:

- ★ ¿Qué lo dispara (un pedido, una fecha, un aviso)? ¿Cuáles son los pasos, con qué herramienta, y qué produce al final?
- ★ ¿Quién lo hace, cada cuánto y cuánto tarda?
- ¿Dónde suele fallar o demorarse? ¿Qué excepciones aparecen y quién las resuelve?
- ¿Está escrito en algún lado, o vive en la cabeza de alguien?

### 5. Qué automatizar y cómo

- ★ ¿Qué tarea te gustaría no volver a hacer nunca más?
- Para cada procedimiento del bloque 4, evaluá con el usuario:
  - **Frecuencia y volumen:** algo que pasa una vez al año rara vez justifica automatizarlo.
  - **Reglas o criterio:** ¿sigue reglas fijas, o exige juicio?
  - **Excepciones:** si el mismo camino se repite en 8 o 9 de cada 10 casos, conviene automatizar ese camino y derivar las excepciones a una persona.
  - **Datos:** ¿la información de entrada está digital y ordenada, o en papel, fotos o mensajes sueltos?
  - **Estabilidad:** si el procedimiento cambia seguido, primero se estabiliza y después se automatiza.
  - **Costo de un error y reversibilidad:** ¿qué pasa si sale mal, y se puede deshacer?
- Clasificá cada uno en: **script** (determinístico y repetitivo) · **agente de IA** (lenguaje, clasificación, redacción, criterio acotado) · **agente con aprobación humana** (el agente prepara, una persona aprueba) · **solo humano**.

### 6. Lo importante: dónde hay que tener cuidado

- ★ ¿Qué tareas no admiten error? (Dinero, datos personales, temas legales o fiscales, reputación, la relación con un cliente clave.)
- ★ ¿Qué acciones son **irreversibles**?
- ¿Qué salió mal alguna vez y no puede repetirse?
- ¿Qué reglas no se rompen nunca, aunque alguien lo pida con apuro?

### 7. Lo urgente: qué tiene prioridad

- ★ ¿Qué tiene fecha límite, y qué se bloquea si no se hace a tiempo?
- ¿Qué incendios se repiten? ¿Hay temporadas o picos (fin de mes, vencimientos, fechas festivas)?
- ¿Cuánto puede esperar una respuesta a un cliente, a un proveedor, a vos?
- Con esto se arma la matriz de Eisenhower: importante y urgente (P1), importante (P2), urgente pero no importante (P3), ni una cosa ni la otra (P4).

### 8. Autonomía del agente

Ubicá cada tipo de tarea según **si su resultado se puede verificar fácil** y **si se puede deshacer fácil**:

| | Fácil de deshacer | Difícil de deshacer |
| --- | --- | --- |
| **Fácil de verificar** | El agente actúa solo | El agente actúa y avisa; el usuario revisa |
| **Difícil de verificar** | El agente propone; el usuario decide | Solo con aprobación explícita, o nunca |

- ★ ¿Qué puede hacer el agente sin preguntar? ¿Qué tiene que proponer y esperar tu aprobación? ¿Qué no debe hacer nunca?
- ★ ¿Un mensaje a un cliente o a un proveedor puede salir sin que lo leas?
- ¿Puede gastar dinero, borrar información o cambiar configuraciones? ¿Con qué límite?
- Cuando el agente tenga que consultarte, ¿cómo lo preferís? (Recomendación: que traiga su propuesta y el costo de equivocarse, para que puedas responder en una palabra; y que agrupe las consultas.)

### 9. Dónde está la información

- ★ ¿Dónde vive la información útil: sistemas, planillas, carpetas, correo, chats, papel, tu cabeza?
- ★ Para cada tipo de dato (stock, clientes, ventas, código, documentos), ¿cuál es la **fuente de verdad**? Si dos lugares dicen cosas distintas, ¿cuál gana?
- ¿Quién la actualiza y cada cuánto? ¿Qué está desactualizado o duplicado?
- ¿Cómo está organizada y nombrada? ¿Hay convenciones de carpetas o de archivos?
- ¿A qué puede acceder el agente, y con permiso de lectura o también de escritura?
- ¿Qué conocimiento importante no está escrito en ningún lado?

### 10. FODA y pre-mortem

- ★ **Fortalezas:** ¿qué hace bien el proyecto, mejor que otros?
- ★ **Debilidades:** ¿qué le falta o hace mal hoy?
- **Oportunidades:** ¿qué cambio del entorno (mercado, tecnología, regulación) podría aprovechar?
- **Amenazas:** ¿qué del entorno podría dañarlo (competencia, costos, dependencias de un proveedor)?
- ★ **Pre-mortem:** _"Imaginá que dentro de seis meses esto fracasó. ¿Qué fue lo que salió mal?"_ Cada respuesta es un riesgo a vigilar.

### 11. Restricciones

- ¿Qué presupuesto hay, incluido el de las herramientas de IA?
- ¿Cuánto tiempo por semana podés dedicarle, y cuánto puede el agente pedirte?
- ¿Hay obligaciones legales, fiscales o de privacidad? ¿En qué país o países opera, y en qué idiomas?
- ¿Hay herramientas obligatorias o prohibidas?

### 12. Criterios de decisión

- ★ Cuando dos cosas buenas chocan (rápido vs. seguro, barato vs. cómodo, automatizar vs. controlar), ¿qué suele ganar?
- ¿Qué decisiones puede tomar el agente con su criterio, y cuáles son siempre tuyas?
- ¿Qué decisiones ya tomadas no se vuelven a discutir?

### 13. Forma de trabajo y comunicación

- ★ ¿En qué idioma y con qué tono preferís trabajar? ¿Respuestas cortas o detalladas?
- ¿Con qué frecuencia vas a trabajar con el agente? ¿Cómo querés que te avise de un problema?
- ¿Qué te molesta de un asistente? (Ej. que pregunte demasiado, que asuma, que se extienda.)
- ¿Qué términos, siglas o nombres propios usa el proyecto? (Arman el glosario.)
- ★ Una vez por semana el agente revisa la memoria y, si hace falta, propone ordenarla. ¿Qué día te queda mejor? (Por defecto, **viernes**, para cerrar la semana. Se puede desactivar.)

### 14. Historia y aprendizajes

- ¿Qué se intentó antes y no funcionó? ¿Por qué?
- ¿Qué error salió caro y qué se aprendió?

## Síntesis: a dónde va cada respuesta

La entrevista no se guarda como transcripción: cada respuesta se convierte en documento, regla o pendiente, según el contrato de la memoria (`end.md § Fase 3`).

| Respuestas | Destino |
| --- | --- |
| Proyecto, problemas, objetivos y métricas, no-objetivos, FODA, pre-mortem, restricciones | `docs/00-PROJECT-BRIEF.md` — el **por qué** del proyecto. `AGENTS.md § Contexto` guarda un resumen de 3-5 líneas y lo cita. |
| Criterios de decisión, lo que no admite error, lo irreversible | `docs/01-GUIDELINES.md` — cómo se decide. Las reglas invariables pasan a `business-rules.md` con su cita. |
| Autonomía del agente y forma de consultar | `AGENTS.md` (se carga siempre: los permisos tienen que estar presentes en toda sesión). |
| Procedimientos actuales | `docs/` (un doc por procedimiento o por feature); los flujos principales, como regla + cita en `architecture.md`. |
| Fuente de verdad por tipo de dato, sistemas y accesos | `stack.md` (la fuente primaria, en la primera línea) y `architecture.md`. |
| Candidatos a automatizar | `active-tasks.md`, clasificados por prioridad y esfuerzo, indicando script / agente / agente con aprobación. |
| Urgencias, fechas límite, temporadas | `active-tasks.md`: P1 o `[Watch]` con su disparador. |
| Riesgos del pre-mortem y amenazas | `active-tasks.md` como `[Watch]` con disparador, y el detalle en el brief. |
| Idioma, tono, estilo | `AGENTS.md` (comportamiento base) y `conventions.md` (formatos y plantillas). |
| Día de mantenimiento | `AGENTS.md § Mantenimiento automático` (por defecto, viernes). |
| Glosario | `docs/glossary.md`, citado desde `conventions.md`. |
| Áreas o dominios del proyecto | Propuesta de etiquetas para `taxonomy.md` (con aprobación). |
| Historia y aprendizajes | El episódico de la sesión de alineación; si dejó una regla, esa regla va a su archivo con cita. |
| Incógnitas ("no sé") | `active-tasks.md` como pendientes a verificar. |

## Cierre: confirmar la alineación

Antes de escribir la memoria, presentá una **síntesis de una página** en tres partes:

1. **Lo que entendí** — el proyecto, sus problemas, objetivos, riesgos y prioridades.
2. **Lo que todavía no sé** — las incógnitas.
3. **Lo que voy a hacer** — qué documentos y archivos de memoria voy a crear, y los primeros pasos propuestos.

Pedí confirmación explícita. Recién con la síntesis aprobada se pasa a poblar la memoria.

## Re-alineación

La entrevista no se hace una sola vez, pero tampoco se repite entera. El chequeo semanal (`maintenance.md`) propone uno de dos formatos:

- **Revisión rápida del brief** — cuando pasaron más de 90 días desde la última revisión o hay objetivos vencidos. Tres preguntas, a partir del brief vigente:
  1. ¿Los objetivos siguen siendo estos? ¿Alguno se cumplió o dejó de importar?
  2. ¿Cambió algo importante: clientes, equipo, herramientas, dinero, reglas?
  3. ¿Las prioridades siguen en el mismo orden?

  Si todo sigue igual, se anota la fecha de revisión y listo; si algo cambió, se pasa a la re-alineación.
- **Re-alineación** — ante señales de cambio: el proyecto cambió de etapa o de rumbo, se cumplieron o vencieron los objetivos, entró gente o una herramienta nueva, o **el usuario corrigió al agente varias veces en la misma dirección** (la señal más clara de que la memoria describe otro proyecto). Se repiten solo los bloques afectados, partiendo del brief vigente.

Al terminar cualquiera de los dos, actualizá el brief y la fecha de revisión en `.agents/memory/maintenance-log.md`; la re-alineación se registra además en el timeline.
