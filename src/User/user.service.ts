import { UserServiceContract } from "./user.types"
import { UserRepository } from "./user.repository"
import { sign } from "jsonwebtoken"
import { ENV } from "../config/env"
import { StringValue } from "ms"
import { compare, hash } from "bcryptjs"

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

        const token = sign({ id: user.id }, ENV.JWT_ACCESS_SECRET_KEY, { expiresIn: ENV.JWT_ACCESS_EXPIRES_IN as StringValue})

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
        const token = sign({ id: newUser.id }, ENV.JWT_ACCESS_SECRET_KEY, { expiresIn: ENV.JWT_ACCESS_EXPIRES_IN as StringValue })
        return token
    },
    async me(userId){
        const user = await UserRepository.getUserSafelyById(userId)

        if (!user) {
            throw new Error('not_found')
        }
        return user
    }
}    