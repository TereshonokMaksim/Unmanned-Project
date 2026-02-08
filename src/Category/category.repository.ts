import { CategoryRepositoryContract } from "./category.types";
import { client } from "../client/prismaClient"
import { PrismaErrorCheck } from "../generic";


export const CategoryRepository: CategoryRepositoryContract = {
    getAllCategories: async (take?, skip?) => {
        try {
            return await client.category.findMany({
                take: take,
                skip: skip
            })
        } catch (error) {
            PrismaErrorCheck(error, "getAllCategories");
            throw error
        }
    },


    getCategoryById: async (id) => {
        try {
            return await client.category.findUnique({
                where: { id }
            })
        } catch (error) {
            PrismaErrorCheck(error, "getCategoryById", {id});
            throw error
        }
    },

    createCategory: async (data) => {
        try {
            return await client.category.create({
                data
            })
        } catch (error) {
            PrismaErrorCheck(error, "createCategory", data);
            throw error
        }
    },

    deleteCategory: async (id) => {
        try {
            return await client.category.delete({
                where: { id }
            })
        } catch (error) {
            PrismaErrorCheck(error, "deleteCategory", [id])
            throw error
        }
    }
};