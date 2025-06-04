import express from "express"
import "./database/connection"
import userRoute from "./routes/userRoute"
import adminSeeder from "../adminSeeder";

const app = express();

app.use(express.json())

adminSeeder();

app.use("/api/auth",userRoute)


export default app