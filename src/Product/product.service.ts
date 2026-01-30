import { ProductRepository } from "./product.repository";
import {
    ProductServiceContract,
} from "./product.types";


export const ProductService: ProductServiceContract ={
    getAllProducts: (take?, skip?) =>{
        return ProductRepository.getAllProducts(take, skip)
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
    getProductsByCategory(categoryId, skip?, take?) {
        return ProductRepository.getProductsByCategory(categoryId, skip, take)
    },
    createDetailBasicText: async (data) => {
        return ProductRepository.createDetailBasicText(data)
    },
    createDetailBoldText: async (data) => {
        return ProductRepository.createDetailBasicText(data)
    },
    createProductBlock: async (data) => {
        return ProductRepository.createProductBlock(data)
    },
    createProductDetail(data) {
        return ProductRepository.createProductDetail(data)
    },
    async getNewProducts(skip, take) {
        return ProductRepository.getNewProducts(skip, take)
    },
    async getPopularProducts(skip, take) {
        return ProductRepository.getPopularProducts(skip, take)
    },
    async getProductsAmount(categoryId) {
        return ProductRepository.getProductsAmount(categoryId)
    },
}