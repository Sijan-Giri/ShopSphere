import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";
import User from "../database/models/userModel";

interface AuthRequest extends Request{
    user? : {
        id : string,
        username : string,
        email : string,
        password : string,
        role : string
    }
}

export enum Role{
    Admin = "admin",
    Customer = "customer"
}

class UserAuthentication{
    static async isAuthenticated(req:AuthRequest,res:Response,next:NextFunction){
        const token = req.headers.authorization;
        if(!token) {
            res.status(400).json({
                message : "You are not a valid user , please login !!"
            })
            return
        }
        jwt.verify(token , envConfig.secretKey as string , async (err , result:any) => {
            if(err) {
                res.status(400).json({
                    message : "Invalid token !!",
                    data : err
                })
            }
            else {
                const userExists = await User.findByPk(result.id)
                if(!userExists) {
                    res.status(400).json({
                        message : "User with this id doesn't exists !!"
                    })
                    return
                }
                req.user = userExists
                next();
            }
        })
    }
    static restrictTo(...roles:Role[]) {
        return (req:AuthRequest , res:Response , next:NextFunction) => {
            const userRole = req.user?.role as Role;
            if(!roles.includes(userRole)) {
                res.status(400).json({
                    message : "You don't have permission !!"
                })
                return
            }
                next();
        }
    }
}

export default UserAuthentication