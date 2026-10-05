# Changelog

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
