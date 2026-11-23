import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Check, Report } from '../types'

const PANE = 'site-durumu'
const TITLE = 'Site durumu'
type Target = Pick<Check, "label" | "url" | "expected">

// Reads the address from the mod's settings, so no site is written in the code.
function targetsFrom(options: Record<string, unknown>): { base: string; targets: Target[] } {
  const base = String(options.site_url ?? "").trim().replace(/\/+$/, "")
  const hidden = String(options.hidden_path ?? "").trim()
  if (!base) return { base, targets: [] }
  const targets: Target[] = [{ label: "Site", url: `${base}/`, expected: 200 }]
  if (hidden) {
    const path = hidden.startsWith("/") ? hidden : `/${hidden}`
    targets.push({ label: `${path} gizli mi`, url: `${base}${path}`, expected: 404 })
  }
  return { base, targets }
}

const report = atom(
  { plugin: 'site-durumu', key: 'report' } as const,
  { checkedAt: null, isBusy: false, checks: [] } as Report,
  { shape: 'report-1' },
)

const pad = (n: number) => String(n).padStart(2, '0')
const clockText = (ms: number) => {
  const d = new Date(ms)
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

async function refresh($: EngineInterface, targets: Target[]) {
  await update($, report, r => ({ ...r, isBusy: true }))
  const checks: Check[] = []
  for (const t of targets) {
    const start = await $.clock.now()
    try {
      const res = await $.http.fetch(t.url)
      checks.push({ ...t, status: res.status, ms: (await $.clock.now()) - start, error: null })
    } catch (err) {
      checks.push({ ...t, status: null, ms: null, error: String(err) })
    }
  }
  const checkedAt = await $.clock.now()
  await update($, report, () => ({ checkedAt, isBusy: false, checks }))
}

export const register: Register = (on, options) => {
  const { base, targets } = targetsFrom(options as Record<string, unknown>)

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'site-durumu',
      description: 'Sitenin durumunu panelde göster',
    })
    void $.ui.open({ id: PANE, title: TITLE })
    void refresh($, targets)

    return next(e)
  })

  on('command.run', { command: 'site-durumu' }, async $ => {
    await $.ui.open({ id: PANE, title: TITLE })
    void refresh($, targets)

    return { text: 'Site durumu paneli açıldı.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button } = $.ui.resolve(e)
    const r = await read($, report)

    return (
      <Box flexDirection="column" gap={1}>
        <Text dimColor>{base ? base.replace(/^https?:\/\//, '') : 'Site adresi ayarlanmadı: /config içinden site-durumu → Site adresi.'}</Text>
        {r.checks.length === 0 && <Text dimColor>Henüz kontrol edilmedi.</Text>}
        {r.checks.map(c => {
          const isOk = c.status === c.expected
          const detail =
            c.status === null
              ? `ulaşılamadı (${c.error})`
              : `${c.status}${c.ms !== null ? ` · ${c.ms} ms` : ''}`
          return (
            <Text key={c.url} color={isOk ? 'green' : 'red'}>
              {isOk ? '✓' : '✗'} {c.label}: {detail}
            </Text>
          )
        })}
        <Text dimColor>
          {r.isBusy
            ? 'Kontrol ediliyor…'
            : r.checkedAt
              ? `Son kontrol: ${clockText(r.checkedAt)}`
              : ''}
        </Text>
        <Button key="yenile" label="Yenile" onPress={() => void refresh($, targets)} />
      </Box>
    )
  })
}
