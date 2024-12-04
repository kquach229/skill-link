/*
  Warnings:

  - You are about to drop the column `field` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Connection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LearningSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserSkills` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_requesteeId_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_requesterId_fkey";

-- DropForeignKey
ALTER TABLE "_LearningSkills" DROP CONSTRAINT "_LearningSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_LearningSkills" DROP CONSTRAINT "_LearningSkills_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserSkills" DROP CONSTRAINT "_UserSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserSkills" DROP CONSTRAINT "_UserSkills_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "field",
DROP COLUMN "occupation";

-- DropTable
DROP TABLE "Connection";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "_LearningSkills";

-- DropTable
DROP TABLE "_UserSkills";

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
