import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"
import checkoutSlice from "./checkoutSlice"
import adminCategorySlice from "./adminCategorySlice"
import adminUserSlice from "./adminUserSlice"

const store = configureStore({
    reducer : {
        user : userSlice,
        product : productSlice,
        cart : cartSlice,
        checkout : checkoutSlice,
        categories : adminCategorySlice,
        adminUser : adminUserSlice
    }
})

export default store;

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>