import { Code2, Compass, Layout, Cpu } from "lucide-react";

export default function About() {
  const pillars = [
    {
      icon: <Code2 className="text-apple-blue" size={20} />,
      title: "Utility Focused",
      desc: "I love building software that solves real, practical problems. If a tool doesn't make a workflow easier or safer, it doesn't need to exist.",
    },
    {
      icon: <Layout className="text-apple-blue" size={20} />,
      title: "Minimal Design",
      desc: "Great design is as little design as possible. Inspired by Apple's Human Interface Guidelines, I focus on clean typography, generous spacing, and solid readability.",
    },
    {
      icon: <Cpu className="text-apple-blue" size={20} />,
      title: "Clean Performance",
      desc: "Web apps should load instantly and run buttery-smooth, even on lower-end devices. I strive to optimize bundle size, avoid unnecessary libraries, and use robust native APIs.",
    },
    {
      icon: <Compass className="text-apple-blue" size={20} />,
      title: "Browser-Only Security",
      desc: "I care deeply about data privacy. Whenever possible, processing (extracting files, looking up client-side statistics) is done entirely on the client side, keeping data strictly local.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-6 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Editorial Heading with Live GitHub Avatar */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
          <img
            src="https://github.com/AryaXzell.png"
            alt="Arya"
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full border-2 border-gray-200/80 dark:border-zinc-800 shadow-md shrink-0"
          />
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              About Arya
            </h2>
            <div className="h-1 w-12 bg-apple-blue rounded-full mx-auto sm:mx-0" />
          </div>
        </div>

        {/* Introduction Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
          <div className="md:col-span-3 space-y-6 text-gray-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            <p>
              I am a <strong className="text-gray-950 dark:text-white font-medium">Student Developer</strong> with a deep passion for coding, building practical web tools, and exploring the mechanics of the internet. For me, software is about empowering people to solve problems quickly without unnecessary clutter.
            </p>
            <p>
              My coding journey revolves around creating beautiful, lightweight, and accessible user interfaces. I love building tools that run entirely in the browser, bypassing complex server hops and keeping sensitive developer details (like API tokens or private codebases) completely secure.
            </p>
            <p>
              Beyond technical logic, I am obsessed with human-centered aesthetics. I believe that digital workspaces should be quiet, clean, and focus-friendly. I build with React, TypeScript, and modern styling utilities to achieve exactly that.
            </p>
          </div>

          <div className="md:col-span-2 bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
              Technical Interests
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 dark:text-zinc-300 font-medium">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-apple-blue rounded-full" />
                <span>Single-Page Architectures & Vite</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-apple-blue rounded-full" />
                <span>Browser APIs & Client-Side Extraction</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-apple-blue rounded-full" />
                <span>Privacy-First State & Storage Management</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-apple-blue rounded-full" />
                <span>Web Geolocation & Interactive Map Frameworks</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-apple-blue rounded-full" />
                <span>Apple HIG (Human Interface Guidelines) Design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 dark:bg-zinc-900/30 border border-gray-100 dark:border-zinc-800/60 rounded-2xl space-y-3 transition-colors hover:bg-gray-100/50 dark:hover:bg-zinc-900/50"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 shadow-2xs">
                {pillar.icon}
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {pillar.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
