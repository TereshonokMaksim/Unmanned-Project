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

export type Location = Prisma.LocationGetPayload<{}>  
export type LocationCreate = Prisma.LocationCreateInput
export type LocationEdit = Partial<Omit<Location, "id" | "userId">>

export type UserCreate = Prisma.UserCreateInput
export interface UserControllerContract {
    login(request: Request<object, ErrorMessage | AuthResponse, LogCreds>, response: Response<ErrorMessage | AuthResponse>): Promise<void>;
    register(request: Request<object, ErrorMessage | AuthResponse, RegisterCreds>, response: Response<ErrorMessage | AuthResponse>): Promise<void>;
    me(request: Request<object, ErrorMessage | UserSafe, object, object, {userId: number}>, response: Response<ErrorMessage | UserSafe, {userId: number}>): Promise<void>;
    editAccount(request: Request<object, ErrorMessage | UserSafe, UserEdit, object, {userId: number}>, response: Response<ErrorMessage | UserSafe, {userId: number}>): Promise<void>;
    changePassword(request: Request<object, ErrorMessage | AuthResponse, {password: string}, object, {userId: number}>, response: Response<ErrorMessage | AuthResponse, {userId: number}>): Promise<void>;
    // Location part
    createLocation(request: Request<object, ErrorMessage | Location, LocationCreate, object, {userId: number}>, response: Response<ErrorMessage | Location, {userId: number}>): Promise<void>;
    editLocation(request: Request<{id: string}, ErrorMessage | Location, LocationEdit>, response: Response<ErrorMessage | Location>): Promise<void>;
    deleteLocation(request: Request<{id: string}, ErrorMessage | Location>, response: Response<ErrorMessage | Location>): Promise<void>;
    getLocations(request: Request<object, ErrorMessage | Location[], object, object, {userId: number}>, response: Response<ErrorMessage | Location[], {userId: number}>): Promise<void>;
}
// headers - Authorization

export interface UserServiceContract {
    login(credentials: LogCreds): Promise<string>;
    register(credentials: RegisterCreds): Promise<string>;
    me(userId: number): Promise<UserSafe>
    editAccount(id: number, data: UserEdit): Promise<UserSafe>
    changePassword(id: number, newPassword: string): Promise<string>
    createLocation(data: LocationCreate, userId: number): Promise<Location>
    editLocation(id: number, data: LocationEdit): Promise<Location>
    deleteLocation(id: number): Promise<Location>
    getLocation(id: number): Promise<Location | null>
    getLocations(userId: number): Promise<Location[]>
}

export interface UserRepositoryContract {
    getUserByEmail(email: string): Promise<User | null>
    createUser(userData: UserCreate): Promise<User>
    getUserSafelyById(id: number): Promise<UserSafe | null>
    editUser(id: number, data: UserEdit): Promise<UserSafe>
    changePassword(id: number, newPassword: string): Promise<UserSafe>
    createLocation(data: LocationCreate, userId: number): Promise<Location>
    editLocation(id: number, data: LocationEdit): Promise<Location>
    deleteLocation(id: number): Promise<Location>
    getLocation(id: number): Promise<Location | null>
    getLocations(userId: number): Promise<Location[]>
}