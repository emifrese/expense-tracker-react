import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { expenses: [], totalAmount: 0 };

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    increment(state, action) {
      // state.push(action)

      if (action.payload.length !== undefined) {
        action.payload.forEach((exp) => {
          state.expenses.push(exp);
        });
      } else {
        state.expenses.push(action.payload);
      }
    },
    reset(state) {
      state.expenses = [];
    },
    delete(state, action) {
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      state.expenses = updatedExpenses;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
