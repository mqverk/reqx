import './globals.css'
import React from 'react'
import NavBar from '../components/NavBar'

export const metadata = {
  title: 'reqx',
  description: 'API latency & performance testing — realtime'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-[#07070a] to-[#0b1020] text-slate-100">
          <NavBar />
          <main className="container py-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
