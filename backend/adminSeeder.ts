import { envConfig } from "./src/config/config"
import User from "./src/database/models/userModel"
import bcrypt from "bcrypt"

const adminSeeder = async() => {
    try {
        const [adminExists] = await User.findAll({
            where : {
                email : envConfig.adminEmail
            }
        })
        if(adminExists) {
            console.log("Admin already seeded !!")
        }
        else {
            await User.create({
            username : envConfig.adminUsername,
            email : envConfig.adminEmail,
            password : bcrypt.hashSync(envConfig.adminPassword as string,8),
            role : envConfig.adminRole
    })
        console.log("Admin Seeded successfully");
        }
    
    } catch (error) {
        console.log(error)
    }
}

export default adminSeeder