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
  bio: 'Computer vision, agentic pipelines and LLM applications, taken from notebook to deployment. I’m an AI engineer at TSS Consultancy, where I train, serve and improve document, face and liveness models.',
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

// ---------------- Home highlights ----------------

export interface Stat {
  value: string;
  label: string;
  context: string;
}

// Proof points shown on the home page. Sourced from the experience and papers below;
// keep them in sync with the Experience entries.
export const stats: Stat[] = [
  { value: '~50K', label: 'API requests per day', context: 'Document classification and detection in production, ~0.5s model inference' },
  { value: '98.92%', label: 'classification accuracy', context: 'Measured on a ~3K-image in-house benchmark' },
  { value: '89%', label: 'liveness accuracy', context: 'Passive liveness, average over held-out benchmark datasets' },
  { value: '2 + 4', label: 'IEEE papers and patents', context: 'First author on both papers; 1 patent granted, 3 published' },
];

// Projects featured on the home page; the full list lives on /projects.
export const featuredProjectSlugs = ['football-detect-serve', 'football-team-tracker', 'smartingest'];

// ---------------- Projects ----------------

export type DiagramKey =
  | 'smartingest'
  | 'recruitradar'
  | 'footballdetect'
  | 'footballmetrics'
  | 'footballtracker';

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
  demoUrl?: string;
  /** Optional results table shown above "How it works". */
  results?: ProjectResults;
  steps: ProjectStep[];
  highlights: string[];
}

export interface ProjectResults {
  title: string;
  head?: string[];
  rows: string[][];
  caption?: string;
}

