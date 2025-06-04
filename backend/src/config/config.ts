import {config} from "dotenv";
config();

export const envConfig = {
    port : process.env.PORT,
    connectionURL : process.env.CONNECTION_STRING,
    secretKey : process.env.SECRET_KEY,
    emailUser : process.env.EMAIL_USER,
    emailPass : process.env.EMAIL_PASS,
    adminEmail : process.env.ADMIN_EMAIL,
    adminPassword : process.env.ADMIN_PASS,
    adminUsername : process.env.ADMIN_USERNAME,
    adminRole : process.env.ADMIN_ROLE
}