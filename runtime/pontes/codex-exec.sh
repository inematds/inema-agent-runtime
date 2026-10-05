#!/usr/bin/env bash
# Ponte nível 3 (CLI): manda um pedido ao Codex pela assinatura e imprime a resposta final.
# Uso: runtime/pontes/codex-exec.sh "pedido" [pasta] [sandbox]
#   sandbox: read-only (padrão, POLITICA: ler) | workspace-write (POLITICA: alterar, N3)
# Modelo: CODEX_MODELO (padrão gpt-6-luna = nível "menor" do ROTEAMENTO.md)
set -euo pipefail

pedido="${1:?uso: codex-exec.sh \"pedido\" [pasta] [sandbox]}"
pasta="${2:-$PWD}"
sandbox="${3:-read-only}"
modelo="${CODEX_MODELO:-gpt-6-luna}"

case "$sandbox" in
  read-only|workspace-write) ;;
  *) echo "sandbox recusado pela POLITICA: $sandbox" >&2; exit 2 ;;
esac

saida="$(mktemp)"
trap 'rm -f "$saida"' EXIT

# O pedido vai pelo stdin e o "-" fecha a entrada; sem isso o codex fica esperando.
printf '%s' "$pedido" | timeout "${CODEX_TIMEOUT:-600}" \
  codex exec -m "$modelo" -s "$sandbox" -C "$pasta" --skip-git-repo-check -o "$saida" - >/dev/null 2>"$saida.log" \
  || { echo "codex falhou; log:" >&2; tail -20 "$saida.log" >&2; rm -f "$saida.log"; exit 1; }

rm -f "$saida.log"
cat "$saida"