export const projects: Project[] = [
  {
    slug: 'smartingest',
    index: '01',
    name: 'SmartIngest',
    category: 'AGENTIC PIPELINE',
    tagline: 'Agentic document-intelligence pipeline',
    description:
      'Classifies invoices, contracts, resumes and IDs, extracts typed fields with Gemini, then approves, flags or rejects them with deterministic rules.',
    summary:
      'A five-node LangGraph pipeline over FastAPI. Gemini does the vision classification and extraction; validation and routing are deterministic Python driven by YAML rules, with prompt-injection and grounding guardrails, a confidence-triggered re-extraction loop, and per-node LangSmith traces.',
    diagram: 'smartingest',
    tech: ['Python 3.12', 'LangGraph', 'Gemini', 'FastAPI', 'Pydantic v2', 'SQLite', 'LangSmith', 'Docker', 'uv'],
    metrics: ['72 tests', 'Offline eval gate in CI', '4 document types'],
    githubUrl: 'https://github.com/Kushagra077/SmartIngest',
    demoUrl: 'https://youtu.be/DgXVG6Zd9wA',
    steps: [
      {
        title: 'Guardrails',
        body: 'Uploads are checked for size (25 MB) and type before anything is stored. The first graph node then scans text documents with regex heuristics for prompt injection and for PII (email, phone, SSN, card). PII is reported by category only and never changes the route. An injection match is an error-level finding that forces a reject at the end of the run. Images and PDFs skip this text scan.',
      },
      {
        title: 'Classification',
        body: 'Gemini (default gemini-2.0-flash, JSON mode, temperature 0) reads the PDF, image or text and returns a document type and confidence: invoice, contract, resume, id_document, or unknown. The type selects which field schema is sent to the extractor. Unknown types are rejected.',
      },
      {
        title: 'Extraction',
        body: 'Gemini returns JSON for the type-specific schema (for example invoice line items with GST and HSN codes, or contract parties and clauses). It is parsed into Pydantic v2 models that drop stray nulls and salvage valid fields when one value is malformed. If the primary model returns 429 or 503, the client fails over to gemini-1.5-flash, then gemini-1.5-flash-8b.',
      },
      {
        title: 'Validation & grounding',
        body: 'No LLM is involved here. Python checks required fields, ISO dates, invoice totals against components (0.05 tolerance), tax-ID and ID-number formats, and the vendor whitelist. A grounding check flags vendor, invoice number, name, ID number, total or contract value that does not appear in the source text. If extraction confidence is below 0.75, a conditional edge re-runs the extractor, for at most 2 extractor passes.',
      },
      {
        title: 'Routing',
        body: 'A deterministic router (not an LLM call) picks one outcome, in order: reject for an injection finding, a validation error or an unknown type; flag for review for an invoice over 10,000, a grounding or validation warning, or low classification confidence; otherwise auto-approve. Thresholds, vendor whitelist and required fields come from config/rules.yaml. Jobs run asynchronously behind POST /upload, /status and /results, and each node is traced in LangSmith on the API path.',
      },
    ],
    highlights: [
      '72 pytest tests, plus an eval gate in CI that runs the real graph over a labelled golden set in mock-LLM mode with no API key (thresholds: classification and routing ≥ 0.8, field F1 ≥ 0.7)',
      'Deterministic validation and routing, kept out of the LLM so decisions are reproducible, unit-testable and tunable from YAML without a redeploy',
      'Security-aware by design: injection is rejected, ungrounded values are flagged for review, uploads are size and type checked, and the API enforces 10 requests/min per IP and a 200/day global cap to protect the Gemini quota',
    ],
  },
  {
    slug: 'recruitradar',
    index: '02',
    name: 'RecruitRadar',
    category: 'MULTI-AGENT SYSTEM',
    tagline: 'Multi-agent recruitment screener',
    description:
      'A CrewAI multi-agent screener that scores resumes against a job description with deterministic, evidence-backed results, built to cut manual screening time.',
    summary:
      'A five-agent CrewAI recruitment screener: it reads a JD and a folder of PDF, DOCX or scanned resumes, ranks candidates 0–100 with a per-criterion breakdown, drafts interview kits and outreach emails, and tracks each candidate in a persistent SQLite pipeline. The total score is arithmetic in Python, and any skill claim the resume text does not support is dropped before it counts. Built to cut the time recruiters spend screening; I estimate about 6 hours per role (an estimate, not a measurement).',
    diagram: 'recruitradar',
    tech: ['Python', 'CrewAI', 'Gemini', 'Groq', 'LiteLLM', 'Pydantic', 'rapidfuzz', 'SQLModel', 'SQLite', 'Streamlit', 'PyMuPDF', 'Tesseract'],
    metrics: ['~6 hrs/role (my estimate)', 'score computed in Python', '35 network-free tests'],
    githubUrl: 'https://github.com/Kushagra077/RecruitRadar',
    demoUrl: 'https://youtu.be/4_sv16UfuZM',
    steps: [
      {
        title: 'JD Analyst',
        body: 'A Groq-hosted Llama 3.3 70B agent turns the job description into a typed rubric (Pydantic): title, must-have skills, nice-to-have skills, minimum years and culture signals. Criterion weights are not LLM output; they come from config defaults (0.50 / 0.25 / 0.15 / 0.10) or the app sliders.',
      },
      {
        title: 'Embedding pre-filter',
        body: 'Resumes are parsed first (PDF, DOCX, and Tesseract OCR for scanned PDFs). When a batch exceeds the shortlist size (default 25), Gemini embeddings rank resumes by cosine similarity to the JD and only the top 25 go to the LLM crew. Smaller batches skip this step.',
      },
      {
        title: 'Resume Scorer + evidence guard',
        body: 'A Gemini agent at temperature 0 judges experience and culture on a 0–1 scale and cites a quote for each skill it credits. A rapidfuzz guard (≥ 85) checks each claim against the parsed resume text and demotes unsupported ones to not-found with a flag. Skill fractions are recomputed from the surviving claims, and the 0–100 total is a weighted sum in Python.',
      },
      {
        title: 'Interview Designer + Outreach Drafter',
        body: 'For the top 5 candidates, a Gemini agent writes 3 technical and 2 behavioral questions, each with what a strong answer looks like. A Groq agent drafts outreach for every candidate: an invite at a score of 70 or above, otherwise a respectful rejection. Both run concurrently per candidate (5 workers).',
      },
      {
        title: 'Tracker',
        body: 'A Groq agent writes a next action and follow-up note per candidate. Stage changes are a rule-based state machine, not LLM output: score ≥ 70 means shortlisted, below 70 means rejected, and manual stages such as interviewing, offer and hired are not overwritten on re-runs. Records persist in SQLite via SQLModel and show on a Streamlit kanban, alongside ranked.csv, drafts and a run manifest.',
      },
    ],
    highlights: [
      'Total score is arithmetic in Python; the LLM only gives 0–1 judgments for experience and culture',
      'Evidence guard drops unsupported skill claims and flags them, so a fabricated skill lowers the score',
      '35 network-free tests (scoring, guard, OCR parsing, tracker, mocked end-to-end run) run in GitHub Actions CI',
    ],
  },
  {
    slug: 'football-detect-serve',
    index: '03',
    name: 'football-detect-serve',
    category: 'CV SERVING PIPELINE',
    tagline: 'YOLO26 football detector, checkpoint to endpoint',
    description:
      'A football object detector (ball, goalkeeper, player, referee) trained on SoccerNet broadcast footage, exported to ONNX and served as four speed/accuracy presets behind a batching FastAPI service. INT8 quantization and batching were each measured, and neither is a free win.',
    summary:
      'A YOLO26 football detector taken from checkpoint to endpoint: trained on SoccerNet broadcast footage, exported to ONNX, and served as four presets (test mAP50-95 0.400 to 0.477) behind a batching FastAPI service. One evaluator scores every backend, so the ONNX, INT8 and batching results are measured on the same code path, including the ones that did not pay off.',
    diagram: 'footballdetect',
    tech: ['Python', 'Ultralytics YOLO26', 'PyTorch', 'ONNX Runtime', 'FastAPI', 'Gradio', 'Docker', 'Locust', 'Prometheus', 'GitHub Actions', 'Hugging Face Spaces'],
    metrics: [
      '4 presets: 0.400–0.477 test mAP50-95',
      'ONNX fp32: 1.5x torch, no accuracy loss',
      'INT8: slower on ARM and x86, -0.03 to -0.06 mAP',
      'load-tested at concurrency 1–16',
    ],
    results: {
      title: 'Four presets',
      head: ['Preset', 'Model', 'Input', 'Test mAP50-95', 'Latency (batch 1, p50)'],
      rows: [
        ['fast', 'YOLO26 nano (v3)', '640', '0.400', '~16 ms'],
        ['balanced', 'YOLO26 nano (v7)', '960', '0.430', '~33 ms'],
        ['accurate', 'YOLO26 nano (v6)', '1280', '0.459', '~60 ms'],
        ['max', 'YOLO26 small (v13)', '1280', '0.477', '~177 ms'],
      ],
      caption:
        'ONNX fp32 on CPU (Apple M2, 4 threads), real 1080p frames. A request picks a preset with ?backend=fast|balanced|accurate|max. The ball is the hardest class at every size (AP 0.111 to 0.199).',
    },
    githubUrl: 'https://github.com/Kushagra077/football-detect-serve',
    demoUrl: 'https://huggingface.co/spaces/Kushagra77/football-detect-serve',
    steps: [
      {
        title: 'Data & train',
        body: 'SoccerNet MOT tracking labels are converted to YOLO format: 34,500 train, 8,250 val and 36,750 test images, with classes ball, goalkeeper, player, referee and a minor "other" that is excluded from the headline mean. Val is every 5th training sequence, so it shares matches with train and reads high; test is 3 unseen matches. Runs v1 to v13 covered YOLO26 nano at 640, 960 and 1280 px and small at 1280. Input size and model size moved accuracy; a ball-weighted loss, a P2 head and tiled inference did not.',
      },
      {
        title: 'Evaluate (gate)',
        body: 'scripts/eval_map.py computes COCO-style mAP50-95 for torch and ONNX through the same backend interface. The fp32 ONNX files match torch to three decimals per class. Cross-checked against ultralytics YOLO.val() on v3, the evaluator reads 0.015 to 0.019 higher, so model-to-model comparisons hold better than absolute values. On test, ball AP rises from 0.111 (fast) to 0.199 (max) and stays the weakest class.',
      },
      {
        title: 'Export ONNX',
        body: 'Checkpoints export to ONNX (opset 12, dynamic batch, simplified) with a .meta.json sidecar that records each model’s input size. Both backends decode through ultralytics predict(), because v3 exports an NMS-free [batch, 300, 6] output and the others a dense [batch, 9, anchors] one. A hand-written decoder produced garbage on the layout it did not expect and was removed. fp32 ONNX runs 1.5x torch on an M2 CPU (16.3 vs 24.9 ms p50) at no accuracy cost.',
      },
      {
        title: 'Quantize INT8 (measured)',
        body: 'Static INT8 shrinks v3 from 10.98 MB to 2.94 MB but costs 0.027 to 0.064 mAP50-95 on val (v6: -0.046). It was also slower than fp32 on the M2 (19.0 vs 16.3 ms) and on an x86 CI runner (57.7 vs 29.8 ms), which ruled out the first guess of ARM kernel tuning. v6’s calibration used 345 images stratified across 46 sequences; v1 to v3 predate that fix. INT8 is not served.',
      },
      {
        title: 'Serve (batched)',
        body: 'FastAPI loads all four ONNX presets and picks one per request with ?backend=. It exposes /predict, /healthz and Prometheus /metrics, applies an SSRF guard to image_url, and returns 503 when the 256-slot queue overflows. A per-backend worker batches up to 8 requests within a 15 ms window. A Locust test against v3 in local Docker shows batching losing at concurrency 1 (14.6 vs 21.5 RPS) and winning at 16 (31.0 vs 25.8 RPS). A Gradio app on a Hugging Face ZeroGPU Space is the public demo, and its speeds do not match the CPU tables.',
      },
    ],
    highlights: [
      'Input size and model size were the levers: test mAP50-95 went from 0.400 (v3, 640 px) to 0.477 (v13 small, 1280 px) while latency went from 16 ms to 177 ms. Ball AP is still the weakest class at 0.199',
      'INT8 negative result, checked on two CPUs: slower than fp32 on Apple M2 and on x86, and -0.03 to -0.06 mAP. The model is not served in INT8 and the README says why',
      'Load testing caught an unsynchronized call into a non-thread-safe model on the no-batching path and led to a per-backend predict lock. It also showed batching only helps at high concurrency',
    ],
  },
  {
    slug: 'football-tactical-metrics',
    index: '04',
    name: 'Football Tactical Metrics',
    category: 'SPORTS ANALYTICS',
    tagline: 'Provider-agnostic tactical & physical metrics from tracking data',
    description:
      'Turns player-tracking data from two providers into tactical and physical metrics through one schema, then checks them against synthetic ground truth and published physiological ranges.',
    summary:
      'Player-tracking data in, validated tactical and physical metrics out. Metrica (full-pitch) and SkillCorner (broadcast) feed one schema and one metrics layer, validated on 7 matches. A synthetic suite with known answers passes 22/22; real-data checks against published ranges pass 146 of 168, with the 22 failures reported rather than tuned away. A sensitivity sweep shows the sprint-speed threshold moves sprint counts 138%, while smoothing moves them 9%.',
    diagram: 'footballmetrics',
    tech: ['Python 3.13', 'kloppy', 'pandas', 'SciPy', 'Shapely', 'mplsoccer', 'Streamlit', 'pytest', 'ruff', 'uv'],
    metrics: ['22/22 synthetic checks', '146/168 real-data checks', '95% tracking-coverage rule', '7 matches, 2 providers'],
    githubUrl: 'https://github.com/Kushagra077/football-tactical-metrics',
    steps: [
      {
        title: 'Ingest',
        body: 'Metrica (3 matches, 25 Hz, full pitch) and SkillCorner (4 matches, TV broadcast) tracking data are parsed through kloppy into one canonical DataFrame: frame, period, timestamp, track_id, team, x/y in metres, goalkeeper and ball flags, ball state. validate() enforces the schema and raises on any violation.',
      },
      {
        title: 'Unify',
        body: 'The frame has no provider column and no metric takes a provider argument. Nothing under src/ftm/metrics imports kloppy, and a test enforces that. Which physical numbers get reported depends only on how much of the match a player was tracked; a made-up provider run through the pipeline in a test gets the same rule.',
      },
      {
        title: 'Compute',
        body: 'Positions are smoothed (Savitzky-Golay, 21 frames = 0.84 s at 25 Hz) and differentiated at the native rate; frame-to-frame jumps above 12 m/s are split out as glitches, and speeds still above 12 m/s are clipped and counted. Metrics: defensive line height, width, length, convex-hull compactness, centroid, Voronoi space control, pressing (opponents within 5 m of the ball carrier), distance, high-speed running (≥ 5.5 m/s) and sprints (≥ 7.0 m/s for ≥ 1 s). Every threshold lives in configs/metrics.yaml.',
      },
      {
        title: 'Validate',
        body: 'scripts/validate.py writes reports/validation.json: 22 synthetic cases with known answers (a 5 m/s line for 10 s returns 50.0 m; a 9.15 m-radius circle returns 57.31 m against 57.49 m expected, within 1%), plus 168 real-data checks against ranges from Collins et al. 2025, Gualtieri et al. 2023 and Silva et al. 2024. 146 of the 168 pass. The 22 failures are listed per player (HSR share 12, top speed 5, distance 2, sprints 2, goalkeeper speed 1).',
      },
      {
        title: 'Serve',
        body: 'A Streamlit dashboard reads precomputed parquet files (written at 5 Hz) and computes nothing: pitch snapshot with Voronoi cells and centroid paths, shape time series, and a per-player table showing coverage % next to every physical number. There is no hosted demo by design, because the cache holds Metrica positions the repo does not redistribute. CI runs ruff and the offline pytest suite on every push.',
      },
    ],
    highlights: [
      'Coverage rule: distance, HSR and sprints are reported only for players tracked in at least 95% of the match’s frames, since a lower total is an undercount that looks like a real number. No SkillCorner player qualifies (best tracked: 78.7–82.5% of frames), so they get shape, space and pressing but no physical totals.',
      'Sensitivity sweep on Metrica match 1: smoothing windows of 11–31 frames move sprint count 9% and distance 1%, but the sprint speed threshold (6.5–8.0 m/s) moves sprint count 138% (37 to 312 sprints across the grid). The definition is reported with the number.',
      'Failures kept visible: 22 of 168 real-data checks fail and are reported per player with causes (low-intensity centre-backs, a faster Metrica match, tracking artefacts at the 12 m/s clip ceiling), instead of widening bands to get a green run.',
    ],
  },
  {
    slug: 'football-team-tracker',
    index: '05',
    name: 'Football Team Tracker',
    category: 'VIDEO TRACKING',
    tagline: 'Player tracking and team assignment from broadcast video',
    description:
      'Follows every player in a football broadcast with a fixed ID, splits them into two teams by shirt colour, and measures how much tracking quality the detector costs.',
    summary:
      'A computer-vision pipeline that follows each player in broadcast football video with a fixed tracker ID and assigns teams by shirt colour, abstaining when unsure. Seven trackers are scored on SoccerNet-Tracking twice, on perfect boxes and on my own detector, so the cost of imperfect detection is measured rather than guessed. Tuned on validation clips only; the 49-clip test split was run once.',
    diagram: 'footballtracker',
    tech: ['Python 3.13', 'Ultralytics YOLO26', 'BoT-SORT', 'OpenCV', 'KMeans', 'TrackEval', 'Docker', 'GitHub Actions', 'ZeroGPU'],
    metrics: ['HOTA 84.2 oracle → 63.6 real', '99.0% team accuracy', '7 trackers benchmarked'],
    results: {
      title: 'Headline result',
      rows: [
        ['Best tracker', 'BoT-SORT with camera-motion compensation'],
        ['HOTA with perfect boxes (oracle)', '84.2'],
        ['HOTA with my detector', '63.6 (59.0 with my first detector)'],
        ['Players given the correct team', '99.0%'],
        ['Test set', 'SoccerNet-Tracking test split, 49 clips, run once'],
      ],
      caption:
        'Scored with my own thin wrapper around TrackEval, persons only, so these numbers are not directly comparable to the SoccerNet leaderboard.',
    },
    githubUrl: 'https://github.com/Kushagra077/football-team-tracker',
    demoUrl: 'https://huggingface.co/spaces/Kushagra77/football-detect-serve',
    steps: [
      {
        title: 'Detect',
        body: 'My custom YOLO26 nano detector (v6, 1280 px) from football-detect-serve finds players, goalkeepers and referees; ball detections are dropped. It runs at confidence 0.1 so the tracker’s second pass can use weak boxes. Four detector versions were compared: v6 gained 4.6 HOTA over the first (59.0 to 63.6) and had 32% fewer ID switches.',
      },
      {
        title: 'Track',
        body: 'Ultralytics’ BoT-SORT with camera-motion compensation (GMC) gives each player a fixed ID while they stay in shot. Broadcast cameras pan constantly: on perfect boxes GMC cut ID switches from 3,524 to 1,251, and on my detector’s boxes it added 3.0 HOTA (60.6 to 63.6). IDs still restart at camera cuts; there is no re-identification across shots.',
      },
      {
        title: 'Colour',
        body: 'Each box is cropped to the torso band (15–50% of height), grass pixels are masked by HSV hue, and the rest becomes a 4×6×6 Lab colour histogram. A histogram keeps both stripes of a striped shirt where a mean blends them. Chosen over five alternatives on 46 train clips and confirmed on val (97.5% vs 96.8% for mean Lab); it is worse on dark-blue shirts in shade and blur.',
      },
      {
        title: 'Assign teams',
        body: 'KMeans (k=2, no labels) is fit on the first 50 frames showing at least 3 players. Each track then takes the majority team over a 25-frame window centred on each frame (12 back, 12 forward). On uploaded video, close-ups and colours that fit neither team get no team, and a goalkeeper joins the nearer team by image position or stays unassigned (on test: right 21, wrong 5, unknown 37 of 63).',
      },
      {
        title: 'Export & benchmark',
        body: 'Output is an annotated video plus a schema-validated per-frame Parquet table (frame, track ID, team, role, box, confidence). Seven trackers are scored with TrackEval’s HOTA, CLEAR and Identity classes, with one shared tuned setting chosen on 11 val clips. The detector never trained on any validation or test clip. CI runs ruff, pytest and a Docker build on every push; the Docker image is CPU-only (about 4 fps with v6).',
      },
    ],
    highlights: [
      'The detector is the bottleneck: moving from perfect boxes to my detector costs 15–21 HOTA points across the seven trackers (19–25 with the first detector), e.g. BoT-SORT + GMC 84.2 to 63.6',
      'Appearance ReID was tested and rejected: it lowered HOTA by 1.3 on perfect boxes and 0.8 on real ones, and added ID switches (tested with the first detector, not re-run with v6)',
      'A centred temporal vote lifted team accuracy to 99.0% (98.5% without it) and cut label flips by 81%, 3,065 to 570; the earlier backward-only vote was no better than no vote, so it was replaced',
    ],
  },
];

