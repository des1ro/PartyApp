-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TEXT,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "picture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Trip" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "place" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT true,
    "authorTripId" TEXT NOT NULL,
    "attractions" TEXT[],
    "pictures" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startOfTrip" TEXT,
    "endOfTrip" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT[],
    "isInProgress" BOOLEAN DEFAULT false,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT[],
    "userId" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tripId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToTrip" (
    "userId" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,

    CONSTRAINT "UserToTrip_pkey" PRIMARY KEY ("userId","tripId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_title_key" ON "Trip"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_tripId_key" ON "Like"("userId", "tripId");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_authorTripId_fkey" FOREIGN KEY ("authorTripId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToTrip" ADD CONSTRAINT "UserToTrip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToTrip" ADD CONSTRAINT "UserToTrip_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
