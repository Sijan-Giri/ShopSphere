import { Column, DataType, Model, Table } from "sequelize-typescript";
import { PaymentMethod, PaymentStatus } from "../../../globals/types";

@Table({
    tableName : "payments",
    modelName : "Payment",
    timestamps : true
})

class Payment extends Model {
    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string

    @Column({
        type : DataType.ENUM(PaymentMethod.Cod,PaymentMethod.Khalti),
        defaultValue : PaymentMethod.Cod
    })
    declare paymentMethod : string

    @Column({
        type : DataType.ENUM(PaymentStatus.Paid,PaymentStatus.Unpaid),
        defaultValue : PaymentStatus.Unpaid
    })
    declare paymentStatus : string

}

export default Payment