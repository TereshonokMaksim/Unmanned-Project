import { ProductRepository } from "./product.repository";
import {
    ProductServiceContract,
    Product,
    FilteredProductHashTable,
    FilteredPopularityProductHashTable,
} from "./product.types";


export const ProductService: ProductServiceContract ={
    getAllProducts: (take?, skip?) =>{
        return ProductRepository.getAllProducts(take, skip)
    },
    getProductById: (id) => {
        return ProductRepository.getProductById(id)
    },
    createProduct(data) {
        return ProductRepository.createProduct(data)
    },
    async deleteProduct(id) {
        const product = await ProductRepository.getProductById(id);
        if (!product){
            throw new Error("What are you talking about?", {cause: "NOT_FOUND"})
        };
        return ProductRepository.deleteProduct(id)
    },
    getProductsByCategory(categoryId, skip?, take?) {
        return ProductRepository.getProductsByCategory(categoryId, skip, take)
    },
    createProductBlock: async (data) => {
        const {productDetailDatas, ...blockData} = data;
        const block = await ProductRepository.createProductBlock(blockData);
        for (let detailBlockData of productDetailDatas){
            let currentDetail = await ProductRepository.createProductDetail({
                name: detailBlockData.name, 
                orderNum: detailBlockData.orderNum, 
                productMainBlockId: block.id
            }) ;
            block.productDetailDatas.push(currentDetail);
            for (let fontData of detailBlockData.productDetailBasics){
                currentDetail.productDetailBasics.push(await ProductRepository.createDetailBasicText({
                    productDetailDataId: currentDetail.id, 
                    ...fontData
                }))
            };
            for (let fontData of detailBlockData.productDetailBolds){
                currentDetail.productDetailBolds.push(await ProductRepository.createDetailBoldText({
                    productDetailDataId: currentDetail.id, 
                    ...fontData
                }))
            }
        }
        return block
    },
    async getNewProducts(skip, take) {
        return ProductRepository.getNewProducts(skip, take)
    },
    async getPopularProducts(skip, take) {
        return ProductRepository.getPopularProducts(skip, take)
    },
    async getSameProducts(productId, limit) {
        const original = await ProductRepository.getProductById(productId);
        if (!original){
            throw new Error("What are you talking about?", {cause: "NOT_FOUND"})
        };
        /* 
            Это продукты которые будут возвращены, 
            filteredByName содержит доп параметры, которые пользователю не надо
        */
        const displayProducts: Product[] = [];
        const foundIds: number[] = [];
        
        const filteredByName: FilteredProductHashTable = {};
        const nameFilteredPopularity: FilteredPopularityProductHashTable = {1: {}};
        let indexIncrease = 1;
        /* OPTIMIZATION PURPOSES */
        if (original.name.length > 12){
            indexIncrease = 3
        };
        for (let startIndex = 0; startIndex < original.name.length - 2; startIndex+=indexIncrease){
            const word = original.name.slice(startIndex, startIndex + 3);
            const newProducts = await ProductRepository.getSameProductsByTitle(productId, word, 0, limit);
            for (let product of newProducts){
                const id = product.id;
                if (filteredByName[id]){
                    delete nameFilteredPopularity[filteredByName[id]!]![id];
                    filteredByName[id]!++;
                    if (!nameFilteredPopularity[filteredByName[id]!]){
                        nameFilteredPopularity[filteredByName[id]!] = {}
                    };
                    nameFilteredPopularity[filteredByName[id]!]![id] = product
                }
                else {
                    foundIds.push(id);
                    filteredByName[id]=1;
                    nameFilteredPopularity[1]![id] = product
                }
            }
        };
        if (foundIds.length >= limit){
            const foundTimesKeys = Object.keys(nameFilteredPopularity);
            foundTimesKeys.sort((a, b) => +b - +a);
            for (let foundTimes of foundTimesKeys){
                const foundProducts: Product[] = Object.values(nameFilteredPopularity[+foundTimes]!);
                if (foundProducts.length >= limit - displayProducts.length){
                    displayProducts.splice(displayProducts.length, 0, ...foundProducts.slice(0, limit - displayProducts.length));
                    return displayProducts
                }
                else{
                    displayProducts.splice(displayProducts.length, 0, ...foundProducts)
                }
            };
            return displayProducts
        };
        for (let ft of Object.keys(nameFilteredPopularity)){
            displayProducts.splice(0, 0, ...Object.values(nameFilteredPopularity[+ft]!))
        };
        if (original.categoryId || original.categoryId == 0){
            const similarByCategory = await ProductRepository.getSameProductsByCategory(original.categoryId, [productId, ...foundIds], 0, limit);
            if (similarByCategory.length >= limit - displayProducts.length){
                displayProducts.splice(displayProducts.length, 0, ...similarByCategory.slice(0, limit - displayProducts.length));
                return displayProducts
            };
            displayProducts.splice(displayProducts.length, 0, ...similarByCategory);
            foundIds.splice(0, 0, ...similarByCategory.map(el => el.id))
        }
        const priceDelta = original.price * Math.max(0.05, Math.min(1, 1 / Math.log10(original.price)));
        const similarByPrice = await ProductRepository.getSameProductsByPrice(original.price, priceDelta, [productId, ...foundIds], 0, limit);
        if (similarByPrice.length >= limit - displayProducts.length){
            displayProducts.splice(displayProducts.length, 0, ...similarByPrice.slice(0, limit - displayProducts.length));
            return displayProducts
        };
        displayProducts.splice(displayProducts.length, 0, ...similarByPrice);
        return displayProducts
    },
    async getProductsAmount(categoryId) {
        return ProductRepository.getProductsAmount(categoryId)
    }
}