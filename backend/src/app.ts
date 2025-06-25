import express from "express"
import "./database/connection"
import userRoute from "./routes/userRoute"
import categoryRoute from "./routes/categoryRoute"
import productRoute from "./routes/productRoute"
import orderRoute from "./routes/orderRoute"
import cartRoute from "./routes/cartRoute"
import cors from "cors"

const app = express();

app.use(cors({
    origin : "http://localhost:5173"
}))

app.use(express.static("./src/storage"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",userRoute);
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)
app.use("/api/orders",orderRoute)
app.use("/api/cart",cartRoute)

export default app