import { projects } from "@/data/projects";

export type EngineeringEvidenceKind =
  | "case-study"
  | "source"
  | "diagram"
  | "adr"
  | "journal"
  | "test"
  | "security-test"
  | "debugging-story"
  | "video"
  | "benchmark"
  | "deployment";

export interface EngineeringEvidenceLink {
  label: string;
  href: string;
  kind: EngineeringEvidenceKind;
}

export interface EngineeringConcept {
  title: string;
  summary: string;
  whyItMatters?: string;
  /** Where this was actually applied — only set when real evidence backs it. */
  projectApplication?: string;
  evidence?: EngineeringEvidenceLink[];
}

export interface EngineeringTopic {
  slug: string;
  title: string;
  /** Short, scannable description used on the index card. */
  summary: string;
  /** Slightly fuller intro paragraph used on the topic page itself. */
  overview: string;
  concepts: EngineeringConcept[];
  /** An honest, specific note on what isn't demonstrated here yet. */
  stillLearning?: string;
  /** References Project.slug in data/projects.ts — resolved at render time. */
  relatedProjectSlugs?: string[];
}

export const engineeringTopics: EngineeringTopic[] = [
  {
    slug: "programming",
    title: "Programming",
    summary:
      "Core programming, data structures, algorithms, complexity, object-oriented design, patterns, and code quality.",
    overview:
      "Core programming, data structures, algorithms, complexity, object-oriented design, patterns, and code quality. This section focuses on how those fundamentals actually show up in production code, and is being expanded as I document more of it directly against VentureGPS and Economic Intelligence.",
    concepts: [
      {
        title: "Complexity and Data Structure Tradeoffs",
        summary:
          "Every data structure is a tradeoff: an array gives fast iteration and slow arbitrary insertion; a hash map gives near-constant lookup at the cost of ordering. Reasoning about Big-O complexity is how those tradeoffs get evaluated before they become a production problem.",
        whyItMatters:
          "The right data structure, chosen early, prevents a system from degrading as real data volume grows; the wrong one is often invisible until it doesn't scale.",
      },
    ],
    stillLearning:
      "I'm expanding this section with concrete examples pulled directly from VentureGPS and Economic Intelligence as I document them, rather than general data-structure theory alone.",
  },
  {
    slug: "backend",
    title: "Backend Engineering",
    summary:
      "HTTP, APIs, request lifecycles, validation, error handling, service boundaries, concurrency, caching, queues, and backend architecture.",
    overview:
      "HTTP, APIs, request lifecycles, validation, error handling, service boundaries, concurrency, caching, queues, and backend architecture. Economic Intelligence's FastAPI backend and VentureGPS's backend API are where I've applied these ideas most directly so far.",
    concepts: [
      {
        title: "Request → Validation → Domain → Persistence Flow",
        summary:
          "A backend request typically moves through distinct layers: an API layer that accepts the request, validation that rejects malformed input early, domain logic that performs the actual calculation or decision, and a persistence layer that reads or writes durable state.",
        whyItMatters:
          "Keeping these layers separate means domain logic can be tested without a database or an HTTP request in the picture, and a change to one layer doesn't ripple through the others.",
        projectApplication:
          "Economic Intelligence's FastAPI backend is organized around exactly this separation: an API layer, a services layer, repositories, Pydantic models for validation, and pure domain functions for the actual transformations and comparisons.",
        evidence: [
          {
            label: "Economic Intelligence — Architecture",
            href: "/projects/economic-intelligence#architecture",
            kind: "case-study",
          },
        ],
      },
      {
        title: "Explicit Error Mapping at Service Boundaries",
        summary:
          "A backend that depends on a database and external APIs has several distinct ways to fail. Mapping each failure class to specific, categorized handling — instead of letting a generic exception surface — keeps the system's behavior predictable and testable.",
        whyItMatters:
          "Unhandled or uncategorized errors surface as inconsistent, unhelpful responses and make failure modes hard to reason about.",
        projectApplication:
          "Economic Intelligence explicitly maps FRED authentication/provider failures, database operational errors, integrity conflicts, generic SQLAlchemy failures, and invalid input to specific handling rather than a generic 500.",
        evidence: [
          {
            label: "Economic Intelligence — Engineering Decisions",
            href: "/projects/economic-intelligence#engineering-decisions",
            kind: "case-study",
          },
        ],
      },
      {
        title: "Treating an External-Input Endpoint as an Explicit API Boundary",
        summary:
          "An endpoint that accepts external input — a URL, a file, a webhook — is a boundary the rest of the system depends on to behave correctly, not just another route.",
        whyItMatters:
          "Backend architecture decisions — what gets validated, what gets fetched, what the endpoint is allowed to do — determine whether that boundary is trustworthy.",
        projectApplication:
          "VentureGPS accepts a startup's website URL through its authenticated POST /analyze endpoint and retrieves it through a dedicated, SSRF-hardened fetcher rather than an open fetch — the same fetcher its Evidence Engine v1 reuses unchanged.",
        evidence: [
          {
            label: "VentureGPS — Architecture",
            href: "/projects/venturegps#architecture",
            kind: "case-study",
          },
        ],
      },
    ],
    stillLearning:
      "I'm continuing to deepen this section with concurrency, caching, and queueing patterns as I build systems that need them.",
    relatedProjectSlugs: ["economic-intelligence", "venturegps"],
  },
  {
    slug: "databases",
    title: "Databases",
    summary:
      "Relational modeling, SQL, constraints, transactions, indexing, migrations, consistency, query design, and persistence.",
    overview:
      "Relational modeling, SQL, constraints, transactions, indexing, migrations, consistency, query design, and persistence. Economic Intelligence's PostgreSQL and SQLAlchemy layer is where I've applied these ideas most directly.",
    concepts: [
      {
        title: "Relational Modeling for Structured, Related Data",
        summary:
          "Economic-series observations and their metadata have structured relationships — a series has many observations, each tied to a specific date — which is exactly the shape relational modeling is built for.",
        whyItMatters:
          "Modeling those relationships explicitly, with durable persistence and integrity constraints, is what makes the data trustworthy enough to build deterministic analysis on top of.",
        projectApplication:
          "Economic Intelligence persists series and observations in PostgreSQL via SQLAlchemy, with the relationships and constraints enforced at the database layer, not just in application code.",
        evidence: [
          {
            label: "Economic Intelligence — System Overview",
            href: "/projects/economic-intelligence#system-overview",
            kind: "case-study",
          },
        ],
      },
      {
        title: "Uniqueness Constraints as a Boundary Guarantee",
        summary:
          "A unique constraint on (series_id, date) prevents duplicate observations at the database boundary — a guarantee the database enforces regardless of what the application code does or forgets to check.",
        whyItMatters:
          "Pushing an invariant like uniqueness down to the database means it holds even if application-level validation has a bug, which application code alone can't guarantee.",
        projectApplication:
          "Economic Intelligence enforces a unique constraint on (series, observation date) to keep synchronized observations free of duplicates.",
        evidence: [
          {
            label: "Economic Intelligence — System Overview",
            href: "/projects/economic-intelligence#system-overview",
            kind: "case-study",
          },
        ],
      },
      {
        title: "Schema Evolution With Migrations",
        summary:
          "A database schema changes over time as an application's needs change; migrations — rather than manual, ad hoc schema edits — keep that change tracked, reviewable, and repeatable across environments.",
        whyItMatters:
          "Untracked schema drift between environments is a common source of bugs that only show up in production.",
        projectApplication:
          "Economic Intelligence uses Alembic to manage schema migrations against its PostgreSQL database.",
        evidence: [
          {
            label: "Economic Intelligence — System Overview",
            href: "/projects/economic-intelligence#system-overview",
            kind: "case-study",
          },
        ],
      },
      {
        title: "Repositories: Separating Persistence From Domain Logic",
        summary:
          "A repository layer abstracts how data is actually stored and queried, so the domain logic that performs calculations doesn't need to know it's talking to PostgreSQL specifically.",
        whyItMatters:
          "That separation is what makes domain functions testable in isolation — a pure transformation function doesn't need a real database to verify it's correct.",
        projectApplication:
          "Economic Intelligence's layered architecture keeps repositories separate from the pure domain functions that perform transformations and comparisons.",
        evidence: [
          {
            label: "Economic Intelligence — Architecture",
            href: "/projects/economic-intelligence#architecture",
            kind: "case-study",
          },
        ],
      },
    ],
    stillLearning:
      "Indexing strategy, query performance, and transaction-isolation tradeoffs aren't documented yet for either project — I'm not going to claim optimization work that hasn't happened.",
    relatedProjectSlugs: ["economic-intelligence"],
  },
  {
    slug: "networking",
    title: "Networking",
    summary:
      "DNS, TCP/IP, HTTP/HTTPS, TLS, ports, proxies, load balancers, CDNs, and how requests move through systems.",
    overview:
      "DNS, TCP/IP, HTTP/HTTPS, TLS, ports, proxies, load balancers, CDNs, and how requests move through systems.",
    concepts: [
      {
        title: "HTTP as a Request/Response Contract",
        summary:
          "HTTP defines a contract: a client sends a request with a method, headers, and optionally a body; a server returns a status code and a response. Every backend API is built on top of that contract.",
        whyItMatters:
          "Understanding the contract — status codes, headers, idempotency — makes it possible to reason about caching, retries, and failure behavior anywhere HTTP is used, independent of any particular framework.",
      },
    ],
    stillLearning:
      "TLS, proxies, load balancers, and CDNs aren't demonstrated in a project yet — this section will grow as I work with them directly rather than describing them abstractly.",
  },
  {
    slug: "systems",
    title: "Systems",
    summary:
      "Processes, threads, memory, files, operating systems, Linux, concurrency, resource management, and runtime behavior.",
    overview:
      "Processes, threads, memory, files, operating systems, Linux, concurrency, resource management, and runtime behavior.",
    concepts: [
      {
        title: "Processes vs. Threads",
        summary:
          "A process has its own isolated memory space; threads within a process share memory and can run concurrently, which makes them cheaper to create but introduces the need to reason about race conditions and synchronization.",
        whyItMatters:
          "Concurrency bugs are some of the hardest to reproduce and debug — understanding the process/thread model is worth doing before writing concurrent code, not after a production incident.",
      },
    ],
    stillLearning:
      "I haven't yet built something that required deliberately reasoning about concurrency or resource limits under load — that's a deliberate next step, not something I'm claiming here.",
  },
  {
    slug: "security",
    title: "Security",
    summary:
      "Authentication, authorization, input validation, secrets, SSRF, injection, least privilege, trust boundaries, and secure design.",
    overview:
      "Authentication, authorization, input validation, secrets, SSRF, injection, least privilege, trust boundaries, and secure design. VentureGPS's website-ingestion boundary and Economic Intelligence's secret handling are where I've applied these ideas most directly.",
    concepts: [
      {
        title: "SSRF as a Threat Model for Server-Side Fetching",
        summary:
          "Any endpoint that fetches a URL supplied by a user, on the server, can potentially be abused to reach internal services, cloud metadata endpoints, or other network resources that were never meant to be reachable from outside.",
        whyItMatters:
          "SSRF is easy to miss because the endpoint \"just fetches a webpage\" — the risk isn't in what the feature does, it's in what the underlying HTTP client is capable of reaching.",
        projectApplication:
          "VentureGPS fetches user-supplied website URLs server-side through an SSRF-hardened fetcher — scheme allow-listing, private/loopback/link-local/cloud-metadata address rejection, DNS-rebinding-safe IP pinning, bounded redirects, and response-size caps — with dedicated security tests around that boundary.",
        evidence: [
          {
            label: "VentureGPS — Engineering Decisions",
            href: "/projects/venturegps#engineering-decisions",
            kind: "case-study",
          },
          {
            label: "VentureGPS — Production Engineering",
            href: "/projects/venturegps#production-engineering",
            kind: "case-study",
          },
        ],
      },
      {
        title: "Secret Handling and Environment Configuration",
        summary:
          "Credentials and API keys belong in untracked, environment-based configuration — never committed to version control — and any credential that does end up in a repository has to be treated as compromised the moment it's exposed, not just quietly replaced.",
        whyItMatters:
          "A leaked key is a real incident regardless of whether it was ever used maliciously; the response is rotate first, investigate after.",
        projectApplication:
          "Economic Intelligence keeps secrets out of version control via an untracked .env file and a committed .env.example template with no real values; its engineering journal records a FRED API key that was exposed in an AI coding assistant's transcript and rotated.",
        evidence: [
          {
            label: "Economic Intelligence — Engineering journal",
            href: "https://github.com/JerrodMcHenry/economic-intelligence/blob/main/docs/ENGINEERING_JOURNAL.md",
            kind: "journal",
          },
        ],
      },
      {
        title: "Not Leaking Internal Failure Detail to Callers",
        summary:
          "When an external dependency — a third-party API, a database — fails, the safest response tells the caller enough to act on, without exposing internal implementation detail, stack traces, or provider-specific error content.",
        whyItMatters:
          "Verbose error responses are a common, low-effort information-disclosure vector — treating error handling as a security boundary, not just a UX concern, closes it.",
        projectApplication:
          "Economic Intelligence maps FRED authentication/provider failures to specific, categorized handling rather than passing the raw provider error through.",
        evidence: [
          {
            label: "Economic Intelligence — Engineering Decisions",
            href: "/projects/economic-intelligence#engineering-decisions",
            kind: "case-study",
          },
        ],
      },
    ],
    stillLearning:
      "Authentication and authorization for multi-user access control aren't demonstrated in either project yet — both are currently single-tenant systems without a login boundary to secure.",
    relatedProjectSlugs: ["venturegps", "economic-intelligence"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    summary:
      "Deployment, CI/CD, containers, cloud infrastructure, environments, configuration, observability, reliability, and operational concerns.",
    overview:
      "Deployment, CI/CD, containers, cloud infrastructure, environments, configuration, observability, reliability, and operational concerns. VentureGPS runs GitHub Actions CI on every push and pull request to main, with its Next.js frontend on Vercel and its FastAPI backend and PostgreSQL database on Render; Economic Intelligence packages its API and frontend into one Docker image that CI builds, migrates, boots in production mode, and checks for fail-closed behavior, though it hasn't been deployed. This section stays close to what's actually verifiable.",
    concepts: [
      {
        title: "Static-First Build and Deployment",
        summary:
          "A site that can be fully prerendered at build time — rather than rendered per request — has a simpler, more reliable deployment story: the build either succeeds and produces static output, or it fails before anything ships.",
        whyItMatters:
          "Static generation removes an entire class of runtime failure — a server crashing mid-request — for pages that don't need per-request data.",
        projectApplication:
          "This portfolio itself is built this way: every route, including both case studies and all nine engineering topic pages, is statically generated at build time via Next.js's generateStaticParams, with no backend or database involved.",
      },
    ],
    stillLearning:
      "VentureGPS demonstrates CI and a managed-platform deployment (Vercel and Render); Economic Intelligence demonstrates a CI-validated container image but hasn't been deployed. Neither uses container orchestration, and I'm not going to paper over those gaps with invented infrastructure.",
  },
  {
    slug: "system-design",
    title: "System Design",
    summary:
      "Requirements, architecture, scalability, availability, caching, queues, databases, distributed systems, tradeoffs, and failure handling.",
    overview:
      "Requirements, architecture, scalability, availability, caching, queues, databases, distributed systems, tradeoffs, and failure handling.",
    concepts: [
      {
        title: "Tradeoffs Over Templates",
        summary:
          "There's rarely a single \"correct\" architecture — a caching layer that helps one system adds unnecessary complexity to another. Good system design starts from actual requirements (read/write patterns, consistency needs, failure tolerance) rather than defaulting to whatever pattern is trending.",
        whyItMatters:
          "Architecture decisions made without grounding them in real requirements tend to either over-engineer a simple problem or under-engineer a hard one.",
      },
      {
        title: "Sequencing Architecture Decisions for Correctness",
        summary:
          "Sometimes the right system-design decision is about order, not just structure: which part of a system needs to be proven correct before another, more visible layer gets built on top of it.",
        whyItMatters:
          "Building a flashier feature before its foundation is verified means any bug in the foundation stays invisible until it's already influencing something users see.",
        projectApplication:
          "Economic Intelligence learned this the hard way: its first AI design — dynamic tool calling — was built early, failed its own acceptance gate, and was reverted. AI returned only as a narrow Analyst layered on top of already-computed deterministic results, with no tools and no database access.",
        evidence: [
          {
            label: "Economic Intelligence — AI Engineering",
            href: "/projects/economic-intelligence#ai-engineering",
            kind: "case-study",
          },
        ],
      },
    ],
    stillLearning:
      "Distributed-systems concerns — multi-node consistency, partitioning, distributed failure handling — aren't demonstrated in either project, both of which are currently single-instance systems.",
    relatedProjectSlugs: ["economic-intelligence"],
  },
  {
    slug: "ai-engineering",
    title: "AI Engineering",
    summary:
      "Deterministic vs probabilistic systems, LLM integration, structured outputs, validation, RAG, agents, tool permissions, evaluation, observability, cost, latency, and failure containment.",
    overview:
      "Deterministic vs probabilistic systems, LLM integration, structured outputs, validation, RAG, agents, tool permissions, evaluation, observability, cost, latency, and failure containment. This is the philosophy behind both VentureGPS and Economic Intelligence's AI usage, not a general AI-engineering survey.",
    concepts: [
      {
        title: "Deterministic Core, Probabilistic Assistance",
        summary:
          "Deterministic software owns calculations, validation, scoring, permissions, state transitions, canonical business logic, and security boundaries. AI may assist with bounded, probabilistic work — extraction, explanation, summarization, classification, interpretation, recommendations — but doesn't get to own correctness-critical behavior.",
        whyItMatters:
          "An LLM is non-deterministic by construction; putting it in control of something that must be correct and reproducible — a score, a permission check, a financial calculation — means the system's correctness now depends on something that can't guarantee it.",
        projectApplication:
          "VentureGPS's Evidence Engine v1 lets AI research companies and propose source-grounded claims, while deterministic code validates those claims and computes every pillar score, Coverage and Confidence figure, and publish/withhold decision — an architecture built after its earlier engine showed that LLM-generated numeric judgments could survive without supporting evidence. Economic Intelligence keeps all economic calculations, validation, and canonical state deterministic, and its implemented LLM Analyst can only explain results the deterministic layer already computed.",
        evidence: [
          {
            label: "VentureGPS — AI Engineering",
            href: "/projects/venturegps#ai-engineering",
            kind: "case-study",
          },
          {
            label: "Economic Intelligence — AI Engineering",
            href: "/projects/economic-intelligence#ai-engineering",
            kind: "case-study",
          },
        ],
      },
      {
        title: "AI Output Isn't a Security Boundary",
        summary:
          "AI output has to be validated before it's allowed to influence a deterministic system — it can't be trusted as an authority, and a prompt can't be relied on as the thing standing between an application and unsafe behavior.",
        whyItMatters:
          "Treating an LLM's output as already-safe or already-correct is how probabilistic behavior quietly becomes a security or correctness hole.",
        projectApplication:
          "Both VentureGPS and Economic Intelligence keep deterministic rules outside of prompts entirely, rather than asking the model to enforce them.",
        evidence: [
          {
            label: "Economic Intelligence — AI Engineering",
            href: "/projects/economic-intelligence#ai-engineering",
            kind: "case-study",
          },
        ],
      },
      {
        title: "Graceful Degradation Without the AI Layer",
        summary:
          "If the AI layer disappears — the provider is down, the call fails, the feature is disabled — the deterministic parts of the system should stay correct and usable.",
        whyItMatters:
          "A system that silently depends on AI for correctness, not just for a nice-to-have feature, has a hidden availability and correctness dependency on a third-party service.",
        projectApplication:
          "Economic Intelligence's deterministic core doesn't depend on AI being present at all; without provider configuration, its Analyst reports itself unavailable and every page still renders from deterministic data.",
        evidence: [
          {
            label: "Economic Intelligence — AI Engineering",
            href: "/projects/economic-intelligence#ai-engineering",
            kind: "case-study",
          },
        ],
      },
    ],
    stillLearning:
      "Economic Intelligence's Analyst has only a small, 15-case documented evaluation so far. VentureGPS's case study documents its staged live evaluations and a measured production latency, but per-analysis token and cost instrumentation and a repeatable evaluation dataset are still open gaps.",
    relatedProjectSlugs: ["venturegps", "economic-intelligence"],
  },
];

export function getEngineeringTopic(slug: string): EngineeringTopic | undefined {
  return engineeringTopics.find((topic) => topic.slug === slug);
}

export function getRelatedProjects(topic: EngineeringTopic) {
  const slugs = topic.relatedProjectSlugs ?? [];
  return projects.filter((project) => slugs.includes(project.slug));
}
