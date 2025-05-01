import { fetchCourseByCategories, fetchCourseCategories, fetchCourseCategory, fetchCourseCategoryTrees } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false,

    courseCategoryTreesIsLoading: false,
    courseCategoryTreesData: [],
    courseCategoryTreesError: false,

    courseCategoryIsLoading: false,
    courseCategoryData: [],
    courseCategoryError: false,

    courseCategoryCoursesIsLoading: false,
    courseCategoryCoursesError: false,
    courseCategoryCoursesData: []    

};

const courseCategorySlice = createSlice({
    name: "courseCategories",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCourseCategories.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchCourseCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCourseCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })

        builder.addCase(fetchCourseCategoryTrees.pending, (state, action) => {
            state.courseCategoryTreesIsLoading = true;
            state.courseCategoryTreesError = false;
            state.courseCategoryTreesData = [];
        })
        builder.addCase(fetchCourseCategoryTrees.fulfilled, (state, action) => {
            state.courseCategoryTreesIsLoading = false;
            state.courseCategoryTreesData = action.payload.data;
            state.courseCategoryTreesError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCourseCategoryTrees.rejected, (state, action) => {
            state.courseCategoryTreesIsLoading = false;
            state.courseCategoryTreesError = false;
        })

        builder.addCase(fetchCourseCategory.pending, (state, action) => {
            state.courseCategoryIsLoading = true;
            state.courseCategoryError = false;
        })
        builder.addCase(fetchCourseCategory.fulfilled, (state, action) => {
            state.courseCategoryIsLoading = false;
            state.courseCategoryData = action.payload.data;
            state.courseCategoryError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCourseCategory.rejected, (state, action) => {
            state.courseCategoryIsLoading = false;
            state.courseCategoryError = false;
            state.courseCategoryData = [];
        })

        builder.addCase(fetchCourseByCategories.pending, (state, action) => {
            state.courseCategoryCoursesIsLoading = true;
            state.courseCategoryCoursesError = false;
            state.courseCategoryCoursesData = [];
        })
        builder.addCase(fetchCourseByCategories.fulfilled, (state, action) => {
            state.courseCategoryCoursesIsLoading = false;
            state.courseCategoryCoursesData = action.payload.data;
            state.courseCategoryCoursesError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCourseByCategories.rejected, (state, action) => {
            state.courseCategoryCoursesIsLoading = false;
            state.courseCategoryCoursesError = false;
            state.courseCategoryCoursesData = [];
        })

    }
});

export const { LIST_COURSE_CATEGORIES, LIST_COURSE_CATEGORY_TREES, LIST_COURSE_CATEGORY  } = courseCategorySlice.actions;

export default courseCategorySlice.reducer;