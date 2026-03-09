import { Clock, Code2, FileJson, Layers, Send, Terminal, BarChart3, Repeat } from "lucide-react"
import { motion } from "motion/react"

const features = [
  {
    icon: Send,
    title: "All HTTP Methods",
    description: "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS — every method at your fingertips.",
    color: "cyan",
  },
  {
    icon: Code2,
    title: "Custom Headers",
    description: "Add, toggle, and manage request headers with a clean inline editor.",
    color: "blue",
  },
  {
    icon: FileJson,
    title: "JSON Editor",
    description: "Built-in validation, auto-formatting, and syntax highlighting for bodies.",
    color: "violet",
  },
  {
    icon: Layers,
    title: "Response Viewer",
    description: "Tabbed Body, Headers, and Raw views with one-click copy.",
    color: "emerald",
  },
  {
    icon: Clock,
    title: "Request History",
    description: "Your last 10 requests saved locally — reload any of them instantly.",
    color: "amber",
  },
  {
    icon: Terminal,
    title: "Keyboard Shortcuts",
    description: "Ctrl+Enter to send, Ctrl+K to focus — built for speed.",
    color: "rose",
  },
  {
    icon: BarChart3,
    title: "Performance Metrics",
    description: "Live latency graphs, status code distribution, and response size tracking.",
    color: "cyan",
  },
  {
    icon: Repeat,
    title: "Batch Requests",
    description: "Fire up to 100 sequential requests in one click to stress-test endpoints.",
    color: "blue",
  },
]

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  cyan:    { bg: "bg-cyan-500/[0.07]",    border: "border-cyan-500/15",    text: "text-cyan-400",    glow: "group-hover:shadow-cyan-500/10" },
  blue:    { bg: "bg-blue-500/[0.07]",    border: "border-blue-500/15",    text: "text-blue-400",    glow: "group-hover:shadow-blue-500/10" },
  violet:  { bg: "bg-violet-500/[0.07]",  border: "border-violet-500/15",  text: "text-violet-400",  glow: "group-hover:shadow-violet-500/10" },
  emerald: { bg: "bg-emerald-500/[0.07]", border: "border-emerald-500/15", text: "text-emerald-400", glow: "group-hover:shadow-emerald-500/10" },
  amber:   { bg: "bg-amber-500/[0.07]",   border: "border-amber-500/15",   text: "text-amber-400",   glow: "group-hover:shadow-amber-500/10" },
  rose:    { bg: "bg-rose-500/[0.07]",    border: "border-rose-500/15",    text: "text-rose-400",    glow: "group-hover:shadow-rose-500/10" },
}

const Features = () => {
  return (
    <section id="features" className="py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-50 mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-zinc-400">
            Powerful features packed into a clean, fast interface
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.map((feature, i) => {
            const c = colorMap[feature.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={`group rounded-xl bg-zinc-900/40 border border-white/[0.06] p-5 hover:border-white/[0.1] transition-all duration-300 hover:shadow-lg ${c.glow}`}
              >
                <div className={`w-10 h-10 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <feature.icon className={`h-5 w-5 ${c.text}`} />
                </div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
