import { ProductControllerContract } from "./product.types";
import { ProductService } from "./product.service";
import { isId, isNumber } from "../generic";


export const ProductController: ProductControllerContract = {
    async getAllProducts(req, res){
        try{
            const take = res.locals.take;
            const skip = res.locals.skip;
            const cat = req.query.productCategory ;
            const sameAs = req.query.sameAs;
            if (sameAs){
                const checkedSameAs = isId(sameAs);
                if (checkedSameAs===false){
                    res.status(404).json({"message": "Wrong/Bad sameAs"});
                    return
                };
                res.status(200).json(await ProductService.getSameProducts(checkedSameAs, res.locals.take));
                return
            };
            if (!cat){
                res.status(200).json(await ProductService.getAllProducts(take, skip));
                return
            };
            const checkedCategory = isId(cat);
            if (checkedCategory===false){ 
                res.status(404).json({"message": "Wrong/Bad categoryId"});
                return
            };
            res.status(200).json(await ProductService.getProductsByCategory(checkedCategory, skip, take))
        }
        catch(error){
            if (error instanceof Error){
                if (error.cause == "NOT_FOUND"){
                    res.status(404).json({"message": "Product with that ID not found"});
                    return 
                }
            };
            res.status(500).json({"message": "Internal Server Error"});
            console.log(`Unexpected error in getAllProducts -- Controller\nError:\n${error}`)
        }
    },
    async getProductsAmount(req, res) {
        try{
            const cat = req.query.productCategory; 
            if (!cat){
                res.status(200).json(await ProductService.getProductsAmount());
                return
            };
            const checkedCategory = isId(cat);
            if (checkedCategory === false){ 
                res.status(404).json({"message": "Wrong/Bad categoryId"});
                return
            };
            res.status(200).json(await ProductService.getProductsAmount(+cat))
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"});
            console.log(`Unexpected error in getProductsAmount -- Controller\nError:\n${error}`)
        }
    },
    async getSuggestedProducts(req, res){
        try{
            const take = res.locals.take;
            const skip = res.locals.skip;
            const newProducts: string | undefined = req.query.new;
            const popularProducts: string | undefined = req.query.popular;
            if (newProducts){
                if (newProducts == "true"){
                    res.status(200).json(await ProductService.getNewProducts(skip, take))
                };
                return
            };
            if (popularProducts){
                if (popularProducts == "true"){
                    res.status(200).json(await ProductService.getPopularProducts(skip, take))
                };
                return
            };
            res.status(200).json(await ProductService.getAllProducts(take, skip))
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"});
            console.log(`Unexpected error in getSuggestedProducts -- Controller\nError:\n${error}`)
        }
    },
    async getProductById(req, res) {
        try{
            const id = req.params.id;
            const checkedId = isId(id);
            if (checkedId===false){
                res.status(400).json({"message": "Wrong ID data"});
                return
            };
            const product = await ProductService.getProductById(checkedId);
            if (!product){
                res.status(404).json({"message": "Product with that ID not found"});
                return
            };
            res.status(200).json(product)
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"});
            console.log(`Unexpected error in getProductById -- Controller\nError:\n${error}`)
        }
    },
    async createProduct(req, res) {
        try{
            const body = req.body;
            if (!body){
                res.status(422).json({"message": "Wrong body data"});
                return
            };
            if (isNumber(body.price)===false || isNumber(body.discount)===false || isNumber(body.count)===false){
                res.status(422).json({"message": "Wrong body data"});
                return
            };
            try{
                const newProduct = await ProductService.createProduct(body);
                if (!newProduct){
                    res.status(500).json({"message": "Internal Server Error"});
                    console.log(`Unexpected error after creation of product in createProduct -- Controller\nNo additional error data provided.`);
                    return
                };
                res.status(201).json(newProduct)
            }
            catch(error){
                if (error instanceof Error){
                    if (error.cause == "BAD_QUERY"){
                        res.status(422).json({"message": "Wrong body data"});
                        return
                    }
                };
                res.status(500).json({"message": "Internal Server Error"});
                console.log(`Unexpected error while creating product in createProduct -- Controller\nError:\n${error}`)
            }
        }
        catch(error){
            res.status(500).json({"message": "Internal Server Error"});
            console.log(`Unexpected error in createProduct -- Controller\nError:\n${error}`)
        }
    },
    async deleteProduct(req, res) {
        try{
            const id = req.params.id;
            const checkedId = isId(id);
            if (checkedId===false){
                res.status(400).json({"message": "Wrong ID data"});
                return
            };
            let deletedProduct;
            try{
                deletedProduct = await ProductService.deleteProduct(checkedId)
            }
            catch(error){
                if (error instanceof Error){
                    if (error.cause == "NOT_FOUND"){
                        res.status(404).json({"message": "Product with that ID not found"});
                        return 
                    }
                };
                throw error
            };
            if (!deletedProduct){
                res.status(404).json({"message": "Product with that ID not found"});
                return
            };
            res.status(200).json(deletedProduct)
        }
        catch (error){
            res.status(500).json({"message": "Internal Server Error"});
            console.log(`Unexpected error in deleteProduct -- Controller\nError:\n${error}`)
        }
    },
    async createInfoBlock(req, res) {
        try {
            const body = req.body;
            const POSSIBLE_ALIGNS = ["column", "row", "rowReversed"];
            if (!body.description || !body.media || !POSSIBLE_ALIGNS.includes(body.align) || isNumber(body.orderNum)===false || isId(body.productId)===false){
                res.status(422).json({"message": "Wrong body data"});
                return
            };
            const block = await ProductService.createProductBlock({
                productId: body.productId, 
                title: body.title, 
                description: body.description, 
                media: body.media, 
                align: body.align, 
                orderNum: body.orderNum,
                productDetailDatas: body.productDetailDatas});
            res.status(201).json(block)
        }
        catch (error){
            res.status(500).json({"message": "Internal Server Error"});
            console.log(`Unexpected error in createInfoBlock -- Controller\nError:\n${error}`)
        }
    }
}