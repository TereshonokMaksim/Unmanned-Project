import express from "express";
import { ProductController } from "./product.controller";

export const ProductRouter = express.Router();

ProductRouter.get("/", ProductController.getAllProducts)
ProductRouter.get("/:id", ProductController.getProductById)
ProductRouter.post("/", ProductController.createProduct)
ProductRouter.delete("/:id", ProductController.deleteProduct)