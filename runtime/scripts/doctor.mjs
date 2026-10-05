#!/usr/bin/env node
// Diagnóstico do INEMA Agent Runtime: o que está instalado e pronto para os agentes.
// Só lê versões e status locais. Não chama modelo nem API.
import { spawnSync } from 'node:child_process';

// Junta stdout e stderr: alguns CLIs (ex.: `codex login status`) respondem no stderr.
function rodar(bin, args) {
  const r = spawnSync(bin, args, { encoding: 'utf8', timeout: 20000, stdio: ['ignore', 'pipe', 'pipe'] });
  if (r.error && r.error.code === 'ENOENT') return null;
  return ((r.stdout || '') + (r.stderr || '')).trim() || 'erro';
}

function versao(texto) {
  const m = texto && texto.match(/\d+\.\d+\.\d+/);
  return m ? m[0] : '?';
}

const linhas = [];
let obrigatoriosOk = true;

const nodeMaior = Number(process.versions.node.split('.')[0]);
linhas.push(['node', nodeMaior >= 18 ? 'ok' : 'velho', process.versions.node, nodeMaior >= 18 ? '' : 'precisa 18+']);
if (nodeMaior < 18) obrigatoriosOk = false;

const claude = rodar('claude', ['--version']);
const codex = rodar('codex', ['--version']);

if (claude) {
  linhas.push(['claude', 'ok', versao(claude), 'login: abra `claude` uma vez; R2 usa ele']);
} else {
  linhas.push(['claude', 'ausente', '-', 'npm i -g @anthropic-ai/claude-code']);
}

if (codex) {
  const status = rodar('codex', ['login', 'status']) || '';
  const logado = /logged in/i.test(status);
  linhas.push(['codex', logado ? 'ok' : 'sem login', versao(codex), logado ? status.split('\n')[0] : 'rode `codex login`']);
} else {
  linhas.push(['codex', 'ausente', '-', 'npm i -g @openai/codex']);
}

if (!claude && !codex) obrigatoriosOk = false;

const ollama = rodar('ollama', ['--version']);
linhas.push(['ollama', ollama ? 'ok' : 'ausente', ollama ? versao(ollama) : '-', 'opcional: modelos locais grátis']);

for (const [nome, estado, ver, nota] of linhas) {
  console.log(`${nome.padEnd(7)} ${estado.padEnd(9)} ${ver.padEnd(9)} ${nota}`);
}
console.log(obrigatoriosOk ? '\nPRONTO: siga para runtime/receitas/R1-claude-usa-codex.md' : '\nFALTA: instale Node 18+ e pelo menos Claude Code ou Codex');
process.exit(obrigatoriosOk ? 0 : 1);
