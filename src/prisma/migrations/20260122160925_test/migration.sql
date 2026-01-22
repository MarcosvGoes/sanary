/*
  Warnings:

  - You are about to drop the column `token` on the `Verification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "Verification" DROP COLUMN "token";
