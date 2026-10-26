# Planejamento Portfólio — Pablo Monteiro

> Documento vivo. Atualize o checklist conforme avança. Toda implementação segue `AGENTS.md`; para detalhes, consulte as seções relevantes de `docs/system-prompt.md`. Mostrar `ANTES / DEPOIS / EXPLICAÇÃO`, validar `estrutura, performance, segurança, tratamento de erros, reutilização, aderência ao framework`.

---

## 1. Visão e Princípios

**Objetivo:** Portfólio direto, completo e eficiente, sem overengineering. Demonstrar domínio de Next.js 14, boas práticas de engenharia, segurança e UX.

**Stack Foco:** `full-stack, backend e frontend` + colaborações e projetos freelance. Disponível `Remoto | Freelance | Início imediato`.

**Princípios:**
- Componentizar e reutilizar — nunca repetir código
- Separação de responsabilidades (app nunca importa prisma direto)
- POO + SOLID
- Segurança nunca ignorada
- Performance RSC-first, Client só onde precisa
- Tudo gratuito (Vercel + Supabase Free + GitHub OAuth)
- Frontend/UI pronto por assistente, lógica frontend→backend feita manualmente pelo dono (fornecemos código, ele implementa)

---

## 2. Tecnologias

**Core:** Next.js 14.2 (App Router, RSC), React 18.3, TypeScript 5.6 strict, Tailwind CSS 4, Framer Motion 12, Lenis 1.3, Motion 13, lucide-react 1.28, @iconify/react 6 (simple-icons), next/image, sharp

**Admin/Auth/DB:** Auth.js v5 (`next-auth@5.0.0-beta.32`, JWT + `maxAge` 7 dias, `pages.signIn: "/login"`), Prisma 7 (`prisma@^7.10.0` + `@prisma/client@^7.10.0` + `@prisma/adapter-pg` + `pg` + `dotenv` + `@types/pg`), PostgreSQL 16 (Docker local `portfolio-db`) → Supabase Postgres Free (500MB DB, 1GB Storage), Supabase Storage (bucket `portfolio-bucket`, `private`, policies `public SELECT/INSERT` com endurecimento futuro para `authenticated INSERT`), `zod` validação env (`SUPABASE_*` opcionais até configurar), Upstash Redis ou Arcjet (rate-limit free) — opcional, desligado por padrão

**Infra:** pnpm 10, Turbo, Vercel (host), Docker Compose, ESLint 8, Prettier

**Paleta:** `--portfolio-bg #FAF5F0`, `--surface #FFFFFF`, `--text #232323`, `--text-secondary #5E5E5E`, `--primary #E15773`, `--primary-dark #7E2738`, `--green #8C9C8A`, `--gold #D6B76B`, `--border rgba(0,0,0,0.08)`, `shadow-solid 8px 8px`, `rounded-16/12`

**Fontes:** Bricolage Grotesque (heading), Manrope (body), JetBrains Mono (mono)

---

## 3. Design Patterns e POO

| Padrão | Onde | Por quê |
|---|---|---|
| **Singleton** | `lib/db.ts` (`globalThis.prisma = new PrismaClient()`) | Evita múltiplas conexões em dev HMR |
| **Repository** | `repositories/ProjectRepository.ts`, `ExperienceRepository.ts` | Abstrai Prisma, troca para Supabase sem tocar app |
| **Service Layer** | `services/ProjectService.ts`, `services/ExperienceService.ts` | Regras (slug, order, published, validação) |
| **DTO + Zod** | `dto/project.dto.ts`, `dto/experience.dto.ts` | Contrato tipado entrada/saída |
| **Adapter** | `auth.ts` (GitHub → Auth.js), `lib/supabase.ts` (Storage) | Adapta libs externas |
| **Factory** | `lib/supabase.ts` `createSupabaseClient()` | Cria client com env validado |
| **Dependency Inversion** | `app/(admin)/projects/page.tsx` importa `ProjectService`, não `Prisma` | Inverte dependência |
| **Strategy** | Badges monocolor vs colorido (Stack) | Varia comportamento sem if espalhado |
| **Observer (Motion)** | `useScroll` na timeline | Reage a scroll |

**POO:** Classes `ProjectRepository`, `ProjectService` com métodos `findAll, findBySlug, create, update, delete`. Interfaces `IRepository<T>`. SOLID aplicado.

