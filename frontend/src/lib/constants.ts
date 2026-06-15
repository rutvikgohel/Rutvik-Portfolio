import type { Project, Experience, Education, SkillCategory, Stat, NavItem } from '@/types';

export const PERSONAL_INFO = {
  name: 'Rutvik Gohel',
  initials: 'RG',
  role: 'Full Stack Developer',
  email: 'rutvikgohel2002@gmail.com',
  phone: '+91 9016479344',
  location: 'Ahmedabad, India',
  linkedin: 'https://linkedin.com/in/rutik-gohel-a8215a340/',
  github: 'https://github.com/rutvikgohel',
  headline: 'I Build Software That Scales.',
  subheadline:
    'Full Stack Developer specializing in .NET Core + React.js — crafting enterprise-grade systems that perform, scale, and delight users from database to pixel.',
  bio: [
    "I'm a Full Stack Developer based in Ahmedabad, currently building scalable web applications at TretaGen using ASP.NET Core, React.js, and PostgreSQL.",
    "My journey started with a Bachelor's in Computer Applications from Grace College, Rajkot, and I deepened my knowledge during my Master's at Indus University, graduating with a CGPA of 8.45.",
    'I believe in clean architecture, SOLID principles, and writing code that future developers actually enjoy reading. Whether it\'s designing a multi-portal system with role-based access control or building a responsive interface from scratch, I bring both technical rigor and design sensibility to every project.',
    "I'm drawn to complex problems that require both systems thinking and careful UX consideration. When I'm not coding, I'm exploring new technologies and pushing the boundaries of what's possible on the web.",
  ],
  tagline: 'Building systems that scale. Crafting experiences that matter.',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Experience', href: '#experience', section: 'experience' },
  { label: 'Projects', href: '#projects', section: 'projects' },
  { label: 'Skills', href: '#skills', section: 'skills' },
  { label: 'Education', href: '#education', section: 'education' },
  { label: 'Contact', href: '#contact', section: 'contact' },
];

