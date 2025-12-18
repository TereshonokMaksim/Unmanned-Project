import { Router } from "express"
import { UserController } from "./user.controller"
import { meTokenMiddleware } from "../middlewares/meTokenMiddleware";

export const UserRouter = Router();

UserRouter.get('/me', meTokenMiddleware, UserController.me)
UserRouter.post('/login', UserController.login)
UserRouter.post('/register', UserController.register)