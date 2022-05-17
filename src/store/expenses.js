import { createSlice } from "@reduxjs/toolkit";

const actualDate = new Date();

const initialExpenseState = {
  expenses: [],
  totalAmount: 0,
  filterExp: [],
  chartExp: [],
  month: actualDate.getMonth().toString(),
  year: actualDate.getFullYear().toString(),
  category: "All",
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    increment(state, action) {
      state.totalAmount = 0;
      if (action.payload.length !== undefined) {
        action.payload.forEach((exp) => {
          state.expenses.push(exp);
        });
      } else {
        state.expenses.push(action.payload);
      }
    },
    reset(state, action) {
      const type = action.payload;
      state[type] = [];
    },
    delete(state, action) {
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      state.expenses = updatedExpenses;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
    setMonth(state, action) {
      state.month = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    chartExp(state) {
      for(const expense of state.expenses){
        if(expense.year.toString() === state.year){
          state.chartExp.push(expense)
        }
      }
    },
    filteredExp(state) {
      if (state.expenses.length > 1) {
        for (const expense of state.expenses) {
          if (
            expense.month.toString() === state.month &&
            expense.year.toString() === state.year &&
            state.category === "All"
          ) {
            state.filterExp.push(expense);
          } else if (
            expense.month.toString() === state.month &&
            expense.year.toString() === state.year &&
            expense.category === state.category
          ) {
            state.filterExp.push(expense);
          }
        }
        state.filterExp.sort((a, b) => {
          return a.day - b.day;
        });
      } else {
        console.log("no expenses to filter");
      }
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
