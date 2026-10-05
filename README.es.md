# INEMA Agent Runtime

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

[![INEMA Agent Runtime](guia/assets/banner-es.jpg)](https://inematds.github.io/inema-agent-runtime/guia/es/)

Kit copiable para que tus agentes de IA (Claude Code y Codex) **descubran, conecten y usen** las herramientas que ya tienes, con reglas claras de lo que pueden hacer solos.

No es una plataforma ni un servidor. Es una carpeta `runtime/` con 4 archivos de reglas, scripts de diagnóstico y verificación, puentes, una protección (guarda) y 7 recetas probadas. Funciona con tu **suscripción** de Claude Code y/o Codex: ninguna API de pago es requisito.

**Guía:** https://inematds.github.io/inema-agent-runtime/guia/es/

## En 10 minutos

```bash
git clone https://github.com/inematds/inema-agent-runtime mi-proyecto
cd mi-proyecto
node runtime/scripts/doctor.mjs        # qué está instalado y con sesión iniciada
```

Después abre `claude` (o `codex`) en esa carpeta y pide:

> Lee runtime/LEIA-ME.md y ayúdame a completar el CAPACIDADES.md para mi trabajo.

Los archivos de `runtime/` están en portugués; tu agente los lee y te responde en tu idioma.

## Qué hay aquí

| Archivo | Para qué |
|---|---|
| `runtime/LEIA-ME.md` | El ciclo y la escalera de vías |
| `runtime/CAPACIDADES.md` | Mapa de las herramientas que el agente puede usar y por qué vía |
| `runtime/POLITICA.md` | Qué hace el agente solo, qué pide antes y qué nunca hace |
| `runtime/ROTEAMENTO.md` | Qué modelo para qué tarea (ahorra cuota) |
| `runtime/scripts/` | `doctor` (diagnóstico), `observar` (equipo en segundo plano), `verificar` (criterios de terminado) |
| `runtime/pontes/` | `codex-exec.sh` (Claude usa Codex) y `mcp-modelo/` (un sistema sin API se vuelve herramienta) |
| `runtime/mods/` | `runtime-guarda` (colisión y radio, ya activada en este kit) y `runtime-painel` (opcional) |
| `AGENTS.md` / `CLAUDE.md` | Hacen que Codex y Claude lean las mismas reglas |
| `.claude/` | Política aplicada, equipo de 3 roles y protección activada |

## Recetas (en portugués)

| # | Receta | Vía |
|---|---|---|
| R1 | [Claude usa Codex](runtime/receitas/R1-claude-usa-codex.md) | CLI |
| R2 | [Equipo de tres roles](runtime/receitas/R2-time-tres-papeis.md) | subagentes |
| R3 | [Puente MCP para un sistema sin API](runtime/receitas/R3-ponte-mcp-sistema-sem-api.md) | puente local + MCP |
| R4 | [Equipo en segundo plano](runtime/receitas/R4-time-em-segundo-plano.md) | `claude --bg` |
| R5 | [Navegador con política](runtime/receitas/R5-navegador-com-politica.md) | uso de la computadora |
| R6 | [Agente largo con verificación](runtime/receitas/R6-agente-longo-com-verificacao.md) | CLI + criterios |
| R7 | [Protección y panel](runtime/receitas/R7-guarda-e-painel.md) | hooks y mods |

Cada receta tiene una sección **Prova** (prueba): el comando y lo que debe aparecer. Las pruebas ejecutadas están en el [CHANGELOG](CHANGELOG.md).

## La idea en una frase

Antes de decir "imposible", el agente sube la escalera de vías de integración — **API → MCP → CLI → SDK → uso de la computadora → puente local → ingeniería inversa (solo laboratorio)** — y usa siempre la más estable que exista.

## Requisitos

- Node 18+ · Claude Code y/o Codex CLI con sesión iniciada por suscripción
- Linux o Mac. Windows: usa WSL.

Licencia MIT · Parte del ecosistema [INEMA.CLUB](https://inema.club)
