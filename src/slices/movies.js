import { fetchMovie, fetchMovies } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false,

    movieIsLoading: false,
    movieData: [],
    movieError: false,
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })

        builder.addCase(fetchMovie.pending, (state, action) => {
            state.movieIsLoading = true;
            state.movieError = false;
            state.movieData = [];
        })
        builder.addCase(fetchMovie.fulfilled, (state, action) => {
            state.movieIsLoading = false;
            state.movieData = action.payload.data;
            state.movieError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchMovie.rejected, (state, action) => {
            state.movieIsLoading = false;
            state.movieError = false;
        })

    }
});

export const { LIST_MOVIES, GET_MOVIE } = movieSlice.actions;

export default movieSlice.reducer;