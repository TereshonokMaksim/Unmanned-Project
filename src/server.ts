import express from "express";
import { ProductRouter } from "./Product/product.router";
import { CategoryRouter } from "./Category/category.router";
import { UserRouter } from "./User/user.router";
import { OrderRouter } from "./Order/order.router";
import { ENV } from "./config";
import cors from "cors";


const server = express();
const HOST = ENV.HOST;
const PORT = ENV.PORT;

server.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

server.use(express.json());
server.use("/products/", ProductRouter);
server.use("/categories/", CategoryRouter);
server.use("/users/", UserRouter);
server.use("/orders/", OrderRouter);


server.listen(PORT, HOST, () => {
    console.log("Congratulations! You launched Unmanned server!");
    console.log(`Server location: ${HOST}:${PORT}`);
    console.log("This project currently has Product, Category, User and, partly, Address (In User module) related functions, see API documentation for more information.");
});