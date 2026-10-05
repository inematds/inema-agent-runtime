# R1 · Claude usa o Codex

**Para quê:** pedir ao Codex uma segunda opinião, uma revisão ou uma tarefa, sem sair do Claude Code. O Claude decide; o Codex executa e devolve o resultado.
**Via:** CLI (nível 3) · **Política:** ler (N4) por padrão; alterar arquivos (N3) só se você pedir.
**Pré:** Codex CLI logado (`codex login`) · **Dificuldade:** fácil · **Tempo:** 5 min

## 1. Teste a ponte sozinha

```bash
chmod +x runtime/pontes/codex-exec.sh
runtime/pontes/codex-exec.sh "Responda apenas PONG"
```

**Prova:** a saída é `PONG`.

## 2. Use de dentro do Claude Code

Abra `claude` na pasta do projeto e peça:

> Use `runtime/pontes/codex-exec.sh` para pedir ao Codex uma revisão do arquivo README.md: o que está confuso para um iniciante? Depois compare com a sua opinião.

O Claude roda a ponte, lê a resposta do Codex e combina com a dele.

## 3. Deixar o Codex alterar arquivos (N3)

```bash
runtime/pontes/codex-exec.sh "Crie notas.txt com a palavra OK" "$PWD" workspace-write
```

**Prova:** `cat notas.txt` mostra `OK`.

## Ajustes

| Variável | Padrão | Para quê |
|---|---|---|
| `CODEX_MODELO` | `gpt-6-luna` | outro nível do `ROTEAMENTO.md` |
| `CODEX_TIMEOUT` | `600` | segundos até desistir |

## Se der erro

- Fica parado sem responder: o pedido precisa ir pelo stdin com `-` no fim (a ponte já faz isso).
- `sandbox recusado pela POLITICA`: só `read-only` e `workspace-write` são aceitos.
- O sandbox do Codex bloqueia rede, até a local. Se o teste precisar subir um servidor, acrescente `-c sandbox_workspace_write.network_access=true` na ponte e anote em `LIMITES.md`.
