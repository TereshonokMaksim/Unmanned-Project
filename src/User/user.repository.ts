import { UserRepositoryContract } from "./user.types";
import { client } from "../client/prismaClient";


export const UserRepository: UserRepositoryContract = {
    async getUserByEmail(email) {
        try {
            return client.user.findUnique({
                where: { email }
            })
        } catch (error) {
            console.log(error)
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
            console.log(error)
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
            console.log(error)
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
            throw error
        }
    },
    async createLocation(data, userId){
        try {
            return client.location.create({
                data: {...data, user: {connect: {id: userId}}},
                
            })
        }
        catch (error) {
            console.log(error)
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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
            throw error
        }
    }
}