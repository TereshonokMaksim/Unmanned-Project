import { ProductControllerContract } from "./product.types";
import { ProductService } from "./product.service";


export const ProductController: ProductControllerContract = {
    async getAllProducts(req, res){
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
            const cat = req.query.productCategory 
            if (!cat){
                res.status(200).json(await ProductService.getAllProducts(cookedTake, cookedSkip))
                return
            }
            if (isNaN(+cat)){ 
                res.status(404).json({"message": "Wrong/Bad categoryId"})
                return
            }
            res.status(200).json(await ProductService.getProductsByCategory(+cat, cookedTake, cookedSkip))
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
    async getProductsByCategory(req, res) {
        try {
            const { sortBy, page = 1, limit = 10 } = req.query;

            const skip = (Number(page) - 1) * Number(limit);

            let sortCondition: any = {};

        if (sortBy === 'newest') {
            sortCondition = { createdAt: -1 };
        } else if (sortBy === 'popular') {
            sortCondition = { views: -1 };
        } else {
            sortCondition = { createdAt: -1 };
        }

        const products = await ProductService.find({})
        .sort(sortCondition) 
        .skip(skip)
        .limit(Number(limit));

        const total = await ProductService.countDocuments({});

        res.json({
        status: "success",
        code: 200,
        data: {
            result: products,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
        },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });

  }
    }
}