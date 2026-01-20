import express from "express";
import { ProductController } from "./product.controller";
import { paginationMiddleware } from "../middlewares/paginationMiddleware";

export const ProductRouter = express.Router();

ProductRouter.get("/", ProductController.getAllProducts)
ProductRouter.get("/:id", ProductController.getProductById)
ProductRouter.post("/", ProductController.createProduct)
ProductRouter.delete("/:id", ProductController.deleteProduct)
ProductRouter.post("/block/", ProductController.createInfoBlock)
ProductRouter.get('/products', ProductController.getProductsByCategory, paginationMiddleware());
