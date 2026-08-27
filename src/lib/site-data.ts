export type ServiceStatus = "live" | "in-development";

export type Service = {
  slug: string;
  number: string;
  title: string;
  short: string;
  proposition: string;
  summary: string;
  approach: string;
  whoFor: string;
  proof: string;
  seoTitle: string;
  metaDescription: string;
  deliverables: string[];
  engagementFit: string;
  status: ServiceStatus;
};

export const services: Service[] = [
  {
    slug: "systems-architecture",
    number: "01",
    title: "Systems Architecture",
    short: "Make complex technical decisions legible before they become expensive.",
    proposition: "A sound technical foundation before the build begins.",
    summary:
      "Architecture for platforms that need to remain secure, observable, and maintainable as their users and operating constraints grow.",
    approach:
      "We map the system boundary, data flows, integrations, failure modes, and ownership model before recommending a stack. The result is a practical architecture record that developers, operators, and decision-makers can use throughout delivery.",
    whoFor:
      "Organisations planning a mission-critical platform, modernising a fragile system, or preparing for a demanding scale or compliance milestone.",
    proof:
      "The same architecture discipline behind government-adjacent field systems and Bitcoin-native platforms operating in production.",
    seoTitle: "Systems Architecture Services in Kenya",
    metaDescription:
      "Systems architecture consulting in Nairobi for secure platforms, integrations, cloud infrastructure, and technical delivery across Kenya and beyond.",
    deliverables: [
      "System and data architecture",
      "Integration and API strategy",
      "Security and failure-mode review",
      "Delivery roadmap and technical decisions",
    ],
    engagementFit: "Fixed-scope architecture sprint or technical advisory.",
    status: "live",
  },
  {
    slug: "custom-platform-engineering",
    number: "02",
    title: "Custom Platform Engineering",
    short: "Purpose-built web applications for operations that cannot live in spreadsheets.",
    proposition: "Software built around the operation.",
    summary:
      "Secure, maintainable web platforms designed around the actual workflow, data, and accountability requirements of your organisation.",
    approach:
      "We begin with the people doing the work, the records they rely on, and the decisions the platform must support. Product definition, interface design, engineering, deployment, and handover are treated as one delivery problem rather than disconnected phases.",
    whoFor:
      "Programmes, startups, and operational teams that have outgrown off-the-shelf tools or need a platform built around a distinct process.",
    proof:
      "Production field systems supporting millions of recorded tasks across complex programme workflows.",
    seoTitle: "Custom Software Development in Kenya",
    metaDescription:
      "Custom software development in Nairobi for operational web platforms, internal tools, role-based workflows, and data-heavy systems in Kenya and East Africa.",
    deliverables: [
      "Product and workflow definition",
      "Responsive application engineering",
      "Role-based access and auditability",
      "Deployment, monitoring, and handover",
    ],
    engagementFit: "Fixed-scope build followed by an optional support retainer.",
    status: "live",
  },
  {
    slug: "ai-automation",
    number: "03",
    title: "AI Automation",
    short: "Practical agents and workflows that remove repeat work without hiding risk.",
    proposition: "Automation with a clear job and a responsible owner.",
    summary:
      "AI-assisted operations designed with human review, measurable outcomes, and explicit boundaries around sensitive decisions.",
    approach:
      "We identify a repeatable workflow, establish the source material and decision boundaries, then test whether automation improves time, consistency, or service quality. Human review, audit trails, and exception handling are designed in before the workflow reaches production.",
    whoFor:
      "Teams with repetitive information work, fragmented internal knowledge, or high-volume processes that still depend on manual coordination.",
    proof:
      "Automation patterns grounded in production operations, with clear review points and measurable outputs.",
    seoTitle: "AI Automation Services in Kenya",
    metaDescription:
      "AI automation and workflow engineering in Nairobi for document processing, internal knowledge, operations, and human-reviewed business processes.",
    deliverables: [
      "Workflow and opportunity mapping",
      "Agent and retrieval architecture",
      "Human-in-the-loop controls",
      "Monitoring and evaluation plan",
    ],
    engagementFit: "Discovery sprint, fixed-scope implementation, or iterative retainer.",
    status: "live",
  },
  {
    slug: "data-platforms",
    number: "04",
    title: "Data Platforms & Integrations",
    short: "Reliable data movement across field tools, databases, APIs, and reports.",
    proposition: "Operational data people can trust and use.",
    summary:
      "Data systems that make operational information trustworthy, queryable, and available where decisions are made.",
    approach:
      "We trace data from collection to decision, document where quality breaks down, and design the smallest reliable path between systems. Validation, reconciliation, access controls, and monitoring are part of the integration, not follow-up tasks.",
    whoFor:
      "Organisations managing fragmented datasets, manual reporting chains, or integrations that fail silently.",
    proof:
      "Data architecture informed by high-volume programme workflows and real-world connectivity constraints.",
    seoTitle: "Data Integration Services in Kenya",
    metaDescription:
      "Data platform and API integration services in Nairobi for field tools, databases, reporting workflows, migrations, and operational dashboards.",
    deliverables: [
      "Data model and migration plan",
      "API and system integrations",
      "Validation and reconciliation workflows",
      "Operational dashboards and reporting",
    ],
    engagementFit: "Fixed-scope integration or phased data-platform engagement.",
    status: "live",
  },
  {
    slug: "cloud-infrastructure",
    number: "05",
    title: "Cloud & Platform Infrastructure",
    short: "Deployment foundations that are observable, recoverable, and owned by the client.",
    proposition: "Infrastructure your team can operate and recover.",
    summary:
      "Cloud, container, and deployment architecture designed for predictable operations rather than infrastructure novelty.",
    approach:
      "We assess the application, traffic, data sensitivity, recovery needs, and the team that will operate the platform. Environments, delivery pipelines, observability, backups, and runbooks are built as a coherent operating system for the software.",
    whoFor:
      "Teams moving from ad-hoc hosting, preparing a production launch, or needing clearer ownership of uptime and recovery.",
    proof:
      "Security-first deployment practices shaped by systems handling programme and financial infrastructure.",
    seoTitle: "Cloud Infrastructure Services in Kenya",
    metaDescription:
      "Cloud infrastructure and DevOps services in Nairobi covering deployment, CI/CD, monitoring, backups, recovery, and platform operations.",
    deliverables: [
      "Cloud and deployment architecture",
      "CI/CD and environment strategy",
      "Observability and incident readiness",
      "Backups, recovery, and runbooks",
    ],
    engagementFit: "Infrastructure sprint, migration project, or operational retainer.",
    status: "live",
  },
  {
    slug: "bitcoin-infrastructure",
    number: "06",
    title: "Bitcoin & Lightning Infrastructure",
    short: "Bitcoin-native systems built for custody clarity, reliability, and real use.",
    proposition: "Bitcoin infrastructure designed for real operations.",
    summary:
      "Payment, wallet, node, and operational tooling for products that need to use Bitcoin rather than merely mention it.",
    approach:
      "We separate product requirements from custody and operational risk, then design the payment flow, node or wallet connection, monitoring, liquidity responsibilities, and recovery procedures. BTCPay Server and Lightning integrations are scoped around who controls funds and who responds when a payment path fails.",
    whoFor:
      "Bitcoin companies, fintech teams, and organisations integrating self-custodial or Lightning payment flows.",
    proof:
      "Infrastructure experience developed through Afribit and production Bitcoin payment operations in Africa.",
    seoTitle: "Bitcoin and Lightning Development in Africa",
    metaDescription:
      "Bitcoin and Lightning infrastructure development in Africa, including BTCPay Server, wallets, nodes, payment flows, monitoring, and custody review.",
    deliverables: [
      "Node and wallet architecture",
      "BTCPay and Lightning integrations",
      "Payment-flow and custody review",
      "Monitoring and operational tooling",
    ],
    engagementFit: "Architecture sprint, fixed-scope integration, or advisory.",
    status: "live",
  },
  {
    slug: "payment-integrations",
    number: "07",
    title: "Payments & Financial Integrations",
    short: "Clear payment rails across M-Pesa, card, bank, and Bitcoin workflows.",
    proposition: "Payment flows that reconcile when the happy path ends.",
    summary:
      "Payment integrations designed around reconciliation, failure handling, and a traceable client experience.",
    approach:
      "We map initiation, confirmation, timeout, reversal, receipt, and reconciliation before connecting a gateway. For M-Pesa and other API-based rails, sandbox testing is followed by webhook security, idempotency, operational reporting, and realistic failure-state testing.",
    whoFor:
      "Platforms that need to collect, reconcile, or disburse value across local and international payment rails.",
    proof:
      "A dual-rail approach informed by East African payments and Bitcoin-native infrastructure.",
    seoTitle: "M-Pesa and Payment API Integration Kenya",
    metaDescription:
      "M-Pesa, card, bank, and Bitcoin payment API integration in Kenya with secure webhooks, receipts, reconciliation, and failure handling.",
    deliverables: [
      "Payment-flow architecture",
      "Gateway and webhook integration",
      "Reconciliation and receipt logic",
      "Failure-state and security testing",
    ],
    engagementFit: "Fixed-scope integration with optional operational support.",
    status: "live",
  },
  {
    slug: "security-engineering",
    number: "08",
    title: "Security Engineering",
    short: "Security controls designed into the system, not appended before launch.",
    proposition: "Security decisions made where the system is designed.",
    summary:
      "Application and platform hardening focused on identity, data access, secrets, auditability, and practical operational risk.",
    approach:
      "We review who can access what, how sensitive data moves, where secrets live, and how actions are traced. Recommendations are tied to the architecture and operating context, including Kenyan data protection obligations where they apply.",
    whoFor:
      "Teams handling sensitive programme, client, or financial data with clear accountability requirements.",
    proof:
      "DPA-conscious access patterns and security controls used in government-adjacent and financial systems.",
    seoTitle: "Application Security Engineering in Kenya",
    metaDescription:
      "Application security engineering in Nairobi for identity, access control, secrets, auditability, data protection, and practical platform hardening.",
    deliverables: [
      "Threat and access-model review",
      "Authentication and role design",
      "Secrets and data-protection controls",
      "Security remediation roadmap",
    ],
    engagementFit: "Security architecture sprint or implementation workstream.",
    status: "live",
  },
  {
    slug: "technical-advisory",
    number: "09",
    title: "Technical Advisory & Due Diligence",
    short: "Independent technical clarity for founders, funders, and programme leaders.",
    proposition: "A clear technical view before a consequential decision.",
    summary:
      "Focused technical review for decisions involving architecture, delivery risk, product feasibility, or an existing vendor and codebase.",
    approach:
      "We define the decision first, inspect the relevant evidence, and separate immediate risks from longer-term improvements. The output is a concise brief with findings, trade-offs, and a prioritised course of action rather than a generic audit report.",
    whoFor:
      "Investors, founders, programme owners, and leadership teams making a consequential technology decision.",
    proof:
      "Advice grounded in direct delivery across software, infrastructure, automation, and Bitcoin systems.",
    seoTitle: "Technical Due Diligence and Advisory Kenya",
    metaDescription:
      "Independent technical advisory and due diligence in Nairobi for architecture, codebases, vendors, delivery risk, and product feasibility.",
    deliverables: [
      "Architecture and codebase review",
      "Delivery and vendor risk assessment",
      "Technical feasibility analysis",
      "Prioritised decision brief",
    ],
    engagementFit: "Day-rate advisory or a short fixed-scope review.",
    status: "live",
  },
  {
    slug: "vulnerability-assessment",
    number: "10",
    title: "Security Vulnerability Assessment",
    short: "A formal assessment offer being prepared with the right evidence and process.",
    proposition: "A formal assessment service still in development.",
    summary:
      "This service is intentionally not available yet. Novyrix will only launch it when the methodology, reporting standard, and credentials are ready.",
    approach:
      "The future service will require a documented methodology, clear rules of engagement, evidence handling, risk-ranked findings, and a retest process. Until those controls and credentials are complete, Novyrix only accepts adjacent security engineering work.",
    whoFor:
      "Future clients needing a formal, evidence-backed assessment rather than general security engineering support.",
    proof:
      "In development. No assessment engagement is accepted under this service today.",
    seoTitle: "Security Vulnerability Assessment Kenya",
    metaDescription:
      "Novyrix is developing a formal security vulnerability assessment service for Kenya. The offer is not available until its methodology is ready.",
    deliverables: [
      "Scope and rules of engagement",
      "Evidence-backed findings",
      "Risk-ranked remediation plan",
      "Retest and closure report",
    ],
    engagementFit: "Not currently available.",
    status: "in-development",
  },
];

