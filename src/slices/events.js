import { fetchEvent, fetchEventCategories, fetchEventReuqest, fetchEvents } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false,
    eventCategoriesIsLoading: false,
    eventCategoriesData: [],
    eventCategoriesError: false,
    eventIsLoading: false,
    eventData: [],
    eventError: false,
    eventRequestIsLoading: false,
    eventRequestData: [],
    eventRequestError: false,
};

const eventSlice = createSlice({
    name: "events",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchEvents.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })

        builder.addCase(fetchEventCategories.pending, (state, action) => {
            state.eventCategoriesIsLoading = true;
            state.eventCategoriesError = false;
            state.eventCategoriesData = [];
        })
        builder.addCase(fetchEventCategories.fulfilled, (state, action) => {
            state.eventCategoriesIsLoading = false;
            state.eventCategoriesData = action.payload.data;
            state.eventCategoriesError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchEventCategories.rejected, (state, action) => {
            state.eventCategoriesIsLoading = false;
            state.eventCategoriesError = false;
        })

        builder.addCase(fetchEvent.pending, (state, action) => {
            state.eventIsLoading = true;
            state.eventError = false;
            state.eventData = [];
        })
        builder.addCase(fetchEvent.fulfilled, (state, action) => {
            state.eventIsLoading = false;
            state.eventData = action.payload.data;
            state.eventError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchEvent.rejected, (state, action) => {
            state.eventIsLoading = false;
            state.eventError = false;
        })


        builder.addCase(fetchEventReuqest.pending, (state, action) => {
            state.eventRequestIsLoading = true;
            state.eventRequestError = false;
            state.eventRequestData = [];
        })
        builder.addCase(fetchEventReuqest.fulfilled, (state, action) => {
            state.eventRequestIsLoading = false;
            state.eventRequestData = action.payload.data;
            state.eventRequestError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchEventReuqest.rejected, (state, action) => {
            state.eventRequestIsLoading = false;
            state.eventRequestError = false;
        })

    }
});

export const { LIST_EVENTS, LIST_EVENT_CATEGORIES, LIST_EVENT, STORE_EVENT_REQUEST } = eventSlice.actions;

export default eventSlice.reducer;