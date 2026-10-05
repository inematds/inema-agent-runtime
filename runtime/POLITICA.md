# Política

Quanto maior o impacto da ação, mais o humano participa. O padrão é **"prepara e pede"**.

## Níveis de autonomia

| Nível | O agente… |
|---|---|
| N0 | só conversa |
| N1 | prepara; o humano executa |
| N2 | executa depois de pedir, a cada vez |
| N3 | executa sozinho e avisa |
| N4 | executa sozinho, sem aviso |

## Teto por tipo de ação

| Ação | Teto | No Claude Code | No Codex |
|---|---|---|---|
| Ler arquivo, página, planilha | N4 | permitido | `-s read-only` |
| Criar/alterar arquivo do projeto | N3 | `acceptEdits` | `-s workspace-write` |
| Comando que altera o sistema | N2 | pede confirmação | sem auto-aprovação |
| Enviar (e-mail, mensagem, post, push) | N2 | pede confirmação | sem auto-aprovação |
| Gastar dinheiro ou crédito | N1 | bloqueado | não executar |
| Apagar dados / produção | N1 + backup | bloqueado (`rm -rf`) | não executar |

Uma permissão "sempre permitir" **nunca** passa do teto da ação.

O `.claude/settings.json` deste repo aplica os bloqueios básicos (`rm -rf`, `git push --force`, `git reset --hard`). Para o Codex, use os `-s` da tabela.

## Integração

- Só ferramentas oficiais pela assinatura (Claude Code, Codex CLI).
- Nunca passe credencial de uma ferramenta para outra.
- Engenharia reversa é laboratório: anote em `LIMITES.md` e não use em produção.

## Aprendizado (propõe → aprova → incorpora)

O agente **não muda as próprias regras**. Ele acrescenta uma linha aqui; você decide.

| data | o que aconteceu (com evidência) | proposta (1 linha) | status: proposto / aprovado / recusado |
|---|---|---|---|

Aprovado → vira regra no `CLAUDE.md`/`AGENTS.md`. Falhas vão em `FALHAS.md` (data | o que quebrou | menor correção | prompt ou infra) e bloqueios do ambiente em `LIMITES.md`.
