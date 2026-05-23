import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        searchedFilter: ""
    },
    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setsearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setsearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setSearchedFilter: (state, action) => {
            state.searchedFilter = action.payload;
        }
    }
});
export const { setAllJobs, setSingleJob, setAllAdminJobs, setsearchJobByText, setAllAppliedJobs, setsearchedQuery,setSearchedFilter } = jobSlice.actions;
export default jobSlice.reducer;
