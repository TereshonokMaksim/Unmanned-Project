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
        const {user, ...allData} = order
        return allData
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
        const {user, ...allData} = deletedOrder
        return allData
    },
    async createOrder(data, userId) {
        return await OrderRepository.createOrder(data, userId)
    },
}