
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
    status : string
}