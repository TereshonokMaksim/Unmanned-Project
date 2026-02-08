import {
    ProductCreate,
    ProductRepositoryContract
} from "./product.types";
import { client } from "../client/prismaClient"
import { PrismaErrorCheck } from "../generic/repositoryErrors";


export const ProductRepository: ProductRepositoryContract = {
    getAllProducts: async (take?, skip?) => {
        try {
            return await client.product.findMany({
                take: take,
                skip: skip
            })
        } catch (error) {
            PrismaErrorCheck(error, "getAllProducts");
            throw error
        }
    },
    getProductsByCategory: async (categoryId, skip?, take?) => {
        try {
            const products = await client.product.findMany({
                where: { 
                    categoryId: categoryId
                },
                skip: skip,
                take: take
            });
            return products;
        } catch (error) {
            PrismaErrorCheck(error, "getProductsByCategory");
            throw error;
        }
    },
    getProductById: async (id) => {
        try {
            return await client.product.findUnique({
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
            })
        } catch (error) {
            PrismaErrorCheck(error, "getProductById", {id});
            throw error;
        }
    },
    createProduct: async (data: ProductCreate) => {
        try {
            return await client.product.create({
                data
            })
        } catch (error) {
            PrismaErrorCheck(error, "createProduct", data);
            throw error;
        }
    },
    deleteProduct: async (id) => {
        try {
            return await client.product.delete({
                where: { id }
            })
        } catch (error) {
            PrismaErrorCheck(error, "deleteProduct", {id});
            throw error;
        }
    },
    createDetailBasicText: async (data) => {
        try {
            return await client.productDetailBasic.create({
                data: data
            })
        } catch (error) {
            PrismaErrorCheck(error, "createDetailBasicText", data);
            throw error
        }
    },
    createDetailBoldText: async (data) => {
        try {
            return client.productDetailBold.create({data: data})
        } catch (error) {
            PrismaErrorCheck(error, "createDetailBoldText", data);
            throw error;
        }
    },
    createProductDetail: async (data) => {
        try {
            return await client.productDetailData.create({
                data: data,
                include: {
                    productDetailBolds: true,
                    productDetailBasics: true
                }
            })
        } catch (error) {
            PrismaErrorCheck(error, "createProductDetail", data);
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
            })
        } catch (error) {
            PrismaErrorCheck(error, "createProductBlock", data);
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
            PrismaErrorCheck(error, "getPopularProducts");
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
            PrismaErrorCheck(error, "getNewProducts");
            throw error
        }
    },
    async getSameProductsByTitle(originalProductId, lookForWord, skip, take) {
        try {
            return client.product.findMany({
                where: {
                    id: {
                        not: originalProductId,
                    },
                    name: {
                        contains: lookForWord
                    }
                },
                skip,
                take,
            })
        } catch (error) {
            PrismaErrorCheck(error, "getSameProductsByTitle");
            throw error
        }
    },
    async getSameProductsByCategory(categoryId, idExclude, skip, take) {
        try {
            return client.product.findMany({
                where: {
                    categoryId,
                    NOT: {
                        id: {
                            in: idExclude
                        }
                    }
                },
                skip,
                take,
            })
        } catch (error) {
            PrismaErrorCheck(error, "getSameProductsByCategory");
            throw error
        }
    },
    async getSameProductsByPrice(price, priceDelta, idExclude, skip, take) {
        try {
            return client.product.findMany({
                where: {
                    price: {
                        gte: price - priceDelta,
                        lte: price + priceDelta,
                    },
                    NOT: {
                        id: {
                            in: idExclude
                        }
                    }
                },
                skip,
                take,
            })
        } catch (error) {
            PrismaErrorCheck(error, "getSameProductsByPrice");
            throw error
        }
    },
    async getProductsAmount(categoryId) {
        try{
            return client.product.count({where: {categoryId}})
        }
        catch(error){
            PrismaErrorCheck(error, "getProductsAmount");
            throw error
        }
    },
};