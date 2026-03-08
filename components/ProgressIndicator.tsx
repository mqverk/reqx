'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'
import ProgressBar from './ProgressBar'

export default function ProgressIndicator() {
  const results = useBenchmarkStore((s) => s.results)
  const config = useBenchmarkStore((s) => s.config)
  const running = useBenchmarkStore((s) => s.running)

  const progress = React.useMemo(() => {
    if (!config.count) return 0
    return (results.length / config.count) * 100
  }, [results.length, config.count])

  if (!running && !results.length) return null

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <div>Progress</div>
        <div>{results.length}/{config.count} • {Math.round(progress)}%</div>
      </div>
      <ProgressBar progress={progress} />
    </div>
  )
}
