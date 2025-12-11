import {Response, Request} from "express";
import  {ProductControllerContract, ProductCreate, ProductServiceContract, ErrorMessage, Product} from "./product.types";

export class ProductController implements ProductControllerContract {
    private productService: ProductServiceContract;
    constructor(productService: ProductServiceContract) {
        this.productService = productService;
    }
    getAllProducts: ((req: Request<void, Product[] | ErrorMessage, void, { skip?: string; take?: string; productCategory?: string; }>, res: Response<Product[] | ErrorMessage>) => void) | undefined;
    getProductById: ((req: Request<{ id: string; }, Product | ErrorMessage>, res: Response<Product | ErrorMessage>) => void) | undefined;
    deleteProduct: ((req: Request<{ id: string; }, Product | ErrorMessage>, res: Response<Product | ErrorMessage>) => void) | undefined;

    async createProduct(req: Request<object, string | ErrorMessage, ProductCreate>, res: Response<string | ErrorMessage>): Promise<void> {
        try {
            const productData: ProductCreate = req.body;
            const newProduct = await this.productService.createProduct(productData);
            if (newProduct) {
                res.status(201).send("Product created successfully");
            } else {
                res.status(400).json({ message: "Failed to create product" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

    getAllProducts(req: Request<void, Product[] | ErrorMessage, void, { skip?: string, take?: string, productCategory?: string }>, res: Response<Product[] | ErrorMessage>): void {
        const take = req.query.take ? parseInt(req.query.take) : undefined;
        this.productService.getAllProducts(take)
            .then(products => res.status(200).json(products))
            .catch(() => res.status(500).json({ message: "Internal server error" }));
    }
    getProductById(req: Request<{ id: string }, Product | ErrorMessage>, res: Response<Product | ErrorMessage>): void {
        const id = parseInt(req.params.id);
        this.productService.getProductById(id)
            .then(product => {
                if (product) {
                    res.status(200).json(product);
                } else {
                    res.status(404).json({ message: "Product not found" });
                }
            })
            .catch(() => res.status(500).json({ message: "Internal server error" }));
    }
    deleteProduct(req: Request<{ id: string }, Product | ErrorMessage>, res: Response<Product | ErrorMessage>): void {
        const id = parseInt(req.params.id);
        this.productService.deleteProduct(id)
            .then(deletedProduct => {
                if (deletedProduct) {
                    res.status(200).json(deletedProduct);
                } else {
                    res.status(404).json({ message: "Product not found" });
                }
            })
            .catch(() => res.status(500).json({ message: "Internal server error" }));
    }

function getAllProducts(req: any, arg1: { prototype: globalThis.Request; }, res: any, arg3: { prototype: globalThis.Response; error(): globalThis.Response; json(data: any, init?: ResponseInit): globalThis.Response; redirect(url: string | URL, status?: number): globalThis.Response; }) {
    throw new Error("Function not implemented.");
}
function getProductById(req: any, arg1: { prototype: globalThis.Request; }, res: any, arg3: { prototype: globalThis.Response; error(): globalThis.Response; json(data: any, init?: ResponseInit): globalThis.Response; redirect(url: string | URL, status?: number): globalThis.Response; }) {
    throw new Error("Function not implemented.");
}

function deleteProduct(req: any, arg1: { prototype: globalThis.Request; }, res: any, arg3: { prototype: globalThis.Response; error(): globalThis.Response; json(data: any, init?: ResponseInit): globalThis.Response; redirect(url: string | URL, status?: number): globalThis.Response; }) {
    throw new Error("Function not implemented.");
}

