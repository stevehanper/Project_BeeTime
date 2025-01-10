/*
  Warnings:

  - You are about to drop the column `address` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `branch` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Location` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Location" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
CREATE TABLE "new_LocationUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATETIME,
    CONSTRAINT "LocationUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LocationUser_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LocationUser" ("endDate", "id", "locationId", "startDate", "userId") SELECT "endDate", "id", "locationId", "startDate", "userId" FROM "LocationUser";
DROP TABLE "LocationUser";
ALTER TABLE "new_LocationUser" RENAME TO "LocationUser";
CREATE UNIQUE INDEX "LocationUser_userId_locationId_startDate_key" ON "LocationUser"("userId", "locationId", "startDate");
CREATE TABLE "new_TimeRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "clockIn" DATETIME NOT NULL,
    "clockOut" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'active',
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TimeRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TimeRecord_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TimeRecord" ("clockIn", "clockOut", "createdAt", "date", "id", "locationId", "note", "status", "updatedAt", "userId") SELECT "clockIn", "clockOut", "createdAt", "date", "id", "locationId", "note", "status", "updatedAt", "userId" FROM "TimeRecord";
DROP TABLE "TimeRecord";
ALTER TABLE "new_TimeRecord" RENAME TO "TimeRecord";
CREATE INDEX "TimeRecord_date_idx" ON "TimeRecord"("date");
CREATE UNIQUE INDEX "TimeRecord_userId_date_key" ON "TimeRecord"("userId", "date");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "isProfileComplete" BOOLEAN NOT NULL DEFAULT false,
    "locationId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_locationId_idx" ON "User"("locationId");
CREATE TABLE "new_WorkSummary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "totalMinutes" INTEGER NOT NULL,
    "breakMinutes" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_WorkSummary" ("breakMinutes", "createdAt", "date", "id", "locationId", "status", "totalMinutes", "userId") SELECT "breakMinutes", "createdAt", "date", "id", "locationId", "status", "totalMinutes", "userId" FROM "WorkSummary";
DROP TABLE "WorkSummary";
ALTER TABLE "new_WorkSummary" RENAME TO "WorkSummary";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
