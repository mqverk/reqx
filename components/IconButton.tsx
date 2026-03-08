'use client'
import React from 'react'

type IconButtonProps = {
  icon: React.ElementType
  label?: string
  title?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function IconButton({ icon: Icon, label, title, className = '', ...rest }: IconButtonProps) {
  return (
    <button {...rest} title={title} className={`inline-flex items-center gap-2 px-3 py-1 rounded ${className}`}>
      <Icon size={16} />
      {label ? <span className="text-sm">{label}</span> : null}
    </button>
  )
}
