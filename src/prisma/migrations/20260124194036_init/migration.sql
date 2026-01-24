/*
  Warnings:

  - You are about to drop the column `discount` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceStatus` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `userAmount` on the `payments` table. All the data in the column will be lost.
  - Added the required column `bookingId` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Made the column `paymentId` on table `payments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `payments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "payments_invoiceId_key";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "discount",
DROP COLUMN "invoiceId",
DROP COLUMN "invoiceStatus",
DROP COLUMN "userAmount",
ADD COLUMN     "bookingId" TEXT NOT NULL,
ALTER COLUMN "paymentId" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "payments_bookingId_idx" ON "payments"("bookingId");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
