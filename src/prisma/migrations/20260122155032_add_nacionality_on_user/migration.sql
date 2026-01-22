/*
  Warnings:

  - You are about to drop the column `cityOfBirth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `civilStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profession` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stateOfBirth` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "cityOfBirth",
DROP COLUMN "civilStatus",
DROP COLUMN "profession",
DROP COLUMN "stateOfBirth",
ADD COLUMN     "nacionality" TEXT;
