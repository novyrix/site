export type FieldNotePoint = {
  title: string;
  body: string;
};

export type FieldNoteSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  points?: FieldNotePoint[];
  callout?: {
    label: string;
    body: string;
  };
};

export type FieldNoteSource = {
  label: string;
  publisher: string;
  href: string;
};

export type FieldNote = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readMinutes: number;
  primaryKeyword: string;
  introduction: string[];
  sections: FieldNoteSection[];
  takeaway: string;
  sources: FieldNoteSource[];
  relatedServices: Array<{
    label: string;
    href: `/services/${string}`;
  }>;
};

export const fieldNotes: FieldNote[] = [
  {
    slug: "mpesa-payment-reconciliation-kenya",
    title: "M-Pesa reconciliation beyond the callback",
    seoTitle: "M-Pesa Payment Reconciliation in Kenya",
    description:
      "A practical M-Pesa payment reconciliation model for Kenyan platforms, covering references, signed webhooks, verification, idempotency, and ledger controls.",
    excerpt:
      "A payment callback can confirm an event. It cannot replace the ledger, exception queue, and operating routine that make collections trustworthy.",
    category: "Payment systems",
    publishedAt: "2026-08-20",
    readMinutes: 9,
    primaryKeyword: "M-Pesa payment reconciliation",
    introduction: [
      "Connecting a checkout to M-Pesa is only the visible edge of a payment system. The harder work begins after the customer authorises the payment: matching it to the right obligation, handling delayed or repeated events, recording a trustworthy state, and giving an operator enough evidence to resolve exceptions.",
      "This is why a working callback is not the same as working reconciliation. A reliable platform treats the provider as one source of payment events and maintains its own controlled record of what was expected, what was reported, what was verified, and what action followed.",
    ],
    sections: [
      {
        id: "callback-is-a-signal",
        heading: "A callback is a signal, not the ledger",
        paragraphs: [
          "Payment providers use asynchronous events because customer authorisation and final processing do not always complete inside the original browser request. The customer may close the page, mobile connectivity may drop, or the provider may deliver confirmation later. Your system still needs to reach the correct state without depending on that browser session.",
          "Treat the callback or webhook as an incoming claim that must be authenticated, stored, and processed. The business record should change only after the event can be associated with an expected transaction and its critical fields have been checked. This separation prevents a transport event from silently becoming an accounting decision.",
        ],
        callout: {
          label: "Operating principle",
          body: "The provider reports payment activity. Your ledger decides what that activity means for an invoice, order, membership, or account.",
        },
      },
      {
        id: "explicit-payment-states",
        heading: "Model explicit payment states",
        paragraphs: [
          "A single paid flag hides too much. It cannot explain whether a collection was requested, whether the customer abandoned authorisation, whether confirmation is delayed, or whether an operator reversed a previous allocation. The payment record needs a small state machine that reflects the actual operating flow.",
          "The exact names can vary, but transitions should be limited and deliberate. A useful baseline is initiated, pending, confirmed, failed, expired, reversed, and review required. The invoice or order can derive its settlement status from confirmed allocations instead of copying the latest gateway message.",
        ],
        points: [
          {
            title: "Initiated",
            body: "The platform created an attempt with its own immutable reference before contacting the provider.",
          },
          {
            title: "Pending",
            body: "The request exists, but customer authorisation or provider confirmation has not completed.",
          },
          {
            title: "Confirmed",
            body: "The provider status, amount, currency, and business reference have passed server-side checks.",
          },
          {
            title: "Review required",
            body: "The event is authentic but does not safely match the expected transaction or allocation rules.",
          },
        ],
      },
      {
        id: "references-and-idempotency",
        heading: "Use stable references and idempotent transitions",
        paragraphs: [
          "Create the internal transaction before the provider request. Give it a unique reference that is never reused, then send that reference through the gateway metadata or supported reference field. Store the provider transaction identifier separately. Those two identifiers answer different questions: what your platform intended and what the provider processed.",
          "Webhook delivery is normally at least once, which means the same event may arrive more than once. Processing must be idempotent. A repeated event should be acknowledged without issuing a second receipt, crediting an account twice, or triggering fulfilment again. Enforce this with database uniqueness and a transaction around the state change and its business effects, not only with an in-memory check.",
        ],
      },
      {
        id: "verify-critical-fields",
        heading: "Verify the fields that carry business risk",
        paragraphs: [
          "Authenticating the webhook protects the message in transit, but it does not prove that the event belongs to the invoice currently on screen. Verify the provider transaction status and compare the provider reference, internal reference, amount, and currency against the stored expectation. Keep the raw event for investigation, but do not let untrusted fields overwrite the original obligation.",
          "Paystack documents signature verification with the x-paystack-signature header and an HMAC SHA512 digest. It also recommends server-side transaction verification. Safaricom provides the Daraja environment for M-Pesa API applications and sandbox testing. Whichever integration path is used, provider secrets and verification calls belong on the server, never in browser code.",
        ],
        points: [
          {
            title: "Origin",
            body: "Validate the supported signature or authentication mechanism before processing the payload.",
          },
          {
            title: "Identity",
            body: "Match both the internal reference and the provider transaction identifier where available.",
          },
          {
            title: "Value",
            body: "Compare amount and currency with values stored before checkout began.",
          },
          {
            title: "Status",
            body: "Use the provider's server-side status, not a callback URL or customer-facing success screen, as evidence.",
          },
        ],
      },
      {
        id: "late-and-missing-events",
        heading: "Design for late, repeated, and missing events",
        paragraphs: [
          "A robust flow assumes that delivery can be late, out of order, or temporarily unavailable. Store every accepted event with a processing status. A worker can then apply business rules independently of the HTTP response and retry transient failures without asking the provider to resend everything.",
          "Missing confirmation needs a bounded recovery path. Do not poll the provider continuously. Schedule verification for payments that remain pending beyond a defined interval, respect published API limits, and move unresolved mismatches into an operator queue. A visible exception is safer than a guessed settlement state.",
          "Return a successful HTTP response promptly after authenticating and durably recording a valid webhook. Slow business processing inside the webhook request increases retries and duplicate pressure without improving correctness.",
        ],
      },
      {
        id: "daily-reconciliation",
        heading: "Make reconciliation an operating routine",
        paragraphs: [
          "Software controls reduce manual work, but operations still need a repeatable close process. Compare the platform ledger with provider transactions and settlement reports on a defined schedule. Track confirmed-but-unallocated payments, amount mismatches, reversals, stale pending attempts, and settlements that do not tie to recorded collections.",
          "Give each exception an owner, reason, evidence trail, and resolution. The objective is not a dashboard that always shows green. It is a process that exposes differences early and makes every adjustment explainable later.",
        ],
        points: [
          {
            title: "Automated match",
            body: "Exact reference, amount, currency, and valid final state agree across systems.",
          },
          {
            title: "Exception",
            body: "A specific mismatch is routed with enough evidence for an operator to act.",
          },
          {
            title: "Adjustment",
            body: "Any manual allocation or correction records the actor, time, reason, and linked evidence.",
          },
        ],
      },
      {
        id: "go-live-checklist",
        heading: "Test the failure paths before go-live",
        paragraphs: [
          "A happy-path sandbox payment proves very little about production reliability. Test repeated webhooks, an invalid signature, a valid event with the wrong amount, delayed confirmation, a customer who never returns to the callback page, a provider timeout after initiation, and a database failure during event processing.",
          "The release gate should also prove that operators can find a transaction by either reference, see the complete event history, retry safe processing, and export the records needed for reconciliation. If the team cannot explain a payment from initiation to settlement, the integration is not operationally complete.",
        ],
      },
    ],
    takeaway:
      "The dependable unit of a payment integration is not the checkout button. It is a controlled chain from intent to verified event, ledger allocation, settlement, and explainable exception handling.",
    sources: [
      {
        label: "Accept Payments",
        publisher: "Paystack Developer Documentation",
        href: "https://paystack.com/docs/payments/accept-payments/",
      },
      {
        label: "Webhooks",
        publisher: "Paystack Developer Documentation",
        href: "https://paystack.com/docs/payments/webhooks/",
      },
      {
        label: "Verify Payments",
        publisher: "Paystack Developer Documentation",
        href: "https://paystack.com/docs/payments/verify-payments/",
      },
      {
        label: "Daraja API Platform",
        publisher: "Safaricom",
        href: "https://developer.safaricom.co.ke/",
      },
    ],
    relatedServices: [
      { label: "Payments and financial integrations", href: "/services/payment-integrations" },
      { label: "Custom platform engineering", href: "/services/custom-platform-engineering" },
      { label: "Data platforms and integrations", href: "/services/data-platforms" },
    ],
  },
  {
    slug: "workflow-automation-audit-trail",
    title: "Workflow automation needs an audit trail",
    seoTitle: "Workflow Automation Needs an Audit Trail",
    description:
      "How to design workflow automation with explicit states, human decisions, exception handling, and an audit trail that operations teams can actually use.",
    excerpt:
      "Automation should reduce repeat work without erasing who decided, what changed, and why an exception moved forward.",
    category: "Operational systems",
    publishedAt: "2026-08-18",
    readMinutes: 8,
    primaryKeyword: "workflow automation audit trail",
    introduction: [
      "Workflow automation is often sold as a straight line: a request enters, software processes it, and an outcome appears. Real operations are not straight lines. Information arrives late, approvals change, integrations fail, and a person needs to override a rule for a legitimate reason.",
      "The system is useful only if it can automate the normal path while preserving a clear account of the abnormal one. That requires an audit trail designed as part of the workflow model, not a generic activity feed added near launch.",
    ],
    sections: [
      {
        id: "automation-and-accountability",
        heading: "Automation does not remove accountability",
        paragraphs: [
          "When a manual process moves into software, responsibility does not disappear. It becomes distributed across rules, integrations, system identities, and the people who approve exceptions. If the platform records only the latest value, the team loses the context that previously lived in emails, spreadsheets, and conversations.",
          "A useful audit trail connects each important change to an actor, timestamp, previous state, new state, and reason. The actor may be a person, a scheduled job, an integration, or an AI-assisted step. Naming that actor makes ownership visible and helps the team distinguish a policy decision from a technical side effect.",
        ],
        callout: {
          label: "Design test",
          body: "Can an operator explain how this record reached its current state without searching chat messages or asking the original developer?",
        },
      },
      {
        id: "states-and-events",
        heading: "Model work as states and events",
        paragraphs: [
          "A status field can describe where a case is now. An event record explains how it got there. Keep both. The current state supports fast queries and dashboards, while the append-only event history preserves transitions and evidence.",
          "Define valid transitions explicitly. A submitted request may move to review, approved, rejected, or needs information. It should not jump from draft to completed because a user edited the status field. Transition rules create a shared operational language and prevent impossible states from entering reports.",
        ],
        points: [
          {
            title: "State",
            body: "The current operational condition of the record, such as under review or approved.",
          },
          {
            title: "Event",
            body: "An immutable statement that something happened, including its source and supporting data.",
          },
          {
            title: "Transition",
            body: "A permitted move between states with validation, authorisation, and side effects.",
          },
        ],
      },
      {
        id: "record-decisions",
        heading: "Record decisions, not just field edits",
        paragraphs: [
          "A raw database diff is useful for debugging, but it rarely explains an operational decision. Changing approved from false to true does not say who approved the request, which policy applied, what evidence they reviewed, or whether conditions were attached.",
          "Represent consequential actions as named domain events such as application approved, disbursement held, verification overridden, or case reassigned. Capture a structured reason where the workflow requires one. This creates a history that can support service reviews, quality assurance, incident response, and client reporting without reconstructing meaning from low-level logs.",
        ],
      },
      {
        id: "exceptions-first-class",
        heading: "Make exceptions first-class work",
        paragraphs: [
          "Weak automation treats exceptions as errors for a developer. Strong automation turns expected uncertainty into a queue for an operator. Missing evidence, a duplicate identity, an unavailable integration, or a value outside a threshold should produce a clear case with an owner and next action.",
          "Separate retryable technical failures from business exceptions. The platform can retry a temporary network failure with backoff. It should not repeatedly retry a policy conflict or guess how to resolve an ambiguous match. Those need human judgement, and the eventual decision should become part of the record.",
        ],
        points: [
          {
            title: "What happened?",
            body: "Show the failed rule or integration in language the operator understands.",
          },
          {
            title: "What is safe now?",
            body: "State whether work is paused, partially complete, or still progressing elsewhere.",
          },
          {
            title: "Who acts next?",
            body: "Assign the exception to a role or queue with a target response time.",
          },
        ],
      },
      {
        id: "ai-assisted-steps",
        heading: "Keep AI-assisted steps bounded",
        paragraphs: [
          "An AI model can classify a document, draft a response, extract fields, or recommend a route. It should not become an invisible actor. Store the model-assisted output, the source material or reference used, the confidence or validation result where meaningful, and the person or rule that accepted the output.",
          "Use human review where an error could materially affect money, access, eligibility, safety, or a contractual commitment. The review interface should make comparison easy rather than asking someone to rubber-stamp a generated result. Automation succeeds when it makes informed work faster, not when it hides uncertainty behind a confident sentence.",
        ],
      },
      {
        id: "reporting-from-record",
        heading: "Report from the same operational record",
        paragraphs: [
          "Dashboards should derive from the states and events that run the workflow. A separate reporting spreadsheet creates a second version of reality and usually loses the exception context. When operational and reporting models share the same source, teams can move from a metric to the records behind it.",
          "Measure flow as well as volume. Useful indicators include time in state, first-pass completion, exception rate, rework, manual overrides, and ageing by owner. These reveal where automation changes the operation instead of merely counting how many tasks passed through it.",
        ],
      },
      {
        id: "start-with-thin-slice",
        heading: "Start with one accountable slice",
        paragraphs: [
          "Do not automate an entire department in one release. Choose a bounded workflow with a clear input, owner, decision, and outcome. Map the real exceptions before selecting tools. Then implement the state model, audit events, permission checks, and operational view alongside the first automated step.",
          "Run the old and new process together long enough to compare outcomes. Review the exceptions with the people doing the work, adjust the rules, and document where human judgement remains necessary. A narrow workflow that the team trusts is a better foundation than a broad automation layer nobody can explain.",
        ],
      },
    ],
    takeaway:
      "A good automation system is not the one with the fewest human actions. It is the one that removes repeat work while keeping decisions, ownership, and exceptions legible.",
    sources: [],
    relatedServices: [
      { label: "AI automation", href: "/services/ai-automation" },
      { label: "Systems architecture", href: "/services/systems-architecture" },
      { label: "Custom platform engineering", href: "/services/custom-platform-engineering" },
    ],
  },
  {
    slug: "btcpay-lightning-invoice-states",
    title: "Bitcoin payments need more than an invoice URL",
    seoTitle: "BTCPay and Lightning Invoice State Design",
    description:
      "Design reliable BTCPay Server and Lightning payment flows by separating invoice status, payment settlement, fulfilment, webhooks, and operator recovery.",
    excerpt:
      "BTCPay can create the invoice and report its lifecycle. Your product still has to decide when value is accepted, when fulfilment is safe, and how recovery works.",
    category: "Bitcoin infrastructure",
    publishedAt: "2026-08-15",
    readMinutes: 8,
    primaryKeyword: "BTCPay Server Lightning integration",
    introduction: [
      "A self-hosted Bitcoin checkout gives a business control over its payment infrastructure, but control also brings operating responsibility. Creating a BTCPay Server invoice is the beginning of the flow. The product still needs a durable internal order, authenticated event handling, explicit fulfilment rules, and a way to investigate payments that do not follow the expected path.",
      "The design becomes clearer when invoice state, payment settlement, and business fulfilment are treated as related but separate concerns. Combining them into a single paid flag makes timing, underpayment, expiration, and later invalidation difficult to reason about.",
    ],
    sections: [
      {
        id: "three-state-machines",
        heading: "Separate three state machines",
        paragraphs: [
          "The BTCPay invoice describes the provider-side request for payment. The payment record describes value observed against that request. The order, subscription, donation, or account credit describes what your product owes in response. These records may progress at different times and should not overwrite each other.",
          "For example, an invoice can expire while a late on-chain payment still appears. A Lightning payment may settle quickly, but a downstream fulfilment job can fail. The interface should show those distinctions instead of presenting every problem as unpaid.",
        ],
        points: [
          {
            title: "Invoice lifecycle",
            body: "Tracks whether the payment request is new, processing, settled, expired, or invalid.",
          },
          {
            title: "Payment lifecycle",
            body: "Tracks value received, its rail, settlement evidence, and any exception against the invoice.",
          },
          {
            title: "Fulfilment lifecycle",
            body: "Tracks the product action, such as granting access, issuing a receipt, or dispatching an order.",
          },
        ],
      },
      {
        id: "internal-order-first",
        heading: "Create the internal obligation first",
        paragraphs: [
          "Create and commit the internal order before requesting a BTCPay invoice. Store the amount, currency or pricing basis, customer context where appropriate, and an immutable internal reference. Pass that reference into the invoice metadata supported by the integration.",
          "This sequence gives the webhook something stable to resolve even if the customer never returns to the site. It also prevents the checkout session from becoming the only record of what the payment was meant to settle.",
        ],
      },
      {
        id: "webhook-processing",
        heading: "Acknowledge webhooks, process events once",
        paragraphs: [
          "BTCPay Server exposes invoice webhook events through its Greenfield API. Receive those events at a dedicated server endpoint, validate them using the mechanism configured for the webhook, persist the event, and acknowledge it before performing slow downstream work.",
          "Use the event or invoice identity as part of an idempotency boundary. A retry must not grant access twice or issue repeated account credits. The database transaction should protect both the processed marker and the resulting state transition.",
        ],
        callout: {
          label: "Reliability rule",
          body: "Webhook delivery starts processing. A unique, committed ledger transition proves that processing happened once.",
        },
      },
      {
        id: "settlement-policy",
        heading: "Define the settlement policy in business terms",
        paragraphs: [
          "The right point for fulfilment depends on what is being sold and which payment rail is used. A low-value digital purchase over Lightning has a different risk and recovery profile from a high-value on-chain settlement. Do not scatter this policy through webhook conditionals. Document it and encode it in one place.",
          "State which BTCPay invoice events can advance the order, whether an additional check is required, how underpayments and overpayments are handled, and what happens if an invoice later becomes invalid. The policy should be understandable to the operator who responds to a customer, not only to the engineer who wrote the integration.",
        ],
      },
      {
        id: "customer-return",
        heading: "Treat the customer return as presentation",
        paragraphs: [
          "The browser return URL is useful for showing progress, but it is not durable payment evidence. A customer can close the page before returning, refresh it repeatedly, or arrive before the server has processed the settlement event.",
          "Render the current internal order state on the return page. If confirmation is still pending, explain that clearly and provide a stable reference. Let server-side events move the record to paid and fulfilled. This avoids telling the customer that payment failed simply because the browser beat the webhook by a few seconds.",
        ],
      },
      {
        id: "operator-recovery",
        heading: "Build the operator recovery path",
        paragraphs: [
          "The team needs to search by internal reference, BTCPay invoice identifier, and transaction identifier where available. Show the invoice state, observed payments, raw event history, processing attempts, and fulfilment result in one timeline. Make safe retries explicit and restrict manual overrides by role.",
          "Monitoring should distinguish availability from business health. A reachable BTCPay instance can still have a failing webhook endpoint, unavailable Lightning liquidity, a wallet synchronization problem, or a growing queue of unprocessed events. Alert on stale pending invoices and event-processing failures, not only on server uptime.",
        ],
      },
      {
        id: "release-tests",
        heading: "Test the conditions the demo skips",
        paragraphs: [
          "Test duplicate and out-of-order events, an expired invoice, a late payment, an underpayment, an unavailable fulfilment dependency, and a database failure between event receipt and order update. Verify that each scenario leaves one explainable state and can be recovered without editing production data by hand.",
          "Back up the BTCPay deployment and document ownership of keys, wallet recovery, upgrades, node connectivity, Lightning liquidity, certificates, and incident response. Self-hosting is valuable when control is matched by an operating model that survives staff changes and failures.",
        ],
      },
    ],
    takeaway:
      "A reliable Bitcoin checkout connects an invoice lifecycle to an internal ledger and a deliberate fulfilment policy. The hosted payment page is an interface, not the operating model.",
    sources: [
      {
        label: "Greenfield API reference",
        publisher: "BTCPay Server Documentation",
        href: "https://docs.btcpayserver.org/API/Greenfield/v1/",
      },
      {
        label: "Greenfield API integration example",
        publisher: "BTCPay Server Documentation",
        href: "https://docs.btcpayserver.org/Development/GreenFieldExample/",
      },
    ],
    relatedServices: [
      { label: "Bitcoin and Lightning infrastructure", href: "/services/bitcoin-infrastructure" },
      { label: "Payments and financial integrations", href: "/services/payment-integrations" },
      { label: "Cloud and platform infrastructure", href: "/services/cloud-infrastructure" },
    ],
  },
];

export function getFieldNote(slug: string) {
  return fieldNotes.find((note) => note.slug === slug);
}

export function formatFieldNoteDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(`${value}T12:00:00+03:00`));
}
