import { createSlice } from "@reduxjs/toolkit";


const filterStatusSlice = createSlice({
    name: 'filterStatus',
    initialState: 'ALL',
    reducers: {
        changeStatus: (state, action) => {
            switch (action.payload) {
                case 'ALL' : 
                case 'IN_PROGRESS' :
                case 'COMPLETED' : return action.payload
                default: return 'ALL'
            }
        }
    }
})

export default filterStatusSlice.reducer;

export const {changeStatus} = filterStatusSlice.actions