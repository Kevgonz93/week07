/*
  Warnings:

  - Added the required column `anthemId` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "anthemId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_anthemId_fkey" FOREIGN KEY ("anthemId") REFERENCES "RockSong"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
