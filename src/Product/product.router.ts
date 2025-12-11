import express ,{Router} from "express" 
import {ProductController} from "./product.controller";
import {ProductService} from "./product.service";

const router:Router=express.Router()
const productController = new ProductService()
router.post("/", productController.createProduct)
router.get("/", productController.getAllProducts)
router.get("/:id",productController.getProductById)
router.delete("/:id",productController.deleteProductById)

export default router
