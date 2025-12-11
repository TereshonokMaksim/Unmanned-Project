import express from "express";
import { ProductRouter } from "./Product/product.router";


const server = express();

server.use(express.json())
server.use("/products/", ProductRouter)

const HOST = "localhost"
const PORT = 8000

server.listen(PORT, HOST, () => {
    console.log("Congratulations! You launched Unmanned server!")
    console.log(`Server location: ${HOST}:${PORT}`)
    console.log("This project currently has Product related functions, see API documentation for more information.")
})