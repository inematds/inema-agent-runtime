#!/usr/bin/env node
// Raio de explosão: antes de um comando que apaga (`rm`, `git clean`), mostra o que seria apagado
// e pede confirmação. Hook PreToolUse do Bash. Não apaga nada: só lê o disco.
import { readFileSync, lstatSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

let entrada;
try { entrada = JSON.parse(readFileSync(0, 'utf8')); } catch { process.exit(0); }
const comando = entrada.tool_input?.command;
if (!comando) process.exit(0);
const cwd = entrada.cwd || process.cwd();

// Separa em trechos (&&, ||, ;, |) e em palavras, respeitando aspas simples e duplas.
function palavras(trecho) {
  return [...trecho.matchAll(/'([^']*)'|"([^"]*)"|(\S+)/g)].map(m => m[1] ?? m[2] ?? m[3]);
}
const trechos = comando.split(/&&|\|\||;|\|/).map(palavras).filter(p => p.length);

let arquivos = 0;
let bytes = 0;
const exemplos = [];

function contar(caminho) {
  let st;
  try { st = lstatSync(caminho); } catch { return; }
  if (st.isDirectory()) {
    for (const nome of readdirSync(caminho)) {
      if (arquivos > 20000) return;
      contar(join(caminho, nome));
    }
  } else {
    arquivos++;
    bytes += st.size;
    if (exemplos.length < 8) exemplos.push(caminho);
  }
}

// Expande curingas (*.log) pelo próprio bash, só listando.
function expandir(padrao) {
  if (!/[*?[]/.test(padrao)) return [resolve(cwd, padrao)];
  const r = spawnSync('bash', ['-c', 'compgen -G "$1"', '_', padrao], { cwd, encoding: 'utf8' });
  return (r.stdout || '').split('\n').filter(Boolean).map(p => resolve(cwd, p));
}

for (let p of trechos) {
  if (p[0] === 'sudo') p = p.slice(1);
  if (p[0] === 'rm') {
    for (const arg of p.slice(1)) if (!arg.startsWith('-')) for (const c of expandir(arg)) contar(c);
  } else if (p[0] === 'git' && p[1] === 'clean') {
    // Mesmas opções, sem o "forçar" (-f/--force): com -n o git só lista.
    const flags = p.slice(2).filter(a => a.startsWith('-') && a !== '--force')
      .map(a => (a.startsWith('--') ? a : a.replace(/f/g, ''))).filter(a => a !== '-');
    const r = spawnSync('git', ['clean', '-n', ...flags], { cwd, encoding: 'utf8' });
    for (const linha of (r.stdout || '').split('\n')) {
      const m = linha.match(/^Would remove (.+)$/);
      if (m) contar(resolve(cwd, m[1]));
    }
  }
}

if (!arquivos) process.exit(0); // nada existente seria apagado

const tamanho = bytes > 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;
const lista = exemplos.map(e => `  - ${e}`).join('\n');
process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    permissionDecision: 'ask',
    permissionDecisionReason: `Raio: este comando apaga ${arquivos >= 20000 ? 'mais de 20000' : arquivos} arquivo(s), ${tamanho}.\n${lista}${arquivos > exemplos.length ? '\n  - …' : ''}\nTem backup? Confirme para seguir.`,
  },
}));
