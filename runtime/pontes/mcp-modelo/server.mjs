#!/usr/bin/env node
// Ponte nível 6 (arquivo local) exposta como MCP (nível 2): sistemas sem API viram ferramentas do agente.
// Servidor MCP por stdio, sem dependências. Troque os CSVs e as duas tools pelo seu sistema.
//
// Registrar:  claude mcp add ponte-modelo -- node runtime/pontes/mcp-modelo/server.mjs
//             codex mcp add ponte-modelo -- node runtime/pontes/mcp-modelo/server.mjs
// Testar:     node runtime/pontes/mcp-modelo/server.mjs --selftest
//
// POLITICA: as duas tools só LEEM (N4). Tool que escreve precisa de outro nível e de confirmação.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';

const pastaExemplos = process.env.PONTE_DADOS || join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'exemplos');

function lerCsv(nome) {
  const [cabecalho, ...linhas] = readFileSync(join(pastaExemplos, nome), 'utf8').trim().split('\n');
  const campos = cabecalho.split(',');
  return linhas.map(l => Object.fromEntries(l.split(',').map((v, i) => [campos[i], v])));
}

const tools = {
  listar_horarios_livres: {
    description: 'Lista horários livres da agenda da clínica (agenda.csv). Filtros opcionais: data (AAAA-MM-DD) e profissional.',
    inputSchema: {
      type: 'object',
      properties: { data: { type: 'string' }, profissional: { type: 'string' } },
    },
    run({ data, profissional } = {}) {
      const livres = lerCsv('agenda.csv').filter(r =>
        r.status === 'livre' && (!data || r.data === data) && (!profissional || r.profissional.includes(profissional)));
      return livres.length ? livres.map(r => `${r.data} ${r.hora} · ${r.profissional}`).join('\n') : 'nenhum horário livre';
    },
  },
  resumo_vendas: {
    description: 'Resume a exportação de vendas do ERP (erp-vendas.csv): total geral e total por cliente ou produto.',
    inputSchema: {
      type: 'object',
      properties: { agrupar_por: { type: 'string', enum: ['cliente', 'produto'] } },
    },
    run({ agrupar_por = 'cliente' } = {}) {
      const grupos = {};
      let total = 0;
      for (const r of lerCsv('erp-vendas.csv')) {
        const v = Number(r.quantidade) * Number(r.valor_unitario);
        grupos[r[agrupar_por]] = (grupos[r[agrupar_por]] || 0) + v;
        total += v;
      }
      const linhas = Object.entries(grupos).map(([k, v]) => `${k}: R$ ${v.toFixed(2)}`);
      return [...linhas, `TOTAL: R$ ${total.toFixed(2)}`].join('\n');
    },
  },
};

function responder(msg) {
  const { id, method, params } = msg;
  if (method === 'initialize') {
    return { protocolVersion: params?.protocolVersion || '2025-06-18', capabilities: { tools: {} }, serverInfo: { name: 'ponte-modelo', version: '0.2.0' } };
  }
  if (method === 'ping') return {};
  if (method === 'tools/list') {
    return { tools: Object.entries(tools).map(([name, t]) => ({ name, description: t.description, inputSchema: t.inputSchema })) };
  }
  if (method === 'tools/call') {
    const t = tools[params?.name];
    if (!t) throw Object.assign(new Error(`tool desconhecida: ${params?.name}`), { code: -32602 });
    try {
      return { content: [{ type: 'text', text: t.run(params.arguments || {}) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: `erro: ${e.message}` }], isError: true };
    }
  }
  if (id === undefined) return undefined; // notificação: não responde
  throw Object.assign(new Error(`método não suportado: ${method}`), { code: -32601 });
}

if (process.argv.includes('--selftest')) {
  const lista = responder({ id: 1, method: 'tools/list' }).tools;
  console.log(`tools: ${lista.length} (${lista.map(t => t.name).join(', ')})`);
  console.log(responder({ id: 2, method: 'tools/call', params: { name: 'listar_horarios_livres', arguments: { data: '2026-10-06' } } }).content[0].text);
  console.log(responder({ id: 3, method: 'tools/call', params: { name: 'resumo_vendas', arguments: {} } }).content[0].text.split('\n').pop());
  process.exit(0);
}

createInterface({ input: process.stdin }).on('line', linha => {
  if (!linha.trim()) return;
  let msg;
  try { msg = JSON.parse(linha); } catch { return; }
  try {
    const result = responder(msg);
    if (msg.id !== undefined && result !== undefined) process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, result }) + '\n');
  } catch (e) {
    if (msg.id !== undefined) process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, error: { code: e.code || -32603, message: e.message } }) + '\n');
  }
});