/** "Watch demo" for video links, "Live demo" for hosted apps. */
export function demoLabel(url: string) {
  return /youtu\.?be/.test(url) ? 'Watch demo' : 'Live demo';
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// ---------------- Skills ----------------

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { label: 'Languages & Data', skills: ['Python', 'SQL'] },
  {
    label: 'Core ML / DL',
    skills: [
      'Machine Learning', 'Deep Learning', 'Computer Vision', 'Object Detection and Tracking', 'OCR', 'NLP',
      'Fine-Tuning (LoRA/QLoRA)', 'Model Optimization', 'Quantization', 'Evals',
    ],
  },
  {
    label: 'LLMs & Generative AI',
    skills: [
      'LLMs', 'VLMs', 'Generative AI', 'Agentic AI', 'Multi-Agent Systems', 'RAG', 'Prompt Engineering',
      'Embeddings', 'Multimodal AI',
    ],
  },
  {
    label: 'Frameworks & Libraries',
    skills: [
      'PyTorch', 'Ultralytics (YOLO)', 'OpenCV', 'Hugging Face', 'scikit-learn', 'NumPy', 'Pandas', 'LangChain',
      'LangGraph', 'CrewAI', 'LangSmith', 'Pydantic', 'Flask', 'FastAPI', 'Streamlit', 'Gradio', 'pytest',
      'PaddleOCR', 'EasyOCR', 'Tesseract', 'TrackEval',
    ],
  },
  { label: 'LLM APIs', skills: ['Azure OpenAI API', 'Gemini', 'Groq', 'LiteLLM'] },
  { label: 'Vector Stores', skills: ['ChromaDB', 'pgvector', 'Pinecone'] },
  {
    label: 'MLOps & Deployment',
    skills: [
      'Docker', 'ONNX Runtime', 'MLflow', 'Weights & Biases', 'Locust', 'GitHub Actions', 'Hugging Face Spaces',
      'Git/GitHub',
    ],
  },
];

