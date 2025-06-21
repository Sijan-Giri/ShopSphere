import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status, type IProduct, type IProductState } from "../globals/types/types";
import type { AppDispatch } from "./store";
import API from "../http";

const initialState : IProductState = {
    product : [],
    status : Status.Loading
}

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        setProduct(state : IProductState,action:PayloadAction<IProduct[]>) {
            state.product = action.payload
        },
        setStatus(state:IProductState,action:PayloadAction<Status>) {
            state.status = action.payload
        }
    }
})

export const {setProduct , setStatus } = productSlice.actions;
export default productSlice.reducer;

export function getAllProducts() {
    return async function getAllProductsThunk(dispatch:AppDispatch) {
        try {
            dispatch(setStatus(Status.Loading));
            const response = await API.get("product");
            if(response.status == 200) {
                dispatch(setStatus(Status.Success))
                dispatch(setProduct(response.data.data))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}