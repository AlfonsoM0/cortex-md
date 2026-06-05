# Corrección de Error de Edición

**CRÍTICO:** Un archivo falló al ser editado 3 o más veces. Dejá de usar herramientas de diff/parche en este archivo de forma inmediata.

Seguí este procedimiento en su lugar:

1. Leé el **contenido completo** del archivo con tu herramienta de lectura.
2. Construí el **contenido final deseado del archivo** en tu razonamiento — incluyendo las secciones sin cambios.
3. Escribí el contenido completo de vuelta con tu herramienta de sobrescritura de archivos (no append, no parche).

No intentes diffs ni parches parciales en este archivo nuevamente durante esta sesión. Los fallos repetidos indican que el estado actual del archivo divergió de lo que la herramienta de diff espera.

> **Si el archivo es demasiado grande para caber en el contexto:** reducí el cambio a la unidad lógica mínima, leé solo esa sección, modificala y sobrescribí el archivo completo desde tu contenido reconstruido.
