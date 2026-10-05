// Painel do time: /painel abre um pane com as sessões em segundo plano (`claude agents --json`)
// desta pasta, com botões para atualizar e parar uma sessão. Só o clique da pessoa para uma sessão.
import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Sessao } from '../types'

const PANE = 'runtime-painel'
const sessoes = atom({ plugin: 'runtime-painel', key: 'sessoes' } as const, [])
const atualizado = atom({ plugin: 'runtime-painel', key: 'atualizado' } as const, '')

type Bruta = { id?: string; sessionId?: string; name?: string; kind?: string; state?: string; status?: string; startedAt?: number; cwd?: string }

async function carregar($: EngineInterface) {
  const r = await $.process.run(['claude', 'agents', '--json', '--all'])
  let lista: Bruta[] = []
  try {
    lista = JSON.parse(r.stdout || '[]')
  } catch {
    lista = []
  }
  const agora = Date.now()
  const tabela: Sessao[] = lista
    .filter(s => s.kind === 'background')
    .map(s => ({
      id: s.id || (s.sessionId || '-').slice(0, 8),
      nome: s.name || '-',
      tipo: s.kind || '-',
      estado: s.state || s.status || '-',
      minutos: s.startedAt ? Math.round((agora - s.startedAt) / 60000) : 0,
    }))
    .sort((a, b) => a.minutos - b.minutos)
    .slice(0, 30)
  await update($, sessoes, () => tabela)
  await update($, atualizado, () => new Date(agora).toLocaleTimeString('pt-BR'))
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'painel', description: 'Mostra o time em segundo plano (claude --bg)' })
    return next(e)
  })

  on('command.run', { command: 'painel' }, async $ => {
    await carregar($)
    await $.ui.open({ id: PANE, title: 'Time em segundo plano' })
    return { text: 'Painel aberto. Use Atualizar para ler de novo.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button } = $.ui.resolve(e)
    const lista = await read($, sessoes)
    const hora = await read($, atualizado)

    return (
      <Box flexDirection="column">
        <Box flexDirection="row">
          <Button onPress={() => void carregar($)}>Atualizar</Button>
          <Text dimColor> lido às {hora || '-'}</Text>
        </Box>
        {lista.length === 0 && <Text dimColor>Nenhuma sessão em segundo plano. Solte uma com claude --bg "tarefa".</Text>}
        {lista.map(s => (
          <Box flexDirection="row">
            <Text>{s.id} </Text>
            <Text bold>{s.nome} </Text>
            <Text color={s.estado === 'failed' || s.estado === 'blocked' ? 'red' : undefined}>{s.estado} </Text>
            <Text dimColor>{s.minutos} min </Text>
            {(s.estado === 'working' || s.estado === 'idle') && (
              <Button onPress={() => void $.process.run(['claude', 'stop', s.id]).then(() => carregar($))}>Parar</Button>
            )}
          </Box>
        ))}
      </Box>
    )
  })
}
