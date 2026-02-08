import express from "express";
import { ProductController } from "./product.controller";
import { paginationMiddleware, adminOnlyMiddleware, authMiddleware } from "../middlewares"; 


export const ProductRouter = express.Router();

ProductRouter.get("/", paginationMiddleware, ProductController.getAllProducts);
ProductRouter.get("/total_amount/", ProductController.getProductsAmount);
ProductRouter.get("/suggestions/", paginationMiddleware, ProductController.getSuggestedProducts);
ProductRouter.get("/:id", ProductController.getProductById);
ProductRouter.post("/", authMiddleware, adminOnlyMiddleware, ProductController.createProduct);
ProductRouter.delete("/:id", authMiddleware, adminOnlyMiddleware, ProductController.deleteProduct);
ProductRouter.post("/block/", authMiddleware, adminOnlyMiddleware, ProductController.createInfoBlock)
