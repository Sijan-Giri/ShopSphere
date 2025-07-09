import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "./store";
import { AuthApi } from "../http";
import { Status } from "../globals/types/types";

export interface IUser{
    id : string,
    username : string,
    email : string,
    role : string
}

export interface IUserState{
    users : IUser[],
    status : Status
}

const initialState:IUserState = {
    users : [],
    status : Status.Loading
}

const adminUserSlice = createSlice({
    name : "adminUser",
    initialState,
    reducers : {
        setUsers(state:IUserState,actions:PayloadAction<IUser[]> ) {
            state.users = actions.payload
        },
        setStatus(state:IUserState,action:PayloadAction<Status>) {
            state.status = action.payload
        },
        setDeleteUser(state:IUserState,action:PayloadAction<string>) {
            const index = state.users.findIndex((user) => user?.id == action.payload);
            if(index !== -1) {
                state.users.splice(index,1)
            }
        }
    }
})

export const {setUsers , setStatus , setDeleteUser} = adminUserSlice.actions;
export default adminUserSlice.reducer;

export function fetchAllUser() {
    return async function fetchAllUserThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.get("auth/users");
            if(response.status == 200) {
                dispatch(setUsers(response.data.data));
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

export function deleteUser(id : string) {
    return async function deleteUserThunk(dispatch:AppDispatch) {
        try {
            const response = await AuthApi.delete(`auth/users/${id}`);
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setDeleteUser(id))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
        }
    }
}