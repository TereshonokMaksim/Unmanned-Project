import { Router } from "express"
import { UserController } from "./user.controller"
import { authMiddleware } from "..//middlewares/meTokenMiddleware";

export const UserRouter = Router();

UserRouter.get('/me', authMiddleware, UserController.me)
UserRouter.post('/login', UserController.login)
UserRouter.post('/reg', UserController.register)
UserRouter.patch('/edit_acc', authMiddleware, UserController.editAccount)
UserRouter.post('/change_password', authMiddleware, UserController.changePassword)
UserRouter.post('/address', authMiddleware, UserController.createLocation)
UserRouter.patch('/address/:id', UserController.editLocation)
UserRouter.delete('/address/:id', UserController.deleteLocation)
UserRouter.get('/address', authMiddleware, UserController.getLocations)