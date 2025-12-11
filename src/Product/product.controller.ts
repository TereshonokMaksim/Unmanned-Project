import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { ProductControllerContract } from "./product.types";


export const ProductController: ProductControllerContract = {
    function createProduct: async => {req: Request, res: Response} {
            try {
                const product = await ProductService.createProduct(req.body);
                res.status(201).json(product);
            } catch (error) {
                res.status(500).json({ error: 'API Server crashed' });
            }
        };
    }

    function getAllProducts: async (req: Request, res: Response) => {
            try {
                const products = await ProductService.getAllProducts();
                res.status(200).json(products);
            
            }
                catch (error) {
                    res.status(500).json({ error: 'API Server crashed' });
                }};
            const take = +req.query.take
            const skip = +req.query.skip
            if (isNaN(take) || isNaN(skip)){
                res.status(400).json({message: " Wrong skip or take"})
                return;
    }
    function getProductById: async (req: Request, res: Response) => {
            try {
                const id = +req.params.id
                if (isNaN(id)){
                res.status(400).json({message: " Wrong ID data "})
                return;
                }   
                const product = await ProductService.getProductById(req.params.id);
                if (product) {
                    res.status(200).json(product);
                } else {
                    res.status(404).json({ error: 'Product with that ID not found' });
                }
            } catch (error) {
                res.status(500).json({ error: 'API Server crashed' });
            }
    }
    function deleteProduct: async (req: Request, res: Response) => {
            try {
                const id = +req.params.id
                if (isNaN(id)){
                res.status(400).json({message: "Id must be an Integer"})
                return;
                const take = +req.query.take
                onst skip = +req.query.skip
                if (isNaN(take) || isNaN(skip)){
                    res.status(400).json({message: " Wrong skip or take"})
                    return;
                }
                const success = await ProductService.deleteProductById(req.params.id);
                try{
                    return
                }} catch {
                    if (!success) {
                        res.status(404).json({ error: 'Product not found' });
                    }
                    else {
                        res.status(400).json({error: 'Bad Request'})
                }}
            } catch (error) {
                res.status(500).json({ error: 'API Server crashed' });
            }