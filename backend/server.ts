import adminSeeder from "./adminSeeder";
import app from "./src/app";
import { envConfig } from "./src/config/config";
import categoryController from "./src/controllers/categoryController";
import { Server } from "socket.io"
import jwt from "jsonwebtoken"
import User from "./src/database/models/userModel";
import Order from "./src/database/models/orderModel";

const port = envConfig.port

const server = app.listen(port,() => {
    console.log(`Server started at port ${port}...`)
    adminSeeder();
    categoryController.seedCategory()
})

const io = new Server(server,{
    cors : {
        origin : "http://localhost:5173"
    }
})

let onlineUsers:{socketId:string , userId : string, role : string}[] = [];
const addToOnlineUsers = (socketId:string , userId:string , role:string) => {
    onlineUsers = onlineUsers.filter((user) => user.userId !== userId)
    onlineUsers.push({socketId , userId , role})
}

io.on("connection",(socket) => {
    const {token} = socket.handshake.auth;
    if(token) {
        jwt.verify(token,envConfig.secretKey as string,async(err:any,result:any) => {
            if(err) {
                io.emit("Error",err);
            }
            else {
                const userExists = await User.findByPk(result.id);
                if(!userExists) {
                    io.emit("User doesnot exists with this id");
                    return
                }
                addToOnlineUsers(socket.id , result.id , userExists.role)
            }
        })
    }
    else {
        socket.emit("Please provide token !!")
    }
    socket.on("updateOrderStatus",async(data) => {
        const {userId , orderId , status} = data;
        const findUser = onlineUsers.find(user => user.userId == userId);
        await Order.update({
            orderStatus : status
        },{
            where : {
                orderId
            }
        })
        if(findUser) {
            io.to(findUser.socketId).emit("Order updated successfully !!")
        } 
        else {
            socket.emit("User is not online !!")
        }
    })
})