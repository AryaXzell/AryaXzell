import { Lightbulb, Minimize, Layers, Zap } from "lucide-react";

export default function Philosophy() {
  const principles = [
    {
      icon: <Minimize size={18} className="text-apple-blue" />,
      title: "Humble Utility First",
      tagline: "Building only what solves the problem",
      desc: "I build tools that address immediate, concrete needs. If a feature does not actively simplify a workflow or solve a real challenge, it acts as distracting noise. True software craftsmanship is subtractive."
    },
    {
      icon: <Layers size={18} className="text-apple-blue" />,
      title: "Quiet UI & Spacing Rhythm",
      tagline: "Design that stays entirely out of your way",
      desc: "An interface is most elegant when it is virtually invisible. I focus on comfortable contrast levels, clean font hierarchies (Inter & JetBrains Mono), and generous negative space to minimize mental friction."
    },
    {
      icon: <Zap size={18} className="text-apple-blue" />,
      title: "Efficient & Private Execution",
      tagline: "Instant responses on any device",
      desc: "By designing client-safe applications that process tasks in browser memory, pages load instantly on potato devices. No background logs, no tracking cookies—keeping your environment fast, private, and secure."
    }
  ];

  return (
    <section
      id="philosophy"
      className="py-24 px-6 bg-[#fafafa] dark:bg-black border-t border-gray-100 dark:border-zinc-900"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center md:text-left space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-apple-blue">
            <Lightbulb size={12} />
            <span>Developer Ethos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            My Philosophy
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 max-w-xl">
            How I approach writing code, engineering workflows, and structuring human-centric visual designs.
          </p>
          <div className="h-1 w-12 bg-apple-blue rounded-full mx-auto md:mx-0 mt-3" />
        </div>

        {/* Editorial 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="philosophy-grid">
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="flex flex-col space-y-3.5 p-6 bg-white dark:bg-zinc-950 border border-gray-200/50 dark:border-zinc-900 rounded-3xl shadow-2xs hover:border-gray-300 dark:hover:border-zinc-850 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                {p.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-950 dark:text-gray-50">
                  {p.title}
                </h3>
                <p className="text-[10px] font-semibold text-apple-blue tracking-wide uppercase">
                  {p.tagline}
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-normal">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Short, memorable quote */}
        <div className="p-6 bg-white dark:bg-zinc-950 border border-gray-200/60 dark:border-zinc-900 rounded-3xl text-center shadow-3xs max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-mono text-gray-500 dark:text-zinc-400 italic">
            "Simplicity is not the lack of clutter, but the presence of clarity."
          </p>
        </div>
      </div>
    </section>
  );
}
