import { Column, DataType, Model, Table } from "sequelize-typescript";
import { OrderStatus } from "../../../globals/types";

@Table({
    tableName : "orders",
    modelName : "Order",
    timestamps : true
})

class Order extends Model{
    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string

    @Column({
        type : DataType.STRING, 
        allowNull : false
    })
    declare phoneNumber : string

    @Column({
        type : DataType.STRING
    })
    declare shippingAddress : string

    @Column({
        type : DataType.FLOAT
    })
    declare totalAmount : number

    @Column({
        type : DataType.ENUM(OrderStatus.Pending,OrderStatus.Cancelled,OrderStatus.Delivered,OrderStatus.Ontheway,OrderStatus.Preparation),
        defaultValue : OrderStatus.Pending
    })
    declare orderStatus : string
    
    @Column({
        type : DataType.STRING
    })
    declare firstName : string

    @Column({
        type : DataType.STRING
    })
    declare lastName : string

    @Column({
        type : DataType.STRING
    })
    declare email : string
}

export default Order