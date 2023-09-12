import { createSlice } from "@reduxjs/toolkit";


const filterStatusSlice = createSlice({
    name: 'filterStatus',
    initialState: {
        filter:'ALL',
        sort:'DESC'
    },
    reducers: {
        changeStatus: (state, action) => {
            switch (action.payload) {
                case 'ALL' : 
                case 'IN_PROGRESS' :
                case 'COMPLETED' : state.filter = action.payload; break;
                default: state.filter = 'ALL';
            }
        },
        changeSortOrder: (state) => {
            state.sort = state.sort === 'DESC' ? 'ASC' : 'DESC';
        }
    }
})

export default filterStatusSlice.reducer;

export const {changeStatus , changeSortOrder} = filterStatusSlice.actions