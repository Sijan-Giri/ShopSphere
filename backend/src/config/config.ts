import {config} from "dotenv";
config();

export const envConfig = {
    port : process.env.PORT,
    connectionURL : process.env.CONNECTION_STRING,
    secretKey : process.env.SECRET_KEY,
    emailUser : process.env.EMAIL_USER,
    emailPass : process.env.EMAIL_PASS
}