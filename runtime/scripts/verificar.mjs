#!/usr/bin/env node
// Roda os critérios de pronto de um goal.md e diz OK/FALHA por linha.
// Formato de cada critério (linha de lista):  - [ ] `comando` → `texto esperado na saída`
// O critério passa se o comando terminar com saída 0 e a saída contiver o texto esperado.
// Uso: node runtime/scripts/verificar.mjs caminho/goal.md
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const arquivo = process.argv[2];
if (!arquivo) { console.error('uso: verificar.mjs <goal.md>'); process.exit(2); }

const criterio = /^\s*-\s*\[[ xX]\]\s*`([^`]+)`\s*→\s*`([^`]*)`/;
const itens = readFileSync(arquivo, 'utf8').split('\n').map(l => l.match(criterio)).filter(Boolean);
if (!itens.length) { console.error('nenhum critério no formato - [ ] `comando` → `esperado`'); process.exit(2); }

let falhas = 0;
for (const [, comando, esperado] of itens) {
  const r = spawnSync('bash', ['-c', comando], { encoding: 'utf8', timeout: Number(process.env.VERIFICAR_TIMEOUT || 120) * 1000 });
  const saida = ((r.stdout || '') + (r.stderr || '')).trim();
  const ok = r.status === 0 && saida.includes(esperado);
  if (!ok) falhas++;
  console.log(`${ok ? 'OK    ' : 'FALHA '} ${comando}`);
  if (!ok) console.log(`       esperado: ${esperado}\n       saída (${r.status}): ${saida.split('\n').slice(-3).join(' | ')}`);
}
console.log(`\n${itens.length - falhas}/${itens.length} critérios OK`);
process.exit(falhas ? 1 : 0);
