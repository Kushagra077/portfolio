// Single source of truth for portfolio content (light-editorial redesign).
// Edit copy here. Diagrams + animations live in components/diagrams.

export type SocialPlatform =
  | 'Email'
  | 'GitHub'
  | 'LinkedIn'
  | 'Medium'
  | 'Kaggle'
  | 'HuggingFace'
  | 'GoogleScholar'
  | 'ORCID';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
}

export const site = {
  name: 'Kushagra Pandya',
  role: 'AI Engineer',
  tagline: 'I build AI systems that ship to production.',
  email: 'p.kushagra22@gmail.com',
  location: 'Rajkot, India',
  resumeUrl: '/Kushagra_Pandya_Resume.pdf',
  bio: 'I design agentic pipelines, LLM & RAG applications, and computer-vision models — and take them from notebook to deployment. Currently building production AI at TSS Consultancy.',
  // Medium username (without the @) — drives the live Articles feed.
  mediumHandle: 'p.kushagra22',
};

export const socials: SocialLink[] = [
  { platform: 'Email', label: 'Email', url: 'mailto:p.kushagra22@gmail.com' },
  { platform: 'GitHub', label: 'GitHub', url: 'https://github.com/Kushagra077' },
  { platform: 'LinkedIn', label: 'LinkedIn', url: 'https://www.linkedin.com/in/kushagra-pandya/' },
  { platform: 'Medium', label: 'Medium', url: 'https://medium.com/@p.kushagra22' },
  { platform: 'Kaggle', label: 'Kaggle', url: 'https://www.kaggle.com/kushagrapandya' },
  { platform: 'HuggingFace', label: 'Hugging Face', url: 'https://huggingface.co/Kushagra77' },
  { platform: 'GoogleScholar', label: 'Scholar', url: 'https://scholar.google.com/citations?user=HXtTZCoAAAAJ&hl=en' },
  { platform: 'ORCID', label: 'ORCID', url: 'https://orcid.org/0009-0007-7695-335X' },
];

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Work' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/education', label: 'Education' },
  { href: '/publications', label: 'Publications' },
  { href: '/articles', label: 'Articles' },
];

// ---------------- Projects ----------------

export type DiagramKey = 'smartingest' | 'recruitradar';

