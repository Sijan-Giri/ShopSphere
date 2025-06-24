import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "./store";
import { Status, type ICart, type ICartState, type ICartUpdatedItem, } from "../globals/types/types";
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
        },
        setUpdateCart(state:ICartState,action:PayloadAction<ICartUpdatedItem> ) {
            const index = state?.cart?.findIndex((index) => index?.Product?.id == action.payload.productId);
            if(index !== -1) {
                state.cart[index].quantity = action.payload.quantity
            }
        },
        setDeleteCart(state:ICartState,action:PayloadAction<string>) {
            const index = state.cart.findIndex((index) => index.Product.id == action.payload);
            if(index !== -1) {
                state.cart.splice(index,1)
            }
        }
    }
})

export const {setCart , setStatus , setUpdateCart , setDeleteCart} = cartSlice.actions;
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

export function deleteMyCartItem(productId : string) {
    return async function deleteMyCartItemThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.delete(`cart/${productId}`);
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setDeleteCart(productId))
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
            const response = await AuthApi.patch(`cart/${productId}`,{
                quantity
            })
            if(response.status == 200) {
                dispatch(setStatus(Status.Error));
                dispatch(setUpdateCart({productId , quantity}))
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