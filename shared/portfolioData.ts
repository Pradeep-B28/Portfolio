/**
 * ============================================================================
 * 🚀 CENTRAL PORTFOLIO DATA FILE (portfolioData.ts)
 * ============================================================================
 * Edit this SINGLE file to update your personal details, work experience,
 * skills, certifications, and portfolio projects across ALL 6 portfolio templates!
 *
 * Changes in this file automatically update Idea 1, Idea 2, Idea 3, Idea 4,
 * Idea 5, and Idea 6 upon browser refresh.
 * ============================================================================
 */

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  location: string;
  yearsExperience: string;
  clearanceLevel: string;
  developerRating: string;
  securityPoints: number;
  netWorthValuation: number;
}

export interface SocialLinks {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolioUrl: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Languages & Core' | 'Frontend & 3D' | 'Backend & Databases' | 'DevOps & Tooling' | 'AI & LLM';
  level: number; // 0 - 100
  expertiseLevel: 'Expert' | 'Senior' | 'Intermediate';
  experienceYears: string;
  icon?: string;
  color?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack & 3D' | 'AI & Tooling' | 'Academic Training' | 'Systems & Education' | 'DevOps & Cloud';
  role: string;
  timeframe: string;
  releaseYear: number;
  description: string;
  highlights: string[];
  metrics: ProjectMetric[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  color: string;
  reelColor: string;
  complexity: number; // 1 to 5
  valuation: number; // e.g. 350000
  boxNumber: string; // e.g. "VAULT-001"
  codeName: string; // e.g. "ORBIT-01"
  cartridgeCode: string; // e.g. "CART-01"
  takeType: 'GOOD TAKE' | 'OUTTAKE';
  isAnchor?: boolean;
  codeSnippet?: string;
  depth?: number; // for archaeology dig idea
}

export interface CareerPhaseItem {
  id: string;
  title: string;
  roleTitle: string;
  dates: string;
  description: string;
  strataColor: string;
  layerDepthMin: number;
  layerDepthMax: number;
}

export interface StatsSummary {
  studentsMentored: string;
  placementRate: string;
  placementBoost: string;
  trainersLed: string;
  trainerTeamSize: string;
  flagshipProjects: string;
  totalGames: string;
  totalSkillPoints: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks;
  education: EducationItem[];
  certifications: string[];
  stats: StatsSummary;
  skills: SkillItem[];
  careerPhases: CareerPhaseItem[];
  projects: ProjectItem[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: "PRADEEP B",
    title: "Learning & Development Lead | Campus to Corporate Training Specialist",
    tagline: "Architecting Tech Training Ecosystems & Scalable Developer Solutions",
    summary: "L&D Lead & Technical Training Lead with 4+ years of end-to-end training program ownership across India's premier engineering institutions (VIT University, SIT Madurai, KSR Institutions). Mentored 7,500+ engineering students, architected campus-to-corporate learning programs driving placement rates from 70% to 90%, led a 25-member trainer team, and built open-source developer tools.",
    location: "Tamil Nadu, India",
    yearsExperience: "4+ Years",
    clearanceLevel: "Level 5 Executive Access",
    developerRating: "Master Developer & L&D Architect",
    securityPoints: 98500,
    netWorthValuation: 1850000,
  },

  socialLinks: {
    email: "pradeepbashaa@gmail.com",
    phone: "+91 63818 58166",
    linkedin: "https://www.linkedin.com/in/pradeepb-2k",
    github: "https://github.com/Pradeep-B28",
    portfolioUrl: "https://github.com/Pradeep-B28",
  },

  education: [
    {
      degree: "Master of Business Administration, Systems Management",
      institution: "University of Madras, Chennai",
      period: "2025 – Present",
    },
    {
      degree: "Bachelor of Engineering, Civil Engineering",
      institution: "Mepco Schlenk Engineering College, Sivakasi",
      period: "2018 – 2022",
    },
  ],

  certifications: [
    "HackerRank Certified - Problem Solving Expert (2026)",
    "HackerRank Certified - Java Basics (2026)",
    "Google Analytics Certification (2026)",
    "IBM Certified - Artificial Intelligence Fundamentals (2025)",
    "AWS for Data Science - Simplilearn (2025)",
    "Coursera - Cloud Computing (2025)",
    "Certified in Java, Python & HTML (2023)",
    "AMCAT Certified Data Processing Specialist (2023)",
  ],