export const STATS: Stat[] = [
  {
    value: '1',
    suffix: '+',
    label: 'Years Experience',
    description: 'Professional full-stack development',
  },
  {
    value: '3',
    suffix: '',
    label: 'Major Projects',
    description: 'Enterprise-grade systems delivered',
  },
  {
    value: '2',
    suffix: '',
    label: 'Companies',
    description: 'Professional collaborations',
  },
  {
    value: '8.45',
    suffix: '',
    label: 'MCA CGPA',
    description: 'Indus University',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'tretagen',
    company: 'TretaGen',
    role: 'Full Stack Developer',
    type: 'Full-time',
    startDate: 'May 2025',
    endDate: 'Present',
    current: true,
    location: 'Ahmedabad, India',
    description:
      'Building and maintaining scalable web applications that power real business operations. Working across the full stack — from designing PostgreSQL schemas to building pixel-perfect React interfaces.',
    achievements: [
      'Developing and maintaining scalable web applications using ASP.NET Core, React.js, PostgreSQL, and Tailwind CSS',
      'Designing responsive, user-friendly interfaces following modern UI/UX best practices',
      'Collaborating with cross-functional teams to build, test, and deploy production-ready software',
      'Writing clean, maintainable, and performance-optimized code following SOLID principles',
      'Contributing to full-stack architecture decisions for long-term scalability',
    ],
    tech: ['ASP.NET Core', 'React.js', 'PostgreSQL', 'Tailwind CSS', 'C#', 'Entity Framework'],
    color: '#3B82F6',
  },
  {
    id: 'novanectar',
    company: 'Novanectar Services',
    role: 'Web Developer Trainee',
    type: 'Internship',
    startDate: 'Jan 2025',
    endDate: 'Mar 2025',
    current: false,
    location: 'Remote',
    description:
      'Gained hands-on experience building web applications from scratch. Developed the Job Portal platform — a production-ready system connecting job seekers with recruiters through intelligent search and application management.',
    achievements: [
      'Built and maintained web applications using HTML, CSS, and JavaScript',
      'Developed a full Job Portal platform enabling seamless recruiter–job seeker interaction',
      'Implemented dynamic job listings with advanced search and filter functionality',
      'Designed intuitive application management workflows for both candidate and recruiter sides',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
    color: '#8B5CF6',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'job-portal',
    title: 'Job Portal',
    subtitle: 'Connecting Talent with Opportunity',
    description:
      'A full-featured recruitment platform that bridges the gap between job seekers and recruiters through intelligent matching, dynamic listings, and streamlined application workflows.',
    problem:
      'Job seekers waste hours on irrelevant listings while recruiters struggle to manage hundreds of applications manually. The disconnect between supply and demand in the hiring process creates friction for both sides.',
    solution:
      'Built a dual-interface platform with separate, purpose-built experiences for candidates and recruiters. Candidates get smart search with filters, while recruiters get a structured dashboard to manage listings, track applicants, and communicate efficiently.',
    features: [
      'Dynamic job listings with real-time search and filter by role, location, and experience',
      'Dual portal — dedicated interfaces for Job Seekers and Recruiters',
      'Application management workflow with status tracking (Applied → Reviewed → Shortlisted → Hired)',
      'Recruiter dashboard with posting and applicant management',
      'Responsive design optimized for mobile job browsing',
      'Form validation and error handling for seamless UX',
    ],
    architecture:
      'Component-based frontend with a clear separation between recruiter and seeker modules. State management for application tracking, client-side routing for multi-page experience.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'DOM Manipulation', 'REST APIs'],
    challenges:
      'Designing a search and filter system that scales with hundreds of listings without backend pagination required creative client-side optimization. Building two completely different UX flows within one codebase demanded careful component separation.',
    outcome:
      'Delivered a production-ready job portal during a 3-month internship at Novanectar Services, demonstrating end-to-end ownership of a real-world platform.',
    future: [
      'AI-powered job matching based on candidate profile analysis',
      'Real-time notifications for application status updates',
      'Video interview scheduling integration',
      'Resume parsing with skill extraction',
    ],
    category: 'Web Platform',
    color: '#3B82F6',
    accentColor: 'rgba(59, 130, 246, 0.1)',
    year: '2025',
    status: 'Completed',
  },
  {
    id: 'school-management',
    title: 'School Management System',
    subtitle: 'Multi-Portal Academic Operations Platform',
    description:
      'A comprehensive school management system with three dedicated portals — Admin, Teacher, and Parent — enabling streamlined operations, real-time attendance tracking, and role-based access control across an entire institution.',
    problem:
      'Schools rely on paper-based processes or disconnected software for attendance, communication, and record management. This leads to inaccurate data, poor parent visibility, and administrative bottlenecks.',
    solution:
      'Designed a unified platform with three distinct portals, each tailored to a specific role. Admins manage the system, teachers handle attendance and communication, and parents get transparent real-time access to their children\'s academic data.',
    features: [
      'Admin Portal: institution-wide control — manage teachers, students, classes, and generate reports',
      'Teacher Portal: student and teacher attendance tracking with date-range queries',
      'Parent Portal: real-time attendance visibility and academic communication',
      'Role-Based Access Control (RBAC) — strict permission boundaries between portals',
      'Attendance management with calendar views and trend analysis',
      'Responsive, mobile-first design for parent access on any device',
    ],
    architecture:
      'Clean Architecture with feature-based module separation. Each portal is a distinct module sharing a common data layer. RBAC enforced at both API and UI levels. Entity Framework Core for ORM with a normalized PostgreSQL schema.',
    tech: ['ASP.NET Core', 'React.js', 'PostgreSQL', 'Tailwind CSS', 'C#', 'Entity Framework Core', 'RBAC'],
    challenges:
      'Implementing true RBAC that enforces permissions at every layer without creating code duplication. Designing an attendance system that handles complex queries (date ranges, class-level summaries) efficiently without N+1 queries.',
    outcome:
      'Delivered a fully operational multi-portal system that streamlines all core school management operations, reducing administrative time by centralizing data in one secure platform.',
    future: [
      'SMS and email notification integration for instant parent alerts',
      'Gradebook module with performance trend visualizations',
      'Timetable generator and exam scheduling',
      'Mobile app for parents using React Native',
    ],
    category: 'Enterprise System',
    color: '#8B5CF6',
    accentColor: 'rgba(139, 92, 246, 0.1)',
    year: '2025',
    status: 'Completed',
  },
  {
    id: 'pharmacy-management',
    title: 'Pharmacy Management System',
    subtitle: 'Healthcare Operations & Clinical Workflow Platform',
    description:
      'A healthcare-grade pharmacy management system with Admin and Clinical portals, designed to streamline pharmacy operations, clinical workflows, and secure patient data management with role-based access.',
    problem:
      'Pharmacy operations are complex — inventory tracking, prescription management, and clinical coordination happen in silos. Without a unified system, errors occur, compliance suffers, and operational efficiency drops.',
    solution:
      'Built a dual-portal platform where Admin controls inventory, users, and business logic while Clinical staff manages prescriptions, patient records, and workflow states — all within a secure, role-isolated architecture.',
    features: [
      'Admin Portal: inventory management, staff management, reporting, and system configuration',
      'Clinical Portal: prescription management, patient records, and dispensing workflows',
      'Secure role-based access control separating clinical and administrative operations',
      'Inventory tracking with low-stock alerts and expiry management',
      'Prescription lifecycle management — from order to dispensing',
      'Audit logging for compliance and security traceability',
    ],
    architecture:
      'Clean Architecture with layered separation: Domain, Application (CQRS), Infrastructure, and API. Secure JWT authentication. Role-based middleware guards clinical endpoints. PostgreSQL with normalized schema for patient data integrity.',
    tech: ['ASP.NET Core', 'React.js', 'PostgreSQL', 'C#', 'Entity Framework Core', 'JWT Auth', 'CQRS', 'Tailwind CSS'],
    challenges:
      'Healthcare data requires strict access boundaries. Implementing a permission system granular enough for clinical vs. administrative access without over-complicating the data model. Ensuring data integrity across prescription workflows.',
    outcome:
      'Delivered a secure, compliant pharmacy management platform that unifies clinical and administrative operations under a single, role-isolated system with a full audit trail.',
    future: [
      'HL7 FHIR compliance for healthcare data interoperability',
      'Drug interaction checker integration',
      'Barcode scanning for inventory and dispensing',
      'Analytics dashboard with prescription trend reporting',
    ],
    category: 'Healthcare Platform',
    color: '#06B6D4',
    accentColor: 'rgba(6, 182, 212, 0.1)',
    year: '2025',
    status: 'Maintained',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    label: 'Backend',
    color: '#3B82F6',
    icon: 'Server',
    skills: [
      { name: 'C#', category: 'backend', level: 85, color: '#9B4F96', description: 'Primary language for enterprise backend development', relatedSkills: ['ASP.NET Core', '.NET Core'] },
      { name: 'ASP.NET Core', category: 'backend', level: 80, color: '#512BD4', description: 'Building scalable REST APIs and web applications', relatedSkills: ['C#', 'Entity Framework'] },
      { name: '.NET Core', category: 'backend', level: 80, color: '#512BD4', description: 'Cross-platform runtime for modern applications', relatedSkills: ['C#', 'ASP.NET Core'] },
      { name: 'Entity Framework Core', category: 'backend', level: 75, color: '#68217A', description: 'ORM for database abstraction and migrations', relatedSkills: ['C#', 'PostgreSQL'] },
      { name: 'REST API Design', category: 'backend', level: 80, color: '#3B82F6', description: 'Designing clean, versioned, documented APIs', relatedSkills: ['ASP.NET Core', 'JWT'] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#06B6D4',
    icon: 'Monitor',
    skills: [
      { name: 'React.js', category: 'frontend', level: 82, color: '#61DAFB', description: 'Building interactive, component-driven UIs', relatedSkills: ['JavaScript', 'Tailwind CSS'] },
      { name: 'JavaScript', category: 'frontend', level: 80, color: '#F7DF1E', description: 'Core language for dynamic web applications', relatedSkills: ['React.js', 'HTML', 'CSS'] },
      { name: 'TypeScript', category: 'frontend', level: 70, color: '#3178C6', description: 'Type-safe JavaScript for scalable codebases', relatedSkills: ['JavaScript', 'React.js'] },
      { name: 'Tailwind CSS', category: 'frontend', level: 85, color: '#06B6D4', description: 'Utility-first CSS for rapid, consistent styling', relatedSkills: ['CSS', 'React.js'] },
      { name: 'HTML & CSS', category: 'frontend', level: 90, color: '#E34F26', description: 'Semantic markup and responsive layout foundations', relatedSkills: ['JavaScript', 'Tailwind CSS'] },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    color: '#8B5CF6',
    icon: 'Database',
    skills: [
      { name: 'PostgreSQL', category: 'database', level: 80, color: '#336791', description: 'Advanced relational database for production systems', relatedSkills: ['Entity Framework', 'SQL'] },
      { name: 'MySQL', category: 'database', level: 75, color: '#4479A1', description: 'Relational database for web applications', relatedSkills: ['SQL', 'Entity Framework'] },
      { name: 'SQL Server', category: 'database', level: 72, color: '#CC2927', description: 'Microsoft SQL Server for enterprise data management', relatedSkills: ['SQL', 'C#'] },
      { name: 'SQL', category: 'database', level: 82, color: '#F29111', description: 'Complex queries, joins, indexing, and optimization', relatedSkills: ['PostgreSQL', 'MySQL'] },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    color: '#F59E0B',
    icon: 'Code2',
    skills: [
      { name: 'SOLID Principles', category: 'engineering', level: 80, color: '#F59E0B', description: 'Foundation of clean, maintainable OOP design', relatedSkills: ['OOP', 'Clean Architecture'] },
      { name: 'OOP', category: 'engineering', level: 85, color: '#EF4444', description: 'Object-oriented design patterns and principles', relatedSkills: ['SOLID', 'C#'] },
      { name: 'Clean Architecture', category: 'engineering', level: 75, color: '#10B981', description: 'Layered architecture for testable, decoupled systems', relatedSkills: ['SOLID', 'CQRS'] },
      { name: 'SDLC', category: 'engineering', level: 80, color: '#6366F1', description: 'Agile development lifecycle and team collaboration', relatedSkills: ['Git', 'Code Review'] },
      { name: 'Git', category: 'engineering', level: 78, color: '#F05032', description: 'Version control, branching strategies, and collaboration', relatedSkills: ['SDLC'] },
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    id: 'mca',
    degree: 'Master of Computer Applications',
    field: 'MCA',
    institution: 'Indus University',
    location: 'Ahmedabad, Gujarat',
    startYear: '2023',
    endYear: '2025',
    cgpa: 8.45,
    maxCgpa: 10,
    highlights: [
      'Specialized in full-stack web application development',
      'Advanced coursework in software architecture and database management',
      'Practical experience with enterprise-grade .NET and React ecosystems',
      'Strong foundation in algorithms, system design, and modern development practices',
    ],
    color: '#3B82F6',
  },
  {
    id: 'bca',
    degree: 'Bachelor of Computer Applications',
    field: 'BCA',
    institution: 'Grace College',
    location: 'Rajkot, Gujarat',
    startYear: '2020',
    endYear: '2023',
    cgpa: 6.92,
    maxCgpa: 10,
    highlights: [
      'Core foundations in computer science, programming, and mathematics',
      'Introduced to web development, databases, and software engineering',
      'Practical lab work in C, C++, Java, and web technologies',
      'Built a solid base that drove pursuit of advanced MCA degree',
    ],
    color: '#8B5CF6',
  },
];

export const SOFT_SKILLS = [
  'Problem Solving',
  'Active Listening',
  'Leadership',
  'Communication',
  'Punctuality',
  'Responsibility',
];

export const TECH_MARQUEE = [
  'C#', 'ASP.NET Core', 'React.js', 'PostgreSQL', 'Tailwind CSS',
  'Entity Framework', 'JavaScript', 'TypeScript', 'MySQL', 'SQL Server',
  'SOLID', 'Clean Architecture', 'REST API', 'Git', 'HTML', 'CSS',
];
