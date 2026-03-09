import { motion } from "motion/react"

const stack = [
  {
    name: "Next.js 16",
    desc: "App Router & Server Components",
    color: "from-white/10 to-white/[0.03]",
    border: "hover:border-white/20",
  },
  {
    name: "React 19",
    desc: "Concurrent rendering & hooks",
    color: "from-cyan-500/10 to-cyan-500/[0.02]",
    border: "hover:border-cyan-500/20",
  },
  {
    name: "TypeScript",
    desc: "End-to-end type safety",
    color: "from-blue-500/10 to-blue-500/[0.02]",
    border: "hover:border-blue-500/20",
  },
  {
    name: "Tailwind CSS",
    desc: "Utility-first styling",
    color: "from-sky-500/10 to-sky-500/[0.02]",
    border: "hover:border-sky-500/20",
  },
  {
    name: "shadcn/ui",
    desc: "Accessible Radix primitives",
    color: "from-violet-500/10 to-violet-500/[0.02]",
    border: "hover:border-violet-500/20",
  },
  {
    name: "Motion",
    desc: "Spring-based animations",
    color: "from-amber-500/10 to-amber-500/[0.02]",
    border: "hover:border-amber-500/20",
  },
  {
    name: "Recharts",
    desc: "Composable response graphs",
    color: "from-emerald-500/10 to-emerald-500/[0.02]",
    border: "hover:border-emerald-500/20",
  },
  {
    name: "Axios",
    desc: "Robust HTTP client",
    color: "from-indigo-500/10 to-indigo-500/[0.02]",
    border: "hover:border-indigo-500/20",
  },
]

const TechStack = () => {
  return (
    <section id="tech-stack" className="py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-50 mb-4">
            Built with Modern Tools
          </h2>
          <p className="text-lg text-zinc-400">
            Every layer of the stack, chosen for speed and DX
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {stack.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className={`group relative rounded-xl border border-white/[0.06] ${tech.border} bg-zinc-900/40 p-4 transition-all duration-300 cursor-default`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              <div className="relative">
                <p className="text-sm font-semibold text-zinc-100 mb-0.5">{tech.name}</p>
                <p className="text-[11px] text-zinc-500 leading-snug">{tech.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack