import { Prisma } from "../generated/prisma"


export interface ErrorMessage {
    message: string
};

export type User = Prisma.UserGetPayload<{
    omit: {
        password: true
    }
}>;