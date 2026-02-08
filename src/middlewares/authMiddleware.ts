import { NextFunction, Request, Response } from "express";
import { ENV } from "../config/env";
import { verify } from "jsonwebtoken";


export function authMiddleware(request: Request, response: Response, next: NextFunction){
    // Checks whether token is ok or it needs help
    const token = request.headers.authorization ;
    if (!token){
        response.status(401).json({message: "Incorrect JWT token"});
        return
    };
    const [authType, tokenData] = token.split(" ");
    if (!authType || authType != "Bearer" || !tokenData){
        response.status(401).json({message: "Incorrect JWT token"});
        return
    };
    const actualData = verify(tokenData, ENV.JWT_ACCESS_SECRET_KEY);
    if (typeof(actualData) === "string"){
        response.status(401).json({message: "Incorrect JWT token"});
        return
    };
    if (isNaN(actualData.id) || Math.round(actualData.id) != actualData.id){
        response.status(401).json({message: "Incorrect JWT token"});
        return
    };
    response.locals.userId = actualData.id;
    next()
}