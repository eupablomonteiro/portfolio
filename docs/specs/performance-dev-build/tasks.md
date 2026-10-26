# Tasks — Performance de desenvolvimento, build e start

Status: implementado (parcial)
Spec: `docs/specs/performance-dev-build/spec.md`
Plano: `docs/specs/performance-dev-build/plan.md`
Atualizado: 2026-10-23

Ordem de dependência. Cada tarefa deve ser pequena, medida e reversível.

## Fase 0 — Baseline

- [x] **T0.1 — Registrar ambiente e protocolo de medição**
  - Windows sem SSD, Node 22.22.2, pnpm 10.33.0, Next.js 14.2.35.
  - Cold = sem `.next`; warm = dev já aquecido.
  - Critério atendido: protocolo e versões registrados na spec.

- [ ] **T0.2 — Medir dev cold antes das mudanças**
  - Não medido antes porque o dev server já estava ativo.
  - Após as mudanças: Webpack ~4,8s até “Ready” e ~10,9s na primeira compilação de `/`; Turbopack ~5,2s e ~10,9s.
  - Pendente: repetir 3 vezes e registrar mediana/faixa.

- [ ] **T0.3 — Medir HMR e warm**
  - Warm medido após as mudanças: `/` em 0,208–0,344s (mediana ~0,237s).
  - HMR não cronometrado; teste interrompido para evitar espera desnecessária.
  - Critério parcial: warm registrado; HMR pendente.

- [x] **T0.4 — Medir build e start**
  - Build direto observado em 39,8s antes; depois 34,6s e 52,1s (variação por I/O).
  - Typecheck e lint executados separadamente: ambos passaram.
  - `pnpm start` na 3000: “Ready” em 876ms; `/` e `/login` com 200.
  - `/admin/projects` sem sessão: 307 para `/login`.
  - Critério atendido; warnings de `jose`/Edge Runtime registrados.

## Fase 1 — Turbopack em dev

- [x] **T1.1 — Promover Turbopack com fallback**
  - `apps/web/package.json`: `dev` = `next dev --turbo`; `dev:webpack` = `next dev`.
  - Critério atendido: app sobe com o script padrão.

- [x] **T1.2 — Validar compatibilidade do Turbopack**
  - Testados `/`, `/login` e `/admin/projects` (redirect).
  - Framer Motion, Lenis e imagens não foram inspecionados visualmente nesta sessão.
  - Prisma/Supabase responderam na home.
  - Critério parcial: rotas e HTTP validados; visual/mobile pendente.

- [x] **T1.3 — Comparar Webpack vs Turbopack**
  - Webpack: Ready ~4,8s; `/` ~10,9s; `/login` ~4,4s.
  - Turbopack: Ready ~5,2s; `/` ~10,9s; `/login` ~0,86s.
  - Critério atendido; não houve ganho de 30% em cold/first compile.

- [x] **T1.4 — Decisão de promoção**
  - Promovido a padrão por decisão do usuário, com fallback Webpack, mesmo sem atingir 30% nas medições.
  - Critério atendido: script final claro e fallback funcional.

## Fase 2 — Build

- [ ] **T2.1 — Decompor o custo do build**
  - `next build` inclui lint/typecheck e não foi perfilado por etapa.
  - Critério pendente: breakdown documentado sem desligar verificações.

- [ ] **T2.2 — Validar cache do Turbo**
  - Build via Turbo não foi medido após as mudanças.
  - Critério pendente: cold/warm com e sem cache.

## Fase 2.5 — Imagens e ícones

- [x] **T2.5.1 — Corrigir warnings de `<img>`**
  - Avatar e imagens remotas do admin usam `next/image`.
  - Previews `blob:` continuam `<img>` com exceção localizada de lint.
  - Critério atendido: build sem os 5 warnings de `<img>`; lint com 0 warnings.

