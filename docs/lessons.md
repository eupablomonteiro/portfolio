# Lessons

Registre aqui erros repetidos do agente e regras que nasceram deles.

Formato:

```md
## YYYY-MM-DD — <título curto>

- Contexto:
- Erro:
- Regra para evitar:
```

## 2026-10-23 — Espera e validação redundante em HDD

- Contexto: implementação de performance com instalação de dependência, builds e servidores dev no Windows sem SSD.
- Erro: esperar um install travado, repetir builds e abrir vários servidores dev para obter métricas que já estavam disponíveis.
- Regra para evitar: agrupar comandos independentes, medir uma vez por estado relevante, reaproveitar resultados e reservar build/start para a validação final.
