import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName : "products",
    modelName : "Product",
    timestamps : true
})

class Product extends Model{

    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string

    @Column({
        type : DataType.STRING
    })
    declare productName : string

    @Column({
        type : DataType.STRING
    })
    declare productDescription : string

    @Column({
        type : DataType.FLOAT
    })
    declare  productPrice: number

    @Column({
        type : DataType.INTEGER
    })
    declare  productStockQty: number

    @Column({
        type : DataType.INTEGER
    })
    declare  productDiscount: number

    @Column({
        type : DataType.STRING
    })
    declare productImage : string
}

export default Product