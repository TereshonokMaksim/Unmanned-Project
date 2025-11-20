import express from "express";


const server = express();

const HOST = "localhost"
const PORT = 8000

server.listen(PORT, HOST, () => {
    console.log("Congratulations! You launched Unmanned server!")
    console.log("This project is currently empty, wait for more updates.")
})