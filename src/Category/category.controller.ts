import { CategoryControllerContract } from "./category.types";
import { CategoryService } from "./category.service";


export const CategoryController: CategoryControllerContract = {
    async getAllCategories(req, res){
        try{
            const take: string | undefined = req.query.take
            const skip: string | undefined = req.query.skip
            let cookedSkip: number | undefined = undefined; let cookedTake: number | undefined = undefined
            if (take){
                if (isNaN(+take)){
                    res.status(400).json({"message": "Wrong skip or take"})
                    return
                }
                if (+take < 0 || Math.round(+take) != +take){
                    res.status(400).json({"message": "Wrong skip or take"})
                    return
                }
                cookedTake = +take
            }
            if (skip){
                if (isNaN(+skip)){
                    res.status(400).json({"message": "Wrong skip or take"})
                    return
                }
                if (+skip < 0 || Math.round(+skip) != +skip){
                    res.status(400).json({"message": "Wrong skip or take"})
                    return
                }
                cookedSkip = +skip
            }
            res.status(200).json(await CategoryService.getAllCategories(cookedTake, cookedSkip))
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"})
            console.log(`Unexpected error in getAllCategories -- Controller\nError:\n${error}`)
        }
    },
    async createCategory(req, res) {
        try{
            const body = req.body
            if (!body){
                res.status(422).json({"message": "Wrong body data"})
                return
            }
            if (!body.icon || !body.name){
                res.status(422).json({"message": "Wrong body data"})
                return
            }
            try{
                const newCategory = await CategoryService.createCategory(body)
                if (!newCategory){
                    res.status(500).json({"message": "Internal Server Error"})
                    console.log(`Unexpected error after creation of category in createCategory -- Controller\nNo additional error data provided.`)
                    return
                }
                res.status(201).json(newCategory)
            }
            catch(error){
                res.status(500).json({"message": "Internal Server Error"})
                console.log(`Unexpected error while creating category in createCategory -- Controller\nError:\n${error}`)
            }
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"})
            console.log(`Unexpected error in createCategory -- Controller\nError:\n${error}`)
        }
    },
    async deleteCategory(req, res) {
        try{
            const id = req.params.id
            if (isNaN(+id)){
                res.status(400).json({"message": "Wrong ID data"})
                return
            }
            if (+id != Math.round(+id)){
                res.status(400).json({"message": "Wrong ID data"})
                return
            }
            let deletedCategory;
            try{
                deletedCategory = await CategoryService.deleteCategory(+id)
            }
            catch(error){
                if (error instanceof Error){
                    if (error.message == "NOT_FOUND"){
                        res.status(404).json({"message": "Category with that ID not found"})
                        return 
                    }
                }
                throw error
            }
            if (!deletedCategory){
                res.status(404).json({"message": "Category with that ID not found"})
                return
            }
            res.status(200).json(deletedCategory)
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"})
            console.log(`Unexpected error in deleteCategory -- Controller\nError:\n${error}`)
        }
    }
}