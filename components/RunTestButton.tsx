'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'
import { motion, HTMLMotionProps } from 'framer-motion'

export default function RunTestButton() {
  const startBenchmark = useBenchmarkStore((s) => s.startBenchmark)
  const running = useBenchmarkStore((s) => s.running)

  const MotionButton: any = motion.button

  return (
    <div className="flex items-center gap-3">
      <MotionButton
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          void startBenchmark()
        }}
        className={`px-4 py-2 rounded-lg font-medium ${running ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500'}`}
      >
        {running ? 'Running…' : 'Run Test'}
      </MotionButton>
      {running && <div className="text-xs text-slate-400">Streaming results…</div>}
    </div>
  )
}
