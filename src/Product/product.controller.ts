import { ProductControllerContract } from "./product.types";
import { ProductService } from "./product.service";


export const ProductController: ProductControllerContract = {
    async getAllProducts(req, res){
        try{
            const take = req.query.take
            if (take){
                if (isNaN(+take)){
                    res.status(400).json({"message": "Wrong skip or take"})
                    return
                }
                if (+take < 0 || Math.round(+take) != +take){
                    res.status(400).json({"message": "Wrong skip or take"})
                    return
                }
                res.status(200).json(await ProductService.getAllProducts(+take))
                return
            }
            res.status(200).json(await ProductService.getAllProducts())
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"})
            console.log(`Unexpected error in getAllProducts -- Controller\nError:\n${error}`)
        }
    },
    async getProductById(req, res) {
        try{
            const id = req.params.id
            if (isNaN(+id)){
                res.status(400).json({"message": "Wrong ID data"})
                return
            }
            if (+id != Math.round(+id)){
                // Float number as id
                res.status(400).json({"message": "Wrong ID data"})
                return
            }
            const product = await ProductService.getProductById(+id)
            if (!product){
                res.status(404).json({"message": "Product with that ID not found"})
                return
            }
            res.status(200).json(product)
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"})
            console.log(`Unexpected error in getProductById -- Controller\nError:\n${error}`)
        }
    },
    async createProduct(req, res) {
        try{
            const body = req.body
            if (!body){
                res.status(422).json({"message": "Wrong body data"})
                return
            }
            if (isNaN(body.price) || isNaN(body.discount) || isNaN(body.count)){
                res.status(422).json({"message": "Wrong body data"})
                return
            }
            try{
                const newProduct = await ProductService.createProduct(body)
                if (!newProduct){
                    res.status(500).json({"message": "Internal Server Error"})
                    console.log(`Unexpected error after creation of product in createProduct -- Controller\nNo additional error data provided.`)
                    return
                }
                res.status(201).json(newProduct)
            }
            catch(error){
                res.status(500).json({"message": "Internal Server Error"})
                console.log(`Unexpected error while creating product in createProduct -- Controller\nError:\n${error}`)
            }
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"})
            console.log(`Unexpected error in createProduct -- Controller\nError:\n${error}`)
        }
    },
    async deleteProduct(req, res) {
        try{
            const id = req.params.id
            if (isNaN(+id)){
                res.status(400).json({"message": "Wrong ID data"})
                return
            }
            if (+id != Math.round(+id)){
                // Float number as id
                res.status(400).json({"message": "Wrong ID data"})
                return
            }
            let deletedProduct;
            try{
                deletedProduct = await ProductService.deleteProduct(+id)
            }
            catch(error){
                if (error instanceof Error){
                    if (error.message == "NOT_FOUND"){
                        res.status(404).json({"message": "Product with that ID not found"})
                        return 
                    }
                }
                throw error
            }
            if (!deletedProduct){
                res.status(404).json({"message": "Product with that ID not found"})
                return
            }
            res.status(200).json(deletedProduct)
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"})
            console.log(`Unexpected error in deleteProduct -- Controller\nError:\n${error}`)
        }
    }
}