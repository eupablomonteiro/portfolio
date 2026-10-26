---
description: Transforma uma spec em plano técnico e tarefas
agent: build
---

Leia a spec em $ARGUMENTS (ou localize a spec correspondente em `docs/specs/`).

Produza, na mesma pasta da spec:

- `plan.md`: arquitetura, fluxo, contratos, dados, dependências, riscos, segurança, performance, UX e validação.
- `tasks.md`: tarefas pequenas e testáveis, em ordem de dependência, cada uma com critério de conclusão.

Não implemente código ainda. Se a spec estiver ambígua em um ponto que muda comportamento ou segurança, pare e pergunte.
