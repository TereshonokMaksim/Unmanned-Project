import { OrderControllerContract } from "./order.types";
import { OrderService } from "./order.service";


export const OrderController: OrderControllerContract = {
    async getAllOrders(request, response){
        try {
            const userId = response.locals.userId;
            response.status(200).json(await OrderService.getAllOrders(userId))
        }
        catch(error){
            console.log(`What happened? getAllOrders Controller crashed!\nError: \n\n${error}`);
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async getOrderById(request, response) {
        try {
            const userId = response.locals.userId;
            const orderId = request.params.id;
            if (!orderId){
                response.status(400).json({message: "ID is required."});
                return
            };
            if (isNaN(+orderId)){
                response.status(422).json({message: "Invalid order ID."});
                return
            };
            const order = await OrderService.getOrderById(+orderId, userId);
            response.status(200).json(order)
        }
        catch(error){
            if (error instanceof Error){
                if (error.cause == "NOT_FOUND"){
                    response.status(404).json({message: "Order is not found!"});
                    return
                };
                if (error.cause == "FORBIDDEN"){
                    response.status(403).json({message: "Its not your Order!"});
                    return
                }
            };
            console.log(`What happened? getOrderById Controller crashed!\nError: \n\n${error}`);
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async deleteOrder(request, response) {
        try {
            const userId = response.locals.userId;
            const orderId = request.params.id;
            if (!orderId){
                response.status(400).json({message: "ID is required."});
                return
            };
            if (isNaN(+orderId)){
                response.status(422).json({message: "Invalid order ID."});
                return
            };
            const order = await OrderService.deleteOrder(+orderId, userId);
            response.status(200).json(order)
        }
        catch(error){
            if (error instanceof Error){
                if (error.cause == "NOT_FOUND"){
                    response.status(404).json({message: "Order is not found!"});
                    return
                };
                if (error.cause == "FORBIDDEN"){
                    response.status(403).json({message: "Its not your Order!"});
                    return
                };
                if (error.cause == "BAD_QUERY"){
                    response.status(422).json({"message": "Wrong body data"});
                    return
                }
            };
            console.log(`What happened? getOrderById Controller crashed!\nError: \n\n${error}`);
            response.status(500).json({message: "Internal Server Error"})
        }   
    }
}