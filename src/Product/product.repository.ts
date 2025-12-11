import {
    Product,
    ProductCreate,
    ProductRepositoryContract
} from "./product.types";

import {client} from "../client/prismaClient"


export const ProductRepository: ProductRepositoryContract = {
    getAllProducts: async (take?: number): Promise<Product[]> => {
        try {
            const products = await client.product.findMany({
                take: take,
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
                where: { id }
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

    getProductsByCategory: async (categoryId) => {
        try {
            const products = await client.product.findMany({
                where: { categoryId }
            });
            return products;
        } catch (error) {
            throw error;
        }
    }
};