export const liveServices = services.filter((service) => service.status === "live");

export const proofMetrics = {
  taskResponses: {
    value: "8M",
    label: "task responses processed",
  },
} as const;

export const proofPoints = [
  {
    name: "KISIP2",
    eyebrow: "Government-adjacent programme infrastructure",
    stat: proofMetrics.taskResponses.value,
    statLabel: proofMetrics.taskResponses.label,
    summary:
      "Digital systems supporting complex field operations, programme visibility, and accountable delivery at scale.",
    href: "https://edmund.novyrix.com/work/spatial-collective",
  },
  {
    name: "Afribit",
    eyebrow: "Bitcoin-native infrastructure",
    stat: "6,000+",
    statLabel: "Bitcoin transactions",
    summary:
      "Payment and platform infrastructure shaped by the realities of building Bitcoin products in Africa.",
    href: "https://edmund.novyrix.com/work/afribit",
  },
];

export const engagementModels = [
  {
    number: "01",
    name: "Fixed scope",
    description:
      "For a defined outcome with itemised deliverables, an agreed timeline, and a clear acceptance point.",
  },
  {
    number: "02",
    name: "Retainer",
    description:
      "For ongoing engineering, operational improvement, and a predictable allocation of senior technical capacity.",
  },
  {
    number: "03",
    name: "Technical advisory",
    description:
      "For architecture, due diligence, or high-leverage decisions that need an experienced independent view.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
