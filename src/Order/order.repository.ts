import { client } from "../client/prismaClient";
import { OrderRepositoryContract } from "./order.types";
import { PrismaErrorCheck } from "../generic";


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
            PrismaErrorCheck(error, "getAllOrders");
            throw error
        }
    },
    async getOrderById(orderId) {
        try{
            return client.order.findUnique({where: {id: orderId}, include: {location: true, productForOrders: true, user: true}})
        }
        catch(error){
            PrismaErrorCheck(error, "getOrderById");
            throw error
        }
    },
    async deleteOrder(orderId) {
        try{
            return client.order.delete({where: {id: orderId}, include: {location: true, productForOrders: true, user: true}})
        }
        catch(error){
            PrismaErrorCheck(error, "deleteOrder");
            throw error
        }
    },
    async createOrder(data, userId) {
        try{
            return await client.order.create({data: {
                customerName: data.customerName,
                customerPatronymic: data.customerPatronymic,
                customerPhoneNumber: data.customerPhoneNumber,
                customerEmail: data.customerEmail,
                customerComment: data.customerComment,
                deliveryMethod: data.deliveryMethod,
                paymentMethod: data.paymentMethod,
                totalPrice: data.totalPrice,
                totalDiscount: data.totalDiscount,
                userId: userId,
                locationId: data.locationId
            }, include: {location: true, productForOrders: true, user: true}})
        }
        catch(error){
            PrismaErrorCheck(error, "createOrder", data);
            throw error
        }
    }
}