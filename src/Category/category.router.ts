import express from "express";
import { CategoryController } from "./category.controller";

export const CategoryRouter = express.Router();

CategoryRouter.get("/", CategoryController.getAllCategories)
CategoryRouter.post("/", CategoryController.createCategory)
CategoryRouter.delete("/:id", CategoryController.deleteCategory)