import express
import  {ProductController}from "./product.controller";
import {ProductService} from "./product.service";

const ProductRouter = express.Router()
ProductRouter.post("/", ProductController.createProduct)
ProductRouter.get("/", ProductController.getAllProducts)
ProductRouter.get("/:id",ProductController.getProductById)
ProductRouter.delete("/:id",ProductController.deleteProduct)
export default ProductRouter