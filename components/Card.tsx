'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const MotionDiv: any = motion.div

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.28 }}
      className={`card ${className}`}
    >
      {children}
    </MotionDiv>
  )
}
