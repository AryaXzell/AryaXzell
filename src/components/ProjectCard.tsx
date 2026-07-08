import { ArrowUpRight, Github, ExternalLink, Sparkles, Calendar, Activity } from "lucide-react";
import { Project } from "../types";
import { Zip2GitMockup, IPScopeMockup } from "./ProjectMockups";

interface ProjectCardProps {
  key?: string;
  project: Project;
  onSelect: (p: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  
  // Render the appropriate high-fidelity mockup
  const renderMockup = () => {
    switch (project.id) {
      case "zip2git":
        return <Zip2GitMockup />;
      case "ipscope":
        return <IPScopeMockup />;
      default:
        return null;
    }
  };

  // Helper for status styling
  const getStatusStyle = (status: Project["status"]) => {
    switch (status) {
      case "Live":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/30";
      case "Experimental":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30";
      case "Archived":
        return "bg-gray-50 text-gray-700 dark:bg-zinc-850 dark:text-zinc-400 border-gray-200/50 dark:border-zinc-800/30";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative flex flex-col bg-white dark:bg-zinc-950 rounded-3xl border border-gray-200/60 dark:border-zinc-900 overflow-hidden cursor-pointer shadow-xs hover:shadow-lg hover:border-gray-300 dark:hover:border-zinc-800 transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-apple-blue"
      id={`project-card-${project.id}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
    >
      {/* Visual mini-preview container with browser-frame mockup */}
      <div className="p-4 bg-gray-50 dark:bg-zinc-900/30 border-b border-gray-100 dark:border-zinc-900 flex-1 min-h-[250px] flex flex-col justify-center relative">
        {renderMockup()}
        
        {/* Subtle overlay hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 transition-colors pointer-events-none" />
      </div>

      {/* Text details container */}
      <div className="p-6 space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Metadata Row: Status, Date & Highlight badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-medium text-gray-500 dark:text-zinc-400">
            <div className="flex items-center space-x-2">
              {/* Status Badge */}
              <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded border text-[9px] font-bold ${getStatusStyle(project.status)}`}>
                <span className="w-1.2 h-1.2 rounded-full bg-current" />
                <span>{project.status}</span>
              </span>

              {/* Date Metadata */}
              <span className="flex items-center space-x-1">
                <Calendar size={11} className="text-gray-400" />
                <span>{project.latestUpdate}</span>
              </span>
            </div>

            {project.highlightBadge && (
              <span className="flex items-center space-x-1 px-2 py-0.5 text-[9px] font-bold bg-apple-blue/5 text-apple-blue dark:bg-apple-blue/10 dark:text-blue-400 rounded-md">
                <Sparkles size={8} />
                <span>{project.highlightBadge}</span>
              </span>
            )}
          </div>

          {/* Name and Tagline */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-950 dark:text-gray-50 flex items-center group-hover:text-apple-blue transition-colors">
              <span>{project.name}</span>
              <ArrowUpRight size={16} className="ml-1 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </h3>
            <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500">
              {project.tagline}
            </p>
          </div>

          {/* Short human description */}
          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech stack tags */}
        <div className="space-y-3.5 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-medium bg-gray-50 text-gray-600 dark:bg-zinc-900/60 dark:text-zinc-400 rounded-lg border border-gray-100/50 dark:border-zinc-850/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action button simulator */}
          <div className="pt-2 border-t border-gray-100/60 dark:border-zinc-900/60 flex items-center justify-between text-xs font-semibold text-apple-blue group-hover:underline">
            <span className="flex items-center space-x-1.5">
              <Activity size={12} />
              <span>Explore Action Options</span>
            </span>
            <div className="flex items-center space-x-2 text-gray-400">
              <ExternalLink size={13} />
              <Github size={13} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
