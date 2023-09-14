import { createSlice } from "@reduxjs/toolkit";


export const defaultFilterSortState = {
    status: {
      low: false,
      medium: false,
      high: false,
      progress: false,
      completed: false,
      priority: false,
      all: false,
      sort: "recent",
      priorityOrder: "asc",
      alphabeticalOrder: "asc",
      recentOrder: "asc",
    },
  }

const filterSortSlice = createSlice({
  name: "filterSort",
  initialState: defaultFilterSortState,
  reducers: {
    updateStatus: (state,action) => {
        state.status = action.payload;
    }
  }
});

export default filterSortSlice.reducer;

export const {updateStatus} = filterSortSlice.actions;