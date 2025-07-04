export enum Status{
    Loading = "loading",
    Success = "success",
    Error = "error"
}

export interface IUser{
    username ?: string,
    email : string,
    password : string
}

export interface IUserState {
    user : IUser,
    status : string,
    token : string | null
}

export interface ICategory{
    id : string,
    categoryName : string,
    createdAt : string,
    updatedAt : string
}

export interface IProduct{
    id : string,
    productName : string,
    productDescription : string,
    productPrice : number,
    productStockQty : number,
    productDiscount : number,
    productImage ?: string,
    CategoryId : string,
    Category : ICategory
}

export interface IProductState{
    product : IProduct[],
    status : string,
    singleProduct : IProduct | null
}

export interface ICart{
    id : string,
    quantity : number,
    productId : string,
    userId : string,
    Product : IProduct
}

export interface ICartState{
    cart : ICart[],
    status : string
}

export interface ICartUpdatedItem{
    productId : string,
    quantity : number
}

export interface IOrderData{
    id ?: string,
    firstName : string,
    lastName : string,
    email : string,
    phoneNumber : string,
    shippingAddress : string,
    totalAmount ?: number,
    userId ?: string,
    paymentMethod ?: PaymentMethod,
    products ?: IProductData[]
}

export interface IProductData{
    productQty : number,
    productId : string,
}

export interface IOrder extends IProductData{
    id : string,
    orderId : string,
    userId : string
}

export interface IPayment {
    paymentMethod : string,
    paymentStatus : string
}

export interface IMyOrder {
     id : string,
    phoneNumber: string,
    shippingAddress: string,
    totalAmount: number,
    orderStatus: string,
    firstName: string,
    lastName: string,
    email: string,
    createdAt?: string,
    updatedAt?: string,
    userId: string,
    paymentId: string | null,
    Payment : IPayment | null
}

export interface IMyOrderDetails {
    id : string,
    quantity : string,
    orderId : string,
    productId : string,
    createdAt : string,
    Order : {
        orderStatus : string,
        phoneNumber : string,
        totalAmount : number
    },
    Payment : {
        paymentMethod : string,
        paymentStatus : string
    },
    Product : IProduct
}

export interface IOrderState{
    item : IOrder[],
    status : Status,
    khaltiUrl : string | null,
    order : IMyOrder[],
    singleOrder : IMyOrderDetails[]
}

export enum PaymentMethod{
    Khalti = "khalti",
    Cod = "cod"
}