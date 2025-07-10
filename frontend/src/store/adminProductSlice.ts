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
        }
    }
})

export const {setProducts , setStatus} = adminProductSlice.actions;
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