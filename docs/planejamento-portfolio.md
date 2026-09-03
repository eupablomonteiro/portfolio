# Planejamento Portfólio — Pablo Monteiro

> Documento vivo. Atualize o checklist conforme avança. Toda implementação segue `@docs/system-prompt.md`: mostrar `ANTES / DEPOIS / EXPLICAÇÃO`, validar `estrutura, performance, segurança, tratamento de erros, reutilização, aderência ao framework`.

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

**Admin/Auth/DB:** Auth.js v5 (next-auth), Prisma 6, @auth/prisma-adapter, PostgreSQL 16 (Docker local) → Supabase Postgres Free (500MB DB, 1GB Storage, 50k MAU), Supabase Storage (bucket `portfolio`), t3-env/zod (validação env), Upstash Redis ou Arcjet (rate-limit free) — opcional, desligado por padrão

**Infra:** pnpm 10, Turbo, Vercel (host), Docker Compose, ESLint 8, Prettier

**Paleta:** `--portfolio-bg #FAF5F0`, `--surface #FFFFFF`, `--text #232323`, `--text-secondary #5E5E5E`, `--primary #E15773`, `--primary-dark #7E2738`, `--green #8C9C8A`, `--gold #D6B76B`, `--border rgba(0,0,0,0.08)`, `shadow-solid 8px 8px`, `rounded-16/12`

**Fontes:** Bricolage Grotesque (heading), Manrope (body), JetBrains Mono (mono)

---

## 3. Design Patterns e POO

| Padrão | Onde | Por quê |
|---|---|---|
| **Singleton** | `lib/db.ts` (`globalThis.prisma = new PrismaClient()`) | Evita múltiplas conexões em dev HMR |
| **Repository** | `repositories/ProjectRepository.ts`, `ExperienceRepository.ts` | Abstrai Prisma, troca para Supabase sem tocar app |
| **Service Layer** | `services/ProjectService.ts` | Regras (slug, order, published, validação) |
| **DTO + Zod** | `dto/project.dto.ts`, `lib/validators.ts` | Contrato tipado entrada/saída |
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

### Fase 2 — Auth Real — CONCLUÍDA (ajustes pendentes)
- [x] `pnpm add next-auth@beta` (v5 beta, App Router nativo)
- [x] GitHub OAuth App criado (`portfolio`, callback `http://localhost:3000/api/auth/callback/github`), `.env.local` com `GITHUB_ID/SECRET`, `AUTH_SECRET` (`openssl rand -base64 32`), `GITHUB_ALLOWED_EMAIL`
- [x] `lib/env.ts` (zod) + `lib/auth.ts` (GitHub provider, `authorized` só `eupablomonteiro`, `trustHost:true`)
- [x] `app/api/auth/[...nextauth]/route.ts` (`handlers` export), `middleware.ts` (`export {auth as middleware}` + `matcher /admin/:path*`) sem flash (Edge + RSC)
- [x] `app/login` com `Server Action signIn("github")` e `app/(admin)/layout.tsx` Server com `auth()` + `redirect("/login")` + `AdminTabs` Client
- [ ] Ajuste: `/login` redireciona se já logado (`auth()` no `login/page.tsx` → `redirect("/admin/projects")`)
- [ ] Anti-duplo clique: botão `disabled` + `useTransition` no front e `rate-limit/idempotency` no backend (não só frontend)
- [ ] Configurar tempo de sessão (`session: { strategy:"jwt", maxAge: 60*60*24*7 }` em `auth.ts`)

### Fase 3 — DB + Storage (você implementa lógica)
- [ ] `docker-compose.yml` (postgres:16-alpine) + `prisma init` + `prisma/schema.prisma` (models `Project`, `Experience`)
- [ ] `lib/db.ts` Singleton + `repositories/*` + `services/*` + `dto/*`
- [ ] `Supabase` projeto free + tabelas + `bucket portfolio` (private, policy authenticated)
- [ ] `lib/supabase.ts` Factory
- [ ] Server Actions ou Route Handlers `POST /api/admin/projects` com `auth()` + `zod` + `rate-limit` (explicar brute force)
- [ ] Subir `ImageUpload` para Storage (`signedUrl`)

### Fase 4 — Polimento (opcional)
- [ ] Headers `CSP/HSTS` em `next.config.js`
- [ ] `loading.tsx` + `error.tsx` por rota admin
- [ ] Cursor effects (site já listado: curson.io, magicui)
- [ ] Deploy Vercel + envs

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
- `Storage` → `New Bucket` → `portfolio` → `Private` → `Policies` → `Allow authenticated insert`
- Local dev com Docker espelha prod; prod troca só `DATABASE_URL` para `Supabase pooled`

---

## 9. Referências

- @docs/system-prompt.md, @docs/02-design-system.md, @docs/05-motion-system.md, @docs/08-frontend-architecture.md, @docs/image-prompt-guidelines.md
- Sites inspiração: `21st.dev`, `mobbin.com`, `dribbble.com` (Sticky Stack, Bento)

---

*Última atualização: Fase 2 Auth concluída (pendente: redirect /login, anti-duplo clique, maxAge). Próximo: Fase 3 DB + Storage.*
