# Skills instaladas

O OpenCode carrega automaticamente `SKILL.md` em `.agents/skills/<nome>/`.

O CLI do skills.sh instala aqui quando você roda:

```bash
npx skills add <owner>/<repo> --list
npx skills add <owner>/<repo> --skill <nome> -a opencode
npx skills list -a opencode
```

Skills escritas à mão para este projeto ficam em `.opencode/skills/<nome>/SKILL.md`.

Antes de instalar uma skill de terceiros, leia o `SKILL.md` e os arquivos anexos. Skills são instruções executáveis pelo agente, não conteúdo inerte.

Veja `docs/skills.md` para comandos, recomendações e segurança.
