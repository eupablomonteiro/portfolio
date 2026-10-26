# Docs — mapa de contexto

Este diretório é a memória durável do projeto. O `AGENTS.md` é always-on; os arquivos abaixo são carregados sob demanda, conforme a tarefa.

| Documento | Quando carregar |
|---|---|
| `planejamento-portfolio.md` | Antes de planejar ou implementar qualquer feature. |
| `system-prompt.md` | Referência profunda de engenharia. Ler apenas as seções relevantes para a tarefa. |
| `specs/` | Ao iniciar ou retomar uma feature. |
| `decisions/` | Ao mexer em uma área com decisão arquitetural registrada. |
| `lessons.md` | No início de tarefas não triviais; registrar erros repetidos do agente. |
| `handoffs/` | Ao retomar trabalho de uma sessão anterior. |
| `skills.md` | Ao instalar, criar, revisar ou remover skills. |

## Regras

- Não despeje conteúdo grande no `AGENTS.md`; ele é injetado em todo prompt.
- Prefira um índice curto + documentos específicos.
- Specs e ADRs são vivos: atualize quando a decisão ou o comportamento mudar.
- Não registre segredos, tokens ou valores de `.env` em nenhum documento.
