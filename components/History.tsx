'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'

export default function History() {
  const history = useBenchmarkStore((s) => s.history)
  const loadHistory = useBenchmarkStore((s) => s.loadHistory)
  const loadHistoryItem = useBenchmarkStore((s) => s.loadHistoryItem)
  const startBenchmark = useBenchmarkStore((s) => s.startBenchmark)

  React.useEffect(() => {
    loadHistory()
  }, [loadHistory])

  if (!history.length) return <div className="text-sm text-slate-400">No recent tests</div>

  return (
    <div className="space-y-2">
      {history.map((h) => (
        <div key={h.id} className="p-2 rounded-md bg-white/2 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">{new Date(h.timestamp).toLocaleString()}</div>
            <div className="text-xs text-slate-400">{h.config.method} {h.config.url} • {h.results.length} req</div>
          </div>
          <div className="flex gap-2">
            <button className="px-2 py-1 bg-white/3 rounded" onClick={() => loadHistoryItem(h.id)}>Load</button>
            <button className="px-2 py-1 bg-green-600 rounded" onClick={async () => { loadHistoryItem(h.id); await startBenchmark() }}>Re-run</button>
          </div>
        </div>
      ))}
    </div>
  )
}
