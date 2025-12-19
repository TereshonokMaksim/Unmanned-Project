// If code is "-1", then it means that it is verified

interface passwordCode {
    code: string
    userId: number
}

export const CODE_LENGTH = 10
export const passwordCodes: passwordCode[] = []