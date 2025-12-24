import { Request, Response } from "express";
import { Prisma } from "../generated/prisma";


export interface ErrorMessage {
    message: string
} 

export type Order = Prisma.OrderGetPayload<{}>
export type OrderFull = Prisma.OrderGetPayload<{
    include: {
        productForOrders: true,
        location: true,
        user: true
    }
}>

export type AuthMiddlewareLocals = {userId: number}

export interface OrderControllerContract {
    getAllOrders(request: Request<object, ErrorMessage | Order[], object, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | Order[], AuthMiddlewareLocals>): Promise<void>
    getOrderById(request: Request<{id: string}, ErrorMessage | OrderFull, object, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | OrderFull, AuthMiddlewareLocals>): Promise<void>
    deleteOrder(request: Request<{id: string}, ErrorMessage | OrderFull, object, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | OrderFull, AuthMiddlewareLocals>): Promise<void>
}

export interface OrderServiceContract {
    getAllOrders(userId: number): Promise<Order[]>
    getOrderById(orderId: number, userId: number): Promise<OrderFull>
    deleteOrder(orderId: number, userId: number): Promise<OrderFull>
}

export interface OrderRepositoryContract {
    getAllOrders(userId: number): Promise<Order[]>
    getOrderById(orderId: number): Promise<OrderFull | null>
    deleteOrder(orderId: number): Promise<OrderFull | null>
}