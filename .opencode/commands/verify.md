---
description: Executa typecheck, lint e build e resume falhas
agent: build
---

Valide a mudança atual. Execute da raiz:

1. `pnpm typecheck`
2. `pnpm lint`
3. `pnpm build` (se a mudança afetar rotas, build, config ou dependências)
4. Verifique manualmente o fluxo afetado e os estados loading, empty, erro, unauthorized e mobile quando aplicável.

Reporte os comandos exatos, o resultado e as falhas com `arquivo:linha`. Não afirme que passou sem executar.
