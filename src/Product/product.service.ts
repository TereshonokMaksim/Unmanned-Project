import { ProductRepository } from "./product.repository";
import {
    Product,
    ProductCreate,
    ErrorMessage,
    ProductServiceContract,
    ProductRepositoryContract
} from "./product.types";


export const ProductService: ProductServiceContract ={
    getAllProducts: (take) =>{
        return ProductRepository.getProduct(take)
    },
    getProductById: (id) => {
        return ProductRepository.getProductById(id)
    },
    createProduct(data) {
        return ProductRepository.createProduct(data)
    },
    deleteProduct(id) {
        return ProductRepository.deleteProduct(id)
    },
    getProductsByCategory(categoryId) {
        return ProductRepository.getProductsByCategory(categoryId)
    },
}