import { fetchProduct, fetchProducts } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false,

    productIsLoading: false,
    productData: [],
    productError: false,

};

const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })

        builder.addCase(fetchProduct.pending, (state, action) => {
            state.productIsLoading = true;
            state.productError = false;
            state.productData = [];
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.productIsLoading = false;
            state.productData = action.payload.data;
            state.productError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.productIsLoading = false;
            state.productError = false;
        })

    }
});

export const { LIST_PRODUCTS  } = productSlice.actions;

export default productSlice.reducer;