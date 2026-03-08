 'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'
import IconButton from './IconButton'
import { Copy, DownloadCloud, FileText, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react'

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
        <IconButton icon={Copy} title="Copy results" onClick={copyToClipboard} className="bg-white/3 text-slate-100 hover:bg-white/5" />
        <IconButton icon={DownloadCloud} title="Export JSON" onClick={exportJSON} className="bg-white/3 text-slate-100 hover:bg-white/5" />
        <IconButton icon={FileText} title="Export CSV" onClick={exportCSV} className="bg-white/3 text-slate-100 hover:bg-white/5" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm zebra">
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
                <td className="py-2 px-3 input-mono">{r.index + 1}</td>
                <td className="py-2 px-3 font-medium">
                  <div className="inline-flex items-center gap-2">
                    {r.status >= 200 && r.status < 300 ? (
                      <CheckCircle size={16} className="text-green-400" />
                    ) : r.status >= 400 ? (
                      <AlertCircle size={16} className="text-red-400" />
                    ) : (
                      <HelpCircle size={16} className="text-amber-400" />
                    )}
                    <span className={`${r.status >= 200 && r.status < 300 ? 'text-green-400' : r.status >= 400 ? 'text-red-400' : 'text-amber-400'}`}>
                      {r.status || 'ERR'}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-3 input-mono">{r.duration.toFixed(2)}</td>
                <td className="py-2 px-3 input-mono">{new Date(r.timestamp).toLocaleTimeString()}</td>
                <td className="py-2 px-3 text-xs text-rose-300">{r.error || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
