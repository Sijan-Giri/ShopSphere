import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"
import checkoutSlice from "./checkoutSlice"
import adminCategorySlice from "./adminCategorySlice"

const store = configureStore({
    reducer : {
        user : userSlice,
        product : productSlice,
        cart : cartSlice,
        checkout : checkoutSlice,
        categories : adminCategorySlice
    }
})

export default store;

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>