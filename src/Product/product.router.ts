import express from "express";
import { ProductController } from "./product.controller";
import { paginationMiddleware } from "../middlewares/paginationMiddleware"; 

export const ProductRouter = express.Router();

ProductRouter.get("/", paginationMiddleware, ProductController.getAllProducts)
ProductRouter.get("/suggestions/", paginationMiddleware, ProductController.getSuggestedProducts)
ProductRouter.get("/:id", ProductController.getProductById)
ProductRouter.post("/", ProductController.createProduct)
ProductRouter.delete("/:id", ProductController.deleteProduct)
ProductRouter.post("/block/", ProductController.createInfoBlock)