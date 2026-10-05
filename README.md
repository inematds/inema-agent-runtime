# INEMA Agent Runtime

Kit copiável para fazer seus agentes de IA (Claude Code e Codex) **descobrirem, conectarem e usarem** as ferramentas que você já tem, com regras claras do que podem fazer sozinhos.

Não é plataforma nem servidor. É uma pasta `runtime/` com 4 arquivos de regras, scripts de diagnóstico e verificação, pontes, uma guarda e 7 receitas testadas. Funciona pela **assinatura** do Claude Code e/ou do Codex: nenhuma API paga é pré-requisito.

**Guia:** https://inematds.github.io/inema-agent-runtime/guia/

## Em 10 minutos

```bash
git clone https://github.com/inematds/inema-agent-runtime meu-projeto
cd meu-projeto
node runtime/scripts/doctor.mjs        # o que está instalado e logado
```

Depois abra `claude` (ou `codex`) nessa pasta e peça:

> Leia runtime/LEIA-ME.md e me ajude a preencher o CAPACIDADES.md para o meu trabalho.

## O que tem aqui

| Arquivo | Para quê |
|---|---|
| `runtime/LEIA-ME.md` | O ciclo e a escada de vias |
| `runtime/CAPACIDADES.md` | Mapa das ferramentas que o agente pode usar e por qual via |
| `runtime/POLITICA.md` | O que o agente faz sozinho, o que pede antes e o que nunca faz |
| `runtime/ROTEAMENTO.md` | Qual modelo para qual tarefa (economiza cota) |
| `runtime/scripts/` | `doctor` (diagnóstico), `observar` (time em segundo plano), `verificar` (critérios de pronto) |
| `runtime/pontes/` | `codex-exec.sh` (Claude usa Codex) e `mcp-modelo/` (sistema sem API vira ferramenta) |
| `runtime/mods/` | `runtime-guarda` (colisão e raio, já ligada neste kit) e `runtime-painel` (opcional) |
| `AGENTS.md` / `CLAUDE.md` | Fazem o Codex e o Claude lerem as mesmas regras |
| `.claude/` | Política aplicada, time de 3 papéis e guarda ligada |

## Receitas

| # | Receita | Via |
|---|---|---|
| R1 | [Claude usa o Codex](runtime/receitas/R1-claude-usa-codex.md) | CLI |
| R2 | [Time de três papéis](runtime/receitas/R2-time-tres-papeis.md) | subagentes |
| R3 | [Ponte MCP para sistema sem API](runtime/receitas/R3-ponte-mcp-sistema-sem-api.md) | ponte local + MCP |
| R4 | [Time em segundo plano](runtime/receitas/R4-time-em-segundo-plano.md) | `claude --bg` |
| R5 | [Navegador com política](runtime/receitas/R5-navegador-com-politica.md) | uso do computador |
| R6 | [Agente longo com verificação](runtime/receitas/R6-agente-longo-com-verificacao.md) | CLI + critérios |
| R7 | [Guarda e painel](runtime/receitas/R7-guarda-e-painel.md) | hooks e mods |

Cada receita tem uma seção **Prova**: o comando e o que tem de aparecer. As provas rodadas estão no [CHANGELOG](CHANGELOG.md).

## A ideia em uma frase

Antes de dizer "impossível", o agente sobe a escada das vias de integração — **API → MCP → CLI → SDK → uso do computador → ponte local → engenharia reversa (só laboratório)** — e usa sempre a mais estável que existir.

## Requisitos

- Node 18+ · Claude Code e/ou Codex CLI logados pela assinatura
- Linux ou Mac. Windows: use WSL.

Licença MIT · Parte do ecossistema [INEMA.CLUB](https://inema.club)
