import { AuthResponse, ErrorMessage, RegisterCreds, UserControllerContract } from "./user.types";
import { UserService } from "./user.service";


export const UserController: UserControllerContract = {
    async login(req, res) {
        try {
            const data = req.body;
            if (!data.email) {
                res.status(400).json({ message: "Email is required." });
                return;
            }
            if (!data.password) {
                res.status(400).json({ message: "Password is required." });
                return;
            }
            const userToken = await UserService.login(data);
            res.status(200).json({ token: userToken });
        }
        finally {
        }
    },
    async register(req, res){
        try{
            const data = req.body
            if (!data.email){
                res.status(400).json({message: "Email is required"})
                return
            }
            if (!data.password){
                res.status(400).json({message: "Password is required"})
                return
            }
            const newUserToken = await UserService.register(data)
            res.status(201).json({token: newUserToken})
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "USER_EXISTS"){
                    res.status(409).json({message: "User with such email already exists!"})
                    return
                }
                else if (error.message == "WRONG_CREDENTIALS"){
                    res.status(401).json({message: "Im not sure how you did this, but you inputted wrong data that passed."})
                    return
                }
            }
            console.log(`Seems like something went wrong somewhere in user auth system. And it is linked to registration, it appears to be.\n\nError:\n${error}`)
            res.status(500).json({message: "Server is experiencing problems."})
        }
    },
    async me(req, res){
            try{
            const user = await UserService.me(res.locals.userId)
            res.status(200).json(user)
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "NOT_FOUND"){
                    res.status(404).json({message: "User with such ID does not exists!"})
                    return
                }
            }
            console.log(`I seem to fail getting Myself as User object... Well, doesnt sound like my problem anyways!\n\nError\n${error}`)
            res.status(500).json({message: "Server is experiencing problems."})
        }
    }
}
