'use client'
import React from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [isDark])

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setIsDark((v) => !v)}
      className="p-2 rounded-md bg-white/3 hover:bg-white/5"
    >
      {isDark ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  )
}
