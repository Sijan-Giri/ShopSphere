import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status, type IMyOrder, type IMyOrderDetails, type IOrder, type IOrderData} from "../globals/types/types";
import type { AppDispatch } from "./store";
import { AuthApi } from "../http";

interface IAdminOrderState{
    item : IOrder[],
    status : Status,
    orders : IMyOrder[]
    singleOrder : IMyOrderDetails[]
}

const initialState : IAdminOrderState = {
    item : [],
    status : Status.Loading,
    orders : [],
    singleOrder : []
}

const checkoutSlice = createSlice({
    name : "adminOrder",
    initialState,
    reducers : {
        setItem(state:IAdminOrderState,action:PayloadAction<IOrder[]>) {
            state.item = action.payload
        },
        setStatus(state:IAdminOrderState,action:PayloadAction<Status>) {
            state.status = action.payload
        },
        setOrders(state:IAdminOrderState,action:PayloadAction<IMyOrder[]>) {
            state.orders = action.payload
        },
        setSingleOrder(state:IAdminOrderState,action:PayloadAction<IMyOrderDetails[]>) {
            state.singleOrder = action.payload
        }
    }
})

export const {setItem , setStatus , setSingleOrder , setOrders} = checkoutSlice.actions;
export default checkoutSlice.reducer;

export function fetchAllOrder() {
    return async function fetchAllOrdersThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.get(`orders`);
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setOrders(response.data.data))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}

export function createOrder(data:IOrderData) {
    return async function createOrderThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.post("orders",data);
            console.log(response.data.data)
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setItem(response.data.data));
            }
            else {
                dispatch(setStatus(Status.Error));
            }
        } catch (error) {
            dispatch(setStatus(Status.Error));
        }
    }
}

export function fetchMyOrderDetail(id:string) {
    return async function fetchMyOrdersThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.get(`orders/${id}`);
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setSingleOrder(response.data.data))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}

export function cancelMyOrder(id : string) {
    return async function cancelMyOrderThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.post(`orders/cancel-order/${id}`);
            if(response.status == 200) {
                dispatch(setStatus(Status.Success))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}

export function deleteOrder(id:string) {
    return async function deleteOrderThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.delete(`orders/delete-order/${id}`);
            if(response.status == 200) {
                dispatch(setStatus(Status.Success))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}