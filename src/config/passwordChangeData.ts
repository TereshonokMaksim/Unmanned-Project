// If code is "-1", then it means that it is verified
// original code is required for identification of user that is requesting password change

interface passwordCode {
    code: string
    originalCode: string
    email: string
};

export const CODE_LENGTH = 12;
export const passwordCodes: passwordCode[] = []