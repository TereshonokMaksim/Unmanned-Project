import { OrderServiceContract } from "./order.types";
import { OrderRepository } from "./order.repository";


export const OrderService: OrderServiceContract = {
    async getAllOrders(userId) {
        return OrderRepository.getAllOrders(userId)
    },
    async getOrderById(orderId, userId) {
        const order = await OrderRepository.getOrderById(orderId)
        if (!order){
            throw new Error("NOT_FOUND")
        }
        if (order.user.id != userId){
            throw new Error("FORBIDDEN")
        }
        return order
    },
    async deleteOrder(orderId, userId) {
        const order = await OrderRepository.getOrderById(orderId)
        if (order?.user?.id != userId){
            throw new Error("FORBIDDEN")
        }
        const deletedOrder = await OrderRepository.deleteOrder(orderId)
        if (!deletedOrder){
            throw new Error("NOT_FOUND")
        }
        return deletedOrder
    }
}