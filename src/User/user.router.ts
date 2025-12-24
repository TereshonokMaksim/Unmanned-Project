import { Router } from "express"
import { UserController } from "./user.controller"
import { authMiddleware } from "..//middlewares/meTokenMiddleware";


export const UserRouter = Router();

UserRouter.get('/me', authMiddleware, UserController.me)
UserRouter.post('/login', UserController.login)
UserRouter.post('/reg', UserController.register)
UserRouter.patch('/profile', authMiddleware, UserController.editAccount)
UserRouter.post('/password', authMiddleware, UserController.startPasswordChange)
UserRouter.get('/password/:code', authMiddleware, UserController.verifyPasswordCode)
UserRouter.patch('/password', authMiddleware, UserController.changePassword)
UserRouter.post('/addresses', authMiddleware, UserController.createLocation)
UserRouter.patch('/addresses/:id', authMiddleware, UserController.editLocation)
UserRouter.delete('/addresses/:id', authMiddleware, UserController.deleteLocation)
UserRouter.get('/addresses', authMiddleware, UserController.getLocations)