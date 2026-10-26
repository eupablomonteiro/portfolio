# Plano — Performance de desenvolvimento, build e start

Status: implementado (parcial)
Spec: `docs/specs/performance-dev-build/spec.md`
Data: 2026-10-22
Atualizado: 2026-10-23

## 1. Princípios

- Medir antes de mudar; uma variável por vez.
- Não trocar comportamento, UX, autenticação, schema ou contratos por velocidade.
- Separar cold de warm; cache de `.next` e Turbo pode mascarar o resultado.
- Toda otimização precisa de antes/depois na mesma máquina.
- Se não houver ganho mensurável, reverter, salvo decisão explícita do usuário.
- Medições e decisões ficam registradas na spec ou em `docs/decisions/`.

Baseline conhecido: build direto observado em **39,8s**, home com **173 kB** de First Load JS e **20,5 kB** de rota; dev warm em `/` respondeu em **0,24–0,31s**. O cold start antes das mudanças não foi medido. Após as mudanças, `pnpm start` foi validado na 3000 e o build variou entre 34,6s e 52,1s por I/O de disco.

## 2. Arquitetura da solução

### 2.1 Camada de medição

Não adicionar instrumentação ao produto. Usar comandos e ferramentas locais:

- cronômetro do terminal para “Ready”;
- `Invoke-WebRequest` ou DevTools para primeira compilação e warm;
- edição controlada de `technologies.tsx` para HMR;
- `next build` e `pnpm build` para build;
- `next start` na porta 3000 para produção local;
- output do build para tamanho de rotas e First Load JS.

Se a medição manual se mostrar imprecisa, criar um script pequeno e descartável fora do app, sem dependência nova.

### 2.2 Caminho de dev

O `dev` padrão agora usa Turbopack, com fallback explícito:

```json
"dev": "next dev --turbo",
"dev:webpack": "next dev"
```

Validação feita com `.next` limpo: home, login e redirect de admin responderam; Webpack e Turbopack ficaram próximos em cold start e primeira compilação. Turbopack compilou `/login` em 0,86s contra 4,4s do Webpack. O HMR não foi cronometrado. Não usar `next build --turbo` nesta entrega.

### 2.3 Caminho de build e start

- Medir `pnpm build` (Turbo) e `pnpm --filter @portfolio/web build` (direto).
- Medir `pnpm lint` e `pnpm typecheck` separadamente para estimar o custo dentro do build.
- Não desligar ESLint/typecheck no `next build`.
- Validar `next start` na porta 3000, encerrando apenas processos próprios.
- Não matar processos de dev do usuário.

### 2.4 Caminho de dados: DB e Supabase

O maior risco de chamadas repetidas está em `ProjectsFeed` + `getSignedImageUrl`:

- `ProjectsFeed` resolve capa, capa mobile, galeria e galeria mobile por projeto.
- `getSignedImageUrl` cria um client Supabase novo a cada chamada.

Implementado:

1. client Supabase memoizado de forma lazy, mantendo a validação de env;
2. `unstable_cache` em `trySignedImageUrl`, com TTL de 300s em produção e 60s em dev, tag `signed-image-urls`;
3. `revalidateTag` após mutações do admin;
4. contagem de chamadas por render e o agrupamento em múltiplas URLs ficaram pendentes; o custo não foi medido isoladamente.

Nenhuma mudança de schema, policy ou autenticação.

### 2.5 Caminho de client graph

A home carrega cinco seções client. Antes de refatorar:

- medir os chunks client e o custo de primeira compilação;
- identificar se o gargalo é compilação, execução ou ambos;
- só então avaliar RSC para partes estáticas, `next/dynamic` ou separação de ilhas de motion.

Pré-requisitos para qualquer refatoração:

- preservar animações, Lenis, layout, SEO e estados de loading;
- manter placeholder com dimensões equivalentes para evitar CLS;
- medir e reverter se não houver ganho.

### 2.6 Caminho de assets

- Fontes: mantido `next/font/google`; self-host fica para uma necessidade offline futura.
- Iconify: `@iconify/react` removido e `@iconify-icons/simple-icons@2.0.7` (CC0) instalado; os 25 ícones são renderizados em um sprite server-side, e o client usa `<use>`. `lucide-react` continua para ícones de UI.
- Imagens: avatares e imagens remotas do admin usam `next/image`; previews `blob:` permanecem `<img>` com exceção localizada de lint. Os 5 warnings de `<img>` foram eliminados do build.

## 3. Fluxo de execução

1. **Baseline**: warm, build e start registrados; cold/HMR antes das mudanças ficaram pendentes.
2. **Dev compiler**: Turbopack promovido a padrão, com fallback Webpack; sem ganho de 30% em cold/first compile.
3. **Build**: typecheck/lint/build executados; breakdown por etapa e build via Turbo pendentes.
4. **Dados**: client Supabase memoizado e cache de signed URLs implementado; contagem por render e batching pendentes.
5. **Client graph**: perfil de chunks não executado; RSC/dynamic adiados.
6. **Assets**: ícones locais implementados; fontes mantidas em `next/font/google`.
7. **Validação final**: HTTP/build/start concluídos; visual, mobile, admin autenticado e HMR pendentes.
8. **Registro**: spec, plano, tasks, AGENTS e lições atualizados.

## 4. Contratos e compatibilidade

