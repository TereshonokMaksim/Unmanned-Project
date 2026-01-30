import { ProductControllerContract } from "./product.types";
import { ProductService } from "./product.service";


export const ProductController: ProductControllerContract = {
    async getAllProducts(req, res){
        try{
            const take = res.locals.take
            const skip = res.locals.skip
            const cat = req.query.productCategory 
            if (!cat){
                res.status(200).json(await ProductService.getAllProducts(take, skip))
                return
            }
            if (isNaN(+cat)){ 
                res.status(404).json({"message": "Wrong/Bad categoryId"})
                return
            }
            res.status(200).json(await ProductService.getProductsByCategory(+cat, take, skip))
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"})
            console.log(`Unexpected error in getAllProducts -- Controller\nError:\n${error}`)
        }
    },
    async getProductsAmount(req, res) {
        try{
            const cat = req.query.categoryId 
            if (!cat){
                res.status(200).json(await ProductService.getProductsAmount())
                return
            }
            if (isNaN(+cat)){ 
                res.status(404).json({"message": "Wrong/Bad categoryId"})
                return
            }
            res.status(200).json(await ProductService.getProductsAmount(+cat))
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"})
            console.log(`Unexpected error in getProductsAmount -- Controller\nError:\n${error}`)
        }
    },
    async getSuggestedProducts(req, res){
        try{
            const take = res.locals.take
            const skip = res.locals.skip
            const newProducts: string | undefined = req.query.new
            const popularProducts: string | undefined = req.query.popular
            console.log(newProducts, popularProducts)
            if (newProducts){
                if (newProducts == "true"){
                    res.status(200).json(await ProductService.getNewProducts(skip, take))
                }
                return
            }
            if (popularProducts){
                if (popularProducts == "true"){
                    res.status(200).json(await ProductService.getPopularProducts(skip, take))
                }
                return
            }
            res.status(200).json(await ProductService.getAllProducts(take, skip))
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"})
            console.log(`Unexpected error in getSuggestedProducts -- Controller\nError:\n${error}`)
        }
    }
    ,
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
    },
    async createInfoBlock(req, res) {
        try{
            const body = req.body
            const POSSIBLE_ALIGNS = ["column", "row", "rowReversed"]
            if (!body.description || !body.media || !POSSIBLE_ALIGNS.includes(body.align) || !body.orderNum || !body.productId){
                res.status(422).json({"message": "Wrong body data"})
                return
            }
            if (isNaN(body.productId) || isNaN(body.orderNum)){
                res.status(422).json({"message": "Wrong body data"})
                return
            }
            const block = await ProductService.createProductBlock({productId: body.productId, title: body.title, description: body.description, media: body.media, align: body.align, orderNum: body.orderNum})
            for (let detailBlockData of body.productDetailDatas){
                let currentDetail = await ProductService.createProductDetail({name: detailBlockData.name, orderNum: detailBlockData.orderNum, productMainBlockId: block.id}) 
                block.productDetailDatas.push(currentDetail)
                for (let fontData of detailBlockData.productDetailBasics){
                    currentDetail.productDetailBasics.push(fontData)
                }
                for (let fontData of detailBlockData.productDetailBolds){
                    currentDetail.productDetailBolds.push(fontData)
                }
            }
            res.status(201).json(block)
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"})
            console.log(`Unexpected error in createInfoBlock -- Controller\nError:\n${error}`)
        }
    },
    // async getSpecialProducts(req, res) {
    //     try{
    //         const {skip, take, new: anotherNew, popular} = req.query
    //         let cookedTake, cookedSkip
    //         if (take){
    //             if (isNaN(+take)){
    //                 res.status(400).json({"message": "Wrong skip or take"})
    //                 return
    //             }
    //             if (+take < 0 || Math.round(+take) != +take){
    //                 res.status(400).json({"message": "Wrong skip or take"})
    //                 return
    //             }
    //             cookedTake = +take
    //         }
    //         if (skip){
    //             if (isNaN(+skip)){
    //                 res.status(400).json({"message": "Wrong skip or take"})
    //                 return
    //             }
    //             if (+skip < 0 || Math.round(+skip) != +skip){
    //                 res.status(400).json({"message": "Wrong skip or take"})
    //                 return
    //             }
    //             cookedSkip = +skip
    //         }
    //         if (anotherNew){
    //             if (anotherNew == "true"){
    //                 res.status(200).json(await ProductService.getNewProducts(cookedSkip, cookedTake))
    //             }
    //             return
    //         }
    //         if (popular){
    //             if (popular == "true"){
    //                 res.status(200).json(await ProductService.getPopularProducts(cookedSkip, cookedTake))
    //             }
    //         }
    //     }
    //     catch(error){
    //         res.status(500).json({"message": "Internal Server Error"})
    //         console.log(`Unexpected error in getSpecialProducts -- Controller\nError:\n${error}`)
    //     }
    // },
}