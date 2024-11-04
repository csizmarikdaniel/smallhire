/*
  Warnings:

  - Added the required column `pricePerHour` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "pricePerHour" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Trade_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trade" ("createdAt", "id", "name", "updatedAt", "workerId", "yearsOfExperience") SELECT "createdAt", "id", "name", "updatedAt", "workerId", "yearsOfExperience" FROM "Trade";
DROP TABLE "Trade";
ALTER TABLE "new_Trade" RENAME TO "Trade";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
