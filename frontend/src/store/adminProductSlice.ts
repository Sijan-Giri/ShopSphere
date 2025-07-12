import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status, type IProduct } from "../globals/types/types";
import type { AppDispatch, RootState } from "./store";
import { AuthApi } from "../http";

export interface IAdminProductState{
    products : IProduct[],
    status : Status,
    singleProduct : IProduct | null
} 

const initialState : IAdminProductState = {
    products : [],
    status : Status.Loading,
    singleProduct : null
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
        },
        setSingleProduct(state:IAdminProductState,action:PayloadAction<IProduct>) {
            state.singleProduct = action.payload
        }
    }
})

export const {setProducts , setStatus , setAddProducts , setDeleteProduct , setSingleProduct} = adminProductSlice.actions;
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

export function fetchAdminProduct(id:string) {
    return async function fetchAdminProductThunk(dispatch:AppDispatch,getState:() => RootState) {
        try {
        const store = getState();
        const existingProduct = store.adminProduct.products.find((productData) => productData.id == id)
        if(existingProduct) {
            dispatch(setSingleProduct(existingProduct))
            dispatch(setStatus(Status.Success))
        }
        else {
            dispatch(setStatus(Status.Loading))
            const response = await AuthApi.get(`product/${id}`);
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