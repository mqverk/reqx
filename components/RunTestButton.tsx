'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Play } from 'lucide-react'
import Spinner from './Spinner'

export default function RunTestButton() {
  const startBenchmark = useBenchmarkStore((s) => s.startBenchmark)
  const running = useBenchmarkStore((s) => s.running)
  const results = useBenchmarkStore((s) => s.results)
  const config = useBenchmarkStore((s) => s.config)

  const MotionButton: any = motion.button

  return (
    <div className="flex items-center gap-3">
      <MotionButton
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          void startBenchmark()
        }}
        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${running ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500'}`}
      >
        <span className="inline-flex items-center gap-2">
          {running ? <Spinner size={16} /> : <Play size={16} />}
          <span>{running ? 'Running…' : 'Run Test'}</span>
        </span>
      </MotionButton>
      {running && <div className="text-xs text-slate-400">Streaming results…</div>}
      {results.length > 0 && (() => {
        const MotionBadge: any = motion.div
        return (
          <MotionBadge
            key={results.length}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/3 text-xs font-mono"
          >
            <span className="font-medium">{results.length}/{config.count}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">{Math.round((results.filter((r) => r.ok).length / results.length) * 100)}%</span>
          </MotionBadge>
        )
      })()}
    </div>
  )
}
