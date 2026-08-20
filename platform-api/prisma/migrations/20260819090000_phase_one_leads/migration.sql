CREATE TYPE "OrganizationType" AS ENUM ('NGO', 'BITCOIN_FINTECH', 'STARTUP', 'GOV_ADJACENT', 'OTHER');
CREATE TYPE "Currency" AS ENUM ('KES', 'USD');
CREATE TYPE "FitStatus" AS ENUM ('PENDING', 'FIT', 'NOT_FIT');
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

CREATE TABLE "Organization" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "type" "OrganizationType" NOT NULL,
  "country" TEXT NOT NULL,
  "resolvedCurrency" "Currency" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Lead" (
  "id" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "contactName" TEXT NOT NULL,
  "contactEmail" TEXT NOT NULL,
  "servicesOfInterest" TEXT[] NOT NULL,
  "problemDescription" TEXT NOT NULL,
  "budgetRange" TEXT,
  "fitStatus" "FitStatus" NOT NULL DEFAULT 'PENDING',
  "notificationStatus" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
  "source" TEXT NOT NULL DEFAULT 'novyrix.com',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Lead_reference_key" ON "Lead"("reference");
CREATE INDEX "Organization_name_idx" ON "Organization"("name");
CREATE INDEX "Organization_country_idx" ON "Organization"("country");
CREATE INDEX "Lead_organizationId_idx" ON "Lead"("organizationId");
CREATE INDEX "Lead_contactEmail_idx" ON "Lead"("contactEmail");
CREATE INDEX "Lead_fitStatus_createdAt_idx" ON "Lead"("fitStatus", "createdAt");

ALTER TABLE "Lead"
ADD CONSTRAINT "Lead_organizationId_fkey"
FOREIGN KEY ("organizationId") REFERENCES "Organization"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
