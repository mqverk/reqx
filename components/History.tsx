 'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'
import IconButton from './IconButton'
import { ArrowRight, Play } from 'lucide-react'

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
            <IconButton icon={ArrowRight} title="Load" onClick={() => loadHistoryItem(h.id)} className="bg-white/3 text-slate-100 hover:bg-white/5" />
            <IconButton icon={Play} label="Re-run" onClick={async () => { loadHistoryItem(h.id); await startBenchmark() }} className="bg-green-600 text-white hover:bg-green-500" />
          </div>
        </div>
      ))}
    </div>
  )
}
