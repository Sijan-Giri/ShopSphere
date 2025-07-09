import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status, type ICategory, type ICategoryState } from "../globals/types/types";
import type { AppDispatch } from "./store";
import { AuthApi } from "../http";

const initialState : ICategoryState = {
    category : [],
    status : Status.Loading
}

const adminCategorySlice = createSlice({
    name : "categories",
    initialState,
    reducers : {
        setCategory(state:ICategoryState,action:PayloadAction<ICategory[]>) {
            state.category = action.payload
        },
        setStatus(state:ICategoryState,action:PayloadAction<Status>) {
            state.status = action.payload
        },
        setAddCategoryItem(state:ICategoryState,action:PayloadAction<ICategory>) {
          state.category.push(action.payload)
        },
        setDeleteCategory(state:ICategoryState,action:PayloadAction<string>) {
            const index = state.category.findIndex((data) => data.id == action.payload);
            if(index !== -1) {
                state.category.splice(index,1)
            }
        }
    }
})

export const {setCategory , setStatus , setDeleteCategory , setAddCategoryItem} = adminCategorySlice.actions;
export default adminCategorySlice.reducer;

export function fetchCategories() {
    return async function fetchCategoriesThunk(dispatch:AppDispatch) {
        try {
      const response = await AuthApi.get("category");
      if(response.status == 200) {
        dispatch(setCategory(response.data.data));
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

export function deleteCategory(id:string) {
    return async function deleteCategoryThunk(dispatch:AppDispatch) {
        try {
              const response = await AuthApi.delete(`category/${id}`);
              if(response.status == 200) {
                dispatch(setStatus(Status.Success))
                dispatch(setDeleteCategory(id))
              }
              else {
                dispatch(setStatus(Status.Error))
              }
            } catch (error) {
              dispatch(setStatus(Status.Error))
            }
    }
}

export function addCategory(categoryName:string) {
    return async function deleteCategoryThunk(dispatch:AppDispatch) {
        try {
              const response = await AuthApi.post(`category`,{categoryName});
              if(response.status == 200) {
                dispatch(setStatus(Status.Success))
                dispatch(setAddCategoryItem(response.data.data))
              }
              else {
                dispatch(setStatus(Status.Error))
              }
            } catch (error) {
              dispatch(setStatus(Status.Error))
            }
    }
}