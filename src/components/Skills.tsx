import { BookOpen, Codepen, Compass, Sliders, ShieldAlert } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Codepen size={14} className="text-apple-blue" />,
      skills: ["TypeScript", "JavaScript", "HTML / CSS"],
    },
    {
      title: "Frameworks & Build",
      icon: <Sliders size={14} className="text-apple-blue" />,
      skills: ["React 19", "Vite", "Tailwind CSS"],
    },
    {
      title: "Libraries & APIs",
      icon: <BookOpen size={14} className="text-apple-blue" />,
      skills: ["GitHub API", "JSZip", "Leaflet Maps", "Service Workers"],
    },
    {
      title: "Design & Practices",
      icon: <Compass size={14} className="text-apple-blue" />,
      skills: ["a11y (WCAG)", "UI/UX Design", "Responsive Layouts"],
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 px-6 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Heading (3 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 text-[10px] font-bold bg-apple-blue/5 text-apple-blue dark:bg-apple-blue/10 dark:text-blue-400 rounded">
              <ShieldAlert size={10} />
              <span>Competencies</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Skills & Stack
            </h2>
            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              A highly-focused frontend stack engineered around performance, responsiveness, and clean client-side utility.
            </p>
            <div className="h-0.5 w-8 bg-apple-blue rounded-full hidden md:block" />
          </div>

          {/* Right Column: High-density compact groups (8 cols) */}
          <div className="md:col-span-8 space-y-4" id="skills-grid-compact">
            <div className="bg-gray-50/50 dark:bg-zinc-900/10 border border-gray-200/50 dark:border-zinc-900 rounded-3xl p-5 sm:p-6 space-y-4">
              {skillCategories.map((category) => (
                <div
                  key={category.title}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-gray-100 dark:border-zinc-900/50 last:border-0 last:pb-0 first:pt-0"
                >
                  {/* Category Header */}
                  <div className="flex items-center space-x-2 pb-1.5 sm:pb-0 sm:w-1/3 shrink-0">
                    <span className="w-6 h-6 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center border border-gray-100 dark:border-zinc-800 shadow-3xs">
                      {category.icon}
                    </span>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500">
                      {category.title}
                    </h3>
                  </div>

                  {/* Pills Container */}
                  <div className="flex flex-wrap gap-1.5 sm:w-2/3 sm:justify-start">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-zinc-950 border border-gray-200/60 dark:border-zinc-850 rounded-lg text-gray-700 dark:text-zinc-300 shadow-3xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
