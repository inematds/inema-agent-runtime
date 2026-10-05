export type Sessao = { id: string; nome: string; tipo: string; estado: string; minutos: number }

declare module 'claude-code' {
  interface PluginState {
    'runtime-painel': { sessoes: Sessao[]; atualizado: string }
  }
}
