import { createSlice } from "@reduxjs/toolkit";

const initialIncomesState = {
  incomes: [],
  incomesTotalPerMate: [],
  filterInc: [],
};

const incomesSlice = createSlice({
  name: "incomes",
  initialState: initialIncomesState,
  reducers: {
    addIncome(state, action) {
      if (action.payload.length !== undefined) {
        action.payload.forEach((inc) => {
          state.incomes.push(inc);
        });
      }

      // else {
      //     state.incomes.push(action.payload)
      // } chequear si con 1 income es necesario
    },
    reset(state) {
      state.incomes = [];
    },
    incomePerMateDate(state, action) {
      state.incomesTotalPerMate = [];
      const [incomes, monthDate, yearDate] = action.payload;
      incomes.forEach((inc) => {
        if (inc.month === monthDate && inc.year === yearDate) {
          if (
            !state.incomesTotalPerMate.some(
              (mate) => mate.person === inc.person
            )
          ) {
            state.incomesTotalPerMate.push({
              person: inc.person,
              amount: inc.amount,
              colors: inc.colors,
            });
          } else {
            const index = state.incomesTotalPerMate
              .map((mate) => mate.person)
              .indexOf(inc.person);
            state.incomesTotalPerMate[index].amount += inc.amount;
          }
        }
      });
    },
    filterIncomes(state, action) {
      state.filterInc = [];
      const [incomes, monthDate, yearDate] = action.payload;
      incomes.forEach((inc) => {
        if (
          inc.month === monthDate &&
          inc.year === yearDate &&
          !state.filterInc.some((incF) => incF.id === inc.id)
        ) {
          state.filterInc.push(inc);
        }
      });
    },
  },
});

export const incomesActions = incomesSlice.actions;

export default incomesSlice.reducer;
