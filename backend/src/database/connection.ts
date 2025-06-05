import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import Product from "./models/productModel";
import Category from "./models/categoryModel";

const sequelize = new Sequelize(envConfig.connectionURL as string,{
    models : [__dirname + '/models']
});

try {
    sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully...")
    })
    .catch((err) => {
        console.log(err)
    })
} catch (error) {
    console.log(error)
}

sequelize.sync({force : false,alter:false}).then(() => {
    console.log("Synced !!")
})

Product.belongsTo(Category);
Category.hasOne(Product)

export default sequelize