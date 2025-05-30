import app from "./src/app";
import { envConfig } from "./src/config/config";



const port = envConfig.port

app.listen(port,() => {
    console.log(`Server started at port ${port}`)
})