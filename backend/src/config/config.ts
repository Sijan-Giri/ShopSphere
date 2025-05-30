import {config} from "dotenv";
config();

export const envConfig = {
    port : process.env.PORT,
    connectionURL : process.env.CONNECTION_STRING
}