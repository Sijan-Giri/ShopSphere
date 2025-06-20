import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import { Status, type IUser, type IUserState } from "../globals/types/types";
import type { AppDispatch } from "./store";
import axios from "axios";

const initialState : IUserState = {
    user : {
        username : '',
        email : '',
        password : ''
    },
    status : Status.Loading,
    token : ''
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser(state:IUserState,action:PayloadAction<IUser>) {
            state.user = action.payload
        },
        setStatus(state:IUserState,action:PayloadAction<Status>) {
            state.status = action.payload
        },
        setToken(state:IUserState,action:PayloadAction<string>) {
            state.token = action.payload
        }
    }
})

export const {setUser , setStatus , setToken} = userSlice.actions;
export default userSlice.reducer;

export function registerUser(data:IUser) {
    return async function registerUserThunk(dispatch:AppDispatch) {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/register",data);
            if(response.status == 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setUser(response.data.data))
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error))
            console.log(error)
        }
    }
} 

export function loginUser (data : IUser) {
    return async function loginUserThunk(dispatch : AppDispatch) {
        try {
            dispatch(setStatus(Status.Loading));
            const response = await axios.post("http://localhost:3000/api/auth/login",data);
            if(response.status == 200) {
                dispatch(setStatus(Status.Success))
                if(response.data.token) {
                    localStorage.setItem("token",response.data.token)
                    dispatch(setToken(response.data.token))
                }
                else {
                    dispatch(setStatus(Status.Error))
                }
            }
            else {
                dispatch(setStatus(Status.Error))
            }
        } catch (error) {
            dispatch(setStatus(Status.Error));
            console.log(error)
        }
    }
}