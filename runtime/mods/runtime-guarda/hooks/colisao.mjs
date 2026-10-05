#!/usr/bin/env node
// Guarda de colisão: antes de editar, avisa se o arquivo foi mexido por OUTRA sessão
// (ou por fora: Codex, editor, outra pessoa) nos últimos INEMA_COLISAO_MIN minutos (padrão 30).
//   colisao.mjs pre  → hook PreToolUse (Edit|Write|MultiEdit|NotebookEdit): responde "ask" com o motivo
//   colisao.mjs pos  → hook PostToolUse: anota "esta sessão editou este arquivo agora"
// Registro compartilhado entre sessões: ${XDG_STATE_HOME:-~/.local/state}/inema-runtime/toques.json
import { readFileSync, writeFileSync, mkdirSync, statSync, renameSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';

const modo = process.argv[2];
const janelaMs = Number(process.env.INEMA_COLISAO_MIN || 30) * 60000;
const pastaEstado = process.env.INEMA_RUNTIME_ESTADO
  || join(process.env.XDG_STATE_HOME || join(homedir(), '.local', 'state'), 'inema-runtime');
const registro = join(pastaEstado, 'toques.json');

function lerRegistro() {
  try { return JSON.parse(readFileSync(registro, 'utf8')); } catch { return {}; }
}

function gravarRegistro(dados) {
  mkdirSync(pastaEstado, { recursive: true });
  const limite = Date.now() - 24 * 3600000;
  for (const [k, v] of Object.entries(dados)) if (v.ts < limite) delete dados[k];
  const tmp = `${registro}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(dados));
  renameSync(tmp, registro); // troca atômica: duas sessões não corrompem o arquivo
}

function minutos(ms) {
  const m = Math.round(ms / 60000);
  return m < 1 ? 'agora há pouco' : `há ${m} min`;
}

let entrada;
try { entrada = JSON.parse(readFileSync(0, 'utf8')); } catch { process.exit(0); }
const alvo = entrada.tool_input?.file_path || entrada.tool_input?.notebook_path;
if (!alvo) process.exit(0);
const arquivo = resolve(entrada.cwd || process.cwd(), alvo);
const sessao = entrada.session_id || 'desconhecida';

if (modo === 'pos') {
  const dados = lerRegistro();
  dados[arquivo] = { sessao, ts: Date.now() };
  gravarRegistro(dados);
  process.exit(0);
}

if (modo !== 'pre') process.exit(0);

let mtime;
try { mtime = statSync(arquivo).mtimeMs; } catch { process.exit(0); } // arquivo novo: nada a proteger

const agora = Date.now();
const toque = lerRegistro()[arquivo];
let motivo;

if (toque && toque.sessao !== sessao && agora - toque.ts < janelaMs) {
  motivo = `Outra sessão (${toque.sessao.slice(0, 8)}) editou ${alvo} ${minutos(agora - toque.ts)}.`;
} else if (agora - mtime < janelaMs && !(toque && toque.sessao === sessao && mtime - toque.ts < 2000)) {
  motivo = `${alvo} foi alterado fora desta sessão ${minutos(agora - mtime)} (outro agente, Codex, editor ou pessoa).`;
}

if (motivo) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'ask',
      permissionDecisionReason: `Guarda de colisão: ${motivo} Seguir mesmo assim, usar outra cópia (worktree) ou cancelar?`,
    },
  }));
}
