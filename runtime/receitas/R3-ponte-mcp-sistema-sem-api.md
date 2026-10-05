# R3 · Ponte MCP para um sistema sem API

**Para quê:** o ERP, a agenda ou a planilha não têm API, mas exportam arquivo. A ponte lê esse arquivo e entrega ao agente como **ferramenta** com nome e regras.
**Via:** ponte local (nível 6) exposta por MCP (nível 2) · **Política:** só leitura (N4).
**Pré:** Node 18+ · **Dificuldade:** média · **Tempo:** 20 min

O modelo está em `runtime/pontes/mcp-modelo/server.mjs`: um servidor MCP sem dependências com duas ferramentas de exemplo.

| Ferramenta | Lê | Caso |
|---|---|---|
| `listar_horarios_livres` | `runtime/exemplos/agenda.csv` | clínica com agenda em planilha |
| `resumo_vendas` | `runtime/exemplos/erp-vendas.csv` | contador(a) com exportação do ERP |

## 1. Teste a ponte sozinha

```bash
node runtime/pontes/mcp-modelo/server.mjs --selftest
```

**Prova:** aparece `tools: 2`, os horários livres de 06/10 e `TOTAL: R$ 856.00`.

## 2. Conecte ao agente

O `.mcp.json` da raiz já registra a ponte no Claude Code, e o `.claude/settings.json` já a libera.

```bash
claude mcp list            # ponte-modelo … ✔ Connected
```

Se aparecer `Pending approval`, abra `claude` na pasta uma vez e aprove. No Codex:

```bash
codex mcp add ponte-modelo -- node "$PWD/runtime/pontes/mcp-modelo/server.mjs"
```

## 3. Use

```bash
claude -p "Use a tool listar_horarios_livres da ponte-modelo e diga os horários livres de 2026-10-07."
```

**Prova:** responde 08:00 (Dra. Ana) e 16:00 (Dr. Bruno), que são exatamente as linhas `livre` do CSV.

## 4. Troque pelo seu sistema

1. Aponte para os seus arquivos: `PONTE_DADOS=/caminho/da/exportacao` (no `.mcp.json`, campo `env`).
2. Troque as colunas usadas em `run()` pelas do seu arquivo.
3. Mantenha as ferramentas só de leitura. Ferramenta que escreve sobe para "alterar" na `POLITICA.md` (N2: pede antes).
4. Anote a ponte no `CAPACIDADES.md` com a data do teste.
