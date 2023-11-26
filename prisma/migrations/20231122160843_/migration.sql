/*
  Warnings:

  - The `startOfTrip` column on the `Trip` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endOfTrip` column on the `Trip` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dateOfBirth` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "startOfTrip",
ADD COLUMN     "startOfTrip" TIMESTAMP(3),
DROP COLUMN "endOfTrip",
ADD COLUMN     "endOfTrip" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dateOfBirth",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3);
