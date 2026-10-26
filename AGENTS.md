# AGENTS.md — Portfólio Pablo Monteiro

Este arquivo é a instrução always-on do projeto. Mantenha-o curto: detalhes vão em `docs/` e são carregados sob demanda.

## Visão

Monorepo de portfólio full-stack com área pública e admin. Código de produção, não protótipo. O objetivo é demonstrar engenharia, segurança e UX sem overengineering.

## Estrutura

- `apps/web` — aplicação Next.js (App Router/RSC).
- `packages/ui` — componentes visuais compartilhados.
- `packages/shared` — tipos/utilitários compartilhados.
- `packages/config` — configurações compartilhadas.
- `docs/` — planejamento, specs, decisões, lições e referências.

Dentro de `apps/web/src`:

- `app/` — rotas, layouts, Server Actions e route handlers.
- `components/` — UI e componentes de feature.
- `sections/` — seções da landing.
- `services/` — regras de negócio.
- `repositories/` — acesso a dados.
- `dto/` — schemas Zod e contratos.
- `lib/` — auth, env, db, utils e integrações.
- `generated/prisma/` — client Prisma gerado; não editar à mão.

## Stack

Next.js 14.2 (App Router, RSC), React 18.3, TypeScript 5.6 strict, Tailwind CSS 4, Auth.js v5 beta, Prisma 7 + `@prisma/adapter-pg`, PostgreSQL 16, Zod 4, Supabase Storage, pnpm 10, Turborepo 2.

## Comandos

Execute da raiz, salvo indicação contrária:

- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm format`
- `docker compose up -d` (Postgres local)
- `pnpm --filter @portfolio/web exec prisma generate`
- `pnpm --filter @portfolio/web exec prisma migrate dev`
- `pnpm --filter @portfolio/web exec prisma studio`

Não há suíte de testes configurada. Se criar uma, registre o comando aqui.

## Arquitetura e convenções

- Fluxo: `app` → `services` → `repositories` → `lib/db` → Prisma.
- `app` não importa `@/lib/db` nem o client Prisma diretamente. Regra de negócio não fica em componente ou route handler.
- Server Actions validam entrada com Zod nos DTOs/services; não confie em IDs, roles ou permissões enviados pelo cliente.
- Toda ação admin chama `auth()` e compara o e-mail com `env.GITHUB_ALLOWED_EMAIL`. O `middleware.ts` protege `/admin/:path*`.
- Após mutações, revalide os caminhos afetados com `revalidatePath`.
- `packages/ui` não importa `apps/web`; `packages/shared` não importa framework.
- RSC-first: use `"use client"` apenas para interatividade, hooks ou APIs do browser.
- Não exponha código server-only, segredos ou variáveis privadas no bundle client.
- TypeScript strict: evite `any`; use `unknown` + Zod nas bordas.
- Prettier: aspas duplas, ponto e vírgula, trailing commas, printWidth 120.
- Não adicione dependências sem justificar manutenção, segurança e alternativa nativa.
- Não altere contratos de API, schema ou semântica de dados silenciosamente.

## Limites obrigatórios

- Nunca abra, leia, imprima, copie ou altere arquivos `.env*`. Refira-se a variáveis apenas pelo nome.
- Nunca faça commit de segredos, tokens, chaves ou credenciais.
- Não edite `apps/web/src/generated/prisma/` manualmente.
- Não relaxe autenticação, autorização, CORS, CSP, validação ou rate limiting para "fazer funcionar".
- Não refatore código não relacionado à tarefa.

## Definition of done

1. `pnpm typecheck` passa.
2. `pnpm lint` passa.
3. `pnpm build` passa quando a mudança afetar rotas, build, config ou dependências.
4. O fluxo afetado foi verificado manualmente, incluindo loading, empty, erro, unauthorized e mobile quando aplicável.
5. Nenhum `.env` foi lido ou alterado.
6. O relatório final lista apenas validações realmente executadas.

## Fluxo de trabalho

- Tarefa não trivial: spec → plano → implementação → validação → review.
- Use `/spec`, `/plan-feature`, `/verify`, `/review` e `/handoff`.
- Antes de editar múltiplos arquivos ou mudar arquitetura, apresente um preview do plano.
- Para análise sem edição, use o modo Plan (Tab).
- Não declare "pronto" ou "seguro" sem evidência.
- Agrupe comandos independentes em uma única chamada de shell quando possível.
- Não rode build completo após mudança pequena; use lint, typecheck ou teste específico. Reserve o build para mudanças de rota/build/config/deps e para a validação final.
- Reaproveite resultados de validações anteriores enquanto os arquivos relevantes não mudarem; não repita build ou dev start sem necessidade.

## Índice de docs (carregar sob demanda)

- `docs/README.md` — mapa dos documentos.
- `docs/planejamento-portfolio.md` — leia antes de planejar ou implementar features.
- `docs/system-prompt.md` — referência profunda de engenharia; leia apenas as seções relevantes.
- `docs/specs/` — leia a spec da feature em trabalho.
- `docs/decisions/` — leia ADRs da área afetada.
- `docs/lessons.md` — leia antes de começar; registre erros repetidos.
- `docs/handoffs/` — leia o handoff mais recente ao retomar trabalho.
- `docs/skills.md` — como instalar, criar e usar skills.
