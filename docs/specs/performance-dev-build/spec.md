# Spec — Performance de desenvolvimento, build e start

Status: implementado (parcial)
Data: 2026-10-22
Atualizado: 2026-10-23

## Problema

O ciclo local está lento para iterar:

- `pnpm dev` demora para ficar pronto e/ou para compilar a primeira página.
- `pnpm build` é demorado e o fluxo `pnpm build` → `pnpm start` ainda não é usado de forma confiável.
- O servidor de dev em execução respondeu `200` em ~0,24–0,31s para `/` (warm), então o gargalo percebido parece estar principalmente em cold start, primeira compilação, HMR e build — não no request warm.

O objetivo é reduzir o tempo de feedback sem sacrificar segurança, qualidade, UX ou o comportamento atual do site.

## Usuários e cenários

- **Desenvolvedor (Pablo)**: inicia o ambiente, altera uma seção e vê o resultado rápido.
- **Desenvolvedor no admin**: abre `/admin/projects` e `/admin/experience` e itera em formulários e actions.
- **Revisor/CI**: executa `pnpm lint`, `pnpm typecheck` e `pnpm build` com tempo previsível.
- **Validação local de produção**: executa `pnpm build` e `pnpm start` para testar o bundle de produção.

Fluxos principais:

1. `pnpm dev` → aguardar “Ready” → abrir `/` → editar `technologies.tsx` → ver HMR.
2. `pnpm build` → `pnpm start` em porta livre → abrir `/`, `/login` e `/admin/projects`.
3. Banco/Supabase indisponível → home continua renderizando com estados vazios; build não quebra.

## Critérios de aceite

Os números abaixo são relativos ao baseline medido antes da implementação, na mesma máquina, com as mesmas versões de Node, pnpm e Next.js.

- [x] Baseline warm registrado: `/` em dev respondeu 0,208–0,344s (mediana ~0,237s).
- [ ] Baseline cold de dev: não medido antes das mudanças porque o dev server já estava ativo.
- [ ] `pnpm dev` cold start 30% mais rápido: Turbopack ficou em ~5,2s até “Ready” e Webpack em ~4,8s; não houve ganho mensurável.
- [ ] Primeira compilação de `/` 30% mais rápida: Turbopack ~10,9s e Webpack ~10,9s; sem ganho mensurável.
- [ ] HMR em até 2s: não medido após a mudança; o teste foi interrompido para evitar mais espera.
- [x] Warm `/` em dev não piorou: 0,208–0,344s após a mudança.
- [ ] `pnpm build` 20% mais rápido: medições de 34,6s e 52,1s contra 39,8s observados; resultado variável por I/O, sem ganho confiável.
- [x] `pnpm build` passa; os 5 warnings de `<img>` foram eliminados. Os warnings de `jose`/Edge Runtime continuam aparecendo em algumas execuções e não são desta mudança.
- [x] `pnpm start` respondeu `200` em `/` e `/login` na porta 3000.
- [x] `/admin/projects` sem sessão redirecionou para `/login`; auth não foi alterada.
- [x] First Load JS de `/` caiu de 173 kB para **167 kB**. A rota `/` ficou em **20,6 kB** (20,5 kB antes), +0,1 kB.
- [x] Nenhuma mudança de contrato de API, schema ou autenticação.
- [x] Ícones locais via sprite reduziram o bundle; a memoização/cache do Supabase reduz chamadas repetidas por design, mas a contagem por render ainda não foi medida.
- [ ] Validação visual completa (animações, mobile e admin autenticado): pendente de verificação no browser.

## Não-objetivos

- Atualizar Next.js, React ou Tailwind para uma major nova.
- Remover Framer Motion, Lenis ou os efeitos visuais atuais.
- Redesenhar a landing ou o admin.
- Desligar ESLint/typecheck dentro de `next build`.
- Alterar schema Prisma, autenticação, autorização, policies do Supabase ou contratos de API.
- Adicionar serviços pagos, CDN ou infraestrutura extra.
- Criar uma suíte completa de testes ou configurar CI.
- Micro-otimizar todos os componentes de uma vez.

## Edge cases e estados

- **Loading**: o tempo até “Ready” e a primeira compilação precisam ser medidos separadamente; não misturar com cache warm.
- **Empty**: banco vazio ou indisponível não pode quebrar o build; a home deve cair nos estados vazios atuais.
- **Erro**: falha de DB/Supabase em dev ou build não pode vazar segredos nem impedir o build quando o fallback atual já cobre o caso.
- **Unauthorized**: `/admin/*` sem sessão continua redirecionando para `/login`; testar em dev e em `pnpm start`.
- **Conflito**: a porta padrão é 3000. Se estiver ocupada, usar outra porta apenas para a validação; não matar processos de terceiros.
- **Cache**: `.next` e cache do Turbo podem mascarar o baseline; medir cold removendo apenas artefatos gerados e documentar o que foi limpo.
- **Mobile**: medir a home em produção local com viewport mobile; não pode haver regressão de LCP/CLS ou overflow.

