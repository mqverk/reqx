import { motion } from "motion/react"
import { Globe, SlidersHorizontal, Send, Eye } from "lucide-react"

const steps = [
  {
    icon: Globe,
    number: "01",
    title: "Enter URL",
    description: "Paste your API endpoint and pick a method",
  },
  {
    icon: SlidersHorizontal,
    number: "02",
    title: "Configure",
    description: "Add headers and a request body if needed",
  },
  {
    icon: Send,
    number: "03",
    title: "Send",
    description: "Hit Send or press Ctrl+Enter to fire",
  },
  {
    icon: Eye,
    number: "04",
    title: "Inspect",
    description: "View formatted body, headers, and metrics",
  },
]

const Process = () => {
  return (
    <section id="how-it-works" className="py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-50 mb-4">
            Four Steps. That&apos;s It.
          </h2>
          <p className="text-lg text-zinc-400">From URL to response in seconds</p>
        </motion.div>

        {/* Steps - Horizontal Timeline */}
        <div className="max-w-5xl mx-auto">
          {/* Connector line (desktop) */}
          <div className="hidden md:block relative mb-0">
            <div className="absolute top-[30px] left-[60px] right-[60px] h-px bg-gradient-to-r from-cyan-500/30 via-cyan-500/15 to-cyan-500/30" />
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <div className="relative mb-5">
                  <div className="w-[60px] h-[60px] rounded-full bg-zinc-900 border border-white/[0.08] flex items-center justify-center relative z-10 group-hover:border-cyan-500/30 transition-colors duration-300">
                    <step.icon className="h-6 w-6 text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Step number badge */}
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-zinc-950 border border-white/[0.08] flex items-center justify-center z-20">
                    <span className="text-[10px] font-bold text-cyan-400 font-mono">{step.number}</span>
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-sm font-semibold text-zinc-100 mb-1">{step.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-[180px]">{step.description}</p>

                {/* Mobile connector */}
                {i < steps.length - 1 && (
                  <div className="md:hidden w-px h-8 bg-gradient-to-b from-cyan-500/20 to-transparent mt-4" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
