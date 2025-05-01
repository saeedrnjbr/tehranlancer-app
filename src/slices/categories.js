import { fetchCategories, fetchCategory } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false,

    categoryIsLoading: false,
    categoryData: [],
    categoryError: false,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchCategories.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })

        builder.addCase(fetchCategory.pending, (state, action) => {
            state.categoryIsLoading = true;
            state.categoryError = false;
            state.categoryData = [];
        })
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.categoryIsLoading = false;
            state.categoryData = action.payload.data;
            state.categoryError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCategory.rejected, (state, action) => {
            state.categoryIsLoading = false;
            state.categoryError = false;
        })

    }
});

export const { LIST_CATEGORIES } = categorySlice.actions;

export default categorySlice.reducer;