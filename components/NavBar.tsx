'use client'
import React from 'react'
import ThemeToggle from './ThemeToggle'

export default function NavBar() {
  return (
    <header className="w-full border-b border-white/6">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center font-bold">rx</div>
          <div>
            <div className="text-lg font-semibold">reqx</div>
            <div className="text-xs text-slate-400">API latency & performance</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
