import { Request , Response } from "express";
import User from "../database/models/userModel";
import bcrypt from "bcrypt"
import generateToken from "../services/generateToken";
import sendEmail from "../services/sendEmail";
import findUser from "../services/findUser";

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
            password : bcrypt.hashSync(password,8),
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

        const token = generateToken(user.id)
         
        res.status(200).json({
            message : "You are logged in successfully",
            token
        })
    }

    static async forgetPassword(req:Request,res:Response) {
        const {email} = req.body;
        if(!email) {
            res.status(400).json({
                message : "Please provide an email"
            })
            return
        }
        const [userExists] = await User.findAll({
            where : {
                email : email
            }
        })
        if(!userExists) {
            res.status(400).json({
                message : "User doesn't exists!"
            })
            return
        }
        const generateOtp = Math.floor(Math.random() * 9000 + 1000)

        await sendEmail({
            to : email,
            subject : "OTP code for your password to reset",
            text : `Your OTP code is ${generateOtp}`
        })
        
        userExists.otp = generateOtp.toString();
        userExists.generatedOtpTime = Date.now().toString()
        userExists.save();

        res.status(200).json({
            message : "OTP send successfully"
        })
    } 

    static async verifyOtp(req:Request,res:Response) {
        const {otp , email} = req.body;
        if(!otp || !email || undefined) {
            res.status(400).json({
                message : "Please provide otp and email"
            })
            return
        }
        const [user] = await User.findAll({
            where : {
                email : email
            }
        })
        if(!user) {
            res.status(400).json({
                message : "User with this email doesn't exists"
            })
            return
        }
        const currentTime = Date.now();
        const otpGeneratedTime = Number(user.generatedOtpTime);

        if(currentTime - otpGeneratedTime >= 120000) {
            res.status(400).json({
                message : "Your Otp has been expired !!"
            })
            return
        }

        if(user.otp !== otp) {
            res.status(400).json({
                message : "Otp doesn't matched!"
            })
            return
        }
        res.status(200).json({
            message : "Otp matched!!"
        })
    }

    static async resetPassword(req:Request,res:Response) {
        const {email , newPassword , confirmPassword} = req.body;
        if(!email || !newPassword || !confirmPassword) {
            res.status(400).json({
                message : "Please provide an email , newPassword & confirmPassword"
            })
            return
        }
        const userExists = await findUser(User,email);

        if(!userExists) {
            res.status(400).json({
                message : "User with this email doesn't exists!"
            })
            return
        }
        if(newPassword !== confirmPassword) {
            res.status(400).json({
                message : "New password and confirm password mismatched !!"
            })
            return
        }

        userExists.password = bcrypt.hashSync(confirmPassword,8);
        await userExists.save();

        res.status(200).json({
            message : "Password reset successfully"
        })
    }
}

export default UserController