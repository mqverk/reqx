'use client'
import React from 'react'
import { useBenchmarkStore } from '../stores/benchmarkStore'
import { Search, Check } from 'lucide-react'
import IconButton from './IconButton'
import { motion } from 'framer-motion'

export default function ApiInput() {
  const config = useBenchmarkStore((s) => s.config)
  const setConfig = useBenchmarkStore((s) => s.setConfig)
  const [value, setValue] = React.useState(config.url)
  const [focused, setFocused] = React.useState(false)

  React.useEffect(() => setValue(config.url), [config.url])

  return (
    <div className="flex gap-2 items-center">
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div animate={{ color: focused ? '#A78BFA' : '#94A3B8' }}>
            <Search size={16} />
          </motion.div>
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            setFocused(false)
            setConfig({ url: value })
          }}
          onFocus={() => setFocused(true)}
          placeholder="https://api.example.com/endpoint"
          className="w-full rounded-lg p-3 pl-10 bg-transparent border border-white/6 outline-none transition-shadow duration-150 input-mono focus:shadow-[0_8px_30px_rgba(99,102,241,0.06)] focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500/30"
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
