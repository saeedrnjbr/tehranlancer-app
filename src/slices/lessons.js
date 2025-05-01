import { fetchLesson, fetchLessons } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: undefined,

    lessonIsLoading: false,
    lessonData: [],
    lessonError: false,

};

const lessonSlice = createSlice({
    name: "lessons",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchLessons.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchLessons.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error ?? false;
            state.message = action.payload.message ?? "";
        })
        builder.addCase(fetchLessons.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })

        builder.addCase(fetchLesson.pending, (state, action) => {
            state.lessonIsLoading = true;
            state.lessonError = false;
            state.lessonData = [];
        })
        builder.addCase(fetchLesson.fulfilled, (state, action) => {
            state.lessonIsLoading = false;
            state.lessonData = action.payload.data;
            state.lessonError = action.payload.error ?? false;
            state.message = action.payload.message ?? "";
        })
        builder.addCase(fetchLesson.rejected, (state, action) => {
            state.lessonIsLoading = false;
            state.lessonError = false;
            state.lessonData = [];
        })

    }

});

export const { LIST_LESSONS  } = lessonSlice.actions;

export default lessonSlice.reducer;