- `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint` e `pnpm typecheck` continuam existindo.
- `dev` usa Turbopack; `dev:webpack` é o fallback documentado.
- Nenhuma mudança em API pública, schema Prisma, DTOs, Server Actions, auth, middleware ou policies do Supabase.
- Nenhuma variável de ambiente nova é necessária para o núcleo da entrega.
- `pnpm start` continua sendo `next start`; a porta é configurável para evitar conflito.
- Dependências novas exigem justificativa de manutenção, segurança e alternativa nativa.

## 5. Dados e segurança

- Não ler, imprimir ou alterar `.env*`; usar apenas nomes de variáveis.
- Não logar `SUPABASE_SERVICE_KEY`, `AUTH_SECRET`, tokens ou URLs assinadas.
- URLs assinadas continuam server-only e com expiração curta.
- Se houver cache de URLs, ele deve ser server-only, com TTL menor que a expiração e sem persistência no cliente.
- Não relaxar `auth()`, allowlist de e-mail, middleware, Zod, CSP/CORS ou rate limiting.
- O client Supabase memoizado não pode vazar service key para o bundle client.
- Build e dev não podem quebrar quando DB/Supabase estiverem indisponíveis, desde que o fallback atual já cubra o caso.

## 6. Dependências

- Turbopack é nativo do Next; nenhuma dependência para isso.
- `@iconify-icons/simple-icons@2.0.7` foi adicionado para ícones locais (CC0); `@iconify/react` foi removido.
- Nenhuma dependência nova para cache, imagens ou fontes.
- Ferramenta de análise de bundle não foi adicionada; usar o output nativo do `next build`.
- Qualquer dependência nova precisa de auditoria e justificativa registrada.

## 7. Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| Turbopack incompatível com Framer Motion, Lenis, Iconify ou Prisma | Quebra dev | Fallback `dev:webpack`; rotas principais já validadas, visual/mobile pendente |
| Cache de `.next`/Turbo mascara o ganho | Baseline falso | Medir cold, documentar limpeza de artefatos gerados |
| Memoizar Supabase com env ausente | Erro em build/dev | Inicialização lazy e mensagem de erro atual preservada |
| Cache de signed URL expirado | Imagens quebradas | TTL menor que a expiração; fallback para URL nova |
| RSC/dynamic import quebra scroll ou motion | Regressão de UX | Placeholder equivalente, teste visual, reverter se necessário |
| Self-host de fontes muda métricas | Layout shift | Comparar com screenshots e CLS antes/depois |
| Porta 3000 ocupada | `pnpm start` falha | Usar outra porta só na validação; não matar processo alheio |
| Working tree com mudanças não relacionadas | Diff e review confusos | Isolar arquivos da task, não commitar unrelated |

## 8. Metas e método de performance

| Métrica | Resultado observado | Meta | Situação |
|---|---|---|---|
| Dev cold até “Ready” | Webpack ~4,8s; Turbopack ~5,2s | -30% | não atingida |
| Primeira compilação de `/` | ~10,9s em ambos | -30% | não atingida |
| HMR de `technologies.tsx` | não cronometrado | <=2s ou -30% | pendente |
| Warm `/` em dev | 0,208–0,344s | não piorar >10% | mantido |
| Build direto | 34,6s e 52,1s | -20% sobre 39,8s | instável, sem ganho confiável |
| Build via Turbo | não medido após as mudanças | -20% | pendente |
| `pnpm start` | 876ms; `/` e `/login` 200; admin 307 | 200 e redirect correto | atingida |
| Bundle `/` | 167 kB / 20,6 kB | First Load não aumentar | First Load -6 kB; rota +0,1 kB |

O build foi executado em Windows sem SSD, o que explica a variação. Uma única execução sem os warnings do `jose` levou 34,6s; a última, 52,1s. Não usar o melhor número como promessa.

## 9. UX e comportamento

- Preservar aparência, animações, Lenis, espaçamento, tipografia e responsividade.
- Testar `/` em 390px, 768px e 1280px.
- Testar admin em criação, edição, upload, erro e loading.
- Qualquer carregamento dinâmico deve reservar espaço para não gerar CLS.
- `loading`, `empty`, `error` e `unauthorized` continuam com o comportamento atual.
- Nenhuma mudança de copy, ordem de seções ou conteúdo.

## 10. Validação

```bash
pnpm typecheck; if ($?) { pnpm lint }
pnpm build
pnpm start
```

Verificações manuais:

- `/` em dev: primeira compilação, HMR, console sem erros novos.
- `/` em produção local: 200, imagens, fontes, animações e mobile.
- `/login`: 200 e botão GitHub.
- `/admin/projects` sem sessão: redirect para `/login`.
- Admin autenticado: CRUD básico e upload continuam funcionando.
- Banco/Supabase indisponíveis: home não quebra e não expõe erro sensível.
- Comparar First Load JS, tamanho das rotas e tempos antes/depois.

## 11. Decisões fechadas

- Turbopack é o padrão; `dev:webpack` é o fallback.
- Cache de signed URLs permitido: 300s em produção, 60s em dev, tag `signed-image-urls`.
- RSC/dynamic imports ficam para uma fase separada, condicionados a medição.
- Fontes continuam em `next/font/google`.
- Ícones locais: `@iconify-icons/simple-icons` + sprite server-side; licença CC0.
- `pnpm start` usa a porta 3000; outra porta só para validação.
- Build local pode assumir DB/Supabase disponíveis; fallbacks atuais continuam.
- Os 5 warnings de `<img>` foram resolvidos nesta entrega.

Pendências: medir HMR, medir `pnpm build` via Turbo, validar visual/mobile/admin autenticado e decidir se o ganho de bundle justifica uma refatoração RSC futura.
