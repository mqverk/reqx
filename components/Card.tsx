'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Card({ children, className = '', ...rest }: { children: React.ReactNode; className?: string; [key: string]: any }) {
  const MotionDiv: any = motion.div

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className={`card ${className}`}
      {...rest}
    >
      {children}
    </MotionDiv>
  )
}
