import { NextFunction, Request, Response } from "express"
import { UserRepository } from "../User/user.repository"
import { ErrorMessage } from "../generic"
import { AuthMiddlewareLocals } from "./middlewares.types"


export const adminOnlyMiddleware = async (req: Request, res: Response<ErrorMessage, AuthMiddlewareLocals>, next: NextFunction) => {
    /* 
        REQUIRES AuthMiddleware TO BE LAUNCHED BEFORE THIS MIDDLEWARE!
    */
    const user = await UserRepository.getUserSafelyById(res.locals.userId);
    if (!user?.isAdmin) {
        res.status(403).json({message: "Admin access required."}) ;
        return
    };
    next()
}