# R7 · Guarda e painel

**Para quê:** com vários agentes trabalhando ao mesmo tempo, dois riscos aparecem: um agente sobrescrever o que outro acabou de fazer e um comando apagar mais do que devia. A **guarda** pega os dois antes de acontecer. O **painel** mostra o time em segundo plano dentro do Claude Code.
**Via:** hooks e mods oficiais do Claude Code · **Política:** a guarda nunca decide sozinha, ela **pergunta** (N2).
**Pré:** Claude Code, Node 18+ · **Dificuldade:** fácil · **Tempo:** 5 min

## A guarda (`runtime/mods/runtime-guarda`)

| Proteção | Quando dispara | O que faz |
|---|---|---|
| Colisão | antes de editar um arquivo que **outra sessão** editou, ou que mudou por fora (Codex, editor, outra pessoa) nos últimos 30 min | pergunta: seguir, usar outra cópia (worktree) ou cancelar |
| Raio | antes de `rm` ou `git clean` que apagaria arquivos existentes | mostra quantos arquivos, o tamanho e os primeiros caminhos, e pede confirmação |

**Neste kit ela já vem ligada** pelo `.claude/settings.json`. Para levar a outro projeto, escolha **um** dos jeitos, não os dois:

```bash
claude --plugin-dir /caminho/do/kit/runtime/mods/runtime-guarda      # só nesta sessão
```

ou copie o bloco `hooks` do `.claude/settings.json` deste kit para o do outro projeto, trocando o caminho.

Ajustes: `INEMA_COLISAO_MIN=60` muda a janela. O registro de quem editou o quê fica em `~/.local/state/inema-runtime/toques.json` e se limpa sozinho depois de 24 h.

### Prova

```bash
mkdir -p /tmp/teste-raio/x && echo a > /tmp/teste-raio/x/a && cd /tmp/teste-raio
printf '{"cwd":"%s","tool_name":"Bash","tool_input":{"command":"rm -r x"}}' "$PWD" \
  | node /caminho/do/kit/runtime/mods/runtime-guarda/hooks/raio.mjs
```

**Prova:** a saída traz `"permissionDecision":"ask"` e `Raio: este comando apaga 1 arquivo(s)`. Dentro do Claude, mesmo no modo que libera tudo, o `rm -r x` para e pede confirmação.

## O painel (`runtime/mods/runtime-painel`, opcional)

```bash
claude --plugin-dir runtime/mods/runtime-painel
```

Na sessão, digite `/painel`: abre um painel com as sessões do `claude --bg` (nome, estado, minutos), um botão **Atualizar** e **Parar** nas que estão rodando. Só o seu clique para uma sessão.

**Prova:** `claude plugin validate runtime/mods/runtime-painel` passa e `claude plugin test runtime/mods/runtime-painel` mostra `1 pass`.

## Limites

- O Codex ainda não tem um gancho "antes de editar" equivalente; a colisão protege as sessões do Claude e **detecta** edições feitas pelo Codex (pela data do arquivo).
- Mods e plugins rodam com as permissões do Claude Code. Leia o código de qualquer mod de terceiro antes de instalar.
