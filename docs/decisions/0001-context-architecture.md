# ADR 0001 — Contexto em camadas para o agente

Status: accepted
Data: 2026-10-22
Área: infra / fluxo de trabalho

## Decisão

Adotar contexto em camadas:

- `AGENTS.md` curto, always-on, com comandos, arquitetura, limites e definition of done.
- `docs/system-prompt.md` como referência profunda, carregada por seções sob demanda.
- `.opencode/skills/engineering-standards/SKILL.md` como versão operacional condensada.
- `docs/` como memória durável: specs, ADRs, lições e handoffs.

## Contexto

O `docs/system-prompt.md` tem 2.781 linhas. Injetá-lo em todo prompt aumentaria o custo e diluiria a atenção do modelo. Ao mesmo tempo, as regras são valiosas e não devem ser descartadas.

## Alternativas consideradas

- Manter tudo no `AGENTS.md`: simples, mas caro e repetitivo em toda sessão.
- Colocar o documento inteiro em `instructions`: pior ainda, pois é always-on.
- Confiar apenas no histórico do chat: não persiste entre sessões e não é auditável.
- Contexto em camadas: `AGENTS.md` curto + skill + docs sob demanda.

## Motivo

O contexto em camadas preserva a profundidade sem pagar o custo em todo prompt. Também torna o conhecimento auditável e reutilizável por outra sessão ou outro agente.

## Trade-off

Exige disciplina para manter `AGENTS.md` curto e para atualizar specs, ADRs e lições. Documentação obsoleta passa a ser um risco ativo.

## Consequência

- Novas features devem começar por `docs/specs/`.
- Decisões relevantes viram ADRs.
- Erros repetidos do agente viram entradas em `docs/lessons.md`.
- O documento completo continua sendo a fonte de profundidade, não o contexto padrão.
