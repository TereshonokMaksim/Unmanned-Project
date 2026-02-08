import { UserControllerContract } from "./user.types";
import { UserService } from "./user.service";
import { CODE_LENGTH } from "../config";


export const UserController: UserControllerContract = {
    async login(req, res) {
        try {
            const data = req.body;
            if (!data.email) {
                res.status(400).json({ message: "You entered wrong data" });
                return
            };
            if (!data.password) {
                res.status(400).json({ message: "You entered wrong data" });
                return
            };
            const userToken = await UserService.login(data);
            res.status(200).json({ token: userToken });
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "NOT_FOUND" || error.message == "WRONG_CREDENTIALS"){
                    res.status(404).json({message: "Wrong email or password"});
                    return
                };
                if (error.cause == "BAD_QUERY"){
                    res.status(422).json({"message": "Wrong body data"});
                    return
                }
            };
            console.log(`Unexpected error occured at UserController\nError: \n\n${error}`);
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    async register(req, res){
        try{
            const data = req.body;
            if (!data.email){
                res.status(400).json({message: "You entered wrong data"});
                return
            };
            if (!data.password){
                res.status(400).json({message: "You entered wrong data"});
                return
            };
            const newUserToken = await UserService.register(data);
            res.status(201).json({token: newUserToken})
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "USER_EXISTS"){
                    res.status(409).json({message: "User with this email already exists!"});
                    return
                }
                else if (error.message == "WRONG_CREDENTIALS"){
                    res.status(400).json({message: "You entered wrong data"});
                    return
                }
                if (error.cause == "BAD_QUERY"){
                    res.status(422).json({"message": "Wrong body data"});
                    return
                }
            };
            console.log(`Unexpected error occured at UserController\nError: \n\n${error}`);
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    async me(req, res){
        try{
            const user = await UserService.me(res.locals.userId);
            res.status(200).json(user)
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "NOT_FOUND"){
                    res.status(404).json({message: "Data from JWT token is invalid"});
                    return
                }
            };
            console.log(`Unexpected error occured at UserController\nError: \n\n${error}`);
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    async editAccount(request, response){
        try{
            const body = request.body;
            response.status(200).json(await UserService.editAccount(response.locals.userId, body))
        }
        catch(error){
            if (error instanceof Error){
                if (error.cause == "BAD_QUERY"){
                    response.status(422).json({"message": "Wrong body data"});
                    return
                }
            };
            console.log(`Unexpected error occured at UserController\nError: \n\n${error}`);
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async createLocation(request, response) {
        try{
            const body = request.body;
            if (!body){
                response.status(422).json({message: "Incorrect body data"});
                return
            };
            if (!body.city || !body.entranceNum || !body.flatNum || !body.houseNum || !body.street){
                response.status(422).json({message: "Incorrect body data"});
                return
            };
            if (isNaN(body.entranceNum) || isNaN(body.flatNum) || isNaN(body.houseNum)){
                response.status(422).json({message: "Incorrect body data"});
                return
            };
            response.status(200).json(await UserService.createLocation(body, response.locals.userId))
        }
        catch(error){
            if (error instanceof Error){
                if (error.cause == "BAD_QUERY"){
                    response.status(422).json({"message": "Wrong body data"});
                    return
                }
            };
            console.log(`Unexpected error occured at UserController\nError: \n\n${error}`);
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async editLocation(request, response){
        try{
            const body = request.body;
            const id = request.params.id;
            if (isNaN(+id) || !id){
                response.status(400).json({message: "Invalid id"})
            };
            if (body.entranceNum){
                if (isNaN(body.entranceNum)){
                    response.status(422).json({message: "Wrong body data"})
                }
            };
            if (body.flatNum){
                if (isNaN(body.flatNum)){
                    response.status(422).json({message: "Wrong body data"})
                }
            };
            if (body.houseNum){
                if (isNaN(body.houseNum)){
                    response.status(422).json({message: "Wrong body data"})
                }
            };
            response.status(200).json(await UserService.editLocation(+id, body, response.locals.userId))
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "NOT_FOUND"){
                    response.status(404).json({message: "Address with that id is not found!"});
                    return
                };
                if (error.message == "FORBIDDEN"){
                    response.status(403).json({message: "It is not your address to edit."});
                    return
                };
                if (error.cause == "BAD_QUERY"){
                    response.status(422).json({"message": "Wrong body data"});
                    return
                }
            };
            console.log(`Unexpected error occured at UserController\nError: \n\n${error}`);
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async deleteLocation(request, response) {
        try{
            const id = request.params.id;
            if (isNaN(+id) || !id){
                response.status(400).json({message: "Invalid id"})
            };
            response.status(200).json(await UserService.deleteLocation(+id, response.locals.userId))
        }
        catch(error){
            if (error instanceof Error){
                if (error.cause == "NOT_FOUND"){
                    response.status(404).json({message: "Location with that id is not found!"});
                    return
                };
                if (error.cause == "FORBIDDEN"){
                    response.status(403).json({message: "It is not your address to edit."});
                    return
                }
            };
            console.log(`Unexpected error occured at UserController\nError: \n\n${error}`);
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async getLocations(request, response){
        try{
            response.status(200).json(await UserService.getLocations(response.locals.userId))
        }
        catch(error){
            console.log(`Unexpected error occured at UserController\nError: \n\n${error}`);
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async startPasswordChange(request, response) {
        try{
            const newEmail = request.body.email;
            if (!newEmail){
                response.status(400).json({message: "Email is not specified"});
                return
            };
            response.status(200).json(await UserService.sendPasswordEmail(newEmail))
        }
        catch(error){
            console.log(`Unexpected error occured at UserController\nError: \n\n${error}`);
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async verifyPasswordCode(request, response) {
        try{
            const code = request.params.code;
            if (!code){
                response.status(400).json({message: "You need to provide valid code"});
                return
            };
            if (code.length != CODE_LENGTH){
                response.status(400).json({message: "You need to provide valid code"});
                return
            };
            const real = await UserService.checkCode(code, false);
            response.status(200).json({success: Boolean(real)})
        }
        catch(error){
            if (error instanceof Error){
                if (error.cause == "NOT_FOUND"){
                    response.status(404).json({message: "You didnt ask for restoration."});
                    return
                }
            };
            console.log(`Unexpected error occured at UserController\nError: \n\n${error}`);
            response.status(500).json({message: "Internal Server Error"})
        }
    },
    async changePassword(request, response){
        try{    
            const body = request.body;
            if (!body.password){
                response.status(400).json({message: "New password is missing"});
                return
            };
            response.status(200).json({token: await UserService.changePassword(body.idCode, body.password)});
        }
        catch(error){
            if (error instanceof Error){
                if (error.cause == "NOT_FOUND"){
                    response.status(404).json({message: "You didnt ask for restoration."});
                    return
                };
                if (error.cause == "FORBIDDEN"){
                    response.status(403).json({message: "You have not verified your email."});
                    return
                };
                if (error.cause == "BAD_QUERY"){
                    response.status(422).json({"message": "Wrong body data"});
                    return
                }
            };
            console.log(`Unexpected error occured at UserController\nError: \n\n${error}`);
            response.status(500).json({message: "Internal Server Error"})
        }
    },
}