'use client'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useBenchmarkStore } from '../stores/benchmarkStore'

export default function LatencyChart() {
  const results = useBenchmarkStore((s) => s.results)
  const data = React.useMemo(() => results.map((r) => ({ x: r.index + 1, y: Math.round(r.duration * 100) / 100 })), [results])

  if (!results.length) return <div className="text-sm text-slate-400 py-6">No data yet</div>

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
          <XAxis dataKey="x" tick={{ fill: '#94a3b8' }} />
          <YAxis tick={{ fill: '#94a3b8' }} />
          <Tooltip formatter={(value: any) => `${value} ms`} />
          <Line type="monotone" dataKey="y" stroke="#6366F1" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
