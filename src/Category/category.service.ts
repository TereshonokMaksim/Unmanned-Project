import { CategoryRepository } from "./category.repository";
import { CategoryServiceContract } from "./category.types";


export const CategoryService: CategoryServiceContract ={
    getAllCategories: (take?) =>{
        return CategoryRepository.getAllCategories(take)
    },
    createCategory(data) {
        return CategoryRepository.createCategory(data)
    },
    async deleteCategory(id) {
        const category = await CategoryRepository.getCategoryById(id);

        if (!category){
            throw new Error("NOT_FOUND")
        }
        return CategoryRepository.deleteCategory(id)
    }
}