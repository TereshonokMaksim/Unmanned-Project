import express ,{Router} from "express" 
import ProductController from "./product.controller";
import ProductService from "./product.service";

const router:Router = Router()

const productService = new ProductService()
const productController = new ProductController(productService)
router.post("/", (req, res) => productController.createProduct(req, res))
router.get("/", (req, res) => productController.getAllProducts(req, res))
router.get("/:id", (req, res) => productController.getProductById(req, res))
router.delete("/:id", (req, res) => productController.deleteProduct(req, res))

export default router
