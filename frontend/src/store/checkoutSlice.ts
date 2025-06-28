import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status, type IOrder, type IOrderData, type IOrderState } from "../globals/types/types";
import type { AppDispatch } from "./store";
import { AuthApi } from "../http";

const initialState : IOrderState = {
    item : [],
    status : Status.Loading,
    khaltiUrl : null
}

const checkoutSlice = createSlice({
    name : "checkout",
    initialState,
    reducers : {
        setItem(state:IOrderState,action:PayloadAction<IOrder[]>) {
            state.item = action.payload
        },
        setStatus(state:IOrderState,action:PayloadAction<Status>) {
            state.status = action.payload
        },
        setKhaltiUrl(state:IOrderState,action:PayloadAction<string>) {
            state.khaltiUrl = action.payload
        }
    }
})

export const {setItem , setStatus , setKhaltiUrl} = checkoutSlice.actions;
export default checkoutSlice.reducer;

export function createOrder(data:IOrderData) {
    return async function createOrderThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.post("orders",data);
            console.log(response.data.data)
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setItem(response.data.data));
                dispatch(setKhaltiUrl(response.data.url))
            }
            else {
                dispatch(setStatus(Status.Error));
            }
        } catch (error) {
            dispatch(setStatus(Status.Error));
        }
    }
}

export function fetchMyOrders() {
    return async function fetchMyOrdersThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.get("orders");
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setItem(response.data.data))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}