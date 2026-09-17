import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  priority: "all",
};

const filtersSlice = createSlice({
  name: "filters",

  initialState,

  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    setPriority: (state, action) => {
      state.priority = action.payload;
    },
  },
});

export const {
  setSearch,
  setPriority,
} = filtersSlice.actions;


// Selector for complete filters state
export const selectFilters = (state) => state.filters;


// Individual selectors
export const selectSearch = (state) => state.filters.search;

export const selectPriority = (state) => state.filters.priority;


export default filtersSlice.reducer;