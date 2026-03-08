'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'

function toCSV(results: any[]) {
  const headers = ['index', 'duration_ms', 'status', 'ok', 'timestamp', 'error']
  const lines = [headers.join(',')]
  for (const r of results) {
    const row = [r.index, r.duration, r.status, r.ok, new Date(r.timestamp).toISOString(), r.error || '']
    lines.push(row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
  }
  return lines.join('\n')
}

export default function ResultsTable() {
  const results = useBenchmarkStore((s) => s.results)

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reqx-results-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportCSV = () => {
    const csv = toCSV(results)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reqx-results-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(results, null, 2))
      alert('Copied results to clipboard')
    } catch (e) {
      alert('Copy failed')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-end gap-2 mb-3">
        <button className="px-3 py-1 bg-white/3 rounded" onClick={copyToClipboard}>Copy</button>
        <button className="px-3 py-1 bg-white/3 rounded" onClick={exportJSON}>Export JSON</button>
        <button className="px-3 py-1 bg-white/3 rounded" onClick={exportCSV}>Export CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-white/6">
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Duration (ms)</th>
              <th className="py-2 px-3">Time</th>
              <th className="py-2 px-3">Error</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.index} className="border-b border-white/3">
                <td className="py-2 px-3">{r.index + 1}</td>
                <td className={`py-2 px-3 font-medium ${r.status >= 200 && r.status < 300 ? 'text-green-400' : r.status >= 400 ? 'text-red-400' : 'text-amber-400'}`}>
                  {r.status || 'ERR'}
                </td>
                <td className="py-2 px-3">{r.duration.toFixed(2)}</td>
                <td className="py-2 px-3">{new Date(r.timestamp).toLocaleTimeString()}</td>
                <td className="py-2 px-3 text-xs text-rose-300">{r.error || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
