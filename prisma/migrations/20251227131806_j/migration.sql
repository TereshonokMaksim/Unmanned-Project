-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductForOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER,
    "count" INTEGER NOT NULL,
    "discount" REAL NOT NULL,
    CONSTRAINT "ProductForOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductForOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductForOrder" ("count", "discount", "id", "orderId", "productId") SELECT "count", "discount", "id", "orderId", "productId" FROM "ProductForOrder";
DROP TABLE "ProductForOrder";
ALTER TABLE "new_ProductForOrder" RENAME TO "ProductForOrder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
