export interface CaseStudySection {
  /** Must match the `id` used by the corresponding <CaseStudySection> in the MDX content. */
  id: string;
  title: string;
}

export interface EvidenceLink {
  label: string;
  href: string;
  kind: "repository" | "live" | "documentation" | "diagram" | "tests" | "video";
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  themes: string[];
  /** Case-study route for this project. */
  href: string;
  /** Only populated once a real, verified URL exists. */
  repositoryUrl?: string;
  liveUrl?: string;
  /** Only populated once a verified project status exists. */
  status?: string;
  /** Ordered table of contents for the case-study page. */
  caseStudySections: CaseStudySection[];
  /** Only real, verified links belong here — never invented. */
  evidenceLinks: EvidenceLink[];
}

const standardCaseStudySections: CaseStudySection[] = [
  { id: "executive-overview", title: "Executive Overview" },
  { id: "system-overview", title: "System Overview" },
  { id: "architecture", title: "Architecture" },
  { id: "engineering-decisions", title: "Engineering Decisions" },
  { id: "production-engineering", title: "Production Engineering" },
  { id: "ai-engineering", title: "AI Engineering" },
  { id: "failures-debugging", title: "Real Failures & Debugging" },
  { id: "scaling-evolution", title: "Scaling & Evolution" },
  { id: "evidence", title: "Evidence" },
];

export const projects: Project[] = [
  {
    slug: "venturegps",
    name: "VentureGPS",
    tagline: "Evidence-first, AI-assisted startup due diligence",
    summary:
      "A production Next.js and FastAPI application whose Evidence Engine v1 lets AI research companies and propose source-grounded claims, while deterministic code validates every claim, computes Evidence Coverage and Confidence, and withholds assessments the evidence can't support — with no overall company score.",
    themes: [
      "Evidence-first AI architecture",
      "Source-grounded claim validation",
      "Deterministic scoring & withholding",
      "FastAPI + PostgreSQL + Next.js",
      "Feature-flagged production rollout",
      "SSRF-hardened ingestion",
    ],
    href: "/projects/venturegps",
    repositoryUrl: "https://github.com/JerrodMcHenry/venturegps",
    liveUrl: "https://app.venturegps.ai/",
    caseStudySections: standardCaseStudySections,
    evidenceLinks: [
      {
        label: "GitHub repository",
        href: "https://github.com/JerrodMcHenry/venturegps",
        kind: "repository",
      },
      {
        label: "Live application",
        href: "https://app.venturegps.ai/",
        kind: "live",
      },
      {
        label: "Engineering case study",
        href: "https://github.com/JerrodMcHenry/venturegps/blob/main/docs/portfolio/ENGINEERING_CASE_STUDY.md",
        kind: "documentation",
      },
      {
        label: "Evidence Engine v1 architecture",
        href: "https://github.com/JerrodMcHenry/venturegps/blob/main/docs/portfolio/EVIDENCE_ENGINE_V1_ARCHITECTURE.md",
        kind: "documentation",
      },
      {
        label: "Evidence Engine product integration",
        href: "https://github.com/JerrodMcHenry/venturegps/blob/main/docs/architecture/EVIDENCE_ENGINE_PRODUCT_INTEGRATION.md",
        kind: "documentation",
      },
      {
        label: "Semantic evidence contract",
        href: "https://github.com/JerrodMcHenry/venturegps/blob/main/docs/methodology/SEMANTIC_EVIDENCE_CONTRACT.md",
        kind: "documentation",
      },
      {
        label: "Production smoke test record",
        href: "https://github.com/JerrodMcHenry/venturegps/blob/main/docs/validation/EVIDENCE_V1_PRODUCTION_SMOKE_001.md",
        kind: "documentation",
      },
      {
        label: "Evidence Engine test suite",
        href: "https://github.com/JerrodMcHenry/venturegps/tree/main/app/evidence_engine/tests",
        kind: "tests",
      },
      {
        label: "Semantic-fit tests",
        href: "https://github.com/JerrodMcHenry/venturegps/blob/main/app/evidence_engine/tests/test_semantic_fit.py",
        kind: "tests",
      },
      {
        label: "Retention fail-closed regression tests",
        href: "https://github.com/JerrodMcHenry/venturegps/blob/main/app/tests/test_sie_v2_deterministic_integration.py",
        kind: "tests",
      },
      {
        label: "Product integration tests",
        href: "https://github.com/JerrodMcHenry/venturegps/blob/main/app/tests/test_evidence_v1_integration.py",
        kind: "tests",
      },
      {
        label: "SSRF security tests",
        href: "https://github.com/JerrodMcHenry/venturegps/blob/main/app/tests/test_website_url_security.py",
        kind: "tests",
      },
    ],
  },
  {
    slug: "economic-intelligence",
    name: "Economic Intelligence",
    tagline: "Backend platform for reliable economic data analysis",
    summary:
      "A data-intensive backend built around reliable ingestion, persistence, and deterministic transformation of economic series, with a deliberate boundary between deterministic domain logic and the AI analysis layered on top.",
    themes: [
      "FastAPI + PostgreSQL",
      "SQLAlchemy data layer",
      "External API integration",
      "Deterministic domain logic",
      "Validation & error handling",
      "Architecture documentation",
    ],
    href: "/projects/economic-intelligence",
    caseStudySections: standardCaseStudySections,
    evidenceLinks: [],
  },
];
