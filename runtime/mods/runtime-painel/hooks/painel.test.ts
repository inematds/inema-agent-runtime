import { expect, test } from 'claude-code/testing'

const falso = [
  { id: 'aaa11111', sessionId: 'aaa11111-x', name: 'revisor', kind: 'background', state: 'done', startedAt: Date.now() - 120000 },
  { sessionId: 'bbb22222-y', name: 'minha-tela', kind: 'interactive', status: 'idle', startedAt: Date.now() },
]

test('/painel lê claude agents e guarda só as sessões em segundo plano', async ($, on) => {
  // O teste faz o papel do motor: responde ao `claude agents`, ao pane e ao estado.
  const estado: Record<string, unknown> = {}
  let versao = 0
  on('process.run', async () => ({ value: { exitCode: 0, stdout: JSON.stringify(falso), stderr: '', isStdoutTruncated: false, isStderrTruncated: false } }))
  on('ui.open', async () => ({ value: { isPlaced: true } }))
  on('state.get', async (_$, e) => ({ value: { value: estado[`${e.plugin}.${e.key}`], version: versao } }))
  on('state.set', async (_$, e) => {
    estado[`${e.plugin}.${e.key}`] = e.value
    return { value: { isSet: true, version: ++versao } }
  })

  await $.command.run({ command: 'painel' })

  expect(estado['runtime-painel.sessoes']).toEqual([{ id: 'aaa11111', nome: 'revisor', tipo: 'background', estado: 'done', minutos: 2 }])
})
