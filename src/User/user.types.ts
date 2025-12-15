import { Prisma } from "../generated/prisma";
import { Request, Response } from "express";

export interface ErrorMessage {
    message: string
} 
export type User = Prisma.UserGetPayload<{}>
export type UserSafe = Prisma.UserGetPayload<{ omit: { password: true } }>
export type LogCreds = {
    email: string
    password: string
}
export type RegisterCreds = {
    email: string
    password: string
    username: string
    avatar?: string
}

export interface AuthResponse{
    token: string
}

export type UserCreate = Prisma.UserUncheckedCreateInput
export interface UserControllerContract {
    login(request: Request<object, ErrorMessage | AuthResponse, LogCreds>, response: Response<ErrorMessage | AuthResponse>): Promise<void>;
    register(request: Request<object, ErrorMessage | AuthResponse, RegisterCreds>, response: Response<ErrorMessage | AuthResponse>): Promise<void>;
    me(request: Request<object, ErrorMessage | UserSafe, object, object, {userId: number}>, response: Response<ErrorMessage | UserSafe, {userId: number}>): Promise<void>
}
// headers - Authorization

export interface UserServiceContract {
    login(credentials: LogCreds): Promise<string>;
    register(credentials: RegisterCreds): Promise<string>;
    me(userId: number): Promise<UserSafe>
}

export interface UserRepositoryContract {
    getUserByEmail(email: string): Promise<User | null>
    createUser(userData: UserCreate): Promise<User>
    getUserSafelyById(id: number): Promise<UserSafe | null>
}