import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status, type IProduct } from "../globals/types/types";
import type { AppDispatch } from "./store";
import { AuthApi } from "../http";

export interface IAdminProductState{
    products : IProduct[],
    status : Status
} 

const initialState : IAdminProductState = {
    products : [],
    status : Status.Loading
}

const adminProductSlice = createSlice({
    name : "adminProduct",
    initialState,
    reducers : {
        setProducts(state : IAdminProductState , action : PayloadAction<IProduct[]>) {
            state.products = action.payload
        },
        setStatus(state : IAdminProductState , action:PayloadAction<Status>) {
            state.status = action.payload
        },
        setAddProducts(state : IAdminProductState , action : PayloadAction<IProduct>) {
            state.products.push(action.payload)
        },
        setDeleteProduct(state:IAdminProductState,action:PayloadAction<string>) {
            const index = state.products.findIndex((product) => product?.id == action.payload);
            if(index !== -1) {
                state.products.splice(index,1)
            }
        }
    }
})

export const {setProducts , setStatus , setAddProducts , setDeleteProduct} = adminProductSlice.actions;
export default adminProductSlice.reducer;

export function fetchAllProducts() {
    return async function fetchAllProductsThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.get("product");
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setProducts(response.data.data))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}

export function addProduct(data : IProduct) {
    return async function addProductThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.post("product",data,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            });
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setAddProducts(response.data.data))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}

export function deleteProduct(id : string) {
    return async function deleteProductThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.delete(`product/${id}`);
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setDeleteProduct(id))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}