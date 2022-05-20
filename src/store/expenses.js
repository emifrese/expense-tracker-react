import { createSlice } from "@reduxjs/toolkit";

const actualDate = new Date();

const initialExpenseState = {
  expenses: [],
  totalAmount: 0,
  fixedExp: [],
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
      console.log("agrego a redux");
      state.totalAmount = 0;
      if (action.payload.length !== undefined) {
        action.payload.forEach((exp) => {
          // if(exp.day === null && exp.fixedExp) {
          //   if(exp.month < actualDate.getMonth() && exp.year === actualDate.getFullYear()){
          //     exp.day = 1;
          //     exp.month = actualDate.getMonth()
          //     state.expenses.push(exp);
          //   } else if (exp.year < actualDate.getFullYear()) {
          //     exp.day = 1;
          //     exp.month = actualDate.getMonth();
          //     exp.year = actualDate.getFullYear();
          //     state.expenses.push(exp);
          //   }
          // } else if (!exp.fixedExp) {
          //   state.expenses.push(exp);
          // } else if (exp.day !== null && exp.fixedExp){
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
      for (const expense of state.expenses) {
        if (expense.year.toString() === state.year) {
          state.chartExp.push(expense);
        }
      }
    },
    filteredExp(state) {
      if (state.expenses.length > 0) {
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
    fixedExp(state, action){
      action.payload.forEach((expF) => {
        for(const exp of state.expenses){
          if(exp.title === expF.title && exp.month === expF.month && exp.month === parseInt(state.month) && exp.year === parseInt(state.year)){
            return
          } else if(expF.month > parseInt(state.month) && expF.year === parseInt(state.year)) {
            return
          } 
        }
        state.fixedExp.push(expF);
      })
      state.fixedExp.sort((a, b) => {
        return a.month - b.month;
      });
    }
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
