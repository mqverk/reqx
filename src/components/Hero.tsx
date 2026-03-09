import React from 'react'
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Rocket, Send, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--tw-gradient-from)_70%)] from-zinc-950" />
        <div className="container mx-auto px-4 py-24 md:py-36 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge variant="secondary" className="mb-8 px-4 py-1.5 text-sm border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Fast, modern API client for the browser
              </Badge>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">Test APIs </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Like a Pro</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              The lightweight API testing tool that gets out of your way. No accounts, no installs — just open and send.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" asChild className="text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 shadow-xl shadow-cyan-500/20 px-8">
                  <Link href="/tool">
                    <Rocket className="h-5 w-5 mr-2" />
                    Launch reqx
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" asChild className="border-zinc-700 hover:border-zinc-500 px-8">
                  <a href="#features">
                    <Send className="h-5 w-5 mr-2" />
                    View Features
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative max-w-4xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-cyan-500/20 rounded-2xl blur-xl opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 rounded-xl" />
            <div className="relative rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-cyan-500/5">
              <div className="bg-zinc-900/80 backdrop-blur-sm p-3 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs text-zinc-500 ml-2 font-mono">reqx</span>
              </div>
              <div className="bg-zinc-900/40 p-6 font-mono text-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-xs font-bold">GET</span>
                  <span className="text-zinc-400">https://api.example.com/users</span>
                  <span className="ml-auto text-zinc-600 text-xs">200 OK • 145ms</span>
                </div>
                <div className="text-zinc-400 space-y-1">
                  <div>{'{'}</div>
                  <div className="pl-4">
                    <span className="text-cyan-400">&quot;status&quot;</span>: <span className="text-emerald-400">&quot;success&quot;</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-cyan-400">&quot;data&quot;</span>: [...]
                  </div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
  )
}

export default Hero