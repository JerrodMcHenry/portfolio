export interface CaseStudySection {
  /** Must match the `id` used by the corresponding <CaseStudySection> in the MDX content. */
  id: string;
  title: string;
}

export interface EvidenceLink {
  label: string;
  href: string;
  kind:
    | "repository"
    | "live"
    | "documentation"
    | "diagram"
    | "tests"
    | "ci"
    | "video";
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
    tagline: "Full-stack platform for versioned, explainable economic data",
    summary:
      "A FastAPI, PostgreSQL, and React application that ingests first-party government data, versions every observation for point-in-time replay, and computes all results deterministically — with an optional LLM Analyst that can explain those results but structurally cannot change them. Containerized and validated in CI; not yet deployed.",
    themes: [
      "FastAPI + PostgreSQL + React",
      "Deterministic domain logic",
      "Observation versioning & replay",
      "Bounded LLM Analyst",
      "Docker + GitHub Actions CI",
      "Architecture Decision Records",
    ],
    href: "/projects/economic-intelligence",
    repositoryUrl: "https://github.com/JerrodMcHenry/economic-intelligence",
    caseStudySections: standardCaseStudySections,
    evidenceLinks: [
      {
        label: "GitHub repository",
        href: "https://github.com/JerrodMcHenry/economic-intelligence",
        kind: "repository",
      },
      {
        label: "README",
        href: "https://github.com/JerrodMcHenry/economic-intelligence/blob/main/README.md",
        kind: "documentation",
      },
      {
        label: "Architecture documentation",
        href: "https://github.com/JerrodMcHenry/economic-intelligence/tree/main/docs/architecture",
        kind: "documentation",
      },
      {
        label: "Architecture Decision Records",
        href: "https://github.com/JerrodMcHenry/economic-intelligence/tree/main/docs/adr",
        kind: "documentation",
      },
      {
        label: "ADR-032: Analyst cannot become canonical",
        href: "https://github.com/JerrodMcHenry/economic-intelligence/blob/main/docs/adr/032-analyst-explains-canonical-intelligence-and-cannot-become-it.md",
        kind: "documentation",
      },
      {
        label: "ADR-030: observation versioning and replay",
        href: "https://github.com/JerrodMcHenry/economic-intelligence/blob/main/docs/adr/030-observation-system-time-versioning-and-deterministic-replay.md",
        kind: "documentation",
      },
      {
        label: "Engineering journal",
        href: "https://github.com/JerrodMcHenry/economic-intelligence/blob/main/docs/ENGINEERING_JOURNAL.md",
        kind: "documentation",
      },
      {
        label: "Backend test suite",
        href: "https://github.com/JerrodMcHenry/economic-intelligence/tree/main/tests",
        kind: "tests",
      },
      {
        label: "CI workflow",
        href: "https://github.com/JerrodMcHenry/economic-intelligence/blob/main/.github/workflows/ci.yml",
        kind: "ci",
      },
      {
        label: "Container workflow",
        href: "https://github.com/JerrodMcHenry/economic-intelligence/blob/main/.github/workflows/container.yml",
        kind: "ci",
      },
      {
        label: "Dockerfile",
        href: "https://github.com/JerrodMcHenry/economic-intelligence/blob/main/Dockerfile",
        kind: "ci",
      },
    ],
  },
];
