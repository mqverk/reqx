import { Code2, Globe, GraduationCap, Rocket, Server, Users } from "lucide-react"
import { motion } from "motion/react"

const useCases = [
  {
    icon: Globe,
    label: "Public APIs",
    description: "Explore and test any public REST API instantly",
  },
  {
    icon: Code2,
    label: "Debugging",
    description: "Inspect your endpoints during local development",
  },
  {
    icon: GraduationCap,
    label: "Learning HTTP",
    description: "Understand methods, headers, and status codes hands-on",
  },
  {
    icon: Rocket,
    label: "Quick Checks",
    description: "Verify an API response without any setup",
  },
  {
    icon: Server,
    label: "Load Testing",
    description: "Batch-fire requests to stress-test your endpoints",
  },
  {
    icon: Users,
    label: "Team Demos",
    description: "Walk through API flows live without installing tools",
  },
]

const UseCases = () => {
  return (
    <section className="py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-50 mb-4">
            Perfect For
          </h2>
          <p className="text-lg text-zinc-400">
            From first HTTP request to production debugging
          </p>
        </motion.div>

        {/* Use Cases */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {useCases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="group flex items-start gap-3.5 rounded-xl bg-zinc-900/40 border border-white/[0.06] hover:border-cyan-500/15 p-4 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-500/[0.07] border border-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/[0.12] transition-colors">
                <item.icon className="h-4 w-4 text-cyan-400/80" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-zinc-100 mb-0.5">{item.label}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases
