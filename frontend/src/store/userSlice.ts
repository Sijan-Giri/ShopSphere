import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { User } from "./types";

const initialState:User = {
    user : "sijan"
}
const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setName(state:User,action:PayloadAction<string>) {
            state.user = action.payload
        }
    }
})

export const {setName} = userSlice.actions;
export default userSlice.reducer