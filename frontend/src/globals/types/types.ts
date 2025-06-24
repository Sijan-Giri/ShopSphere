
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
    categoryName : string
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