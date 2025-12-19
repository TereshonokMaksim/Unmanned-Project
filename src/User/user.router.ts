import { Router } from "express"
import { UserController } from "./user.controller"
import { authMiddleware } from "..//middlewares/meTokenMiddleware";

export const UserRouter = Router();

UserRouter.get('/me', authMiddleware, UserController.me)
UserRouter.post('/login', UserController.login)
UserRouter.post('/reg', UserController.register)
UserRouter.patch('/edit_acc', authMiddleware, UserController.editAccount)
UserRouter.post('/change_password', authMiddleware, UserController.startPasswordChange)
UserRouter.get('change_password/:id', authMiddleware, UserController.verifyPasswordCode)
UserRouter.patch('/change_password', authMiddleware, UserController.changePassword)
UserRouter.post('/address', authMiddleware, UserController.createLocation)
UserRouter.patch('/address/:id', authMiddleware, UserController.editLocation)
UserRouter.delete('/address/:id', authMiddleware, UserController.deleteLocation)
UserRouter.get('/address', authMiddleware, UserController.getLocations)