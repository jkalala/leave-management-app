-- AlterTable
ALTER TABLE "LeaveRequest" ADD COLUMN     "autoApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "directorId" TEXT,
ADD COLUMN     "isUrgent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supervisorId" TEXT;
