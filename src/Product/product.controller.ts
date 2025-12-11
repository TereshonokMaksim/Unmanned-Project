import { Request, Response } from "express";
import { ProductService } from "./product.service";



export function createProductHandler(productService: ProductService) {
    return async (req: Request, res: Response) => {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create product' });
        }
    };
}

export function getAllProductsHandler(productService: ProductService) {
    return async (req: Request, res: Response) => {
        try {
            try {
                const products = await productService.getAllProducts();
                res.status(200).json(products);
            
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to retrieve products' });
            }
            
        } catch (error) {
                res.status(400).json({ error: 'Wrong skip or take' });
            }
    };
}
export function getProductByIdHandler(productService: ProductService) {
    return async (req: Request, res: Response) => {
        try {
            const product = await productService.getProductById(req.params.id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve product' });
        }
    };
}
export function deleteProductByIdHandler(productService: ProductService) {
    return async (req: Request, res: Response) => {
        try {
            const success = await productService.deleteProductById(req.params.id);
            if (success) {
                res.status(200).json({ message: 'Product deleted successfully' });
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    };
}

export const ProductController = {
    createProduct: createProductHandler,
    getAllProducts: getAllProductsHandler,
    getProductById: getProductByIdHandler,
    deleteProductById: deleteProductByIdHandler
};
