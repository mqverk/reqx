'use client'
import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
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
  return bins.map((count, i) => {
    const binStart = min + i * binSize
    const mid = binStart + binSize / 2
    return { bin: Math.round(binStart), count, mid }
  })
}

export default function LatencyHistogram() {
  const results = useBenchmarkStore((s) => s.results)
  const data = React.useMemo(() => {
    const vals = results.map((r) => r.duration)
    return makeBins(vals, 12)
  }, [results])

  const maxMid = React.useMemo(() => {
    if (!data.length) return 0
    return Math.max(...data.map((d) => d.mid || 0))
  }, [data])

  const colorFor = (v: number) => {
    if (!maxMid) return '#60A5FA'
    const p = v / maxMid
    if (p < 0.4) return '#60A5FA' // blue
    if (p < 0.75) return '#F472B6' // pink
    return '#FB7185' // rose
  }

  if (!results.length) return <div className="text-sm text-slate-400 py-6">No data yet</div>

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
          <XAxis dataKey="bin" tick={{ fill: '#94a3b8' }} />
          <YAxis tick={{ fill: '#94a3b8' }} />
          <Tooltip />
          <Bar dataKey="count" isAnimationActive animationDuration={700}>
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={colorFor(entry.mid || 0)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
