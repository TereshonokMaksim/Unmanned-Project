import { Request, Response } from "express";
import { Prisma } from "../generated/prisma";
import type { ErrorMessage } from "../generic";
import { AuthMiddlewareLocals } from "../middlewares";


export type Order = Prisma.OrderGetPayload<{}>;
export type OrderFull = Prisma.OrderGetPayload<{
    include: {
        productForOrders: true,
        location: true,
        user: true
    }
}>;
export type OrderSafe = Prisma.OrderGetPayload<{
    include: {
        productForOrders: true,
        location: true
    }
}>;

export type OrderCreateStart = Prisma.OrderGetPayload<{
    include: {
        productForOrders: true,
        location: true
    }
}>;
export type OrderCreate = Omit<Order, "id">;

export interface OrderControllerContract {
    getAllOrders(request: Request<object, ErrorMessage | Order[], object, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | Order[], AuthMiddlewareLocals>): Promise<void>,
    getOrderById(request: Request<{id: string}, ErrorMessage | OrderSafe, object, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | OrderSafe, AuthMiddlewareLocals>): Promise<void>,
    deleteOrder(request: Request<{id: string}, ErrorMessage | OrderSafe, object, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | OrderSafe, AuthMiddlewareLocals>): Promise<void>
    // createOrder(request: Request<object, ErrorMessage | OrderFull, object, OrderCreate, AuthMiddlewareLocals>, response: Response<ErrorMessage | OrderFull, AuthMiddlewareLocals>): Promise<void>
};

export interface OrderServiceContract {
    getAllOrders(userId: number): Promise<Order[]>,
    getOrderById(orderId: number, userId: number): Promise<OrderSafe>,
    deleteOrder(orderId: number, userId: number): Promise<OrderSafe>,
    createOrder(data: OrderCreate, userId: number): Promise<OrderFull>
};

export interface OrderRepositoryContract {
    getAllOrders(userId: number): Promise<Order[]>,
    getOrderById(orderId: number): Promise<OrderFull | null>,
    deleteOrder(orderId: number): Promise<OrderFull | null>,
    createOrder(data: OrderCreate, userId: number): Promise<OrderFull>
}