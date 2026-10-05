# INEMA Agent Runtime

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

[![INEMA Agent Runtime](guia/assets/banner-en.jpg)](https://inematds.github.io/inema-agent-runtime/guia/en/)

A copyable kit that lets your AI agents (Claude Code and Codex) **discover, connect to and use** the tools you already have, with clear rules about what they may do on their own.

It is not a platform or a server. It is a `runtime/` folder with 4 rule files, diagnostic and verification scripts, bridges, a guard and 7 tested recipes. It runs on your **subscription** to Claude Code and/or Codex: no paid API is required.

**Guide:** https://inematds.github.io/inema-agent-runtime/guia/en/

## In 10 minutes

```bash
git clone https://github.com/inematds/inema-agent-runtime my-project
cd my-project
node runtime/scripts/doctor.mjs        # what is installed and logged in
```

Then open `claude` (or `codex`) in that folder and ask:

> Read runtime/LEIA-ME.md and help me fill in CAPACIDADES.md for my work.

The files inside `runtime/` are written in Portuguese; your agent reads them and answers in your language.

## What is inside

| File | What for |
|---|---|
| `runtime/LEIA-ME.md` | The cycle and the integration ladder |
| `runtime/CAPACIDADES.md` | Map of the tools the agent may use and through which route |
| `runtime/POLITICA.md` | What the agent does alone, what it asks first and what it never does |
| `runtime/ROTEAMENTO.md` | Which model for which task (saves quota) |
| `runtime/scripts/` | `doctor` (diagnostic), `observar` (background team), `verificar` (done criteria) |
| `runtime/pontes/` | `codex-exec.sh` (Claude uses Codex) and `mcp-modelo/` (a system without an API becomes a tool) |
| `runtime/mods/` | `runtime-guarda` (collision and blast radius, already enabled in this kit) and `runtime-painel` (optional) |
| `AGENTS.md` / `CLAUDE.md` | Make Codex and Claude read the same rules |
| `.claude/` | Applied policy, 3-role team and enabled guard |

## Recipes (in Portuguese)

| # | Recipe | Route |
|---|---|---|
| R1 | [Claude uses Codex](runtime/receitas/R1-claude-usa-codex.md) | CLI |
| R2 | [Three-role team](runtime/receitas/R2-time-tres-papeis.md) | subagents |
| R3 | [MCP bridge for a system without an API](runtime/receitas/R3-ponte-mcp-sistema-sem-api.md) | local bridge + MCP |
| R4 | [Background team](runtime/receitas/R4-time-em-segundo-plano.md) | `claude --bg` |
| R5 | [Browser with a policy](runtime/receitas/R5-navegador-com-politica.md) | computer use |
| R6 | [Long-running agent with verification](runtime/receitas/R6-agente-longo-com-verificacao.md) | CLI + criteria |
| R7 | [Guard and dashboard](runtime/receitas/R7-guarda-e-painel.md) | hooks and mods |

Each recipe has a **Prova** (proof) section: the command and what must appear. The proofs that were run are in the [CHANGELOG](CHANGELOG.md).

## The idea in one sentence

Before saying "impossible", the agent climbs the ladder of integration routes — **API → MCP → CLI → SDK → computer use → local bridge → reverse engineering (lab only)** — and always uses the most stable one that exists.

## Requirements

- Node 18+ · Claude Code and/or Codex CLI logged in with your subscription
- Linux or Mac. Windows: use WSL.

MIT License · Part of the [INEMA.CLUB](https://inema.club) ecosystem
