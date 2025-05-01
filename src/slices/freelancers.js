import { fetchFreelancer, fetchFreelancerLevels, fetchFreelancerRequest, fetchFreelancers, fetchStoreFreelancerLevel } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false,

    freelancerIsLoading: false,
    freelancerData: [],
    freelancerError: false,

    freelancerLevelIsLoading: false,
    freelancerLevelData: undefined,
    freelancerLevelError: false,

    freelancerRequestIsLoading: false,
    freelancerRequestData: [],
    freelancerRequestError: false,

    storeFreelancerLevelIsLoading: false,
    storeFreelancerLevelData: [],
    storeFreelancerLevelError: false,

};

const freelancerSlice = createSlice({
    name: "freelancers",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchFreelancers.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchFreelancers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchFreelancers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })

        builder.addCase(fetchFreelancerLevels.pending, (state, action) => {
            state.freelancerLevelIsLoading = true;
            state.freelancerLevelError = false;
            state.freelancerLevelData = undefined;
        })
        builder.addCase(fetchFreelancerLevels.fulfilled, (state, action) => {
            state.freelancerLevelIsLoading = false;
            state.freelancerLevelData = action.payload.data;
            state.freelancerLevelError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchFreelancerLevels.rejected, (state, action) => {
            state.freelancerLevelIsLoading = false;
            state.freelancerLevelError = false;
            state.freelancerLevelData = []
        })

        builder.addCase(fetchStoreFreelancerLevel.pending, (state, action) => {
            state.storeFreelancerLevelIsLoading = true;
            state.storeFreelancerLevelError = false;
            state.storeFreelancerLevelData = [];
        })
        builder.addCase(fetchStoreFreelancerLevel.fulfilled, (state, action) => {
            state.storeFreelancerLevelIsLoading = false;
            state.storeFreelancerLevelData = action.payload.data;
            state.storeFreelancerLevelError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchStoreFreelancerLevel.rejected, (state, action) => {
            state.storeFreelancerLevelIsLoading = false;
            state.storeFreelancerLevelError = false;
        })

        builder.addCase(fetchFreelancer.pending, (state, action) => {
            state.freelancerIsLoading = true;
            state.freelancerError = false;
            state.freelancerData = [];
        })
        builder.addCase(fetchFreelancer.fulfilled, (state, action) => {
            state.freelancerIsLoading = false;
            state.freelancerData = action.payload.data;
            state.freelancerError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchFreelancer.rejected, (state, action) => {
            state.freelancerIsLoading = false;
            state.freelancerError = false;
        })

        builder.addCase(fetchFreelancerRequest.pending, (state, action) => {
            state.freelancerRequestIsLoading = true;
            state.freelancerRequestError = false;
            state.freelancerRequestData = [];
        })
        builder.addCase(fetchFreelancerRequest.fulfilled, (state, action) => {
            state.freelancerRequestIsLoading = false;
            state.freelancerRequestData = action.payload.data;
            state.freelancerRequestError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchFreelancerRequest.rejected, (state, action) => {
            state.freelancerRequestIsLoading = false;
            state.freelancerRequestError = false;
        })


    }
});

export const { LIST_FREELANCERS, STORE_FREELANCER_LEVEL } = freelancerSlice.actions;

export default freelancerSlice.reducer;