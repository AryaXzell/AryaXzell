import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Philosophy from "./components/Philosophy";
import ProjectCard from "./components/ProjectCard";
import OtherRepos from "./components/OtherRepos";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectChooser from "./components/ProjectChooser";
import { projectsData } from "./data";
import { Project } from "./types";
import { Layers } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function App() {
  const { t } = useLanguage();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
    } catch (e) {
      console.warn("Storage access restricted for theme, detecting system fallback. Error:", e);
    }
    try {
      if (window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
    } catch (e) {
      console.warn("System preferences matchMedia restricted. Error:", e);
    }
    return false;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  // Sync dark class on body/root
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (e) {
        console.warn("Storage save restricted for theme dark. Error:", e);
      }
    } else {
      root.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch (e) {
        console.warn("Storage save restricted for theme light. Error:", e);
      }
    }
  }, [darkMode]);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setShowDetails(false); // Reset detailed specs view when opening a new card
  };

  const handleCloseChooser = () => {
    setSelectedProject(null);
  };

  // Helper to dynamically localize project data
  const getLocalizedProject = (project: Project): Project => {
    if (project.id === "zip2git") {
      return {
        ...project,
        tagline: t("project_zip2git_tagline"),
        description: t("project_zip2git_desc"),
        detailedDescription: t("project_zip2git_detailed") || project.detailedDescription,
        caseStudy: {
          why: t("project_zip2git_case_why"),
          problem: t("project_zip2git_case_problem"),
          solution: t("project_zip2git_case_solution"),
          challenges: t("project_zip2git_case_challenges"),
          result: t("project_zip2git_case_result"),
        }
      };
    }
    if (project.id === "ipscope") {
      return {
        ...project,
        tagline: t("project_ipscope_tagline"),
        description: t("project_ipscope_desc"),
        detailedDescription: t("project_ipscope_detailed") || project.detailedDescription,
        caseStudy: {
          why: t("project_ipscope_case_why"),
          problem: t("project_ipscope_case_problem"),
          solution: t("project_ipscope_case_solution"),
          challenges: t("project_ipscope_case_challenges"),
          result: t("project_ipscope_case_result"),
        }
      };
    }
    return project;
  };

  const localizedProjects = projectsData.map(getLocalizedProject);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Layout */}
      <main>
        {/* Hero Section */}
        <Hero onViewProjects={scrollToProjects} />

        {/* About Narrative Section */}
        <About />

        {/* My Philosophy Section */}
        <Philosophy />

        {/* Main Featured Projects Section */}
        <section
          id="projects"
          className="py-24 px-6 bg-[#fafafa] dark:bg-black border-t border-gray-100 dark:border-zinc-900"
        >
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Title / Header */}
            <div className="text-center md:text-left rtl:md:text-right space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 flex items-center justify-center md:justify-start rtl:md:justify-start space-x-2 rtl:space-x-reverse">
                <Layers size={22} className="text-apple-blue shrink-0" />
                <span>{t("projects_title")}</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                {t("projects_subtitle")}
              </p>
              <div className="h-1 w-12 bg-apple-blue rounded-full mx-auto md:mx-0 mt-3" />
            </div>

            {/* Featured Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="featured-projects-grid">
              {localizedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={handleSelectProject}
                />
              ))}
            </div>

            {/* Secondary Repositories section */}
            <OtherRepos />
          </div>
        </section>

        {/* Skills Section */}
        <Skills />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer copyright */}
      <Footer />

      {/* Custom action sheet drawer for project action selections */}
      <ProjectChooser
        project={selectedProject ? getLocalizedProject(selectedProject) : null}
        onClose={handleCloseChooser}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
    </div>
  );
}

