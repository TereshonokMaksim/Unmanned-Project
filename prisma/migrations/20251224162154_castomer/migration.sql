/*
  Warnings:

  - You are about to drop the column `castomerPatronymic` on the `Order` table. All the data in the column will be lost.
  - Added the required column `customerPatronymic` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerName" TEXT NOT NULL,
    "customerPatronymic" TEXT NOT NULL,
    "customerPhoneNumber" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerComment" TEXT NOT NULL,
    "deliveryMethod" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "totalPrice" REAL NOT NULL,
    "totalDiscount" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("customerComment", "customerEmail", "customerName", "customerPhoneNumber", "deliveryMethod", "id", "locationId", "paymentMethod", "totalDiscount", "totalPrice", "userId") SELECT "customerComment", "customerEmail", "customerName", "customerPhoneNumber", "deliveryMethod", "id", "locationId", "paymentMethod", "totalDiscount", "totalPrice", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
