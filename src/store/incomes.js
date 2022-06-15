import { createSlice } from "@reduxjs/toolkit";

const initialIncomesState = { incomes: [], incomesTotalPerMate: [] };

const incomesSlice = createSlice({
    name: 'incomes',
    initialState: initialIncomesState,
    reducers: {
        addIncome(state, action) {
            if(action.payload.length !== undefined) {
                action.payload.forEach((inc) => {
                    state.incomes.push(inc);
                    if(!state.incomesTotalPerMate.some(mate => mate.person === inc.person)){
                        state.incomesTotalPerMate.push({
                            person: inc.person,
                            amount: inc.amount
                        })
                    } else {
                        const index = state.incomesTotalPerMate.map(mate => mate.person).indexOf(inc.person)
                        state.incomesTotalPerMate[index].amount += inc.amount
                    }
                });
            }

            // else {
            //     state.incomes.push(action.payload)
            // } chequear si con 1 income es necesario
        },
        reset(state) {
            state.incomes = [];
        }
    }
})

export const incomesActions = incomesSlice.actions;

export default incomesSlice.reducer;