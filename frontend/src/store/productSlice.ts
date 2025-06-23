import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status, type IProduct, type IProductState } from "../globals/types/types";
import type { AppDispatch, RootState } from "./store";
import { API } from "../http";

const initialState : IProductState = {
    product : [],
    status : Status.Loading,
    singleProduct : null
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
        },
        setSingleProduct(state:IProductState,action:PayloadAction<IProduct>) {
            state.singleProduct = action.payload
        }
    }
})

export const {setProduct , setStatus , setSingleProduct } = productSlice.actions;
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

export function fetchProduct(id:string) {
    return async function fetchProductThunk(dispatch:AppDispatch,getState:() => RootState) {
        try {
        const store = getState();
        const existingProduct = store.product.product.find((productData) => productData.id == id)
        if(existingProduct) {
            dispatch(setSingleProduct(existingProduct))
            dispatch(setStatus(Status.Success))
        }
        else {
            dispatch(setStatus(Status.Loading))
            const response = await API.get(`product/${id}`);
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setSingleProduct(response.data.data[0]))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}