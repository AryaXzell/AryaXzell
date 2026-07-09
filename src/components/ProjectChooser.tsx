import { useEffect, useState } from "react";
import {
  X,
  Globe,
  Github,
  Info,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Lightbulb,
  AlertCircle,
  Cpu,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { Project } from "../types";
import { useLanguage } from "../LanguageContext";

interface ProjectChooserProps {
  project: Project | null;
  onClose: () => void;
  showDetails: boolean;
  setShowDetails: (val: boolean) => void;
}

export default function ProjectChooser({
  project,
  onClose,
  showDetails,
  setShowDetails
}: ProjectChooserProps) {
  const [detailTab, setDetailTab] = useState<"case" | "specs">("case");
  const { t, language } = useLanguage();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Reset tab to 'case' when modal opens
  useEffect(() => {
    if (project) {
      setDetailTab("case");
    }
  }, [project]);

  if (!project) return null;

  const getStatusLabel = (status: string) => {
    if (status === "Live") return t("project_status_live");
    if (status === "Experimental") return t("project_status_experimental");
    if (status === "Archived") return t("project_status_archived");
    return status;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none"
      id="project-chooser-modal"
    >
      {/* Dark overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        id="modal-overlay"
      />

      {/* Action sheet content container */}
      <div
        className="relative w-full sm:max-w-md bg-[#f4f4f6] dark:bg-zinc-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border border-gray-200/60 dark:border-zinc-800 flex flex-col overflow-hidden max-h-[90vh] sm:max-h-[85vh] transition-transform duration-300 transform translate-y-0 z-10"
        id="modal-container"
        role="dialog"
        aria-modal="true"
      >
        {/* iOS style top dragging notch for mobile */}
        <div className="flex justify-center py-2.5 sm:hidden">
          <div className="w-9 h-1.25 bg-gray-300 dark:bg-zinc-700 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md">
          <div className="max-w-[80%] text-left rtl:text-right">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 flex items-center space-x-2 rtl:space-x-reverse">
              <span className="truncate">{project.name}</span>
              <span className="px-1.5 py-0.5 text-[8px] font-bold bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400 rounded shrink-0">
                {getStatusLabel(project.status)}
              </span>
            </h3>
            <p className="text-xs text-gray-400 dark:text-zinc-500 truncate">
              {project.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-gray-500 dark:text-zinc-400 transition-colors cursor-pointer"
            aria-label="Close modal"
            id="close-chooser"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4">
          {!showDetails ? (
            /* Choice Actions - iOS Style grouping */
            <div className="space-y-2">
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-gray-200/50 dark:border-zinc-800/50 overflow-hidden shadow-xs">
                {/* Live Site Option */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-zinc-900 border-b border-gray-100 dark:border-zinc-900 transition-all group"
                  id="action-open-live"
                >
                  <div className="flex items-center space-x-3.5 rtl:space-x-reverse text-left rtl:text-right">
                    <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-apple-blue shrink-0">
                      <Globe size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-50 flex items-center">
                        <span>{t("project_visit_website")}</span>
                        <ArrowUpRight size={13} className="ml-1 rtl:mr-1 rtl:ml-0 rtl:rotate-270 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                      <p className="text-xs text-gray-400 dark:text-zinc-500 font-mono">
                        {project.liveUrl.replace("https://", "")}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 shrink-0 rtl:rotate-180" />
                </a>

                {/* GitHub Repo Option */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-zinc-900 border-b border-gray-100 dark:border-zinc-900 transition-all group"
                  id="action-open-github"
                >
                  <div className="flex items-center space-x-3.5 rtl:space-x-reverse text-left rtl:text-right">
                    <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center text-gray-700 dark:text-zinc-300 shrink-0">
                      <Github size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-50 flex items-center">
                        <span>{t("project_github_repo")}</span>
                        <ArrowUpRight size={13} className="ml-1 rtl:mr-1 rtl:ml-0 rtl:rotate-270 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                      <p className="text-xs text-gray-400 dark:text-zinc-500 font-mono">
                        {project.githubUrl.replace("https://github.com/", "")}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 shrink-0 rtl:rotate-180" />
                </a>

                {/* Case Study / Details Option */}
                <button
                  onClick={() => setShowDetails(true)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all text-left rtl:text-right cursor-pointer animate-none"
                  id="action-view-details"
                >
                  <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
                    <div className="w-9 h-9 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-500 shrink-0">
                      <Info size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                        {t("project_read_case")}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-zinc-500">
                        {t("project_read_case_desc")}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 shrink-0 rtl:rotate-180" />
                </button>
              </div>
            </div>
          ) : (
            /* Sliding Detail Panel with Segmented Tab Navigation */
            <div className="space-y-4">
              {/* Segmented Control */}
              <div className="flex p-0.5 bg-gray-200/60 dark:bg-zinc-800/60 rounded-lg text-[10px] font-semibold">
                <button
                  onClick={() => setDetailTab("case")}
                  className={`flex-1 py-1.5 rounded-md text-center transition-all cursor-pointer ${
                    detailTab === "case"
                      ? "bg-white dark:bg-zinc-900 text-gray-950 dark:text-white shadow-xs"
                      : "text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {t("project_case_study")}
                </button>
                <button
                  onClick={() => setDetailTab("specs")}
                  className={`flex-1 py-1.5 rounded-md text-center transition-all cursor-pointer ${
                    detailTab === "specs"
                      ? "bg-white dark:bg-zinc-900 text-gray-950 dark:text-white shadow-xs"
                      : "text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {t("project_tech_specs")}
                </button>
              </div>

              {detailTab === "case" ? (
                /* CASE STUDY STRUCTURE: Problem -> Solution -> Challenges -> Result */
                <div className="space-y-3.5 text-left rtl:text-right">
                  {/* Why I Built It */}
                  <div className="p-3.5 bg-indigo-50/30 dark:bg-indigo-950/10 border border-indigo-100/50 dark:border-indigo-900/20 rounded-xl space-y-1">
                    <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-indigo-600 dark:text-indigo-400">
                      <Lightbulb size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t("project_inspiration")}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 italic">
                      "{project.caseStudy.why}"
                    </p>
                  </div>

                  {/* Problem */}
                  <div className="p-3.5 bg-amber-50/30 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-900/20 rounded-xl space-y-1">
                    <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-amber-600 dark:text-amber-400">
                      <AlertCircle size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t("project_problem")}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                      {project.caseStudy.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-3.5 bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/50 dark:border-blue-900/20 rounded-xl space-y-1">
                    <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-blue-600 dark:text-blue-400">
                      <Cpu size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t("project_solution")}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                      {project.caseStudy.solution}
                    </p>
                  </div>

                  {/* Challenges */}
                  <div className="p-3.5 bg-purple-50/30 dark:bg-purple-950/10 border border-purple-100/50 dark:border-purple-900/20 rounded-xl space-y-1">
                    <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-purple-600 dark:text-purple-400">
                      <HelpCircle size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t("project_challenge")}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                      {project.caseStudy.challenges}
                    </p>
                  </div>

                  {/* Result */}
                  <div className="p-3.5 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/20 rounded-xl space-y-1">
                    <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-emerald-600 dark:text-emerald-400">
                      <CheckCircle size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t("project_result")}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                      {project.caseStudy.result}
                    </p>
                  </div>
                </div>
              ) : (
                /* TECH SPECS: Key bullet items and technology stack pills */
                <div className="space-y-4">
                  <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-gray-200/50 dark:border-zinc-800/50 space-y-3 shadow-xs text-left rtl:text-right">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-semibold text-apple-blue uppercase tracking-wider">
                      <ShieldCheck size={14} />
                      <span>{t("project_specifications")}</span>
                    </div>

                    <div className="space-y-2.5">
                      {project.detailedDescription.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2.5 rtl:space-x-reverse text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-apple-blue/60 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stack list */}
                    <div className="pt-3 border-t border-gray-100 dark:border-zinc-900">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1.5">
                        {t("project_tech_stack")}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 dark:bg-zinc-900 dark:text-zinc-400 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Back button */}
              <button
                onClick={() => setShowDetails(false)}
                className="w-full py-3 bg-white dark:bg-zinc-950 hover:bg-gray-50 dark:hover:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-xs font-semibold text-apple-blue transition-all cursor-pointer"
              >
                {t("project_back_options")}
              </button>
            </div>
          )}
        </div>

        {/* Bottom actions list - iOS action sheet cancel styling */}
        <div className="p-4 pt-0">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-white dark:bg-zinc-950 hover:bg-gray-50 dark:hover:bg-zinc-900 border border-gray-200/60 dark:border-zinc-850 rounded-2xl text-xs font-bold text-gray-700 dark:text-zinc-300 transition-all cursor-pointer text-center"
            id="modal-cancel"
          >
            {t("project_cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
