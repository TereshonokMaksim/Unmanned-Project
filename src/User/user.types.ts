import { Prisma } from "../generated/prisma";
import { Request, Response } from "express";

export interface ErrorMessage {
    message: string
} 
export type User = Prisma.UserGetPayload<{}>
export type UserSafe = Prisma.UserGetPayload<{ omit: { password: true } }>
export type UserEdit = Partial<Omit<User, "id" | "isAdmin">>
export type LogCreds = {
    email: string
    password: string
}
export type RegisterCreds = {
    email: string
    password: string
    name: string
}

export interface AuthResponse{
    token: string
}

export interface PasswordChangeResponse{
    success: boolean
}

export type Location = Prisma.LocationGetPayload<{}>  
export type LocationCreate = Prisma.LocationCreateInput
export type LocationEdit = Partial<Omit<Location, "id" | "userId">>

export type AuthMiddlewareLocals = {userId: number}

export interface passwordCode {
    code: string
    originalCode: string
    email: string
}

export interface identificationCode {
    idCode: string
}

export type UserCreate = Prisma.UserCreateInput
export interface UserControllerContract {
    login(request: Request<object, ErrorMessage | AuthResponse, LogCreds>, response: Response<ErrorMessage | AuthResponse>): Promise<void>;
    register(request: Request<object, ErrorMessage | AuthResponse, RegisterCreds>, response: Response<ErrorMessage | AuthResponse>): Promise<void>;
    me(request: Request<object, ErrorMessage | UserSafe, object, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | UserSafe, AuthMiddlewareLocals>): Promise<void>;
    editAccount(request: Request<object, ErrorMessage | UserSafe, UserEdit, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | UserSafe, AuthMiddlewareLocals>): Promise<void>;
    // Password change part
    changePassword(request: Request<object, ErrorMessage | AuthResponse, {password: string, idCode: string}>, response: Response<ErrorMessage | AuthResponse>): Promise<void>;
    startPasswordChange(request: Request<object, ErrorMessage | identificationCode, {email: string}>, response: Response<ErrorMessage | identificationCode>): Promise<void>;
    verifyPasswordCode(request: Request<{code: string}, ErrorMessage | PasswordChangeResponse>, response: Response<ErrorMessage | PasswordChangeResponse>): Promise<void>;
    // Location part
    createLocation(request: Request<object, ErrorMessage | Location, LocationCreate, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | Location, AuthMiddlewareLocals>): Promise<void>;
    editLocation(request: Request<{id: string}, ErrorMessage | Location, LocationEdit, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | Location, AuthMiddlewareLocals>): Promise<void>;
    deleteLocation(request: Request<{id: string}, ErrorMessage | Location, object, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | Location, AuthMiddlewareLocals>): Promise<void>;
    getLocations(request: Request<object, ErrorMessage | Location[], object, object, AuthMiddlewareLocals>, response: Response<ErrorMessage | Location[], AuthMiddlewareLocals>): Promise<void>;
}
// headers - Authorization

export interface UserServiceContract {
    login(credentials: LogCreds): Promise<string>;
    register(credentials: RegisterCreds): Promise<string>;
    me(userId: number): Promise<UserSafe>
    editAccount(id: number, data: UserEdit): Promise<UserSafe>
    changePassword(idCode: string, newPassword: string): Promise<string>
    createLocation(data: LocationCreate, userId: number): Promise<Location>
    editLocation(id: number, data: LocationEdit, userId: number): Promise<Location>
    deleteLocation(id: number, userId: number): Promise<Location>
    getLocation(id: number): Promise<Location | null>
    getLocations(userId: number): Promise<Location[]>
    sendPasswordEmail(userEmail: string): Promise<identificationCode>
    checkCode(code: string, autoDelete?: boolean, idCode?: string): Promise<false | passwordCode>
}

export interface UserRepositoryContract {
    getUserByEmail(email: string): Promise<User | null>
    createUser(userData: UserCreate): Promise<UserSafe>
    getUserSafelyById(id: number): Promise<UserSafe | null>
    editUser(id: number, data: UserEdit): Promise<UserSafe>
    changePassword(id: number, newPassword: string): Promise<UserSafe>
    createLocation(data: LocationCreate, userId: number): Promise<Location>
    editLocation(id: number, data: LocationEdit): Promise<Location>
    deleteLocation(id: number): Promise<Location>
    getLocation(id: number): Promise<Location | null>
    getLocations(userId: number): Promise<Location[]>
}