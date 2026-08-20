CREATE TYPE "DiscoveryOutcome" AS ENUM ('PROCEED', 'FOLLOW_UP', 'DECLINE');

ALTER TABLE "Lead"
ADD COLUMN "discoveryOutcome" "DiscoveryOutcome",
ADD COLUMN "discoveryNotes" TEXT,
ADD COLUMN "discoveryCompletedAt" TIMESTAMP(3);

CREATE INDEX "Lead_discoveryOutcome_createdAt_idx" ON "Lead"("discoveryOutcome", "createdAt");
