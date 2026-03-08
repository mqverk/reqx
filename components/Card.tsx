'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className={`card ${className}`}
    >
      {children}
    </motion.div>
  )
}
