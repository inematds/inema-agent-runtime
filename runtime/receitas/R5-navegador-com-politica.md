# R5 · Navegador com política

**Para quê:** o sistema só existe como site (portal do fornecedor, prefeitura, banco). O agente opera o navegador, com regra clara do que pode fazer sozinho.
**Via:** uso do computador (nível 5) · **Política:** ler página = N4; preencher ou enviar = N2 (pede antes); pagar = N1 (nunca).
**Pré:** Node 18+ · **Dificuldade:** média · **Tempo:** 15 min

Use a via de navegador só quando não existir API, MCP, CLI ou exportação: é a mais frágil, porque o site muda.

## 1. Instale o navegador para agentes

```bash
npm i -g agent-browser
agent-browser install        # baixa o Chromium que ele usa
```

## 2. Teste só leitura

```bash
agent-browser open https://example.com
agent-browser get title
agent-browser close
```

**Prova:** a saída é `Example Domain`.

## 3. Use pelo agente

Peça ao Claude ou ao Codex:

> Use o agent-browser para abrir <site>, ler a tabela de preços e me devolver em CSV. Não clique em botões de envio ou compra: se precisar, pare e me pergunte.

## Regras para colar no `AGENTS.md`

```
Navegador:
- Ler, rolar, tirar print: pode.
- Preencher formulário: mostre o que vai preencher e espere meu OK.
- Enviar, confirmar, pagar, apagar: nunca sozinho.
- Login: eu faço; você não pede nem guarda senha.
```

No Claude Code também existe a extensão "Claude in Chrome", que usa o seu navegador logado. As mesmas regras valem.
