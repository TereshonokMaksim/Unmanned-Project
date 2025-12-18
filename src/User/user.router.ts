import express from "express";
import { UserController } from "./user.controller";

export const UserRouter = express.Router();

UserRouter.post("/login", UserController.login)
UserRouter.post("/register", UserController.register)
UserRouter.get("/me", UserController.me)