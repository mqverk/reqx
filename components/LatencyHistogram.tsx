'use client'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useBenchmarkStore } from '../stores/benchmarkStore'

function makeBins(values: number[], binCount = 10) {
  if (!values.length) return []
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = Math.max(1, max - min)
  const binSize = span / binCount
  const bins = new Array(binCount).fill(0)
  for (const v of values) {
    const idx = Math.min(binCount - 1, Math.floor((v - min) / binSize))
    bins[idx]++
  }
  return bins.map((count, i) => ({ bin: Math.round(min + i * binSize), count }))
}

export default function LatencyHistogram() {
  const results = useBenchmarkStore((s) => s.results)
  const data = React.useMemo(() => {
    const vals = results.map((r) => r.duration)
    return makeBins(vals, 12)
  }, [results])

  if (!results.length) return <div className="text-sm text-slate-400 py-6">No data yet</div>

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
          <XAxis dataKey="bin" tick={{ fill: '#94a3b8' }} />
          <YAxis tick={{ fill: '#94a3b8' }} />
          <Tooltip />
          <Bar dataKey="count" fill="#F472B6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
