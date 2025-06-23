import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "./store";
import { Status, type ICart, type ICartState, } from "../globals/types/types";
import { AuthApi } from "../http";

const initialState : ICartState = {
    cart : [],
    status : Status.Loading
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        setCart(state: ICartState,action:PayloadAction<ICart[]>) {
            state.cart = action.payload
        },
        setStatus(state:ICartState,action:PayloadAction<Status>) {
            state.status = action.payload
        }
    }
})

export const {setCart , setStatus} = cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(productId : string) {
    return async function addToCartThunk(dispatch:AppDispatch) {
        try {
        dispatch(setStatus(Status.Loading));
        const response = await AuthApi.post("cart",{
            productId ,
            quantity : 1
        });
        if(response.status == 200) {
            dispatch(setStatus(Status.Success));
            dispatch(setCart(response.data.data));
        }
        else {
            dispatch(setStatus(Status.Error))
        }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}

export function fetchMyCartItems() {
    return async function fetchMyCartItemsThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.get("cart");
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setCart(response.data.data))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}

export function deleteMyCartItem() {
    return async function deleteMyCartItemThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.delete("cart");
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}

export function updateCartItem(productId : string, quantity : number) {
    return async function updateCartItemThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.patch("cart",{
                productId,
                quantity
            })
            if(response.status == 200) {
                dispatch(setStatus(Status.Error));
                dispatch(setCart(response.data.data))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}