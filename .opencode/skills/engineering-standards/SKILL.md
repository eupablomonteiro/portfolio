---
name: engineering-standards
description: Use for non-trivial coding, architecture, security, debugging, database, API or UX work in this repository. Enforces inspect-first, preview-before-edit, validation and claim labeling. Do not use for trivial edits or pure questions.
metadata:
  opencode/slash: "true"
---

# Engineering Standards

Aplique este fluxo em tarefas não triviais. Para detalhes, leia as seções relevantes de `docs/system-prompt.md`; não carregue o arquivo inteiro sem necessidade.

## Ciclo

UNDERSTAND → TRACE → MODEL → THREAT-MODEL → DESIGN → PREVIEW → IMPLEMENT → VALIDATE → REVIEW → EXPLAIN

## Antes de editar

- Entenda a responsabilidade do arquivo, quem o importa, o que ele importa e qual interface expõe.
- Trace o fluxo: UI → Server Action/route → validação → auth → autorização → service → repository → DB → resposta → UI.
- Identifique estados: loading, empty, erro, unauthorized, conflito, stale e mobile.
- Não invente contratos, schema, regras de negócio ou comportamento de framework. Inspecione o código e a documentação oficial da versão instalada.
- Se faltar contexto que muda comportamento ou segurança, pergunte. Se for seguro e reversível, assuma e declare.

## Regras

- Mudança explícita: o quê → por quê → risco → validação.
- Menor conjunto coerente de mudanças; nada de refactor não solicitado.
- Preserve convenções existentes; siga `AGENTS.md`.
- Nunca leia ou altere `.env*`.
- Valide entrada não confiável no servidor; o cliente não é fronteira de segurança.
- Verifique autenticação e autorização separadamente.
- Não confie em IDs, roles, permissões ou tenant enviados pelo cliente.
- Evite `any`; use `unknown` + Zod nas bordas.
- Não adicione dependência, cache, pattern ou abstração sem problema concreto.
- Não engula erros; não exponha stack trace, segredo ou detalhe interno ao usuário.
- Não declare sucesso sem rodar a validação.

## Segurança

Antes de concluir, verifique quando aplicável:

- input/injection (SQL, comando, HTML/JS, template, path, header, regex);
- XSS e uso de HTML perigoso;
- auth, sessão, JWT, cookies e CSRF;
- autorização, IDOR e ownership;
- CORS, SSRF, rate limiting e abuso;
- exposição de segredos em logs, erros, URLs e bundle client;
- race conditions, idempotência e transações;
- headers/CSP quando houver superfície web.

Distinga controle preventivo, detetivo, defesa em profundidade, validação de entrada e restrição de correção. Não chame uma validação de "mitigação" sem explicar o caminho de ataque que ela fecha.

## Validação

Use primeiro `AGENTS.md`:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm build` quando afetar rotas, build, config ou dependências
- verificação manual do fluxo e dos estados

Relate apenas o que realmente executou.

## Explicação

Para mudanças não triviais, apresente:

- objetivo e fluxo atual;
- problema;
- solução e alternativas;
- BEFORE/AFTER/diff;
- o que mudou e por quê;
- segurança, performance, UX e acessibilidade;
- validação executada;
- riscos e follow-ups.

Para tarefas pequenas, compacte, mas não remova o raciocínio crítico.

## Precisão

Rotule claims importantes:

- VERIFIED FACT: confirmado no código, testes, runtime ou docs oficiais.
- STRONG INFERENCE: evidência forte, sem execução direta.
- ASSUMPTION: premissa temporária.
- UNKNOWN: evidência insuficiente.

Nunca transforme prática comum em fato. Quando a resposta for versão-dependente, diga a versão.

## Mentoria

Para decisões não triviais, termine com "How to think about this next time": sinal para reconhecer o problema, o que inspecionar, qual fronteira importa, alternativas mais simples e o trade-off aceito.
