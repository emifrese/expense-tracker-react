import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expensePerMonth: [{ monthYear: "", expenses: [] }],
  orderedExpenses: [],
  expensesAmountPerCat: [],
  newFixedExp: [],
  expenses: [],
  filterExp: [],
  expensesTotalPerCategoryDate: [],
  fixedExp: [],
  category: "All",
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    firstEnteredData(state, action){
      state.expensePerMonth = [{monthYear: '', expenses: []}];
      if(action.payload.length !== undefined) {
        action.payload.forEach((exp) =>{
          const stringCompare = exp.month.toString() + exp.year.toString();
          if(state.expensePerMonth.some((expGroup) => expGroup.monthYear === stringCompare)){
            const index = state.expensePerMonth.map(exp => exp.monthYear).indexOf(stringCompare)
            state.expensePerMonth[index].expenses.push(exp)
          } else {
            state.expensePerMonth.push({monthYear: exp.month.toString() + exp.year.toString(), expenses: [exp]})
          }
        })
      }
      state.expensePerMonth.shift()
    },
    orderExpenses(state,action){
      const index = state.expensePerMonth.map(exp => exp.monthYear).indexOf(action.payload)
      let newArray
      if(index !== -1){
        newArray = state.expensePerMonth[index].expenses
        newArray.sort((a, b) => {
          return a.day - b.day;
        });
      } else {
        newArray = [];
      }
      state.orderedExpenses = newArray
    },
    separateAmounts(state,action){
      if (state.expensesAmountPerCat.length > 0) {
        state.expensesAmountPerCat = [];
      }
      action.payload.forEach(cat=> {
        state.orderedExpenses.forEach(exp =>{
          if (exp.category === cat) {
            if (
              !state.expensesAmountPerCat.some(
                (tot) => tot.category === cat
              )
            ) {
              state.expensesAmountPerCat.push({
                category: exp.category,
                amount: exp.amount,
                colors: exp.colors,
              });
            } else {
              const index = state.expensesAmountPerCat
                .map((expT) => expT.category)
                .indexOf(cat);
              state.expensesAmountPerCat[index].amount += +exp.amount;
            }
          }
        })
      })
    },
    newFixed(state, action){
      state.newFixedExp = [];
      const [fixedExp, year, month] = action.payload;

      console.log(fixedExp)

      if(state.orderedExpenses.length < 1) {
        state.newFixedExp = fixedExp;
      } else {
        fixedExp.forEach((fixExp) => {
          if (
            state.orderedExpenses.some(
              (mExp) => mExp.title === fixExp.title && mExp.fixedExp
            ) ||
            ("skip" in fixExp &&
              fixExp.skip.some(
                (date) => date.month === month && date.year === year
              ))
          ) {
            return;
          }
          if (fixExp.year === year && fixExp.month <= month) {
            state.newFixedExp.push(fixExp);
          } else if (fixExp.year < year) {
            state.newFixedExp.push(fixExp);
          }
        });
      }

      
    },
    increment(state, action) {
      state.expenses = [];
      if (action.payload.length !== undefined) {
        action.payload.forEach((exp) => {
          state.expenses.push(exp);
        });
      } else {
        state.expenses.push(action.payload);
      }
    },
    filterExpenses(state, action) {
      state.filterExp = [];
      const [expenses, monthDate, yearDate] = action.payload;
      let expArray = state.expenses;
      if (expenses.length > 0) {
        expArray = expenses;
      }
      expArray.forEach((exp) => {
        if (exp.month === monthDate && exp.year === yearDate) {
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
      state.fixedExp = [];
      const [fixedExp, year, month] = action.payload;
      
      const monthlyExp = [];
      state.expenses.forEach((exp) => {
        if (exp.month === month && exp.year === year) {
          monthlyExp.push(exp);
        }
      });
      fixedExp.forEach((fixExp) => {
        if (
          monthlyExp.some(
            (mExp) => mExp.title === fixExp.title && mExp.fixedExp
          ) ||
          ("skip" in fixExp &&
            fixExp.skip.some(
              (date) => date.month === month && date.year === year
            ))
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