- [x] **T2.5.2 — Ícones locais**
  - `@iconify/react` removido; `@iconify-icons/simple-icons@2.0.7` (CC0) adicionado.
  - Sprite server-side com 25 símbolos no layout público/login; client usa `<use>`.
  - Critério parcial: bundle caiu de 173 kB para 167 kB; render visual dos ícones ainda não conferido no browser.

## Fase 3 — Dados: DB e Supabase

- [ ] **T3.1 — Medir chamadas de dados por render**
  - Número de queries/signed URLs e tempo por etapa não foram contados.
  - Critério pendente.

- [x] **T3.2 — Memoizar o client Supabase**
  - `apps/web/src/lib/supabase.ts` reutiliza o client de forma lazy, preservando a validação de env.
  - Critério atendido: typecheck/lint/build passam e a home responde.

- [ ] **T3.3 — Reduzir assinaturas de URL**
  - API de múltiplas URLs/agrupamento não foi implementada.
  - Critério pendente; depende da medição de T3.1.

- [x] **T3.4 — Cache de signed URLs**
  - `unstable_cache` com TTL de 300s em produção e 60s em dev; tag `signed-image-urls`.
  - `revalidateTag` após mutações do admin.
  - Critério atendido: cache server-only, TTL menor que a expiração e sem URLs no cliente.

## Fase 4 — Client graph

- [ ] **T4.1 — Perfil de chunks e seções client**
  - Não executado.
  - Critério pendente.

- [ ] **T4.2 — Decidir escopo de RSC/dynamic imports**
  - Adiado por decisão registrada.
  - Critério atendido como decisão; implementação não iniciada.

- [ ] **T4.3 — Implementar somente o que foi aprovado**
  - Não aplicável nesta entrega.
  - Critério pendente.

## Fase 5 — Assets opcionais

- [x] **T5.1 — Fontes**
  - Decisão: manter `next/font/google`; self-host fica para necessidade offline futura.
  - Critério atendido como decisão; sem mudança visual.

- [x] **T5.2 — Iconify local**
  - Implementado via sprite server-side e pacote local licenciado em CC0.
  - Critério parcial: bundle e HTML medidos; verificação visual pendente.

## Fase 6 — Fechamento

- [ ] **T6.1 — Validação final**
  - Executados: `tsc --noEmit`, `lint`, `build`, `start`, `/`, `/login` e redirect de admin.
  - Pendentes: visual/mobile (390/768/1280), admin autenticado, HMR, upload/preview e cache real.
  - Critério parcial: validações executadas registradas; não declarar validação visual completa.

- [x] **T6.2 — Atualizar documentos**
  - Spec, plano, tasks, `AGENTS.md` e `docs/lessons.md` atualizados.
  - ADR não foi criado; não houve decisão arquitetural nova além das registradas.
  - Critério atendido: documentos refletem o executado e não contêm segredos.

## Fora de escopo

- Alterar schema, auth, policies do Supabase ou contratos de API.
- Desligar lint/typecheck no build.
- Remover animações ou redesenhar seções.
- Atualizar Next/React/Tailwind de major.
- Commitar ou fazer push sem pedido explícito.

## Validações executadas nesta sessão

- `pnpm --filter @portfolio/web exec tsc --noEmit` — passou.
- `pnpm --filter @portfolio/web lint` — 0 warnings/erros.
- `pnpm --filter @portfolio/web build` — passou; 34,6s e 52,1s em execuções diferentes.
- `next start` na 3000 — `/` 200, `/login` 200, `/admin/projects` 307.
- Dev Webpack e Turbopack com `.next` limpo — rotas principais responderam.
- HTML de produção: 25 símbolos e 30 usos do sprite.

## Pendências para a próxima sessão

1. Validar visual/mobile/admin autenticado e HMR.
2. Medir `pnpm build` via Turbo e HMR uma única vez, com método registrado.
3. Decidir se vale refatorar RSC/dynamic imports ou se o bundle atual é suficiente.