---

## 4. Arquitetura de Pastas (Alvo)

```
apps/web/src/
  app/
    (public)/layout.tsx  // Navbar+Footer
    (public)/page.tsx    // Hero+Stack+Experience+Projects+Contact
    (admin)/layout.tsx   // Sidebar + Header admin (sem Navbar/Footer)
    (admin)/login/page.tsx
    (admin)/projects/page.tsx
    (admin)/experience/page.tsx
    api/auth/[...nextauth]/route.ts
  components/
    ui/ (button, badge, card, input, textarea, dialog, table)
    admin/ (AdminShell, DataTable, FormField, ImageUpload, ConfirmDialog, EmptyState)
  lib/
    db.ts (Singleton Prisma)
    auth.ts
    supabase.ts
    env.ts (t3-env)
    utils.ts (cn)
  repositories/
  services/
  dto/
  hooks/ (useSession wrapper)
app/globals.css, icon.png
prisma/schema.prisma (+ docker-compose.yml na raiz)
middleware.ts
```

`middleware.ts` `matcher: ['/admin/:path*']` — libera só `/admin/login`, barra resto sem sessão (sem flash).

---

## 5. Etapas e Checklist

### Fase 0 — Landing (CONCLUÍDA)
- [x] Hero encostado bottom, pill `Disponível para novas oportunidades` (sem verde), nome+função destaque, texto direto, `character sway` no mouse, sem parallax scroll
- [x] Remover `Briefcase/GitBranch`, manter `lucide + @iconify/react` (`react-icons` removido)
- [x] Stack Bento harmonizado: `Base` full-width + 6 grupos sem repetição (HTML/CSS/JS/TS/Git/API no Base), cores distintas por grupo, badges coloridos por accent, spotlight hover
- [x] Experience Vertical Timeline com `sticky` + `progress line` (scaleY spring) + dots coloridos
- [x] Projects Stacked Cards com `ReactLenis + motion` (StackingCards), paleta neutra, alternância 2 col, mockup manual desktop+mobile
- [x] Contact simplificada contratação (`● Disponível para contratação`, `Conectar`, `Pronto para construir algo`, micro-lista, 2 CTAs) + crachá `pablo-cracha.png` com `2.5D parallax` e dupla estética diagonal maior
- [x] Deletar `process.tsx`, atualizar `Navbar/Footer/types`
- [x] Build + typecheck ok

### Fase 1 — Admin UI (SÓ LAYOUT, sem backend) — CONCLUÍDA
- [x] Refatorado `app/layout.tsx` para `Route Groups` `(public)/(admin)` — `RootLayout` limpo, `PublicLayout` com Navbar/Footer
- [x] Criado `app/(admin)/layout.tsx` janela central 80% estilo cmd/file-tabs (dark `#121212` + grid + blurs), tabs `Projetos | Experiência`, breadcrumb `Admin > X`, sem sidebar
- [x] Login isolado em `app/login/page.tsx` (fora do admin, não herda layout) com design dark + GitHub
- [x] `app/(admin)/admin/projects` e `admin/experience` com DataTable mock limpo (sem comentários IA)
- [x] `middleware.ts` fake (`matcher /admin/:path*` libera, login público) — pronto para trocar por Auth.js sem flash
- [x] Componentes `admin/EmptyState` + `ui/stacking-card.tsx` + `@iconify/react` (lucide + iconify)

### Fase 2 — Auth Real — CONCLUÍDA
- [x] `pnpm add next-auth@beta` (v5 beta `5.0.0-beta.32`, App Router nativo)
- [x] GitHub OAuth App criado (`portfolio`, callback `http://localhost:3000/api/auth/callback/github`), `.env.local` com `GITHUB_ID/SECRET`, `AUTH_SECRET` (`openssl rand -base64 32` ou `node -e` no Windows), `GITHUB_ALLOWED_EMAIL`
- [x] `lib/env.ts` (zod) + `lib/auth.ts` (GitHub provider, `authorized` só allowlist, `trustHost:true`, `session: { strategy:"jwt", maxAge: 7 dias }`, `pages.signIn: "/login"`)
- [x] `app/api/auth/[...nextauth]/route.ts` (`handlers` export), `middleware.ts` (`export {auth as middleware}` + `matcher /admin/:path*`) sem flash (Edge + RSC)
- [x] `app/login` com `Server Action signIn("github")`, redirect se já logado (`auth()` → `redirect("/admin/projects")` com checagem allowlist) e `app/(admin)/layout.tsx` Server com `auth()` + `redirect("/login")` + `AdminTabs` Client
- [x] Anti-duplo clique: `SubmitButton` (`useFormStatus` + `disabled`) no front e `slug @unique` como idempotência real no backend

