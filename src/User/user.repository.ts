import { UserRepositoryContract } from "./user.types";
import { client } from "../client/prismaClient";
import { PrismaErrorCheck } from "../generic";


export const UserRepository: UserRepositoryContract = {
    async getUserByEmail(email) {
        try {
            return client.user.findUnique({
                where: { email }
            })
        } catch (error) {
            PrismaErrorCheck(error, "getUserByEmail", {email});
            throw error
        }
    },
    async createUser(userData) {
        try {
            return client.user.create({
                data: userData,
                omit: {password: true}
            })
        }
        catch (error) {
            PrismaErrorCheck(error, "createUser", userData);
            throw error
        }
    },
    async getUserSafelyById(id){
        try{
            return client.user.findUnique({
                where: {id},
                omit: {
                    password: true
                }
            })
        }
        catch (error){
            PrismaErrorCheck(error, "getUserSafelyById", {id});
            throw error
        }
    },
    editUser(id, data){
        try{
            return client.user.update(
                {
                    where: {id},
                    data,
                    omit: {password: true}
                }
            )
        }
        catch(error){
            PrismaErrorCheck(error, "editUser", {id, userData: data})
            throw error
        }
    },
    changePassword(id, newPassword){
        try{
            return client.user.update(
                {
                    where: {id},
                    data: {password: newPassword},
                    omit: {password: true}
                }
            )
        }
        catch(error){
            PrismaErrorCheck(error, "createUser", {id, newPassword});
            throw error
        }
    },
    async createLocation(data, userId){
        try {
            return client.location.create({
                data: {
                    user: {
                        connect: {id: userId}
                    },
                    ...data
                }
            })
        }
        catch (error) {
            PrismaErrorCheck(error, "createUser", {createLocationData: data, userId});
            throw error
        }
    },
    async editLocation(id, data) {
        try {
            return client.location.update({
                where: {id},
                data: data
            })
        }
        catch (error) {
            PrismaErrorCheck(error, "createUser", {editLocationData: data, id});
            throw error
        }
    },
    async deleteLocation(id) {
        try {
            return client.location.delete({
                where: {id}
            })
        }
        catch (error) {
            PrismaErrorCheck(error, "deleteLocation", {id})
            throw error
        }
    },
    async getLocation(id) {
        try {
            return await client.location.findUnique({
                where: {id}
            })
        }
        catch (error) {
            PrismaErrorCheck(error, "createUser", {id});
            throw error
        }
    },
    async getLocations(userId) {
        try {
            return await client.location.findMany({
                where: {userId}
            })
        }
        catch (error) {
            PrismaErrorCheck(error, "createUser", {userId});
            throw error
        }
    }
}