export interface ProjectStep {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  index: string; // "01"
  name: string;
  category: string; // mono label
  tagline: string;
  description: string; // one-liner for cards
  summary: string; // case-study hero subtitle
  diagram: DiagramKey;
  tech: string[];
  metrics: string[];
  githubUrl: string;
  steps: ProjectStep[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    slug: 'smartingest',
    index: '01',
    name: 'SmartIngest',
    category: 'AGENTIC PIPELINE',
    tagline: 'Agentic document-intelligence pipeline',
    description:
      'An agentic pipeline that turns messy, unstructured documents into validated, routed structured data.',
    summary:
      'An agentic document-intelligence pipeline that ingests messy documents and returns validated, routed structured data — with guardrails, grounding and an intelligent retry loop.',
    diagram: 'smartingest',
    tech: ['Python 3.12', 'LangGraph', 'FastAPI', 'Gemini', 'Pydantic', 'Docker', 'LangSmith'],
    metrics: ['72 tests', 'eval-gated CI', 'Dockerized'],
    githubUrl: 'https://github.com/Kushagra077/SmartIngest',
    steps: [
      {
        title: 'Guardrails',
        body: 'Every document is screened first — prompt-injection scanning and PII redaction before anything reaches the model.',
      },
      {
        title: 'Classification',
        body: 'The document is classified and routed to the correct extraction schema, so each type is handled by the right rules.',
      },
      {
        title: 'Extraction',
        body: 'Gemini produces structured output validated against Pydantic models — typed, predictable data instead of free text.',
      },
      {
        title: 'Validation & grounding',
        body: 'Outputs are grounded against the source to catch hallucinations; low-confidence results trigger an automatic retry loop.',
      },
      {
        title: 'Routing',
        body: 'Validated data is routed by deterministic YAML rules to its destination, with full LangSmith tracing end-to-end.',
      },
    ],
    highlights: [
      '72 tests with an eval harness wired as a CI gate',
      'Intelligent retry loop triggered on low-confidence extractions',
      'Deterministic YAML routing + full LangSmith tracing',
    ],
  },
  {
    slug: 'recruitradar',
    index: '02',
    name: 'RecruitRadar',
    category: 'MULTI-AGENT SYSTEM',
    tagline: 'Multi-agent recruitment screener',
    description:
      'A CrewAI multi-agent screener that scores resumes against a JD with deterministic, evidence-backed results.',
    summary:
      'A CrewAI multi-agent recruitment screener that scores resumes against a job description with deterministic, evidence-backed scoring — saving recruiters hours per role.',
    diagram: 'recruitradar',
    tech: ['Python', 'CrewAI', 'Gemini', 'LiteLLM', 'rapidfuzz', 'SQLModel', 'SQLite'],
    metrics: ['~6 hrs saved / role', '0–100 deterministic score', 'evidence-backed'],
    githubUrl: 'https://github.com/Kushagra077/RecruitRadar',
    steps: [
      {
        title: 'JD Analyst',
        body: 'Parses the job description into weighted, structured criteria that drive every downstream decision.',
      },
      {
        title: 'Embedding pre-filter',
        body: 'A Gemini embedding pass shortlists resumes so expensive scoring only runs on relevant candidates.',
      },
      {
        title: 'Resume Scorer',
        body: 'Computes a deterministic 0–100 score with weighted sums in code (never emitted by the LLM); every matched skill must cite a verbatim resume quote, verified with rapidfuzz.',
      },
      {
        title: 'Interview Designer',
        body: 'Drafts tailored interview questions grounded in the candidate’s actual experience and the role’s criteria.',
      },
      {
        title: 'Outreach & Tracker',
        body: 'Writes personalized outreach messages and tracks every candidate through an SQLite kanban pipeline.',
      },
    ],
    highlights: [
      '~6 hours saved per role screened',
      'Deterministic, auditable scoring — no LLM-emitted numbers',
      'Evidence guard: every claim cites a verbatim resume quote',
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// ---------------- Skills ----------------

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { label: 'Languages & Data', skills: ['Python', 'SQL', 'PostgreSQL'] },
  { label: 'Core ML / DL', skills: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'OCR'] },
  { label: 'LLMs & Generative AI', skills: ['LLM', 'VLM', 'Generative AI', 'Agentic AI', 'RAG'] },
  { label: 'Agent / LLM Frameworks', skills: ['LangChain', 'LangGraph', 'CrewAI'] },
  { label: 'Vector Stores', skills: ['ChromaDB', 'pgvector', 'Pinecone'] },
  { label: 'MLOps & Deployment', skills: ['Docker', 'MLOps', 'MLflow', 'ONNX'] },
];

// ---------------- Experience ----------------

export interface Position {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  bullets: string[];
  tech: string[];
}

export const positions: Position[] = [
  {
    role: 'Software Engineer — AI',
    company: 'TSS Consultancy Pvt Ltd',
    period: '03/2026 — Present',
    location: 'Rajkot, India',
    current: true,
    bullets: [
      'Designed and deployed an Active Liveness Detection system that distinguishes live users from spoofing attempts (photos, videos, 3D masks), integrated into real-time identity-verification pipelines.',
      'Engineered multi-stage challenge-response liveness checks using facial-landmark analysis and texture anti-spoofing models, achieving high precision with low false-acceptance rates.',
    ],
    tech: ['Computer Vision', 'Anti-Spoofing', 'PyTorch', 'Python'],
  },
  {
    role: 'Associate Software Engineer — AI',
    company: 'TSS Consultancy Pvt Ltd',
    period: '01/2024 — 02/2026',
    location: 'Rajkot, India',
    bullets: [
      'Deployed a high-throughput Document Image Classification system handling 60K–70K daily API hits at ~0.5s latency in production.',
      'Built and deployed a multilingual OCR pipeline across 8 Indian languages plus an identity-document extraction system using OCR and deep learning.',
      'Developed Deepfake Detection at 95% accuracy and optimized model inference using ONNX, quantization, Docker and Azure for scalable deployment.',
    ],
    tech: ['OCR', 'Deepfake Detection', 'ONNX', 'Docker', 'Azure', 'Quantization'],
  },
  {
    role: 'Research Intern',
    company: 'TSS Consultancy Pvt Ltd',
    period: '11/2022 — 08/2023',
    location: 'Remote',
    bullets: [
      'Developed AI solutions across NLP and Computer Vision — sentiment analysis, NER, face matching and automated data extraction using Azure OpenAI.',
      'Built data pipelines and productionized models, collaborating with research and engineering teams for scalable, real-world deployment.',
    ],
    tech: ['NLP', 'NER', 'Azure OpenAI', 'Siamese Networks', 'Python'],
  },
];

// ---------------- Education ----------------

export const education = {
  degree: 'B.Tech, Computer Engineering — Specialization in Artificial Intelligence',
  institution: 'Marwadi University',
  period: '2020 — 2024',
  location: 'Rajkot, India',
  cpi: '8.51 / 10',
  detail:
    'Coursework across machine learning, deep learning, computer vision, NLP, statistics and probability. Finalist in 5 national-level and 1 state-level hackathons.',
  courses: [
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Statistics & Probability',
  ],
};

// ---------------- Publications ----------------

export interface Paper {
  title: string;
  venue: string;
  year: string;
  summary: string;
  url?: string;
}

export interface Patent {
  title: string;
  number: string;
  description: string;
}

export const papers: Paper[] = [
  {
    title: 'Barcode and QR Code Object Detection: An Experimental Study on YOLOv8 Models',
    venue: 'INNOCOMP 2024 · IEEE',
    year: '2024',
    summary:
      'Evaluated YOLOv8 nano/small/medium for barcode & QR detection; the small model reached 97.1% accuracy.',
    url: 'https://doi.org/10.1109/innocomp63224.2024.00127',
  },
  {
    title:
      'Enhancing DNA Sequence Classification Through Machine Learning: A Comparative Study on Human and Chimpanzee Genomic Data',
    venue: 'Global AI Summit · IEEE',
    year: '2024',
    summary:
      'Compared nine ML algorithms with k-mer features; Naïve Bayes reached 99% accuracy on human DNA.',
    url: 'https://doi.org/10.1109/GlobalAISummit62156.2024.10947774',
  },
];

export const patents: Patent[] = [
  {
    title: 'Navigational Aid Device for Visually Impaired Individuals',
    number: '202421033107',
    description: 'A device that helps visually impaired people navigate their surroundings safely.',
  },
  {
    title: 'System and Method for Translating Sign Language into Spoken Language',
    number: '202421033112',
    description: 'An application that lets deaf and mute individuals communicate in their own language.',
  },
  {
    title: 'Real-Time Detection of Manipulated Digital Images Using AI',
    number: '202421033396',
    description: 'Detects deepfake / manipulated images in real time to help prevent fraud.',
  },
  {
    title: 'Advanced Myoelectric Prosthetic Arm with Integrated Sensory Feedback',
    number: '202421033382',
    description: 'A prosthetic arm with motor-controlled joints that restores day-to-day function.',
  },
];
