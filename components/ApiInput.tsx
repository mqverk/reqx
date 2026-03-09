 'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'
import { Search, Check } from 'lucide-react'
import IconButton from './IconButton'

export default function ApiInput() {
  const config = useBenchmarkStore((s) => s.config)
  const setConfig = useBenchmarkStore((s) => s.setConfig)
  const [value, setValue] = React.useState(config.url)

  React.useEffect(() => setValue(config.url), [config.url])

  return (
    <div className="flex gap-2 items-center">
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Search size={16} />
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setConfig({ url: value })}
          placeholder="https://api.example.com/endpoint"
          className="w-full rounded-lg p-3 pl-10 bg-transparent border border-white/6 outline-none input-mono transition-shadow focus:shadow-[0_0_18px_rgba(99,102,241,0.12)]"
        />
      </div>
      <IconButton
        icon={Check}
        label="Apply"
        onClick={() => setConfig({ url: value })}
        className="bg-indigo-600 text-white hover:bg-indigo-500"
      />
    </div>
  )
}
