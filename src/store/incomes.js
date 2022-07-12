import { createSlice } from "@reduxjs/toolkit";

const initialIncomesState = {
  incomesPerMonth: [],
  newFilterInc: [],
  incomesPerMate: [],
};

const incomesSlice = createSlice({
  name: "incomes",
  initialState: initialIncomesState,
  reducers: {
    incomesPerMonth(state, action){
      state.incomesPerMonth = [{monthYear: '', incomes: []}]
      if(action.payload.length !== undefined){
        action.payload.forEach(inc => {
          const stringCompare = inc.month.toString() + inc.year.toString();
          if(state.incomesPerMonth.some((incGroup) => incGroup.monthYear === stringCompare)){
            const index = state.incomesPerMonth.map(inc => inc.monthYear).indexOf(stringCompare)
            state.incomesPerMonth[index].incomes.push(inc)
          } else {
            state.incomesPerMonth.push({monthYear: stringCompare, incomes: [inc]})
          }
        })
      }
    },
    incomesPerMate(state, action){
      state.incomesPerMate = [];
      const incomes = action.payload;
      incomes.forEach((inc) => {
        if (
          !state.incomesPerMate.some((mate) => mate.person === inc.person)
        ) {
          state.incomesPerMate.push({
            person: inc.person,
            amount: inc.amount,
            colors: inc.colors,
          });
        } else {
          const index = state.incomesPerMate
            .map((mate) => mate.person)
            .indexOf(inc.person);
          state.incomesPerMate[index].amount += inc.amount;
        }
      });
    },
    newFilterIncomes(state, action){
      const index = state.incomesPerMonth.map(inc => inc.monthYear).indexOf(action.payload)
      let newArray
      if(index !== - 1){
        newArray = state.incomesPerMonth[index].incomes
      } else {
        newArray = []
      }
      state.newFilterInc = newArray;
    }
  },
});

export const incomesActions = incomesSlice.actions;

export default incomesSlice.reducer;
