/*
  Warnings:

  - You are about to drop the column `Actual` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "Actual",
ADD COLUMN     "isInProgress" BOOLEAN DEFAULT false;
