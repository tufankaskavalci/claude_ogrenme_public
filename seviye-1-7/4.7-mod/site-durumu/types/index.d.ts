export type Check = {
  label: string
  url: string
  expected: number
  status: number | null
  ms: number | null
  error: string | null
}

export type Report = { checkedAt: number | null; isBusy: boolean; checks: Check[] }

declare module 'claude-code' {
  interface PluginState {
    'site-durumu': { report: Shaped<Report> }
  }
}
