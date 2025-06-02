import jwt from "jsonwebtoken"
import { envConfig } from "../config/config"

const generateToken = (user:string) => {
    return jwt.sign({id : user},envConfig.secretKey as string)
}

export default generateToken