// ---------------- Experience ----------------

export interface PositionSection {
  title?: string;
  bullets: string[];
}

export interface Position {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  /** Short version shown on the timeline card. */
  summary: string;
  /** Longer version, shown under "Details". */
  sections: PositionSection[];
  tech: string[];
}

export const positions: Position[] = [
  {
    role: 'Software Engineer - AI',
    company: 'TSS Consultancy Pvt Ltd',
    period: '03/2026 — Present',
    location: 'Rajkot, India',
    current: true,
    summary:
      'I improve and extend TSS’s production identity-document AI: I built a passive liveness-detection model (89% average accuracy on held-out benchmarks), raised photo-match and document-extraction accuracy through pre- and post-processing fixes without retraining, and fine-tune models as new data arrives.',
    sections: [
      {
        title: 'Passive liveness detection',
        bullets: [
          'Built a liveness model that needs no user action. It is trained to reject poster, 2D-mask, cropped-face and replay attacks, and their variants.',
          'Training data came from many open sources, covering real faces and spoof attacks captured on phones, webcams and tablets, plus some data I built in-house. Mixing sources on purpose kept the model from overfitting to one camera or dataset.',
          'Held out several open datasets that never entered training (their samples were too few to train on). The model reached 89% average accuracy across them; on a validation split from the training sources it scored 93%. I treat 89% as the honest number because those datasets were unseen.',
          'About 0.5s inference, serving about 1,000 requests per day while a client used it. I chose an offline, in-house model over a third-party liveness API for data privacy.',
          'After launch I tracked the success/fail ratio, reviewed failed cases to check for data drift, and kept adding real-world data from open sources. It took about six months from first commit to users.',
        ],
      },
      {
        title: 'Photo match and document extraction',
        bullets: [
          'Raised photo-match accuracy by 2 points at the 65 threshold and 4 points at the 70 threshold on our in-house benchmark. The gain came from code: better pre- and post-processing, with no retraining.',
          'Raised overall extraction accuracy across Aadhaar, PAN, Voter and Passport by about 2% (relative). Each document has its own extraction rules, so some fields improved and others stayed the same.',
          'Found and fixed a date-of-birth bug on UK and US passports: the two countries use a different date format, and extraction dropped the day and month and returned only the year. Verified the fix on thousands of synthetic passport samples (no real data, so I do not quote a real-world accuracy).',
        ],
      },
      {
        title: 'Aadhaar-number masking',
        bullets: [
          'Fine-tuned the model that auto-redacts Aadhaar numbers on document images, using newly collected data. More benchmark samples are now handled correctly.',
        ],
      },
    ],
    tech: ['Computer Vision', 'Anti-Spoofing', 'Fine-Tuning', 'Pre/Post-Processing', 'PyTorch', 'ONNX', 'Flask', 'Python'],
  },
  {
    role: 'Associate Software Engineer - AI',
    company: 'TSS Consultancy Pvt Ltd',
    period: '01/2024 — 02/2026',
    location: 'Rajkot, India',
    summary:
      'Joined a three-person KYC-AI team and built the document classification, detection and field-extraction models behind a production API (98.92% accuracy on an in-house benchmark, about 50K requests per day), plus a deepfake detector and several fine-tuning PoCs.',
    sections: [
      {
        title: 'Identity-document classification and detection',
        bullets: [
          'Started on a very new three-person team. The first task was classifying a document image as Aadhaar, PAN, Voter, Passport, driving licence and so on.',
          'First fine-tuned several Vision Transformer models from Hugging Face. They were accurate but too heavy to run on CPU at production latency.',
          'Moved to a small YOLO model chosen to run on CPU, offline, with low latency: fine-tuned it, exported it to ONNX and wrote a custom inference pipeline.',
          'Also trained a detection model that classifies and crops the ID in one step, and a field-detection model that finds boxes for name, date of birth and gender. A LayoutLM attempt to do all of it at once did not work, so I dropped it.',
          'Result: 98.92% accuracy on a ~3K-image in-house benchmark that covers every input type we label. The API serves about 50K requests per day on average, with about 0.5s model inference and about 1.5s end-to-end latency.',
        ],
      },
      {
        title: 'Aadhaar field extraction',
        bullets: [
          'Compared EasyOCR, PaddleOCR and Tesseract, and chose PaddleOCR. Wrote the regex parsing for name, date of birth, gender and address, then replaced position guessing with the field-detection model above.',
          'About 94% field accuracy at build time. The pipeline has improved since, so this is a historical number.',
        ],
      },
      {
        title: 'Photo match',
        bullets: [
          'Built the first version of the face-match service (is this the same person in two photos?) using open-source models, including DeepFace and Siamese-network approaches, on a CNN-based model.',
        ],
      },
      {
        title: 'Deepfake detection',
        bullets: [
          'Built a deepfake detector that reached 92% accuracy on test data curated from open-source datasets, with about 1s inference. Exported to ONNX and served as a Dockerized API. It is deployed, but no client uses it.',
        ],
      },
      {
        title: 'LLM and VLM fine-tuning PoCs',
        bullets: [
          'Driving-licence extraction with VLMs: licences come in many layouts. I fine-tuned Llama 3.2 11B Vision and LLaVA-Llama3 8B using QLoRA and Unsloth. They reached about 90% on our test set, but I did not ship them because of latency. A small driving-licence classifier I built for the same problem is in production.',
          'Address parsing with small LLMs: fine-tuned Llama-3.2-1B and Phi-3 with LoRA to turn free-text addresses into structured fields. The models were too large for the use case, so I stopped the PoC.',
        ],
      },
      {
        title: 'Multilingual OCR PoC',
        bullets: [
          'Working alone, built a PoC for text in several Indian languages (English, Hindi, Gujarati, Bengali, Tamil, Telugu, Kannada and more): a text detector, a script classifier and a recognizer per language. It reached about 90% word-level accuracy on clean images, measured against ground-truth words. The business did not need it at the time, so it was dropped and never shipped.',
        ],
      },
    ],
    tech: ['Computer Vision', 'OCR', 'YOLO', 'ONNX', 'Deepfake Detection', 'Docker', 'LoRA / QLoRA', 'Hugging Face', 'PaddleOCR'],
  },
  {
    role: 'Research Intern',
    company: 'TSS Consultancy Pvt Ltd',
    period: '11/2022 — 08/2023',
    location: 'Remote',
    summary:
      'Prototyped NLP and computer-vision solutions with Azure OpenAI and built the data pipelines to move them toward production.',
    sections: [
      {
        bullets: [
          'Prototyped AI solutions across NLP and computer vision: sentiment analysis, named-entity recognition (NER), face matching and automated data extraction, using Azure OpenAI.',
          'Built data pipelines and worked with the research and engineering teams to move models from prototype to production.',
        ],
      },
    ],
    tech: ['NLP', 'NER', 'Azure OpenAI', 'Siamese Networks', 'Python'],
  },
];

