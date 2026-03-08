'use client'
import React from 'react'
import ThemeToggle from './ThemeToggle'
import { Zap, List, Github } from 'lucide-react'
import IconButton from './IconButton'

export default function NavBar() {
  return (
    <header className="w-full border-b border-white/6">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-sm">
            <Zap size={18} />
          </div>
          <div>
            <div className="text-lg font-semibold">reqx</div>
            <div className="text-xs text-slate-400">API latency & performance</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/mqverk/reqx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/3 hover:bg-white/5">
            <Github size={16} />
            <span className="text-sm text-slate-100">GitHub</span>
          </a>
          <IconButton icon={List} title="Recent tests" className="bg-white/3 hover:bg-white/5" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
