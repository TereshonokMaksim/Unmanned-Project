-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNum" INTEGER NOT NULL,
    "flatNum" INTEGER NOT NULL,
    "entranceNum" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Location" ("active", "city", "entranceNum", "flatNum", "houseNum", "id", "street", "userId") SELECT "active", "city", "entranceNum", "flatNum", "houseNum", "id", "street", "userId" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
