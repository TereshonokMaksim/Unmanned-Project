import { Request, Response } from 'express'
import { Prisma } from '../generated/prisma/client'

export interface ErrorMessage {
    message: string
} 

export type Product = Prisma.ProductGetPayload<{}>
export type ProductCreate = Prisma.ProductUncheckedCreateInput

export interface ProductServiceContract {
    getAllProducts(take?: number): Promise<Product[]>
    getProductById(id: number): Promise<Product | null>
    createProduct(data: ProductCreate): Promise<Product | null>
    deleteProduct(id: number): Promise<Product | null>
    getProductsByCategory(categoryId: number): Promise<Product[]> 
} 
export interface ProductRepositoryContract {
    getProduct(take?: number): Promise<Product[]>
    getProductById(id: number): Promise<Product | null>
    createProduct(data:ProductCreate): Promise<Product>
    deleteProduct(id: number): Promise<Product | null>
    getProductsByCategory(categoryId: number): Promise<Product[]> 
}

export interface ProductControllerContract {
    getAllProducts: (req: Request<void, Product[] | ErrorMessage, void, { skip?: string, take?: string, productCategory?: string }>, res: Response<Product[] | ErrorMessage>) => void
    getProductById: (req: Request<{ id: string }, Product | ErrorMessage>, res: Response<Product | ErrorMessage>) => void
    createProduct: (req: Request<object, string | ErrorMessage, ProductCreate>, res: Response<string | ErrorMessage>) => Promise<void>
    deleteProduct: (req: Request<{ id: string }, Product | ErrorMessage>, res: Response<Product | ErrorMessage>) => void
}