### Fase 3 — DB + Storage — EM ANDAMENTO (ponta-a-ponta primeiro, refinamento depois)
- [x] `docker-compose.yml` raiz (`postgres:16-alpine`, `portfolio-db`, `postgres:admin/portfolio`) — corrigido `environment`
- [x] `prisma init` em `apps/web` (`prisma/schema.prisma` + `prisma7.config.ts`), `DATABASE_URL` em `apps/web/.env` (CLI) duplicada no `.env.local` (Next)
- [x] Models `Project` + `Experience` (`id uuid`, `slug @unique`, `techs String[]`, `order`, `published`), `migrate dev --name init` aplicado, `generate` com `output ../src/generated/prisma`
- [x] `lib/db.ts` Singleton + `PrismaPg` adapter (obrigatório no 7) + `lib/env.ts` (`DATABASE_URL` required, `SUPABASE_*` opcionais até configurar)
- [x] POO `Project`: `dto/project.dto.ts` + `repositories/ProjectRepository.ts` + `services/ProjectService.ts`
- [x] `lib/supabase.ts` Factory + `SUPABASE_BUCKET = "portfolio-bucket"` + `getSignedImageUrl`
- [x] Supabase free criado (São Paulo): `SUPABASE_URL` = Project URL sem `/rest/v1`, `SUPABASE_PUBLISHABLE_KEY` = `Publishable key sb_publishable_...`, `SUPABASE_SERVICE_KEY` = `Secret key sb_secret_...` (server-only, upload + signed URLs), bucket `portfolio-bucket` private com policies `public SELECT/INSERT`
- [x] `components/admin/ImageUpload.tsx` (preview local, Client só no upload)
- [x] `admin/projects` ligado em `ProjectService.list()` em RSC (mock removido)
 - [x] POO `Experience`: `dto/experience.dto.ts` + `repositories/ExperienceRepository.ts` + `services/ExperienceService.ts` (espelhado em `Project`: `z.coerce` p/ `FormData`, `IRepository` tipado Prisma, `Service.create` em 2 passos)
 - [x] `admin/experience` em `ExperienceService.list()` em RSC com `EmptyState` inline (header sempre visível) — mesmo padrão aplicado em `admin/projects`
 - [x] Padronização `Project ≡ Experience`: `slug` single-line + msg `Slug inválido`, `techs` com `min(1)` interno, `order` `z.coerce.number().int().min(0)`, `EmptyState` inline nos dois
 - [x] `Actions POST` colocadas (`admin/projects/actions.ts` → `createProject`, `admin/experience/actions.ts` → `createExperience`): `auth()` + allowlist, `csv()` p/ `techs/bullets`, `Service.create`, `P2002` → `Slug já existe`, `revalidatePath` + `ActionResult {ok|error}` — `rate-limit` fica Fase 4
 - [x] CRUD completo admin: `update/delete` em DTO (`updateSchema` slug imutável) + Repo (`findById/update/remove`) + Service (`update/archive/remove`, `archive` = `published:false` só Project) + Actions (`update/archive/delete`, `P2025` → `Registro não encontrado`); `csv/bool` centralizados em `lib/utils.ts`
 - [x] Modals admin (`Modal` `<dialog>` nativo + `FormField` + `ProjectForm`/`ExperienceForm` + `ConfirmDelete` com digitação do slug + `ProjectDialogs`/`ExperienceDialogs`): pages RSC, JS client só nas ilhas, paleta `portfolio-*`
 - [x] `loading.tsx` skeleton por rota admin (tabela/cards, `animate-pulse`) + `error.tsx` com `reset()` + `(public)/loading.tsx` (hero + seções) — `not-found`/`Suspense` fino ficam Fase 4 (Suspense em seções com `useScroll` quebra ref do motion, dados resolvidos na page)
 - [x] Imagens: PNGs 2000px+ (~9MB) → webp redimensionado (hero 800px/110KB, crachá 720px/89KB, logo 160px/11KB) + `quality 80` + `blur` + crachá sem `priority` (abaixo da dobra) + `loading lazy` em `<img>` remoto
 - [x] Fontes via `next/font/google` (`lib/fonts.ts`, `display:swap`, subsets latin) — removido `@import` bloqueante do CSS
 - [x] Home ligada ao banco: `findPublished/listPublished` + `ProjectsFeed`/`ExperienceFeed` RSC + header sempre visível com fallback quando vazio + `revalidate 60` + `revalidatePath("/")` nas mutations — dev com `--turbo`
 - [ ] `migrate deploy` no Supabase remoto (URL Direct uma vez) e envs de prod (URL Pooled 6543 + Supabase keys na Vercel)

