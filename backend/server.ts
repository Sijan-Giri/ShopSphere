import adminSeeder from "./adminSeeder";
import app from "./src/app";
import { envConfig } from "./src/config/config";
import categoryController from "./src/controllers/categoryController";

const port = envConfig.port

app.listen(port,() => {
    console.log(`Server started at port ${port}...`)
    adminSeeder();
    categoryController.seedCategory()
})