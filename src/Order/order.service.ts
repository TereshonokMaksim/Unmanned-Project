import { OrderServiceContract } from "./order.types";
import { OrderRepository } from "./order.repository";


export const OrderService: OrderServiceContract = {
    async getAllOrders(userId) {
        return OrderRepository.getAllOrders(userId)
    },
    async getOrderById(orderId, userId) {
        const order = await OrderRepository.getOrderById(orderId);
        if (!order){
            throw new Error("What are you talking about?", {cause: "NOT_FOUND"})
        };
        if (order.user.id != userId){
            throw new Error("You are not the one you try to pretend.", {cause: "FORBIDDEN"})
        };
        const {user, ...allData} = order;
        return allData
    },
    async deleteOrder(orderId, userId) {
        const order = await OrderRepository.getOrderById(orderId);
        if (order?.user?.id != userId){
            throw new Error("You are not the one you try to pretend.", {cause: "FORBIDDEN"})
        };
        const deletedOrder = await OrderRepository.deleteOrder(orderId);
        if (!deletedOrder){
            throw new Error("What are you talking about?", {cause: "NOT_FOUND"})
        };
        const {user, ...allData} = deletedOrder;
        return allData
    },
    async createOrder(data, userId) {
        return await OrderRepository.createOrder(data, userId)
    }
}