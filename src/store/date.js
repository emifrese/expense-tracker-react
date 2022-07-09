import { createSlice } from "@reduxjs/toolkit";

import { actualDate } from "../helpers/variables";

const initialDateState = {
    day: actualDate.getDay(),
    month: actualDate.getMonth(),
    year: actualDate.getFullYear(),
}

const dateSlice = createSlice({
    name: 'date',
    initialState: initialDateState,
    reducers: {
        setDay(state, action){
            state.day = action.payload;
        },
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