#!/usr/bin/env node
// Mostra o time em segundo plano: sessões do `claude --bg` desta pasta (ou de todas com --todas).
// Só lê `claude agents --json`. Não para nem altera sessão nenhuma.
import { spawnSync } from 'node:child_process';

const todas = process.argv.includes('--todas');
const args = ['agents', '--json', '--all', ...(todas ? [] : ['--cwd', process.cwd()])];
const r = spawnSync('claude', args, { encoding: 'utf8', timeout: 20000 });
if (r.error) {
  console.error(r.error.code === 'ENOENT' ? 'claude não encontrado (rode runtime/scripts/doctor.mjs)' : r.error.message);
  process.exit(1);
}

let sessoes;
try { sessoes = JSON.parse(r.stdout || '[]'); } catch { console.error('saída inesperada de claude agents --json'); process.exit(1); }

function idade(ms) {
  const min = Math.round((Date.now() - ms) / 60000);
  return min < 60 ? `${min} min` : `${Math.floor(min / 60)} h ${min % 60} min`;
}

// Sessões em segundo plano têm `id`; as interativas só `sessionId`.
const linhas = sessoes.map(s => [s.id || (s.sessionId || '-').slice(0, 8), s.kind || '-', s.name || '-', s.state || s.status || '-', s.startedAt ? idade(s.startedAt) : '-']);
const cab = ['id', 'tipo', 'nome', 'estado', 'iniciada há'];
const larg = cab.map((c, i) => Math.max(c.length, ...linhas.map(l => String(l[i]).length)));
const fmt = l => l.map((v, i) => String(v).padEnd(larg[i])).join('  ');

console.log(fmt(cab));
for (const l of linhas) console.log(fmt(l));
if (!linhas.length) console.log('(nenhuma sessão em segundo plano' + (todas ? ')' : ' nesta pasta; use --todas)'));
console.log('\nver saída: claude logs <id> · entrar: claude attach <id> · parar: claude stop <id>');
