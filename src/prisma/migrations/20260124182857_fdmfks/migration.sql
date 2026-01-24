-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'REFUNDED';

-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "paymentConfirmedAt" TIMESTAMP(3);
