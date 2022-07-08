import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenses: [],
  totalAmount: 0,
  fixedExp: [],
  filterExp: [],
  expensesTotalPerCategoryDate: [],
  category: "All",
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    increment(state, action) {
      state.expenses = [];
      state.totalAmount = 0;
      if (action.payload.length !== undefined) {
        action.payload.forEach((exp) => {
          state.expenses.push(exp);
        });
      } else {
        state.expenses.push(action.payload);
      }
    },
    delete(state, action) {
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      state.expenses = updatedExpenses;
    },
    filterExpenses(state, action) {
      state.filterExp = [];
      const [expenses, monthDate, yearDate] = action.payload;
      let expArray = state.expenses;
      if(expenses.length > 0){
        expArray = expenses;
      }
      expArray.forEach((exp) => {
        if (
          exp.month === monthDate &&
          exp.year === yearDate 
        ) {
          state.filterExp.push(exp);
        }
      });
      state.filterExp.sort((a, b) => {
        return a.day - b.day;
      });
    },
    filterAmount(state, action) {
      const [expenses, categories] = action.payload;
      if (state.expensesTotalPerCategoryDate.length > 0) {
        state.expensesTotalPerCategoryDate = [];
      }
      categories.forEach((cat) => {
        expenses.forEach((exp) => {
          if (exp.category === cat) {
            if (
              !state.expensesTotalPerCategoryDate.some(
                (tot) => tot.category === cat
              )
            ) {
              state.expensesTotalPerCategoryDate.push({
                category: exp.category,
                amount: exp.amount,
                colors: exp.colors,
              });
            } else {
              const index = state.expensesTotalPerCategoryDate
                .map((expT) => expT.category)
                .indexOf(cat);
              state.expensesTotalPerCategoryDate[index].amount += +exp.amount;
            }
          }
        });
      });
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    fixedExp(state, action) {
      state.fixedExp = []
      const [fixedExp, year, month] = action.payload;
      const monthlyExp = state.expenses.map((exp) => {
        if (exp.month === month && exp.year === year) {
          return exp;
        }
          return null
      });
      fixedExp.forEach((fixExp) => {
        if (
          monthlyExp.some(
            (mExp) => mExp.title === fixExp.title && mExp.fixedExp
          ) || ("skip" in fixExp && fixExp.skip.some((date) => date.month === month && date.year === year))
        ) {
          return;
        }
        if (fixExp.year === year && fixExp.month <= month) {
          state.fixedExp.push(fixExp);
        } else if (fixExp.year < year) {
          state.fixedExp.push(fixExp);
        }
      });
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
