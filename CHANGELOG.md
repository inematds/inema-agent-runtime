# Changelog

## 0.3.0 — 2026-10-05

Fase 3: guarda e painel.

| Prova | Resultado |
|---|---|
| `colisao.mjs` com 5 casos (arquivo velho, alterado por fora, mesma sessão, outra sessão, inexistente) | só pergunta nos casos de outra sessão e de alteração por fora |
| `raio.mjs` com `rm -r`, `rm -f *.txt`, `git clean -fd`, `rm` de inexistente, `ls` | conta exatamente os arquivos que seriam apagados; nada a apagar = não pergunta |
| `claude -p --plugin-dir runtime-guarda --permission-mode bypassPermissions` pedindo `rm -r pasta` | barrado pelo "Raio", pasta intacta |
| idem pedindo Edit em arquivo editado por outra sessão | barrado pela "colisão", arquivo intacto |
| guarda ligada pelo `.claude/settings.json` do kit, `rm -r x` | barrado, pasta intacta |
| `claude plugin validate --strict` nos dois mods | passa |
| `claude plugin test runtime/mods/runtime-painel` | `1 pass` |

## 0.2.0 — 2026-10-05

Fase 2: pontes, observação e verificação.

| Prova | Resultado |
|---|---|
| `node runtime/pontes/mcp-modelo/server.mjs --selftest` | `tools: 2`, horários livres de 06/10, `TOTAL: R$ 856.00` (conferido à mão) |
| `claude mcp list` na pasta do kit | `ponte-modelo … ✔ Connected` |
| `claude -p "… listar_horarios_livres … 2026-10-07"` | 08:00 Dra. Ana e 16:00 Dr. Bruno (as linhas `livre` do CSV) |
| `claude --bg --permission-mode plan --name r4-revisor "…"` + `observar.mjs` | sessão listada como `background … done`; respondeu "N2" lendo a POLITICA |
| `verificar.mjs runtime/exemplos/goal-exemplo.md` | `4/4 critérios OK`, saída 0; com um valor esperado errado: `FALHA`, saída 1 |
| `agent-browser open https://example.com` + `get title` | `Example Domain` |

Aprendido: `claude --bg` exige pasta marcada como confiável (o aviso abre com "No, exit" selecionado) e não aceita `-p`.

## 0.1.0 — 2026-10-05

Kit mínimo (Fase 1): 4 arquivos de convenção, diagnóstico e 2 receitas.

Provas rodadas em Linux (Claude Code 2.1.289, Codex CLI 0.159.2), pela assinatura:

| Prova | Resultado |
|---|---|
| `node runtime/scripts/doctor.mjs` | node/claude/codex/ollama `ok`, `PRONTO`, saída 0 |
| `runtime/pontes/codex-exec.sh "Responda apenas PONG"` | `PONG` |
| `codex-exec.sh "x" . danger-full-access` | `sandbox recusado pela POLITICA`, saída 2 |
| `codex-exec.sh "Crie notas.txt com a palavra OK" <pasta> workspace-write` | `notas.txt` = `OK` |
| `claude -p --permission-mode bypassPermissions` pedindo `touch` e `rm -rf` | `touch` roda; `rm -rf` negado pelo `.claude/settings.json` |
| R2: time planejador/executor/revisor via `claude -p` | modelos opus + sonnet + haiku usados; revisor `APROVADO`; `saudacao.txt` correto |

Custo da R2 em cota: equivalente a ~US$ 0,73 de API (não é cobrança na assinatura).
