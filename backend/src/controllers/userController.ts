import { Request , Response } from "express";
import User from "../database/models/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { envConfig } from "../config/config";

class UserController{
    static async register(req:Request,res:Response) {
        const {username , email , password , role} = req.body;
        if(!username || !email || !password) {
            res.status(400).json({
                message : "Please provide username , email & password"
            })
            return
        }

        const [validateUser] = await User.findAll({
            where : {
                email : email
            }
        })

        if(validateUser) {
            res.status(400).json({
                message : "User with this email already exists"
            })
            return
        }

        const user = await User.create({
            username,
            email,
            password : bcrypt.hashSync(password,10),
            role
        })

        res.status(200).json({
            message : "User created successfully",
            data : user
        })
    }

    static async login(req:Request,res:Response):Promise<void> {
        const {email , password} = req.body;

        if(!email || !password) {
            res.status(400).json({
                message : "Please provide email & password"
            })
            return
        }
        const [user] = await User.findAll({
            where : {
                email : email
            }
        })
        if(!user) {
            res.status(404).json({
                message : "User with this email doesn't exists"
            })
            return
        }

        const isMatched = bcrypt.compareSync(password,user.password);

        if(!isMatched) {
            res.status(404).json({
                message : "Invalid Credential"
            })
        }

        const token = jwt.sign({id : user.id},envConfig.secretKey as string)
         
        res.status(200).json({
            message : "You are logged in successfully",
            token
        })
    }
}

export default UserController