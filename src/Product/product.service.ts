import { ProductRepository } from "./product.repository";
import {
    ProductServiceContract,
} from "./product.types";


export const ProductService: ProductServiceContract ={
    getAllProducts: (take?) =>{
        return ProductRepository.getAllProducts(take)
    },
    getProductById: (id) => {
        return ProductRepository.getProductById(id)
    },
    createProduct(data) {
        return ProductRepository.createProduct(data)
    },
    async deleteProduct(id) {
        const product = await ProductRepository.getProductById(id);

        if (!product){
            throw new Error("NOT_FOUND")
        }
        return ProductRepository.deleteProduct(id)
    },
    getProductsByCategory(categoryId) {
        return ProductRepository.getProductsByCategory(categoryId)
    },
}