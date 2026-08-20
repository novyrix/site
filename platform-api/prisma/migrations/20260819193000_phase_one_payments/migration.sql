CREATE TYPE "ProposalStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'DECLINED');
CREATE TYPE "EngagementType" AS ENUM ('FIXED_SCOPE', 'RETAINER', 'DAY_RATE_ADVISORY');
CREATE TYPE "EngagementStatus" AS ENUM ('ACTIVE', 'COMPLETED');
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'OVERPAID', 'OVERDUE', 'VOID');
CREATE TYPE "PaymentProvider" AS ENUM ('PAYSTACK', 'BTCPAY');
CREATE TYPE "PaymentAttemptStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'EXPIRED', 'CANCELLED');
CREATE TYPE "WebhookProcessingStatus" AS ENUM ('RECEIVED', 'PROCESSED', 'IGNORED', 'FAILED');

CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "scopeSummary" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "engagementType" "EngagementType" NOT NULL,
    "currency" "Currency" NOT NULL,
    "totalAmountMinor" BIGINT NOT NULL,
    "status" "ProposalStatus" NOT NULL DEFAULT 'DRAFT',
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProposalLineItem" (
    "id" TEXT NOT NULL,
    "proposalId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitAmountMinor" BIGINT NOT NULL,
    "totalAmountMinor" BIGINT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProposalLineItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Engagement" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "proposalId" TEXT NOT NULL,
    "type" "EngagementType" NOT NULL,
    "status" "EngagementStatus" NOT NULL DEFAULT 'ACTIVE',
    "agreementReference" TEXT NOT NULL,
    "agreementConfirmedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "engagementId" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "totalAmountMinor" BIGINT NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "PaymentProvider",
    "paymentTokenHash" TEXT NOT NULL,
    "notificationStatus" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "notificationSentAt" TIMESTAMP(3),
    "dueAt" TIMESTAMP(3) NOT NULL,
    "sentAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "InvoiceLineItem" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitAmountMinor" BIGINT NOT NULL,
    "totalAmountMinor" BIGINT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InvoiceLineItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PaymentAttempt" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "reference" TEXT NOT NULL,
    "providerReference" TEXT,
    "checkoutUrl" TEXT,
    "amountMinor" BIGINT NOT NULL,
    "currency" "Currency" NOT NULL,
    "status" "PaymentAttemptStatus" NOT NULL DEFAULT 'PENDING',
    "providerStatus" TEXT,
    "expiresAt" TIMESTAMP(3),
    "lastVerifiedAt" TIMESTAMP(3),
    "failureCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PaymentAttempt_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "providerPaymentId" TEXT NOT NULL,
    "amountMinor" BIGINT NOT NULL,
    "currency" "Currency" NOT NULL,
    "channel" TEXT,
    "receiptReference" TEXT NOT NULL,
    "receiptNotificationStatus" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "receiptSentAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WebhookEvent" (
    "id" TEXT NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payloadHash" TEXT NOT NULL,
    "status" "WebhookProcessingStatus" NOT NULL DEFAULT 'RECEIVED',
    "errorMessage" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Proposal_reference_key" ON "Proposal"("reference");
CREATE INDEX "Proposal_leadId_createdAt_idx" ON "Proposal"("leadId", "createdAt");
CREATE INDEX "Proposal_status_createdAt_idx" ON "Proposal"("status", "createdAt");
CREATE UNIQUE INDEX "ProposalLineItem_proposalId_position_key" ON "ProposalLineItem"("proposalId", "position");
CREATE INDEX "ProposalLineItem_proposalId_idx" ON "ProposalLineItem"("proposalId");
CREATE UNIQUE INDEX "Engagement_reference_key" ON "Engagement"("reference");
CREATE UNIQUE INDEX "Engagement_proposalId_key" ON "Engagement"("proposalId");
CREATE INDEX "Engagement_organizationId_status_idx" ON "Engagement"("organizationId", "status");
CREATE UNIQUE INDEX "Invoice_reference_key" ON "Invoice"("reference");
CREATE UNIQUE INDEX "Invoice_paymentTokenHash_key" ON "Invoice"("paymentTokenHash");
CREATE INDEX "Invoice_engagementId_createdAt_idx" ON "Invoice"("engagementId", "createdAt");
CREATE INDEX "Invoice_status_dueAt_idx" ON "Invoice"("status", "dueAt");
CREATE UNIQUE INDEX "InvoiceLineItem_invoiceId_position_key" ON "InvoiceLineItem"("invoiceId", "position");
CREATE INDEX "InvoiceLineItem_invoiceId_idx" ON "InvoiceLineItem"("invoiceId");
CREATE UNIQUE INDEX "PaymentAttempt_reference_key" ON "PaymentAttempt"("reference");
CREATE UNIQUE INDEX "PaymentAttempt_provider_providerReference_key" ON "PaymentAttempt"("provider", "providerReference");
CREATE INDEX "PaymentAttempt_invoiceId_provider_status_idx" ON "PaymentAttempt"("invoiceId", "provider", "status");
CREATE UNIQUE INDEX "Payment_attemptId_key" ON "Payment"("attemptId");
CREATE UNIQUE INDEX "Payment_receiptReference_key" ON "Payment"("receiptReference");
CREATE UNIQUE INDEX "Payment_provider_providerPaymentId_key" ON "Payment"("provider", "providerPaymentId");
CREATE INDEX "Payment_invoiceId_paidAt_idx" ON "Payment"("invoiceId", "paidAt");
CREATE UNIQUE INDEX "WebhookEvent_provider_eventId_key" ON "WebhookEvent"("provider", "eventId");
CREATE INDEX "WebhookEvent_provider_status_receivedAt_idx" ON "WebhookEvent"("provider", "status", "receivedAt");

ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ProposalLineItem" ADD CONSTRAINT "ProposalLineItem_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "InvoiceLineItem" ADD CONSTRAINT "InvoiceLineItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PaymentAttempt" ADD CONSTRAINT "PaymentAttempt_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "PaymentAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
