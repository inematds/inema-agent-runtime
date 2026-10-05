# INEMA Agent Runtime

Kit copiável para fazer seus agentes de IA (Claude Code e Codex) **descobrirem, conectarem e usarem** as ferramentas que você já tem, com regras claras do que podem fazer sozinhos.

Não é plataforma nem servidor. É uma pasta `runtime/` com 4 arquivos de convenção, um diagnóstico e receitas testadas. Funciona pela **assinatura** do Claude Code e/ou do Codex: nenhuma API paga é pré-requisito.

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
| `runtime/LEIA-ME.md` | O ciclo e a ordem de uso |
| `runtime/CAPACIDADES.md` | Mapa das ferramentas que o agente pode usar e por qual via |
| `runtime/POLITICA.md` | O que o agente faz sozinho, o que pede antes e o que nunca faz |
| `runtime/ROTEAMENTO.md` | Qual modelo para qual tarefa (economiza cota) |
| `runtime/scripts/doctor.mjs` | Diagnóstico: Node, Claude Code, Codex, Ollama |
| `runtime/receitas/R1-claude-usa-codex.md` | Claude pede uma tarefa ao Codex (ponte por CLI) |
| `runtime/receitas/R2-time-tres-papeis.md` | Time planejador → executor → revisor, cada um com seu modelo |
| `AGENTS.md` / `CLAUDE.md` | Fazem o Codex e o Claude lerem as mesmas regras |
| `.claude/settings.json` | A POLITICA aplicada no Claude Code (bloqueios) |

## A ideia em uma frase

Antes de dizer "impossível", o agente sobe a escada das vias de integração — **API → MCP → CLI → SDK → uso do computador → ponte local → engenharia reversa (só laboratório)** — e usa sempre a mais estável que existir.

## Requisitos

- Node 18+ · Claude Code e/ou Codex CLI logados pela assinatura
- Linux ou Mac. Windows: use WSL.

Licença MIT · Parte do ecossistema [INEMA.CLUB](https://inema.club)
