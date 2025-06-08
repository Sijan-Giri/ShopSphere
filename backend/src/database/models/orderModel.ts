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
        allowNull : false,
        validate : {
            len : {
                args : [10,10],
                msg : "Phone number must be greater than 10"
            }
        }
        
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
}

export default Order