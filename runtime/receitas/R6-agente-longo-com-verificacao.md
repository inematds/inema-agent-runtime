# R6 · Agente longo com verificação

**Para quê:** tarefas de horas (migrar planilhas, montar um site, revisar 100 arquivos). O agente só termina quando os critérios **provam** que terminou, e não quando ele acha que terminou.
**Via:** CLI · **Política:** a da tarefa; os portões humanos ficam escritos no goal.
**Pré:** Claude Code ou Codex · **Dificuldade:** média · **Tempo:** 20 min para montar

## 1. Escreva o goal com critérios verificáveis

Copie `runtime/exemplos/goal-exemplo.md`. Cada critério é uma linha:

```
- [ ] `comando` → `texto que tem de aparecer na saída`
```

Bom critério: dá para checar com um comando, a resposta é sim ou não, e é impossível passar sem fazer o trabalho. "Deixar bom" não é critério.

## 2. Verifique quantas vezes quiser

```bash
node runtime/scripts/verificar.mjs runtime/exemplos/goal-exemplo.md
```

**Prova:** `4/4 critérios OK` e saída 0. Mude um valor esperado no goal: a linha vira `FALHA` e a saída é 1.

## 3. Rode o agente até passar

No Claude Code ou no Codex:

> /goal Cumpra o goal em meu-goal.md. Depois de cada etapa rode `node runtime/scripts/verificar.mjs meu-goal.md`. Só pare com todos OK ou num portão humano do goal.

## 4. Proteções

- Portões humanos no goal: gasto, envio, apagar, publicar.
- Anote no `FALHAS.md` o que quebrou e no `LIMITES.md` o que o ambiente barrou, uma linha cada.
- Em Linux, para rodar sem tela, o método completo (laço com tempo e memória limitados) está em [inematds/execucao-longa](https://github.com/inematds/execucao-longa).
