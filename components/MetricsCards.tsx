'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'
import { Clock, Activity, Zap, ChevronDown, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

function toFixed(n?: number) {
  return n == null || isNaN(n) ? '-' : n.toFixed(2)
}

export default function MetricsCards() {
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
    const first = results[0]?.timestamp
    const last = results[results.length - 1]?.timestamp
    const durationSeconds = Math.max(0.001, (last - first) / 1000)
    const throughput = results.length / durationSeconds
    return { avg, p95, fastest, slowest, successRate, throughput }
  }, [results])

  return (
    <div className="grid grid-cols-2 gap-3">
      <motion.div whileHover={{ y: -4 }} className="p-3 rounded-md bg-white/2 flex items-center gap-3">
        <div className="p-2 rounded-md bg-white/5">
          <Clock size={18} />
        </div>
        <div>
          <div className="text-xs text-slate-400">Average</div>
          <div className="text-xl font-semibold">{toFixed(stats?.avg)} ms</div>
        </div>
      </motion.div>

      <motion.div whileHover={{ y: -4 }} className="p-3 rounded-md bg-white/2 flex items-center gap-3">
        <div className="p-2 rounded-md bg-white/5">
          <Activity size={18} />
        </div>
        <div>
          <div className="text-xs text-slate-400">p95</div>
          <div className="text-xl font-semibold">{toFixed(stats?.p95)} ms</div>
        </div>
      </motion.div>

      <motion.div whileHover={{ y: -4 }} className="p-3 rounded-md bg-white/2 flex items-center gap-3">
        <div className="p-2 rounded-md bg-white/5">
          <Zap size={18} />
        </div>
        <div>
          <div className="text-xs text-slate-400">Fastest</div>
          <div className="text-xl font-semibold">{toFixed(stats?.fastest)} ms</div>
        </div>
      </motion.div>

      <motion.div whileHover={{ y: -4 }} className="p-3 rounded-md bg-white/2 flex items-center gap-3">
        <div className="p-2 rounded-md bg-white/5">
          <ChevronDown size={18} />
        </div>
        <div>
          <div className="text-xs text-slate-400">Slowest</div>
          <div className="text-xl font-semibold">{toFixed(stats?.slowest)} ms</div>
        </div>
      </motion.div>

      <motion.div whileHover={{ y: -4 }} className="p-3 rounded-md bg-white/2 flex items-center gap-3">
        <div className="p-2 rounded-md bg-white/5">
          <CheckCircle size={18} />
        </div>
        <div>
          <div className="text-xs text-slate-400">Success Rate</div>
          <div className="text-xl font-semibold">{stats ? stats.successRate.toFixed(1) : '-'}%</div>
        </div>
      </motion.div>

      <motion.div whileHover={{ y: -4 }} className="p-3 rounded-md bg-white/2 flex items-center gap-3">
        <div className="p-2 rounded-md bg-white/5">
          <Activity size={18} />
        </div>
        <div>
          <div className="text-xs text-slate-400">Throughput</div>
          <div className="text-xl font-semibold">{stats ? stats.throughput.toFixed(2) : '-'} req/s</div>
        </div>
      </motion.div>
    </div>
  )
}
