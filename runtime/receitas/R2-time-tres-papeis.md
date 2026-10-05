# R2 · Time de três papéis

**Para quê:** dividir uma tarefa entre um **planejador** (modelo forte), um **executor** (modelo médio) e um **revisor** (modelo leve). Cada um usa o modelo que precisa, e a cota rende mais.
**Via:** subagentes do Claude Code (oficial) · **Política:** planejador e revisor só leem; executor altera arquivos do projeto (N3).
**Pré:** Claude Code logado · **Dificuldade:** fácil · **Tempo:** 10 min

Os três papéis estão em `.claude/agents/`:

| Papel | Arquivo | Modelo | Faz |
|---|---|---|---|
| planejador | `planejador.md` | opus | plano curto com critério de pronto `comando → saída esperada` |
| executor | `executor.md` | sonnet | executa o plano e mostra a prova |
| revisor | `revisor.md` | haiku | roda os critérios; responde APROVADO ou o que falta |

## 1. Rode o time

Abra `claude` na pasta e peça:

> Use o time: o planejador planeja, o executor faz e o revisor confere. Tarefa: crie `saudacao.txt` com a frase "Olá, comunidade INEMA".

Ou sem abrir a tela:

```bash
claude -p "Use o time (planejador, executor, revisor). Tarefa: crie saudacao.txt com a frase 'Olá, comunidade INEMA'. Termine com a resposta do revisor."
```

**Prova:** `cat saudacao.txt` mostra a frase e a resposta termina com `APROVADO`.

## 2. Use no seu trabalho

Troque a tarefa. Exemplos:

- Contador(a): "planeje e monte um resumo do CSV exportado do ERP em `export/`; o revisor confere os totais".
- Clínica: "liste os horários livres da semana na `agenda.csv`; o revisor confere se nenhum horário ocupado apareceu".

## Ajustes

- Trocar modelo: edite a linha `model:` do papel (`haiku`, `sonnet`, `opus`, ou `inherit` para usar o da sessão).
- Mais papéis: copie um arquivo de `.claude/agents/` e mude nome, descrição e instruções.

## Próximo nível (Fase 2)

Cada papel numa sessão própria em segundo plano: `claude --bg "<tarefa>"` e `claude agents` para acompanhar. A pasta precisa ter sido aberta uma vez no `claude` e marcada como confiável.
