-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "partonymic" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "phoneNumber" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNum" INTEGER NOT NULL,
    "flatNum" INTEGER NOT NULL,
    "entranceNum" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerName" TEXT NOT NULL,
    "castomerPatronymic" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "discount" REAL NOT NULL,
    "media" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductForOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "discount" REAL NOT NULL,
    CONSTRAINT "ProductForOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductForOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductMainBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "align" TEXT NOT NULL,
    "orderNum" INTEGER NOT NULL,
    CONSTRAINT "ProductMainBlock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductDetailData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "orderNum" INTEGER NOT NULL,
    "productMainBlockId" INTEGER NOT NULL,
    CONSTRAINT "ProductDetailData_productMainBlockId_fkey" FOREIGN KEY ("productMainBlockId") REFERENCES "ProductMainBlock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductDetailBasic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "orderNum" INTEGER NOT NULL,
    "productDetailDataId" INTEGER NOT NULL,
    CONSTRAINT "ProductDetailBasic_productDetailDataId_fkey" FOREIGN KEY ("productDetailDataId") REFERENCES "ProductDetailData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductDetailBold" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "orderNum" INTEGER NOT NULL,
    "productDetailDataId" INTEGER NOT NULL,
    CONSTRAINT "ProductDetailBold_productDetailDataId_fkey" FOREIGN KEY ("productDetailDataId") REFERENCES "ProductDetailData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
