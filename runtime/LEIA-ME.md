# Como usar o Runtime

## O ciclo

```
DESCOBRIR → CONECTAR → ROTEAR → EXECUTAR → OBSERVAR → VERIFICAR → APRENDER
```

| Etapa | Arquivo | Pergunta |
|---|---|---|
| Descobrir | `CAPACIDADES.md` | Que ferramentas existem e por qual via o agente chega nelas? |
| Conectar | `receitas/`, `pontes/` | Como transformar essa via em algo que o agente chama? |
| Rotear | `ROTEAMENTO.md` | Qual modelo resolve isso gastando menos? |
| Executar | `receitas/R2-…` | Um agente só ou um time? |
| Observar / Verificar | critério "comando → saída esperada" em cada receita | Como provo que funcionou? |
| Aprender | `POLITICA.md` (seção Aprendizado) | O que mudar? O agente propõe, você aprova. |

Toda ação passa pela `POLITICA.md`.

## Ordem para começar

1. `node runtime/scripts/doctor.mjs`
2. Preencha `CAPACIDADES.md` (peça ao agente: "preencha comigo, nível por nível")
3. Leia `POLITICA.md` e ajuste o `.claude/settings.json` se precisar
4. Rode a receita R1 e depois a R2, e confira a prova de cada uma

## A escada das vias (use a mais alta que existir)

| Nível | Via | Exemplo | Estabilidade |
|---|---|---|---|
| 1 | API oficial | API do ERP | alta |
| 2 | MCP | `claude mcp list` | alta |
| 3 | CLI | `codex exec`, `gh`, `git` | alta |
| 4 | SDK / biblioteca | pacote npm/pip | média |
| 5 | Uso do computador | navegador automatizado, cliques na tela | baixa |
| 6 | Ponte local | exportação CSV, pasta, banco SQLite, porta local | média |
| 7 | Engenharia reversa | observar o app rodando para achar a via | **só laboratório**: quebra na próxima atualização |

Regra: se o agente disser "não dá", peça para ele **testar** cada nível com um comando antes de concluir. Muitas vezes a via existe e só não estava documentada.
