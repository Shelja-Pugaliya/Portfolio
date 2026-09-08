export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  href?: string;
  year: string;
};

export const projects: Project[] = [
  {
    title: "AI-Assisted Salesforce Tooling Framework",
    blurb:
      "Agentic workflows, prompt engineering and reusable templates that automate Salesforce CLI plugin generation, cutting developer effort ~70%. Modular TypeScript plugin architecture on oclif, with CI/CD quality gates (Jenkins, SonarQube, Mocha) and JWT-authed end-to-end tests.",
    tags: ["TypeScript", "oclif", "Salesforce CLI", "CI/CD", "SonarQube", "Prompt Engineering"],
    year: "2026",
  },
  {
    title: "Real-Time Renewable Energy Gap Risk Monitor",
    blurb:
      "A continuously running pipeline that ingests live electricity-grid data and produces ML-based risk assessments: streaming ingestion, time-series analysis, feature engineering, predictive inference and interactive dashboards for forecasting and operational risk.",
    tags: ["Python", "Kafka", "InfluxDB", "Grafana", "Docker", "Random Forest"],
    year: "2025",
  },
  {
    title: "Subtitle Translator (Microsoft-mentored)",
    blurb:
      "Full-stack, AI-powered subtitle translation platform that preserves contextual meaning and subtitle structure. Next.js + Node.js with Azure OpenAI, Azure Blob Storage, Azure AD auth, Prisma/MongoDB and GitHub Actions CI/CD. Built with a 6-person team.",
    tags: ["Next.js", "Node.js", "Azure OpenAI", "Azure AD", "Prisma", "GitHub Actions"],
    year: "2024",
  },
  {
    title: "Test Day Experience for Students",
    blurb:
      "A .NET feature on Kaplan's Courseware letting students schedule and reschedule an at-home, virtually proctored GRE test day. Used by ~100 students daily.",
    tags: [".NET", "C#", "SQL Server", "T-SQL"],
    year: "2023",
  },
];

export type ExperienceItem = {
  org: string;
  title: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    org: "Unum",
    title: "Salesforce DevOps Intern",
    period: "Feb 2026 – Aug 2026",
    location: "Carlow, Ireland",
    points: [
      "Architected an AI-assisted internal tooling framework (agentic workflows + prompt engineering) automating Salesforce CLI plugin generation — ~70% less engineering friction.",
      "Built and integrated CI/CD quality gates with Jenkins, SonarQube and Mocha for PRs and scheduled daily validations.",
      "Designed a modular TypeScript plugin architecture on oclif; managed environment config, version-control workflows and release gates across teams.",
    ],
  },
  {
    org: "Maynooth University",
    title: "CS Demonstrator",
    period: "2024 – present",
    location: "Maynooth, Ireland",
    points: [
      "Support students across CS modules in labs and tutorials, working through concepts one-on-one until they click.",
    ],
  },
  {
    org: "Kaplan North America",
    title: "Software Engineer",
    period: "Oct 2020 – Aug 2024",
    location: "Bangalore, India",
    points: [
      "Owned deployment, configuration and maintenance of enterprise microservices for a high-traffic LMS; tuned IIS backends for sub-second latency.",
      "Administered SQL Server: complex T-SQL stored procedures, performance tuning, triggers and functions.",
      "Built a crash-reporting and alerting stack (Kibana, Dynatrace, LogRocket, Pingdom) — 60% fewer customer-facing support tickets.",
      "Moved the team toward continuous delivery with Jenkins pipelines and Docker/AWS deployment workflows; automated Linux ops with Bash.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "C#", "Python", "JavaScript", "C++", "SQL"] },
  { group: "Frameworks", items: [".NET", "Angular", "Next.js", "Node.js", "oclif"] },
  { group: "Cloud & Infra", items: ["AWS (EC2, S3, IAM, VPC)", "Docker", "Kubernetes", "IIS"] },
  { group: "CI/CD & Quality", items: ["Jenkins", "TeamCity", "SonarQube", "GitHub Actions", "Git"] },
  { group: "Data", items: ["SQL Server (T-SQL)", "PostgreSQL", "MongoDB", "Redis"] },
  { group: "Observability", items: ["Kibana", "Dynatrace", "LogRocket", "Pingdom"] },
];
