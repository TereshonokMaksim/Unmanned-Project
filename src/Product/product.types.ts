import { Request, Response } from 'express'
import { Prisma } from '../generated/prisma/client'

export interface ErrorMessage {
    message: string
}
export interface GetSameProductsByCategoryParams{
  categoryId: number
  skip?: number
  take?: number
}
export interface GetSameProductsByPriceParams {
  price: number
  priceDelta: number
  skip?: number
  take?: number
}

export type Product = Prisma.ProductGetPayload<{}>
export type ProductCreate = Prisma.ProductUncheckedCreateInput

export type FontBlock = Prisma.ProductDetailBasicGetPayload<{}>
export type FontBlockCreate = Prisma.ProductDetailBasicUncheckedCreateInput
export type DetailFontBlockCreate = FontBlockCreate & {
    bold: boolean
}
export type DetailData = Prisma.ProductDetailDataGetPayload<{include: {productDetailBasics: true, productDetailBolds: true}}>
export type DetailDataInput = Prisma.ProductDetailDataUncheckedCreateInput
export type DetailDataCreate = Prisma.ProductDetailDataGetPayload<{}> & {
    detailBlocks?: DetailFontBlockCreate[]
}
export type ProductBlock = Prisma.ProductMainBlockGetPayload<{include: {productDetailDatas: true}}>
export type ProductBlockInput = Prisma.ProductMainBlockUncheckedCreateInput
export type FullProductBlock = Prisma.ProductMainBlockGetPayload<{
    include: {
        productDetailDatas: {
            include: {
                productDetailBasics: true, 
                productDetailBolds: true
            }
        }
    }
}>
export type ProductBlockCreate = Omit<FullProductBlock, "id">
export type FullProduct = Prisma.ProductGetPayload<{
    include: {
        productMainBlocks: {
            include: {
                productDetailDatas: {
                    include: {
                        productDetailBasics: true, 
                        productDetailBolds: true
                    }
                }
            }
        }
    }
}>

export interface PaginationMiddlewareLocals {
    skip?: number
    take?: number
}

export interface ProductServiceContract {
    getAllProducts(take?: number, skip?: number): Promise<Product[]>
    getProductById(id: number): Promise<FullProduct | null>
    createProduct(data: ProductCreate): Promise<Product | null>
    deleteProduct(id: number): Promise<Product | null>
    getProductsByCategory(categoryId: number, take?: number, skip?: number): Promise<Product[]> 
    createProductBlock(data: ProductBlockInput): Promise<FullProductBlock>
    createProductDetail(data: DetailDataInput): Promise<DetailData>
    createDetailBasicText(data: FontBlockCreate): Promise<FontBlock>
    createDetailBoldText(data: FontBlockCreate): Promise<FontBlock>
    // amazing
    getNewProducts(skip?: number, take?: number): Promise<Product[]>
    getPopularProducts(skip?: number, take?: number): Promise<Product[]>
    getSameProducts(productId: number,limit: number,priceDelta?: number): Promise<Product[]>
    getSameProductsByTitle(productId: number,skip?: number,take?: number): Promise<Product[]>
    getSameProductsByCategory(params: GetSameProductsByCategoryParams): Promise<Product[]>
    getSameProductsByPrice(params:GetSameProductsByPriceParams): Promise<Product[]>
    getProductsAmount(categoryId?: number): Promise<number>
} 
export interface ProductRepositoryContract {
    getAllProducts(take?: number, skip?: number): Promise<Product[]>
    getProductById(id: number): Promise<FullProduct | null>
    createProduct(data:ProductCreate): Promise<Product>
    deleteProduct(id: number): Promise<Product | null>
    getProductsByCategory(categoryId: number, take?: number, skip?: number): Promise<Product[]> 
    createProductBlock(data: ProductBlockInput): Promise<FullProductBlock>
    createProductDetail(data: DetailDataInput): Promise<DetailData>
    createDetailBasicText(data: FontBlockCreate): Promise<FontBlock>
    createDetailBoldText(data: FontBlockCreate): Promise<FontBlock>
    getNewProducts(skip?: number, take?: number): Promise<Product[]>
    getPopularProducts(skip?: number, take?: number): Promise<Product[]>
    // getSameProducts(productId: number,limit: number,priceDelta?: number, skip?: number, take?: number): Promise<Product[]>
    getSameProductsByTitle(productId: number,skip?: number,take?: number): Promise<Product[]>
    getSameProductsByCategory(params: GetSameProductsByCategoryParams): Promise<Product[]>
    getSameProductsByPrice(params:GetSameProductsByPriceParams): Promise<Product[]>
    getProductsAmount(categoryId?: number): Promise<number>
}

export interface ProductControllerContract {
    getSuggestedProducts: (req: Request<object, Product[] | ErrorMessage, object, { perPage?: string, page?: string, productCategory?: string, new?: string, popular?: string }>, res: Response<Product[] | ErrorMessage, PaginationMiddlewareLocals>) => Promise<void>
    getAllProducts: (req: Request<object, Product[] | ErrorMessage, object, { perPage?: string, page?: string, productCategory?: string }>, res: Response<Product[] | ErrorMessage, PaginationMiddlewareLocals>) => Promise<void>
    getProductById: (req: Request<{ id: string }, FullProduct | ErrorMessage>, res: Response<FullProduct | ErrorMessage>) => Promise<void>
    createProduct: (req: Request<object, Product | ErrorMessage, ProductCreate>, res: Response<Product | ErrorMessage>) => Promise<void>
    deleteProduct: (req: Request<{ id: string }, Product | ErrorMessage>, res: Response<Product | ErrorMessage>) => Promise<void>
    createInfoBlock: (req: Request<object, FullProductBlock | ErrorMessage, ProductBlockCreate>, res: Response<FullProductBlock | ErrorMessage>) => Promise<void>
    getProductsAmount: (req: Request<object, number | ErrorMessage, object, {categoryId?: string}>, res: Response<number | ErrorMessage>) => Promise<void>
    // getSpecialProducts: (req: Request<object, Product[] | ErrorMessage, object, {skip?: string, take?: string}>, res: Response<Product[] | ErrorMessage>) => Promise<void>
    getSameProducts: (req: Request<{ id: string },Product[] | ErrorMessage,object,{limit?: string,priceDelta?: string}>,res: Response<Product[] | ErrorMessage>) => Promise<void>
    // 
}
