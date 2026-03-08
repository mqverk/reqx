'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function ProgressBar({ progress = 0 }: { progress?: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)))
  return (
    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
      {(() => {
        const MotionDiv: any = motion.div
        return (
          <MotionDiv
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            className="h-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-rose-400"
          />
        )
      })()}
    </div>
  )
}
