import { AuthResponse, ErrorMessage, RegisterCreds, UserControllerContract } from "./user.types";
import { UserService } from "./user.service";


export const UserController: UserControllerContract = {
    async login(req, res) {
        try {
            const data = req.body;
            if (!data.email) {
                res.status(400).json({ message: "You entered wrong data" });
                return;
            }
            if (!data.password) {
                res.status(400).json({ message: "You entered wrong data" });
                return;
            }
            const userToken = await UserService.login(data);
            res.status(200).json({ token: userToken });
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "NOT_FOUND" || error.message == "WRONG_CREDENTIALS"){
                    res.status(404).json({message: "You entered wrong data"})
                    return
                }
            }
            res.status(500).json({message: "Internal Server Error"})
        }
    },


    async register(req, res){
        try{
            const data = req.body
            if (!data.email){
                res.status(400).json({message: "You entered wrong data"})
                return
            }
            if (!data.password){
                res.status(400).json({message: "You entered wrong data"})
                return
            }
            const newUserToken = await UserService.register(data)
            res.status(201).json({token: newUserToken})
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "USER_EXISTS"){
                    res.status(400).json({message: "You entered wrong data"})
                    return
                }
                else if (error.message == "WRONG_CREDENTIALS"){
                    res.status(400).json({message: "You entered wrong data"})
                    return
                }
            }
            res.status(500).json({message: "Internal Server Error"})
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
                    res.status(404).json({message: "Incorrect JWT token"})
                    return
                }
            }
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}
