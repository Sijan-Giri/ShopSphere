import { Request , Response } from "express";
import User from "../database/models/userModel";

class UserController{
    static async register(req:Request,res:Response) {
        const {username , email , password} = req.body;
        if(!username || !email || !password) {
            res.status(400).json({
                message : "Please provide username , email & password"
            })
            return
        }

        const user = await User.create({
            username,
            email,
            password
        })

        res.status(200).json({
            message : "User created successfully",
            data : user
        })
    }
}

export default UserController