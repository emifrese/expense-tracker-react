import { createSlice } from "@reduxjs/toolkit";

const initialIncomesState = { incomes: [] };

const incomesSlice = createSlice({
    name: 'incomes',
    initialState: initialIncomesState,
    reducers: {
        addIncome(state, action) {
            if(action.payload.length !== undefined) {
                action.payload.forEach((inc) => {
                    state.incomes.push(inc);
                  });
            } else {
                state.incomes.push(action.payload)
            }
        },
        reset(state) {
            state.incomes = [];
            console.log('reseteando state')
        }
    }
})

export const incomesActions = incomesSlice.actions;

export default incomesSlice.reducer;