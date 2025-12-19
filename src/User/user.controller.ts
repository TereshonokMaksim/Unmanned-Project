import { AuthResponse, ErrorMessage, RegisterCreds, UserControllerContract } from "./user.types";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";


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
    },
    async changePassword(request, response){
        try{    
            const body = request.body
            if (!body.password){
                response.status(400).json({message: "New password is missing"})
            }
            response.status(200).json({token: await UserService.changePassword(response.locals.userId, body.password)})
        }
        catch(error){
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async editAccount(request, response){
        try{
            const body = request.body
            response.status(200).json(await UserService.editAccount(response.locals.userId, body))
        }
        catch(error){
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async createLocation(request, response) {
        try{
            const body = request.body
            response.status(200).json(await UserService.createLocation(body, response.locals.userId))
        }
        catch(error){
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async editLocation(request, response){
        try{
            const body = request.body
            const id = request.params.id
            if (isNaN(+id) || !id){
                response.status(400).json({message: "Wrong id"})
            }
            response.status(200).json(await UserService.editLocation(+id, body))
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "NOT_FOUND"){
                    response.status(404).json({message: "Location with that id is not found!"})
                    return
                }
            }
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async deleteLocation(request, response) {
        try{
            const id = request.params.id
            if (isNaN(+id) || !id){
                response.status(400).json({message: "Wrong id"})
            }
            response.status(200).json(await UserService.deleteLocation(+id))
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "NOT_FOUND"){
                    response.status(404).json({message: "Location with that id is not found!"})
                    return
                }
            }
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async getLocations(request, response){
        try{
            response.status(200).json(await UserService.getLocations(response.locals.userId))
        }
        catch(error){
            response.status(500).json({message: "Internal Server Error"})
        }
    }
}