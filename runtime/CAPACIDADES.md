# Capacidades

Mapa do que seus agentes podem usar. Uma linha por sistema. Só entra linha com **teste** feito.

Como preencher: para cada sistema do seu trabalho, suba a escada do `LEIA-ME.md` (API → MCP → CLI → SDK → computador → ponte local) e pare na primeira via que funciona.

| Sistema | Via | Nível | Como o agente chama | Política | Testado em |
|---|---|---|---|---|---|
| Codex CLI | CLI | 3 | `runtime/pontes/codex-exec.sh` | ler (N4) | 2026-10-05 ok |
| Claude Code | CLI | 3 | `claude -p --permission-mode plan` | ler (N4) | 2026-10-05 ok |

## Exemplos para copiar

```
| Planilha de estoque (.xlsx)  | Ponte local (arquivo)   | 6 | ler ~/estoque/estoque.xlsx      | ler (N4)        | pendente |
| ERP sem API                  | Exportação CSV diária   | 6 | ler ~/erp/export/*.csv          | ler (N4)        | pendente |
| Agenda da clínica (planilha) | Ponte local (arquivo)   | 6 | ler/escrever agenda.csv         | alterar (N2)    | pendente |
| Site do fornecedor           | Uso do computador       | 5 | navegador automatizado          | enviar (N2)     | pendente |
```

Regra: sistema sem linha aqui **não** é usado pelo agente.
