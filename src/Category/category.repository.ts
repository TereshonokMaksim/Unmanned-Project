import { CategoryRepositoryContract } from "./category.types";
import {client} from "../client/prismaClient"


export const CategoryRepository: CategoryRepositoryContract = {
    getAllCategories: async (take?, skip?) => {
        try {
            const categories = await client.category.findMany({
                take: take,
                skip: skip
            });
            return categories;
        } catch (error) {
            // if (error instanceof Prisma.PrismaClientKnownRequestError) {
            //     if (error === "P2024") {
            //         console.log("Timed out fetching a new connection from the connection pool");
            //     }
            // }
            throw error;
        }
    },


    getCategoryById: async (id) => {
        try {
            const category = await client.category.findUnique({
                where: { id }
            });
            return category;
        } catch (error) {
            throw error;
        }
    },

    createCategory: async (data) => {
        try {
            const category = await client.category.create({
                data
            });
            return category;
        } catch (error) {
            throw error;
        }
    },

    deleteCategory: async (id) => {
        try {
            const deleted = await client.category.delete({
                where: { id }
            });
            return deleted;
        } catch (error) {
            throw error;
        }
    }
};