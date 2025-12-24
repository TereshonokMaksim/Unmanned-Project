import { client } from "../client/prismaClient";
import { OrderRepositoryContract } from "./order.types";


export const OrderRepository: OrderRepositoryContract = {
    async getAllOrders(userId) {
        try{
            return await client.order.findMany({
                where: {
                    userId: userId
                }
            }) 
        }
        catch(error){
            console.log(`-----------\ngetAllOrders Error:\n${error}\n-----------`)
            throw error
        }
    },
    async getOrderById(orderId) {
        try{
            return client.order.findUnique({where: {id: orderId}, include: {location: true, productForOrders: true, user: true}})
        }
        catch(error){
            console.log(`-----------\ngetOrderById Error:\n${error}\n-----------`)
            throw error
        }
    },
    async deleteOrder(orderId) {
        try{
            return client.order.delete({where: {id: orderId}, include: {location: true, productForOrders: true, user: true}})
        }
        catch(error){
            console.log(`-----------\ndeleteOrder Error:\n${error}\n-----------`)
            throw error
        }
    },
}