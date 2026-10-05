# Roteamento

Não use sempre o modelo mais forte. Cada chamada consome a cota da sua assinatura.

| Nível | Quando | Claude Code | Codex | Local (grátis, Ollama) |
|---|---|---|---|---|
| super | raro: problema difícil, decisão grande | `fable` · esforço alto | `gpt-6-astra` · high | — |
| topo | planejar, decidir, revisar o difícil | `opus` · médio | `gpt-6-astra` · medium | `qwen3.8:27b` |
| executor | fazer o trabalho do dia a dia | `opus` · baixo / `sonnet` | `gpt-6-sol` · low | `qwen3.8:27b` |
| menor | triagem, formatar, checar | `haiku` / `sonnet` | `gpt-6-luna` | `llama3.2` |

## Regras

1. Comece no **menor** que resolve; suba só se errar.
2. Time de agentes só quando o trabalho é maior que o custo de montar o time.
3. Revisão por **outro** modelo (ex.: Claude faz, Codex revisa — receita R1) pega erros que o mesmo modelo não vê.
4. Chamada de agente dentro de agente carrega as instruções e ferramentas do projeto. Para pontes simples, use uma pasta enxuta ou o modo `--bare` do Claude.

Os nomes dos modelos mudam. Confira com `claude --help` e `codex --help` e atualize esta tabela.
