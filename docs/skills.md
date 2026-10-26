# Skills — guia prático

Skills são instruções carregadas sob demanda. O agente vê apenas `name` + `description`; quando a tarefa combina com a descrição, ele carrega o `SKILL.md` completo. Isso permite ter procedimentos detalhados sem pagar o custo em todo prompt.

Não confunda:

- **AGENTS.md** — regras always-on do projeto.
- **Skill** — procedimento sob demanda ("como fazer X").
- **Command** — atalho que você invoca com `/nome`.
- **Agent/subagent** — especialista com contexto, permissões e modelo próprios.
- **MCP** — ferramenta externa (browser, GitHub, banco).

## Onde o OpenCode procura skills

Projeto:

- `.opencode/skills/<nome>/SKILL.md` — skills escritas à mão no projeto.
- `.agents/skills/<nome>/SKILL.md` — local onde o CLI do skills.sh instala para o OpenCode.
- `.claude/skills/<nome>/SKILL.md` — compatibilidade com Claude Code.

Global:

- `~/.config/opencode/skills/<nome>/SKILL.md`
- `~/.agents/skills/<nome>/SKILL.md`
- `~/.claude/skills/<nome>/SKILL.md`

O nome da pasta deve ser igual ao `name` do frontmatter.

## Estrutura de uma skill

```md
---
name: minha-skill
description: Use quando a tarefa envolver X, Y ou Z. Inclua palavras-gatilho concretas.
metadata:
  opencode/slash: "true"
---

# Minha Skill

Passo a passo, checklist, exemplos e referências.
```

Regras:

- `name`: minúsculo, com hífens, até 64 caracteres.
- `description`: 1–1024 caracteres; é o roteador da skill.
- `opencode/slash: "true"` expõe a skill como `/minha-skill`.
- `opencode/autoinvoke: "false"` esconde da seleção automática; útil para skills manuais.
- Mantenha o `SKILL.md` curto; detalhes grandes vão em arquivos anexos na mesma pasta.
- Uma skill = um procedimento coerente. Evite skills sobrepostas.

Criar manualmente:

```powershell
New-Item -ItemType Directory -Path ".opencode\skills\minha-skill"
```

Depois crie `.opencode/skills/minha-skill/SKILL.md`.

Ou use o template do CLI:

```bash
npx skills init minha-skill
```

## Instalar skills do skills.sh

O site `https://www.skills.sh/` é um diretório da Vercel Labs. O CLI instala no projeto por padrão e detecta o OpenCode.

Procurar:

```bash
npx skills find prisma
npx skills find react
npx skills find "code review"
```

Instalar uma skill específica para o OpenCode:

```bash
npx skills add prisma/skills --skill prisma-client-api -a opencode
```

Instalar de forma interativa (escolher skills e agentes):

```bash
npx skills add prisma/skills -a opencode
```

Instalar globalmente (todos os projetos):

```bash
npx skills add prisma/skills --skill prisma-client-api -g -a opencode
```

No Windows, se symlink falhar, use cópia:

```bash
npx skills add prisma/skills --skill prisma-client-api -a opencode --copy
```

Ver o catálogo do repositório antes de instalar:

```bash
npx skills add prisma/skills --list
```

Gerenciar:

```bash
npx skills list -a opencode
npx skills list -g
npx skills update
npx skills remove prisma-client-api
```

Usar uma skill sem instalar (gera um prompt para colar no agente):

```bash
npx skills use prisma/skills@prisma-client-api
```

Desativar telemetria:

```powershell
$env:DISABLE_TELEMETRY = "1"
```

Requisito do CLI: Node.js 22.20 ou superior. Comandos e catálogos abaixo verificados em 2026-10-22 com skills CLI 1.7.4. Depois de instalar, reinicie o OpenCode e confirme com:

```bash
opencode debug skill
```

## Como usar

- **Automático:** a `description` combina com a tarefa e o agente carrega a skill.
- **Manual:** se `opencode/slash: "true"`, digite `/minha-skill`.
- **Explícito:** peça "use a skill `prisma-client-api` para esta consulta".
- Skills não são invocadas com `@`; `@` é para agentes.

## Recomendações para este projeto

Comece com 3–6 skills. Cada skill instalada adiciona descrição ao contexto; muitas skills diluem a seleção.

Banco e Prisma:

```bash
npx skills add prisma/skills --skill prisma-client-api -a opencode
npx skills add prisma/skills --skill prisma-cli -a opencode
```

Para o adapter `@prisma/adapter-pg`, instale também quando for mexer em driver/adapter:

```bash
npx skills add prisma/skills --skill prisma-driver-adapter-implementation -a opencode
```

Evite `prisma-postgres` e `prisma-database-setup`: são nomes de compatibilidade depreciados. Para setup/connection troubleshooting, prefira `prisma-orm-setup` ou `prisma-postgres-setup`.

React e Next.js (verifique a versão alvo antes de confiar):

```bash
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices -a opencode
npx skills add vercel-labs/agent-skills --skill vercel-composition-patterns -a opencode
```

Design, UI e review visual:

```bash
npx skills add anthropics/skills --skill frontend-design -a opencode
npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a opencode
```

Fluxo de engenharia:

```bash
npx skills add mattpocock/skills --skill code-review -a opencode
npx skills add mattpocock/skills --skill diagnosing-bugs -a opencode
npx skills add mattpocock/skills --skill tdd -a opencode
```

Supabase/Postgres (o projeto usa Supabase Storage):

```bash
npx skills add supabase/agent-skills --skill supabase -a opencode
npx skills add supabase/agent-skills --skill supabase-postgres-best-practices -a opencode
```

Outras verificadas: `vercel/turborepo` (`turborepo`), `anthropics/skills` (`skill-creator`, `webapp-testing`). O repositório `vercel-labs/next-skills` não expõe skills válidas no CLI; para Next.js, use `vercel-react-best-practices` do `vercel-labs/agent-skills`.

## Segurança

Skills são instruções, não areia movediça: podem pedir comandos, leitura de arquivos ou uso de ferramentas. O skills.sh faz auditorias, mas não garante a qualidade ou segurança de todo conteúdo.

Antes de instalar:

- leia o `SKILL.md` e os arquivos anexos;
- prefira organizações oficiais (Prisma, Vercel, Anthropic, Supabase);
- confira os relatórios de auditoria na página da skill;
- evite skills que pedem segredos, tokens ou comandos destrutivos;
- instale poucas skills e remova as que não usa;
- não instale packs inteiros sem revisar.

Para skills de terceiros, prefira `--copy` e revise o conteúdo no repositório antes de rodar.

## Reprodução

Instalações geram `skills-lock.json`. Neste repo, o lockfile é versionado, mas o conteúdo de `.agents/skills/` fica local (ignorado), exceto o `README.md`. Isso evita 274 KB de conteúdo de terceiros no Git e mantém a reprodutibilidade. Após clonar, rode:

```bash
npx skills experimental_install
```

As skills instaladas continuam sendo carregadas pelo OpenCode no ambiente local.

## Token economy

- A descrição de cada skill fica visível ao modelo; mantenha o conjunto pequeno.
- Skills grandes carregam tokens quando usadas; prefira procedimentos curtos + referências anexas.
- Não crie uma skill para cada detalhe; regras always-on vão no `AGENTS.md`.
- Remova skills obsoletas com `npx skills remove`.
