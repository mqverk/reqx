'use client'
import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useBenchmarkStore } from '../stores/benchmarkStore'

export default function LatencyChart() {
  const results = useBenchmarkStore((s) => s.results)
  const data = React.useMemo(() => results.map((r) => ({ x: r.index + 1, y: Math.round(r.duration * 100) / 100 })), [results])

  if (!results.length) return <div className="text-sm text-slate-400 py-6">No data yet</div>

  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="latencyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0.03} />
            </linearGradient>
            <linearGradient id="latencyStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
          <XAxis dataKey="x" tick={{ fill: '#94a3b8' }} />
          <YAxis tick={{ fill: '#94a3b8' }} />
          <Tooltip formatter={(value: any) => `${value} ms`} labelFormatter={(label) => `Request ${label}`} />
          <Area type="monotone" dataKey="y" stroke="url(#latencyStroke)" strokeWidth={2.5} fill="url(#latencyFill)" dot={{ r: 3 }} isAnimationActive animationDuration={700} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