// ---------------- Education ----------------

export const education = {
  degree: 'B.Tech, Computer Engineering (Specialization in Artificial Intelligence)',
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
  /** Authorship and venue detail line. */
  detail?: string;
  doi?: string;
  url?: string;
}

export interface Patent {
  title: string;
  number: string;
  status: 'Granted' | 'Published';
  role: string;
  description: string;
  /** YouTube video id — renders an inline "Watch demo" player on the patent card. */
  demoVideoId?: string;
}

export const papers: Paper[] = [
  {
    title: 'Barcode and QR Code Object Detection: An Experimental Study on YOLOv8 Models',
    venue: 'INNOCOMP 2024 · IEEE',
    year: '2024',
    detail:
      'First of six authors · INNOCOMP 2024 (International Conference on Emerging Innovations and Advanced Computing), Sonipat, 25–26 May 2024',
    doi: '10.1109/INNOCOMP63224.2024.00127',
    summary:
      'Evaluated YOLOv8 nano/small/medium for barcode & QR detection; the small model reached 97.1% accuracy.',
    url: 'https://ieeexplore.ieee.org/document/10664098',
  },
  {
    title:
      'Enhancing DNA Sequence Classification Through Machine Learning: A Comparative Study on Human and Chimpanzee Genomic Data',
    venue: 'Global AI Summit · IEEE',
    year: '2024',
    detail:
      'First of six authors · 2024 International Conference on Artificial Intelligence and Emerging Technology (Global AI Summit), Greater Noida, 4–6 September 2024',
    doi: '10.1109/GlobalAISummit62156.2024.10947774',
    summary:
      'Compared nine ML algorithms with k-mer features; Naïve Bayes reached 99% accuracy on human DNA.',
    url: 'https://ieeexplore.ieee.org/abstract/document/10947774',
  },
];

export const patents: Patent[] = [
  {
    title: 'Navigational Aid Device for Visually Impaired Individuals',
    number: '202421033107',
    status: 'Granted',
    role: 'Lead inventor',
    description: 'A device that helps visually impaired people navigate their surroundings safely.',
  },
  {
    title: 'System and Method for Translating Sign Language into Spoken Language',
    number: '202421033112',
    status: 'Published',
    role: 'Lead inventor',
    description: 'An application that lets deaf and mute individuals communicate in their own language.',
    demoVideoId: '9uLNXZF47R4',
  },
  {
    title: 'Real-Time Detection of Manipulated Digital Images Using AI',
    number: '202421033396',
    status: 'Published',
    role: 'Co-inventor',
    description: 'Detects deepfake / manipulated images in real time to help prevent fraud.',
  },
  {
    title: 'Advanced Myoelectric Prosthetic Arm with Integrated Sensory Feedback',
    number: '202421033382',
    status: 'Published',
    role: 'Lead inventor',
    description: 'A prosthetic arm with motor-controlled joints that restores day-to-day function.',
  },
];
