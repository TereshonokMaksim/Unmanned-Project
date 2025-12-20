import express from "express";
import { ProductRouter } from "./Product/product.router";
import { CategoryRouter } from "./Category/category.router";
import { UserRouter } from "./User/user.router";


const server = express();

server.use(express.json())
server.use("/products/", ProductRouter)
server.use("/categories/", CategoryRouter)
server.use("/users/", UserRouter)

const HOST = "localhost"
const PORT = 8000

server.listen(PORT, HOST, () => {
    console.log("Congratulations! You launched Unmanned server!")
    console.log(`Server location: ${HOST}:${PORT}`)
    console.log("This project currently has Product, Category, User and, partly, Address (In User module) related functions, see API documentation for more information.")
})