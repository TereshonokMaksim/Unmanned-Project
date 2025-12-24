import { Router } from "express";
import { OrderController } from "./order.controller";
import { authMiddleware } from "../middlewares/meTokenMiddleware";


export const OrderRouter = Router();

OrderRouter.get("/", authMiddleware, OrderController.getAllOrders)
OrderRouter.get("/:id", authMiddleware, OrderController.getOrderById)
OrderRouter.delete("/:id", authMiddleware, OrderController.deleteOrder)