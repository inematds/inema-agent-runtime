# Goal de exemplo — ponte da agenda

## Resultado
A ponte MCP lê a agenda e o resumo de vendas, e o kit continua saudável.

## Critérios de pronto
- [ ] `node runtime/pontes/mcp-modelo/server.mjs --selftest` → `tools: 2`
- [ ] `node runtime/pontes/mcp-modelo/server.mjs --selftest` → `2026-10-06 09:00 · Dra. Ana`
- [ ] `node runtime/pontes/mcp-modelo/server.mjs --selftest` → `TOTAL: R$ 856.00`
- [ ] `node runtime/scripts/doctor.mjs` → `PRONTO`

Rode da raiz do kit: `node runtime/scripts/verificar.mjs runtime/exemplos/goal-exemplo.md`
