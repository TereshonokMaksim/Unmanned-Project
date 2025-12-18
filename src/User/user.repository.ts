import { UserRepositoryContract } from "./user.types";
import { client } from "../client/prismaClient";


export const UserRepository: UserRepositoryContract = {
    async getUserByEmail(email) {
        try {
            return await client.user.findUnique({
                where: { email }
            })
        } catch (error) {
            console.log(error)
            throw error
            
        }
    },
    async createUser(userData) {
        try {
            return await client.user.create({
                data: userData
            })
        }
        catch (error) {
            console.log(error)
            throw error
        }
    },
    async getUserSafelyById(id){
        try{
            return await client.user.findUnique({
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
    }
}