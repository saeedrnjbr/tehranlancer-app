import { fetchCourse, fetchCourses, fetchCoursesByLevel } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false,

    courseLevelsIsLoading: false,
    courseLevelsData: [],
    courseLevelsError: false,

    courseIsLoading: false,
    courseData: [],
    courseError: false,
};

const courseSlice = createSlice({
    name: "courses",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCourses.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchCourses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCourses.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })

        builder.addCase(fetchCoursesByLevel.pending, (state, action) => {
            state.courseLevelsIsLoading = true;
            state.courseLevelsError = false;
            state.courseLevelsData = [];
        })
        builder.addCase(fetchCoursesByLevel.fulfilled, (state, action) => {
            state.courseLevelsIsLoading = false;
            state.courseLevelsData = action.payload.data;
            state.courseLevelsError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCoursesByLevel.rejected, (state, action) => {
            state.courseLevelsIsLoading = false;
            state.courseLevelsError = false;
        })

        builder.addCase(fetchCourse.pending, (state, action) => {
            state.courseIsLoading = true;
            state.courseError = false;
            state.courseData = [];
        })
        builder.addCase(fetchCourse.fulfilled, (state, action) => {
            state.courseIsLoading = false;
            state.courseData = action.payload.data;
            state.courseError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCourse.rejected, (state, action) => {
            state.courseIsLoading = false;
            state.courseError = false;
        })

    }
});

export const { LIST_COURSES, GET_COURSE } = courseSlice.actions;

export default courseSlice.reducer;