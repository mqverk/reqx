'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'

export default function ApiInput() {
  const config = useBenchmarkStore((s) => s.config)
  const setConfig = useBenchmarkStore((s) => s.setConfig)
  const [value, setValue] = React.useState(config.url)

  React.useEffect(() => setValue(config.url), [config.url])

  return (
    <div className="flex gap-2 items-center">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setConfig({ url: value })}
        placeholder="https://api.example.com/endpoint"
        className="w-full rounded-lg p-3 bg-transparent border border-white/6 outline-none"
      />
      <button
        onClick={() => setConfig({ url: value })}
        className="px-3 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
      >
        Set
      </button>
    </div>
  )
}