### Fase 4 — UX avançado + Performance (DEPOIS do ponta-a-ponta, planejado agora)
- [ ] Fallback/loading: `loading.tsx` por rota (`(admin)/admin/projects|experience`, `login`) com skeleton `animate-pulse` no formato da tabela/cards + `error.tsx` com `reset()` + `not-found.tsx` admin para slug inexistente + `Suspense` boundaries em listas
- [ ] Lazy loading: `next/dynamic` com `ssr:false` + `loading` skeleton para `ImageUpload` e `StackingCards` (`motion` pesado); `next/image` com `sizes` + `priority` só no hero/crachá, `loading="lazy"` no resto
- [ ] Cache: listas admin com `fetch(..., { next: { tags: ["projects","experiences"] } })` + `revalidatePath/revalidateTag` após `create`; `unstable_cache` no `Service.list()`; `loading` instantâneo no retorno
- [ ] Performance: `next.config.js` `optimizePackageImports` (`@iconify/react`, `lucide-react`, `framer-motion`), `images.remotePatterns` só `avatars.githubusercontent.com`, `sharp` ativo; dev com `next dev --turbo`; bundle checado via `next build` (alvo `/` < 20kB First Load já atingido)
- [ ] Segurança extra: headers `CSP/HSTS` em `next.config.js`, `rate-limit` (Upstash/Arcjet 10/min) no callback e nos `POST`, `signedUrl` com expiração curta (3600s)
- [ ] Cursor effects (site já listado: curson.io, magicui) + Deploy Vercel + envs (`DATABASE_URL` Pooled, Supabase keys, `AUTH_SECRET`)

---

## 6. Métodos por Fase

Cada arquivo alterado mostrará:
```md
### ANTES
\`\`\`tsx
// código antigo
\`\`\`
### DEPOIS
\`\`\`tsx
// código novo
\`\`\`
### EXPLICAÇÃO
- Estrutura: ...
- Performance: ...
- Segurança: contra X (ex: CSRF via state, brute via rate-limit)
- Reutilização: ...
```

---

## 7. Regras de Implementação Manual

- Você cola o código fornecido, eu explico o porquê e contra o que protege
- Layout chato (tabelas, cards, sidebar) eu entrego pronto; lógica (service, repository, auth) você digita para fixar
- Sem `NEXT_PUBLIC` para segredo, sem `prisma` direto em `app/`, sem `useEffect` para auth (só `middleware` + `RSC`)

---

## 8. Supabase & Grátis - Notas

- Free: 500MB DB, 1GB Storage, 50k MAU, pausa após 7 dias inativo (reativa)
- Criar projeto → `Database` → `SQL Editor` → rodar `prisma migrate`
- `Storage` → `New Bucket` → `portfolio-bucket` → `Private` → `Policies` → `public SELECT/INSERT` (endurecer para `authenticated INSERT` depois)
- Local dev com Docker espelha prod; prod troca só `DATABASE_URL` para `Supabase pooled`

---

## 9. Referências

- @docs/system-prompt.md, @docs/02-design-system.md, @docs/05-motion-system.md, @docs/08-frontend-architecture.md, @docs/image-prompt-guidelines.md
- Sites inspiração: `21st.dev`, `mobbin.com`, `dribbble.com` (Sticky Stack, Bento)

---

*Etapa atual: Fase 3 em finalização — prontos: DB local + migrate + POO Project + POO Experience + `admin/projects` e `admin/experience` em RSC com `EmptyState` inline + `Actions POST` (`createProject`/`createExperience` com `P2002` tratado). Falta só: `migrate deploy` remoto + envs prod. Próximo: Fase 4 UX/performance (só após ponta-a-ponta).*
