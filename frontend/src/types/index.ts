export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  tech: string[];
  challenges: string;
  outcome: string;
  future: string[];
  category: string;
  color: string;
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
  year: string;
  status: 'Completed' | 'In Progress' | 'Maintained';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'Full-time' | 'Internship' | 'Freelance' | 'Contract';
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
  color: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  cgpa: number;
  maxCgpa: number;
  highlights: string[];
  color: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'engineering';
  level: number;
  color: string;
  icon?: string;
  description: string;
  relatedSkills?: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  color: string;
  icon: string;
  skills: Skill[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  section: string;
}

export interface Stat {
  value: string;
  suffix: string;
  label: string;
  description: string;
}
