'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'
import Card from './Card'
import { Users, Clock, CheckCircle } from 'lucide-react'

function fmt(n?: number) {
  if (n == null || isNaN(n)) return '-'
  if (n >= 1000) return n.toLocaleString()
  return String(Math.round(n))
}

export default function TopMetrics() {
  const results = useBenchmarkStore((s) => s.results)

  const stats = React.useMemo(() => {
    if (!results.length) return null
    const durations = results.map((r) => r.duration).sort((a, b) => a - b)
    const sum = durations.reduce((a, b) => a + b, 0)
    const avg = sum / durations.length
    const p95Index = Math.max(0, Math.floor(0.95 * durations.length) - 1)
    const p95 = durations[p95Index]
    const fastest = durations[0]
    const slowest = durations[durations.length - 1]
    const success = results.filter((r) => r.ok).length
    const successRate = (success / results.length) * 100
    return { avg, p95, fastest, slowest, successRate }
  }, [results])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-white/5">
              <Users size={18} />
            </div>
            <div>
              <div className="card-title">Requests</div>
              <div className="text-2xl font-semibold mt-1">{fmt(results.length)}</div>
            </div>
          </div>
          <div className="text-sm text-slate-400">Last run</div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-white/5">
              <Clock size={18} />
            </div>
            <div>
              <div className="card-title">Average Latency</div>
              <div className="text-2xl font-semibold mt-1">{stats ? `${stats.avg.toFixed(2)} ms` : '-'}</div>
            </div>
          </div>
          <div className="text-sm text-slate-400">p95 {stats ? stats.p95.toFixed(0) + 'ms' : '-'}</div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-white/5">
              <CheckCircle size={18} />
            </div>
            <div>
              <div className="card-title">Success Rate</div>
              <div className="text-2xl font-semibold mt-1">{stats ? `${stats.successRate.toFixed(1)}%` : '-'}</div>
            </div>
          </div>
          <div className="text-sm text-slate-400">Live</div>
        </div>
      </Card>
    </div>
  )
}
