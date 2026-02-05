import {
    ProductCreate,
    ProductRepositoryContract,
    GetSameProductsByCategoryParams,
    GetSameProductsByPriceParams,
} from "./product.types";

import {client} from "../client/prismaClient"


export const ProductRepository: ProductRepositoryContract = {
    getAllProducts: async (take?, skip?) => {
        try {
            const products = await client.product.findMany({
                take: take,
                skip: skip
            });
            return products;
        } catch (error) {
            // if (error instanceof Prisma.PrismaClientKnownRequestError) {
            //     if (error === "P2024") {
            //         console.log("Timed out fetching a new connection from the connection pool");
            //     }
            // }
            throw error;
        }
    },


    getProductById: async (id) => {
        try {
            const product = await client.product.findUnique({
                where: { id },
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
            });
            return product;
        } catch (error) {
            throw error;
        }
    },

    createProduct: async (data: ProductCreate) => {
        try {
            const product = await client.product.create({
                data
            });
            return product;
        } catch (error) {
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            const deleted = await client.product.delete({
                where: { id }
            });
            return deleted;
        } catch (error) {
            throw error;
        }
    },
    getProductsByCategory: async (categoryId, skip?, take?) => {
        try {
            const products = await client.product.findMany({
                where: { categoryId },
                skip: skip,
                take: take
            });
            return products;
        } catch (error) {
            throw error;
        }
    },
    createDetailBasicText: async (data) => {
        try {
            const newFontBlock = await client.productDetailBasic.create({
                data: data
            });
            return newFontBlock;
        } catch (error) {
            throw error;
        }
    },
    createDetailBoldText: async (data) => {
        try {
            return client.productDetailBold.create({data: data});
        } catch (error) {
            throw error;
        }
    },
    createProductDetail: async (data) => {
        try {
            const newDetailBlock = await client.productDetailData.create({
                data: data,
                include: {
                    productDetailBolds: true,
                    productDetailBasics: true
                }
            });
            return newDetailBlock;
        } catch (error) {
            throw error;
        }
    },
    createProductBlock: async (data) => {
        try {
            return client.productMainBlock.create({
                data: data, 
                include: {
                    productDetailDatas: {
                        include: {
                            productDetailBasics: true, 
                            productDetailBolds: true
                        }
                    }
                }
            });
        } catch (error) {
            throw error;
        }
    },
    async getPopularProducts(skip, take) {
        try{
            return client.product.findMany({
                take,
                skip,
                include:{
                    _count: {
                        select: { productForOrders: true }
                    }
                },
                orderBy: {
                    productForOrders: { _count: "desc" }
                }
            })
        }
        catch(error){
            throw error
        }
    },
    async getNewProducts(skip, take) {
        try{
            return client.product.findMany({
                take,
                skip,
                orderBy: {
                    createdAt: "desc"
                }
            })
        }
        catch(error){
            throw error
        }
    },
    async getSameProductsByTitle(productId, skip, take) {
        try {
            return client.product.findMany({
            where: {
                id: {
                not: productId,
                },
            },
            skip,
            take,
            })
        } catch (error) {
            throw error
        }
    },
    async getSameProductsByCategory(params: GetSameProductsByCategoryParams) {
        try {
            return client.product.findMany({
            where: {
                categoryId: params.categoryId,
            },
            skip: params.skip,
            take: params.take,
            })
        } catch (error) {
            throw error
        }
    },
    async getSameProductsByPrice(params: GetSameProductsByPriceParams) {
        try {
            return client.product.findMany({
            where: {
                price: {
                gte: params.price - params.priceDelta,
                lte: params.price + params.priceDelta,
                },
            },
            skip: params.skip,
            take: params.take,
            })
        } catch (error) {
            throw error
        }
}
    async getProductsAmount(categoryId) {
        try{
            return client.product.count({where: {categoryId}})
        }
        catch(error){
            throw error
        }
    },
};