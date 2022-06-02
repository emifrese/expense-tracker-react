import { createSlice } from "@reduxjs/toolkit";

const actualDate = new Date();

const initialDateState = {
    month: actualDate.getMonth(),
    year: actualDate.getFullYear()
}

const dateSlice = createSlice({
    name: 'date',
    initialState: initialDateState,
    reducers: {
        setMonth(state, action){
            state.month = action.payload;
        },
        setYear(state, action) {
            state.year = action.payload;
        }
    }
})

export const dateActions = dateSlice.actions;

export default dateSlice.reducer;