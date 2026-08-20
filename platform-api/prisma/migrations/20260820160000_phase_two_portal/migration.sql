CREATE TYPE "PortalUserStatus" AS ENUM ('INVITED', 'ACTIVE', 'DISABLED');
CREATE TYPE "PortalMembershipRole" AS ENUM ('CLIENT');
CREATE TYPE "EngagementMilestoneStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'BLOCKED', 'COMPLETE');
CREATE TYPE "DeliverableStatus" AS ENUM ('DRAFT', 'SHARED', 'ACCEPTED', 'SUPERSEDED');
CREATE TYPE "PortalMessageSender" AS ENUM ('CLIENT', 'ADMIN');

CREATE TABLE "PortalUser" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "status" "PortalUserStatus" NOT NULL DEFAULT 'INVITED',
  "lastLoginAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "PortalUser_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PortalMembership" (
  "id" TEXT NOT NULL,
  "portalUserId" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "role" "PortalMembershipRole" NOT NULL DEFAULT 'CLIENT',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "PortalMembership_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EngagementMilestone" (
  "id" TEXT NOT NULL,
  "engagementId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "status" "EngagementMilestoneStatus" NOT NULL DEFAULT 'NOT_STARTED',
  "dueAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "position" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "EngagementMilestone_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Deliverable" (
  "id" TEXT NOT NULL,
  "engagementId" TEXT NOT NULL,
  "milestoneId" TEXT,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "url" TEXT,
  "status" "DeliverableStatus" NOT NULL DEFAULT 'SHARED',
  "sharedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Deliverable_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PortalMessage" (
  "id" TEXT NOT NULL,
  "engagementId" TEXT NOT NULL,
  "portalUserId" TEXT,
  "sender" "PortalMessageSender" NOT NULL,
  "body" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "PortalMessage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PortalUser_email_key" ON "PortalUser"("email");
CREATE INDEX "PortalUser_status_createdAt_idx" ON "PortalUser"("status", "createdAt");
CREATE UNIQUE INDEX "PortalMembership_portalUserId_organizationId_key" ON "PortalMembership"("portalUserId", "organizationId");
CREATE INDEX "PortalMembership_organizationId_idx" ON "PortalMembership"("organizationId");
CREATE UNIQUE INDEX "EngagementMilestone_engagementId_position_key" ON "EngagementMilestone"("engagementId", "position");
CREATE INDEX "EngagementMilestone_engagementId_status_idx" ON "EngagementMilestone"("engagementId", "status");
CREATE INDEX "Deliverable_engagementId_status_idx" ON "Deliverable"("engagementId", "status");
CREATE INDEX "Deliverable_milestoneId_idx" ON "Deliverable"("milestoneId");
CREATE INDEX "PortalMessage_engagementId_createdAt_idx" ON "PortalMessage"("engagementId", "createdAt");
CREATE INDEX "PortalMessage_portalUserId_idx" ON "PortalMessage"("portalUserId");

ALTER TABLE "PortalMembership"
ADD CONSTRAINT "PortalMembership_portalUserId_fkey"
FOREIGN KEY ("portalUserId") REFERENCES "PortalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PortalMembership"
ADD CONSTRAINT "PortalMembership_organizationId_fkey"
FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "EngagementMilestone"
ADD CONSTRAINT "EngagementMilestone_engagementId_fkey"
FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Deliverable"
ADD CONSTRAINT "Deliverable_engagementId_fkey"
FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Deliverable"
ADD CONSTRAINT "Deliverable_milestoneId_fkey"
FOREIGN KEY ("milestoneId") REFERENCES "EngagementMilestone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "PortalMessage"
ADD CONSTRAINT "PortalMessage_engagementId_fkey"
FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PortalMessage"
ADD CONSTRAINT "PortalMessage_portalUserId_fkey"
FOREIGN KEY ("portalUserId") REFERENCES "PortalUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