  stats: {
    studentsMentored: "7,500+",
    placementRate: "70% ➔ 90%",
    placementBoost: "+20% Boost",
    trainersLed: "25 Trainers",
    trainerTeamSize: "25",
    flagshipProjects: "9 Repositories",
    totalGames: "7 Games",
    totalSkillPoints: "98,500 XP",
  },

  skills: [
    { id: "java", name: "Java (SE/EE)", category: "Languages & Core", level: 95, expertiseLevel: "Expert", experienceYears: "4 yrs", color: "#f59e0b" },
    { id: "dsa", name: "Data Structures & Algorithms", category: "Languages & Core", level: 92, expertiseLevel: "Expert", experienceYears: "4 yrs", color: "#e8c468" },
    { id: "python", name: "Python", category: "Languages & Core", level: 88, expertiseLevel: "Expert", experienceYears: "3 yrs", color: "#3b82f6" },
    { id: "js-ts", name: "JavaScript / TypeScript", category: "Languages & Core", level: 90, expertiseLevel: "Expert", experienceYears: "4 yrs", color: "#facc15" },
    { id: "react", name: "React.js", category: "Frontend & 3D", level: 92, expertiseLevel: "Expert", experienceYears: "3 yrs", color: "#22d3ee" },
    { id: "threejs", name: "Three.js / WebGL / R3F", category: "Frontend & 3D", level: 85, expertiseLevel: "Senior", experienceYears: "2 yrs", color: "#a855f7" },
    { id: "node", name: "Node.js & Express", category: "Backend & Databases", level: 86, expertiseLevel: "Senior", experienceYears: "3 yrs", color: "#10b981" },
    { id: "postgres", name: "PostgreSQL & SQL", category: "Backend & Databases", level: 88, expertiseLevel: "Senior", experienceYears: "3 yrs", color: "#38bdf8" },
    { id: "mongodb", name: "MongoDB", category: "Backend & Databases", level: 84, expertiseLevel: "Senior", experienceYears: "3 yrs", color: "#4ade80" },
    { id: "docker", name: "Docker & Devcontainers", category: "DevOps & Tooling", level: 85, expertiseLevel: "Senior", experienceYears: "2 yrs", color: "#60a5fa" },
    { id: "git", name: "Git & GitHub Actions", category: "DevOps & Tooling", level: 94, expertiseLevel: "Expert", experienceYears: "4 yrs", color: "#f43f5e" },
    { id: "groq-ai", name: "Groq LLM & AI Integration", category: "AI & LLM", level: 86, expertiseLevel: "Senior", experienceYears: "2 yrs", color: "#ec4899" },
  ],

  careerPhases: [
    {
      id: "phase-ld-lead",
      title: "L&D LEAD ARCHITECT",
      roleTitle: "Learning & Development Lead",
      dates: "2024 – PRESENT",
      description: "Leading 25 trainers across VIT University & SIT Madurai. Architected placement training programs for 7,500+ students.",
      strataColor: "#E8C468",
      layerDepthMin: 0,
      layerDepthMax: 25,
    },
    {
      id: "phase-senior-trainer",
      title: "TECHNICAL TRAINING SPECIALIST",
      roleTitle: "Senior Master Trainer",
      dates: "2023 – 2024",
      description: "Delivered Java, DSA, and Full-Stack bootcamps. Built automated assessment pipelines and code visualizers.",
      strataColor: "#D9A86C",
      layerDepthMin: 26,
      layerDepthMax: 50,
    },
    {
      id: "phase-fullstack-dev",
      title: "FULL-STACK SOFTWARE ENGINEER",
      roleTitle: "Full-Stack Developer",
      dates: "2022 – 2023",
      description: "Built scalable web apps, PostgreSQL database tools, and open-source developer tooling.",
      strataColor: "#B9673A",
      layerDepthMin: 51,
      layerDepthMax: 75,
    },
    {
      id: "phase-academic-scholar",
      title: "BE GRADUATE & RESEARCH",
      roleTitle: "Systems & Engineering Scholar",
      dates: "2018 – 2022",
      description: "Graduated BE Civil @ Mepco Schlenk. Developed algorithmic problem-solving expertise and leadership.",
      strataColor: "#7A4A28",
      layerDepthMin: 76,
      layerDepthMax: 100,
    },
  ],

