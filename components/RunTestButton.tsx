'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'
import { motion } from 'framer-motion'

export default function RunTestButton() {
  const startBenchmark = useBenchmarkStore((s) => s.startBenchmark)
  const running = useBenchmarkStore((s) => s.running)

  return (
    <div className="flex items-center gap-3">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => startBenchmark()}
        className={`px-4 py-2 rounded-lg font-medium ${running ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500'}`}
      >
        {running ? 'Running…' : 'Run Test'}
      </motion.button>
      {running && <div className="text-xs text-slate-400">Streaming results…</div>}
    </div>
  )
}
