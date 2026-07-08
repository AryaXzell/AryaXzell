import { useState, useEffect } from "react";
import { Star, GitFork, BookOpen, ExternalLink, RefreshCw } from "lucide-react";
import { GitHubRepo } from "../types";

export default function OtherRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Authentically compiled fallbacks to prevent empty grids if offline or API limits hit
  const fallbackRepos: GitHubRepo[] = [
    {
      id: 101,
      name: "personal-web",
      description: "My minimal developer portfolio styled with human-centric interfaces, optimized for accessibility and low bandwidth.",
      html_url: "https://github.com/AryaXzell/personal-web",
      stargazers_count: 3,
      language: "TypeScript",
      forks_count: 0
    },
    {
      id: 102,
      name: "awesome-tools",
      description: "A hand-curated collection of browser-only scripts and local tools that bypass traditional backend databases.",
      html_url: "https://github.com/AryaXzell/awesome-tools",
      stargazers_count: 5,
      language: "JavaScript",
      forks_count: 1
    },
    {
      id: 103,
      name: "vite-pwa-template",
      description: "A production-ready Vite and React template for progressive web apps, complete with offline fallback strategies.",
      html_url: "https://github.com/AryaXzell/vite-pwa-template",
      stargazers_count: 4,
      language: "TypeScript",
      forks_count: 2
    }
  ];

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("https://api.github.com/users/AryaXzell/repos?sort=updated&per_page=12");
        if (!res.ok) {
          throw new Error("API rate limit or connection issue");
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          // Exclude the featured projects
          const filtered = data
            .filter((repo: any) => {
              const nameLower = repo.name.toLowerCase();
              return nameLower !== "zip2git" && nameLower !== "ipscope" && !repo.fork;
            })
            // Take the top 3-4 repos
            .slice(0, 4)
            .map((repo: any) => ({
              id: repo.id,
              name: repo.name,
              description: repo.description || "No description provided.",
              html_url: repo.html_url,
              stargazers_count: repo.stargazers_count,
              language: repo.language || "Web",
              forks_count: repo.forks_count
            }));

          setRepos(filtered.length > 0 ? filtered : fallbackRepos);
        } else {
          setRepos(fallbackRepos);
        }
      } catch (err) {
        console.warn("Using offline fallbacks for repositories: ", err);
        setRepos(fallbackRepos);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  return (
    <div className="space-y-6 pt-10 border-t border-gray-100 dark:border-zinc-900" id="other-repositories">
      <div className="text-center sm:text-left">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-zinc-500">
          Other Projects & Contributions
        </h3>
        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
          Direct from my public GitHub repositories feed
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="repos-loader">
          {[1, 2, 3].map((placeholder) => (
            <div
              key={placeholder}
              className="p-5 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/20 border border-gray-100 dark:border-zinc-900 animate-pulse-soft flex flex-col justify-between h-32"
            >
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2" />
                <div className="h-3 bg-gray-100 dark:bg-zinc-850 rounded w-5/6" />
              </div>
              <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="repos-grid">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-gray-50/50 hover:bg-gray-100/50 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/40 border border-gray-100 dark:border-zinc-900 transition-all flex flex-col justify-between hover:scale-[1.01] active:scale-[0.99] h-full"
              id={`repo-card-${repo.id}`}
            >
              <div className="space-y-2">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-gray-700 dark:text-zinc-300">
                    <BookOpen size={13} className="text-apple-blue" />
                    <span className="text-xs font-bold truncate group-hover:text-apple-blue transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink size={11} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Description */}
                <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
              </div>

              {/* Stats & Tech */}
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 dark:text-zinc-500 pt-3 border-t border-gray-100/50 dark:border-zinc-900/50 mt-4">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-apple-blue rounded-full" />
                  <span>{repo.language}</span>
                </span>

                <div className="flex items-center space-x-2.5">
                  <span className="flex items-center space-x-1">
                    <Star size={11} />
                    <span>{repo.stargazers_count}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <GitFork size={11} />
                    <span>{repo.forks_count}</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