## Segurança e dados

- Nunca ler, imprimir ou alterar `.env*`; referenciar apenas nomes como `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` e `AUTH_SECRET`.
- Não expor service key, tokens ou URLs assinadas em logs, mensagens de erro, build output ou bundle client.
- URLs assinadas continuam com expiração curta; se houver cache, respeitar a expiração e não persistir no cliente.
- Não relaxar middleware, `auth()`, allowlist de e-mail, validação Zod, CSP/CORS ou rate limiting para ganhar velocidade.
- Novas dependências precisam de justificativa de manutenção, segurança e alternativa nativa.
- O build de produção não pode incluir segredos server-only no client bundle.

## Resultados

Ambiente: Windows sem SSD, Node 22.22.2, pnpm 10.33.0, Next.js 14.2.35. O I/O do disco torna as medições de build instáveis.

- `apps/web/package.json` agora usa `next dev --turbo`; `dev:webpack` mantém o fallback.
- Dev cold medido após as mudanças: Webpack “Ready” em ~4,8s e primeira compilação de `/` em ~10,9s; Turbopack “Ready” em ~5,2s e primeira compilação em ~10,9s. O `login` compilou em 0,86s no Turbopack contra 4,4s no Webpack.
- Build: 34,6s em uma execução sem os warnings do `jose` e 52,1s em outra; o baseline observado era 39,8s. Não há ganho confiável de 20% sem desligar lint/typecheck, o que não foi feito.
- Bundle: `/` caiu de **173 kB** para **167 kB** de First Load JS; rota de 20,5 kB para 20,6 kB. Admin e login também reduziram.
- `pnpm start` na 3000: “Ready” em 0,88s; `/` e `/login` com 200; `/admin/projects` com 307 para `/login`.
- `@iconify/react` foi removido. Ícones `simple-icons` são servidos por um sprite SVG local no layout público/login, sem requisições à API do Iconify e sem dados de ícone no bundle client. Ícones de UI continuam via `lucide-react`.
- `createSupabaseClient` é memoizado; `trySignedImageUrl` usa `unstable_cache` com TTL de 300s em produção e 60s em dev, tag `signed-image-urls` e invalidação após mutações.
- As imagens remotas do admin usam `next/image`; previews `blob:` continuam `<img>` com exceção localizada de lint, pois não são otimizáveis pelo servidor e não são LCP.
- Fontes continuam em `next/font/google`; não há self-host local nesta entrega.
- RSC/dynamic imports não foram refatorados; ficam condicionados a uma medição que mostre o client graph como gargalo.
- Ambientes: local usa Docker/Postgres e Supabase cloud; produção usa as envs da Vercel. Não há conexão do app local com o banco de produção nesta entrega.

## Validação

Medições devem ser feitas com a mesma máquina e condições, registrando versões e se o cache estava cold ou warm.

```bash
# qualidade (uma chamada)
pnpm typecheck; if ($?) { pnpm lint }

# build e start na porta 3000
pnpm build
pnpm start
```

Verificações manuais:

- `/` em dev: primeira compilação, HMR de `technologies.tsx`, loading das seções e comportamento mobile.
- `/` em produção local: status 200, HTML renderizado, imagens e fontes carregando.
- `/login`: status 200 e botão GitHub funcional.
- `/admin/projects` sem sessão: redireciona para `/login`.
- Banco/Supabase indisponíveis: home não quebra e não expõe erro sensível.
- Comparar First Load JS e tamanho das rotas antes/depois no output de `pnpm build`.

## Decisões

- Turbopack é o padrão de `pnpm dev`; `dev:webpack` permanece como fallback. A validação mostrou que o ganho de cold/first compile é pequeno, mas o login e o HMR tendem a se beneficiar.
- Fontes continuam em `next/font/google`; self-hosting fica para uma necessidade offline futura.
- A porta padrão de dev/start é 3000; não se mata processo de terceiro para liberar a porta.
- Os 5 warnings de `<img>` foram resolvidos nesta entrega; os warnings de `jose`/Edge Runtime não são bloqueantes.
- RSC/dynamic imports ficam fora desta entrega até haver evidência de que o client graph é o gargalo.
- Cache de signed URLs: TTL 300s em produção, 60s em dev, expiração de 3600s e tag `signed-image-urls`.
- Ambientes: local usa Docker/Postgres e Supabase cloud; produção usa as envs da Vercel. O app local não aponta para o banco de produção.
