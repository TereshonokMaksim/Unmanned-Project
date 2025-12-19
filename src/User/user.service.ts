import { UserServiceContract } from "./user.types"
import { UserRepository } from "./user.repository"
import { sign } from "jsonwebtoken"
import { ENV } from "../config/env"
import { StringValue } from "ms"
import { compare, hash } from "bcryptjs"
import { transporter } from "../config/email"
import { CODE_LENGTH, passwordCodes } from "../config/passwordChangeData"

export const UserService: UserServiceContract = {
    async login(credentials) {
        const user = await UserRepository.getUserByEmail(credentials.email)

        if (!user) {
            throw new Error('not_found')
        }
        const isMatch = await compare(credentials.password, user.password)
        if (!isMatch) {
            throw new Error('wrong_credentails')
        } 

        const token = sign({ id: user.id }, ENV.JWT_ACCESS_SECRET_KEY, { expiresIn: ENV.JWT_EXPIRES_IN as StringValue})

        return token
    },
    async register(credentials) {
        const user = await UserRepository.getUserByEmail(credentials.email)
        if (user) {
            throw new Error(`user_exist`)
        }

        const hashedPassword = await hash(credentials.password, 10)

        const hashedCredentials = {
            ...credentials,
            password: hashedPassword
        }
        const newUser = await UserRepository.createUser(hashedCredentials)
        const token = sign({ id: newUser.id }, ENV.JWT_ACCESS_SECRET_KEY, { expiresIn: ENV.JWT_EXPIRES_IN as StringValue })
        return token
    },
    async me(userId){
        const user = await UserRepository.getUserSafelyById(userId)

        if (!user) {
            throw new Error('not_found')
        }
        return user
    },
    async editAccount(id, data){
        return UserRepository.editUser(id, data)
    },
    async createLocation(data, userId) {
        return UserRepository.createLocation(data, userId)
    },
    async editLocation(id, data, userId) {
        const location = await UserRepository.getLocation(id)
        if (!location){
            throw new Error("NOT_FOUND")
        }
        if (location.userId != userId){
            throw new Error("FORBIDDEN")
        }
        return UserRepository.editLocation(id, data)
    },
    async deleteLocation(id, userId) {
        const location = await UserRepository.getLocation(id)
        if (!location){
            throw new Error("NOT_FOUND")
        }
        if (location.userId != userId){
            throw new Error("FORBIDDEN")
        }
        return UserRepository.deleteLocation(id)
    },
    async getLocation(id) {
        return UserRepository.getLocation(id)
    },
    async getLocations(userId) {
        return UserRepository.getLocations(userId)
    },
    async sendPasswordEmail(userId, userEmail) {
        function generateCode(){
            let code = ''
            for (let index = 0; index < CODE_LENGTH; index++){
                code+=`${Math.round(Math.random() * 9)}`
            }
            return code
        }
        const code = generateCode() 
        passwordCodes.push({code: code, userId: userId})
        transporter.sendMail({
            from: 'Dronees',
            to: userEmail,
            subject: "Password restoration",
            text: `Hello, you tried to restore password on our site, here is restoration code: ${code}`
        })
    },
    async checkCode(userId, codeCheck, autoDelete) {
        const possibleCodeArray = passwordCodes.filter(attempt => attempt.userId == userId)
        if (!possibleCodeArray.length){
            throw Error("NOT_FOUND")
        }
        for (let possibleCode of possibleCodeArray){
            if (possibleCode.code == codeCheck){
                for (let toDelete of possibleCodeArray){ passwordCodes.splice(passwordCodes.indexOf(toDelete), 1) }
                if (!autoDelete){
                    possibleCodeArray.push({code: "-1", userId: userId})
                }
                return true
            }
        }
        return false
    },
    async changePassword(id, newPassword){
        const verified = await this.checkCode(id, newPassword)
        if (!verified){
            throw new Error("FORBIDDEN")
        }
        const hashedPassword = await hash(newPassword, 10)
        UserRepository.changePassword(id, hashedPassword)
        const token = sign({ id: id }, ENV.JWT_ACCESS_SECRET_KEY, { expiresIn: ENV.JWT_EXPIRES_IN as StringValue })
        return token
    },
}    