export interface CaseStudy {
  why: string;
  problem: string;
  solution: string;
  challenges: string;
  result: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  detailedDescription: string[];
  caseStudy: CaseStudy;
  status: "Live" | "Archived" | "Experimental";
  latestUpdate: string;
  liveUrl: string;
  githubUrl: string;
  tags: string[];
  highlightBadge?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
}