  projects: [
    {
      id: "schema-sentinel",
      title: "Schema Sentinel - PostgreSQL Risk Analyzer",
      subtitle: "Database Security & Migration Guardrails",
      category: "Full-Stack & 3D",
      role: "Lead Systems Architect & Creator",
      timeframe: "2025 - 2026",
      releaseYear: 2026,
      description: "Pre-migration risk analysis tool for PostgreSQL. Automatically parses SQL DDL statements to detect dangerous ALTER TABLE, DROP, and schema lock operations before they hit production environments.",
      highlights: [
        "AST-based SQL parsing engine evaluating DDL migration safety.",
        "Prevents database table locks, data loss, and downtime during deployments.",
        "Integrated CLI & GitHub Actions workflow for automated pull request checks.",
      ],
      metrics: [
        { label: "Safety Engine", value: "AST SQL Parser" },
        { label: "Target DB", value: "PostgreSQL" },
        { label: "Lock Risk", value: "0% Downtime" },
      ],
      techStack: ["Python", "PostgreSQL", "SQL Parsing", "AST", "Docker", "GitHub Actions"],
      githubUrl: "https://github.com/Pradeep-B28/Schema-Sentinel",
      liveUrl: "https://github.com/Pradeep-B28/Schema-Sentinel",
      color: "#EF4444",
      reelColor: "#EF4444",
      complexity: 5,
      valuation: 380000,
      boxNumber: "VAULT-001",
      codeName: "ORBIT-01",
      cartridgeCode: "CART-01",
      takeType: "GOOD TAKE",
      isAnchor: true,
      depth: 8,
      codeSnippet: `def analyze_ddl_risk(sql_ast):\n    if sql_ast.contains_exclusive_lock():\n        return RiskResult(severity="CRITICAL", recommendation="Use async column drop")`,
    },
    {
      id: "ledger-app",
      title: "Ledger - MERN Expense Tracker Suite",
      subtitle: "Full-Stack Financial Dashboard & Mobile PWA App",
      category: "Full-Stack & 3D",
      role: "Full-Stack Lead Engineer",
      timeframe: "2024 - 2025",
      releaseYear: 2025,
      description: "Comprehensive personal and enterprise financial ledgering application featuring offline-first local IndexedDB sync, real-time spending telemetry, budget analytics, and native Capacitor Android build.",
      highlights: [
        "Structured transaction log with real-time category grouping and financial analytics.",
        "Offline-first PWA architecture cross-compiled to native Android APK using Capacitor.",
        "Clean UI component design built with modern React.js and Node.js backend.",
      ],
      metrics: [
        { label: "Stack", value: "React + Node + PWA" },
        { label: "Mobile Delivery", value: "Capacitor Android" },
        { label: "Sync Engine", value: "IndexedDB Fallback" },
      ],
      techStack: ["React.js", "Node.js", "Express", "MongoDB", "Capacitor 6", "PWA", "JavaScript"],
      githubUrl: "https://github.com/Pradeep-B28/Ledger_Expense_Tracker",
      liveUrl: "https://github.com/Pradeep-B28/Ledger_Expense_Tracker",
      color: "#F59E0B",
      reelColor: "#F59E0B",
      complexity: 4,
      valuation: 290000,
      boxNumber: "VAULT-002",
      codeName: "ORBIT-02",
      cartridgeCode: "CART-02",
      takeType: "GOOD TAKE",
      isAnchor: false,
      depth: 22,
      codeSnippet: `const syncLedgerOffline = async (transaction) => {\n  await db.transactions.add(transaction);\n  if (navigator.onLine) await pushToCloud(transaction);\n};`,
    },
    {
      id: "devstarter",
      title: "Devstarter - Zero-Config Devcontainers",
      subtitle: "Open Source Tooling · Polyglot Environment Kit",
      category: "Full-Stack & 3D",
      role: "DevOps & Tooling Author",
      timeframe: "2025",
      releaseYear: 2025,
      description: "Zero-configuration devcontainer templates for Python, Node.js, Go, Rust, C++, and Java. Open any repository in VS Code with one click without manual environment configuration.",
      highlights: [
        "Pre-packaged isolated dev environments for 6 major language ecosystems.",
        "Accelerates student and developer setup time from hours to seconds.",
        "Configured with Docker containers, extension packs, and linters out of the box.",
      ],
      metrics: [
        { label: "Supported Stacks", value: "6 Polyglot Ecosystems" },
        { label: "Setup Latency", value: "1-Click VS Code Launch" },
      ],
      techStack: ["Docker", "Devcontainers", "VS Code", "Shell Scripting", "Python", "Java", "Node.js", "Go", "Rust", "C++"],
      githubUrl: "https://github.com/Pradeep-B28/Devstarter",
      liveUrl: "https://github.com/Pradeep-B28/Devstarter",
      color: "#06B6D4",
      reelColor: "#06B6D4",
      complexity: 4,
      valuation: 240000,
      boxNumber: "VAULT-003",
      codeName: "ORBIT-03",
      cartridgeCode: "CART-03",
      takeType: "GOOD TAKE",
      isAnchor: false,
      depth: 38,
      codeSnippet: `{\n  "name": "Polyglot Devcontainer",\n  "image": "mcr.microsoft.com/devcontainers/universal:1",\n  "extensions": ["ms-vscode.cpptools", "redhat.java"]\n}`,
    },
    {
      id: "git-viz",
      title: "3D GIT Visualizer (GIT---viz)",
      subtitle: "Interactive 3D WebGL GitHub Profile & Commit Engine",
      category: "Full-Stack & 3D",
      role: "3D Graphics & WebGL Engineer",
      timeframe: "Jul 2026 – Present",
      releaseYear: 2026,
      description: "Transforms GitHub user profiles into an interactive 3D WebGL skyline or celestial constellation. Visualizes commit heatmaps, repository stars, and language distributions in spatial 3D space.",
      highlights: [
        "Engineered full 3D interactive stage using Three.js and OrbitControls.",
        "Visualized Git commits, branching trees, merge heads, and staging area in spatial 3D.",
        "Deployed in active classroom environments at Sethu Institute of Technology to reduce version control confusion.",
      ],
      metrics: [
        { label: "Graphics Engine", value: "Three.js / WebGL" },
        { label: "Classroom Use", value: "Active SIT Batches" },
      ],
      techStack: ["Three.js", "JavaScript (ES6+)", "WebGL", "HTML5 Canvas", "GitHub API"],
      githubUrl: "https://github.com/Pradeep-B28/GIT---viz",
      liveUrl: "https://pradeep-b28.github.io/GIT---viz/",
      color: "#10B981",
      reelColor: "#10B981",
      complexity: 5,
      valuation: 320000,
      boxNumber: "VAULT-004",
      codeName: "ORBIT-04",
      cartridgeCode: "CART-04",
      takeType: "GOOD TAKE",
      isAnchor: true,
      depth: 54,
      codeSnippet: `const scene = new THREE.Scene();\nconst commitNode = new THREE.Mesh(geometry, material);\nscene.add(commitNode);`,
    },
    {
      id: "rel-notes",
      title: "Rel_Notes - AI Release Notes Generator",
      subtitle: "AI Tooling & Automation powered by Groq LLM",
      category: "AI & Tooling",
      role: "AI Systems Engineer",
      timeframe: "2025",
      releaseYear: 2025,
      description: "AI-powered release notes generator built to transform raw Git commit logs into structured semver release notes in seconds using Groq LLaMA inference engine.",
      highlights: [
        "Parses Conventional Commits and generates clean user-facing changelogs.",
        "Ultra-fast sub-2-second processing powered by Groq LLaMA API.",
        "Built with TypeScript for type-safe execution in developer workflows.",
      ],
      metrics: [
        { label: "Inference Engine", value: "Groq LLM" },
        { label: "Generation Speed", value: "< 2 Seconds" },
      ],
      techStack: ["TypeScript", "Groq API", "Git Logs", "Node.js", "AI Integration"],
      githubUrl: "https://github.com/Pradeep-B28/Rel_Notes",
      liveUrl: "https://github.com/Pradeep-B28/Rel_Notes",
      color: "#EC4899",
      reelColor: "#EC4899",
      complexity: 4,
      valuation: 210000,
      boxNumber: "VAULT-005",
      codeName: "ORBIT-05",
      cartridgeCode: "CART-05",
      takeType: "GOOD TAKE",
      isAnchor: false,
      depth: 68,
      codeSnippet: `const releaseNotes = await groq.chat.completions.create({\n  messages: [{ role: "user", content: parseCommits(rawGitLog) }],\n  model: "llama-3.3-70b-versatile"\n});`,
    },
    {
      id: "java-roadmap",
      title: "Java & DSA Master Placement Roadmap",
      subtitle: "Algorithmic Blueprint & 15+ Pattern Suite",
      category: "Academic Training",
      role: "Author & Master Trainer",
      timeframe: "2024 - 2026",
      releaseYear: 2026,
      description: "A structured, open-source Java and Data Structures & Algorithms learning roadmap for engineering students preparing for Tier 1 MNC recruitment and technical interviews.",
      highlights: [
        "Comprehensive 15-pattern DSA curriculum roadmap.",
        "Covers Two Pointers, Sliding Window, Monotonic Stack, Dynamic Programming, and Graphs.",
        "Adopted across 20+ partner institution batches for placement readiness.",
      ],
      metrics: [
        { label: "Patterns Covered", value: "15 DSA Patterns" },
        { label: "Target Audience", value: "Tier 1 MNC Candidates" },
      ],
      techStack: ["Java (SE)", "DSA", "Algorithms", "Problem Solving", "Object-Oriented Design"],
      githubUrl: "https://github.com/Pradeep-B28",
      liveUrl: "https://github.com/Pradeep-B28",
      color: "#3B82F6",
      reelColor: "#3B82F6",
      complexity: 5,
      valuation: 260000,
      boxNumber: "VAULT-006",
      codeName: "ORBIT-06",
      cartridgeCode: "CART-06",
      takeType: "GOOD TAKE",
      isAnchor: true,
      depth: 82,
      codeSnippet: `public class TwoPointersPattern {\n    public static int[] findPair(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left < right) { ... }\n    }\n}`,
    },
    {
      id: "ld-campus-corporate",
      title: "L&D Campus-to-Corporate Training Ecosystem",
      subtitle: "Institutional Placement Transformation Catalyst",
      category: "Academic Training",
      role: "L&D Lead & Program Director",
      timeframe: "2024 - Present",
      releaseYear: 2026,
      description: "Comprehensive institutional learning framework delivering campus-to-corporate technical training across VIT University, SIT Madurai, and KSR Institutions. Elevated student placement rates from 70% to 90%.",
      highlights: [
        "Directly mentored 7,500+ engineering candidates across Tier 1 MNC tracks.",
        "Managed and led a 25-member trainer squad across multi-campus bootcamps.",
        "Achieved a 20% net increase in student placement outcomes.",
      ],
      metrics: [
        { label: "Students Mentored", value: "7,500+ Engineers" },
        { label: "Placement Outcome", value: "70% ➔ 90%" },
        { label: "Trainer Team", value: "25 Trainers Managed" },
      ],
      techStack: ["L&D Leadership", "Curriculum Design", "Java & DSA", "Technical Training", "Mentorship"],
      githubUrl: "https://github.com/Pradeep-B28",
      liveUrl: "https://github.com/Pradeep-B28",
      color: "#8B5CF6",
      reelColor: "#8B5CF6",
      complexity: 5,
      valuation: 410000,
      boxNumber: "VAULT-007",
      codeName: "ORBIT-07",
      cartridgeCode: "CART-07",
      takeType: "GOOD TAKE",
      isAnchor: true,
      depth: 96,
      codeSnippet: `// Campus-to-Corporate Execution Matrix\nconst metric = {\n  candidates: 7500,\n  initialPlacement: "70%",\n  finalPlacement: "90%"\n};`,
    },
  ],
};

export default PORTFOLIO_DATA;
