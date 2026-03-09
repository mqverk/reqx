import { X, Check, Zap, Clock, Download, CreditCard, Layers, MousePointerClick } from "lucide-react"
import { motion } from "motion/react"

const painPoints = [
  { icon: Clock, text: "Slow startup, heavy RAM usage" },
  { icon: Download, text: "Install on every machine" },
  { icon: CreditCard, text: "Paywalled features" },
  { icon: Layers, text: "Cluttered UI you never use" },
]

const advantages = [
  { icon: Zap, text: "Instant, runs in your browser" },
  { icon: MousePointerClick, text: "Zero setup, just open & send" },
  { icon: Check, text: "Completely free, forever" },
  { icon: Check, text: "Clean UI, only what matters" },
]

const ProblemStatement = () => {
  return (
    <section className="py-24 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-50 mb-4">
            Why <span className="text-cyan-400">reqx</span>?
          </h2>
          <p className="text-lg text-zinc-400">
            API testing tools got bloated. We went the other way.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* The Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-xl bg-zinc-900/50 border border-white/[0.06] p-6"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <X className="h-4 w-4 text-red-400" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">The old way</h3>
            </div>
            <div className="space-y-4">
              {painPoints.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-500/[0.06] border border-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/10 transition-colors">
                    <item.icon className="h-4 w-4 text-red-400/70" />
                  </div>
                  <span className="text-sm text-zinc-400">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* The reqx Way */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-xl bg-zinc-900/50 border border-cyan-500/10 p-6 relative"
          >
            {/* Subtle glow on this card */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/[0.03] to-transparent pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-cyan-400" />
                </div>
                <h3 className="text-sm font-semibold text-cyan-400/80 uppercase tracking-wider">The reqx way</h3>
              </div>
              <div className="space-y-4">
                {advantages.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/[0.06] border border-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/10 transition-colors">
                      <item.icon className="h-4 w-4 text-cyan-400/70" />
                    </div>
                    <span className="text-sm text-zinc-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProblemStatement
