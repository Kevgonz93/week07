/*
  Warnings:

  - Added the required column `countryId` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "countryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);
