---
description: Revisión de staged + commit con intención (workflow de conveniencia opcional)
---

# Workflow: Commit (Opcional)

Un workflow liviano de conveniencia, por fuera del ciclo de vida de la memoria. Usalo cuando el usuario te pida commitear.

1. Leé todos los cambios en **staged** (`git diff --cached`) para entender lo que se trabajó.
2. Creá un único commit desde la terminal cuyo mensaje explique claramente **qué** se hizo y **por qué**.

> Adaptá la convención de mensaje a tu proyecto (ej. Conventional Commits). Este workflow no agrega archivos al stage por vos — revisá primero qué está staged.
