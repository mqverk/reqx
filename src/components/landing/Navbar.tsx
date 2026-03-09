'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, Menu, X, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/60 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ y: -2, rotate: 5 }}
              whileTap={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
            >
              <Zap className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-zinc-50">req</span>
              <span className="text-cyan-400">x</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <motion.a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, '#features')}
              className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
            <motion.a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
              className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/docs" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors relative group">
                Docs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/mqverk/reqx" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
              <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:shadow-xl transition-shadow">
                <Link href="/tool">Get Started</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="flex flex-col gap-4 py-4"
              >
                <a
                  href="#features"
                  onClick={(e) => handleSmoothScroll(e, '#features')}
                  className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
                  className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
                >
                  How It Works
                </a>
                <Link
                  href="/docs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
                >
                  Docs
                </Link>
                <Button asChild className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
                  <Link href="/tool">Get Started</Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
