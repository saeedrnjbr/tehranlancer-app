import { fetchSliders } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false,
};

const sliderSlice = createSlice({
    name: "sliders",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSliders.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchSliders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchSliders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })
    }
});

export const { LIST_SLIDERS  } = sliderSlice.actions;

export default sliderSlice.reducer;