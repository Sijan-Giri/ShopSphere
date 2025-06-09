import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import Product from "./models/productModel";
import Category from "./models/categoryModel";
import Order from "./models/orderModel";
import User from "./models/userModel";
import Payment from "./models/payment";
import OrderDetail from "./models/orderDetailsModel";

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
Category.hasOne(Product);

User.hasMany(Order , {foreignKey : "userId"})
Order.belongsTo(User ,{foreignKey : "userId"});

Order.hasMany(Payment , {foreignKey : "orderId"});
Payment.belongsTo(Order , {foreignKey : "orderId"});

Order.hasMany(OrderDetail,{foreignKey : "orderId"});
OrderDetail.belongsTo(Order,{foreignKey : "orderId"});

OrderDetail.belongsTo(Product,{foreignKey : "productId"});
Product.hasMany(OrderDetail,{foreignKey : "productId"}); 

export default sequelize