import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { ProductControllerContract } from "./product.types";


export const ProductController: ProductControllerContract
    function createProductHandler(productService: ProductService) {
        return async (req: Request, res: Response) => {
            try {
                const product = await productService.createProduct(req.body);
                res.status(201).json(product);
            } catch (error) {
                res.status(500).json({ error: 'Failed to create product' });
            }
        };
    }

    function getAllProductsHandler(productService: ProductService) {
        return async (req: Request, res: Response) => {
                try {
                    const products = await productService.getAllProducts();
                    res.status(200).json(products);
                
                }
                catch (error) {
                    res.status(500).json({ error: 'Failed to retrieve products' });
                }};
    }
    function getProductByIdHandler(productService: ProductService) {
        return async (req: Request, res: Response) => {
            try {
                const id = +req.params.id
                if (isNaN(id)){
                res.status(400).json({message: "Id must be an Integer"})
                return;
                }   
                const product = await productService.getProductById(req.params.id);
                if (product) {
                    res.status(200).json(product);
                } else {
                    res.status(404).json({ error: 'Product not found' });
                }
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
    }
    function deleteProductByIdHandler(productService: ProductService) {
        return async (req: Request, res: Response) => {
            try {
                const id = +req.params.id
                if (isNaN(id)){
                res.status(400).json({message: "Id must be an Integer"})
                return;
                }
                const success = await productService.deleteProductById(req.params.id);
                try{
                    if (success) {
                        res.status(200).json({ message: 'Product deleted successfully' });
                }} catch {
                    if (!success) {
                        res.status(404).json({ error: 'Product not found' });
                    }
                    else {
                        res.status(400).json({error: 'Bad Request'})
                }
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
    }