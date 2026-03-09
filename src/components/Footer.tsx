"use client";

import Link from 'next/link'
import { motion } from 'motion/react';
import { Github, Zap } from 'lucide-react';
const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-zinc-950/80">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 group mb-4">
                <motion.div
                  whileHover={{ y: -2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow"
                >
                  <Zap className="h-5 w-5 text-white" />
                </motion.div>
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-zinc-50">req</span>
                  <span className="text-cyan-400">x</span>
                </span>
              </Link>
              <p className="text-sm text-zinc-400 max-w-sm mb-4">
                A lightweight, modern API testing tool built for developers who value speed and simplicity.
              </p>
              <div className="flex items-center gap-3">
                <motion.a
                  href="https://github.com/mqverk/reqx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-50 transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Github className="h-4 w-4" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-50 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <motion.a
                    href="#features"
                    className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors inline-block"
                    whileHover={{ x: 3 }}
                  >
                    Features
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#how-it-works"
                    className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors inline-block"
                    whileHover={{ x: 3 }}
                  >
                    How It Works
                  </motion.a>
                </li>
                <li>
                  <motion.div whileHover={{ x: 3 }}>
                    <Link href="/docs" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors inline-block">
                      Docs
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-50 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <motion.div whileHover={{ x: 3 }}>
                    <Link href="/tool" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors inline-block">
                      Launch Tool
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.a
                    href="https://github.com/mqverk/reqx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors inline-block"
                    whileHover={{ x: 3 }}
                  >
                    GitHub
                  </motion.a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} reqx. Built with Next.js &amp; React.
            </p>
            <div className="flex items-center gap-6 text-xs text-zinc-500">
              <motion.a
                href="/privacy"
                className="hover:text-zinc-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="/terms"
                className="hover:text-zinc-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer