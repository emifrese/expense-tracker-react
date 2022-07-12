import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expensePerMonth: [],
  orderedExpenses: [],
  expensesAmountPerCat: [],
  newFixedExp: [],
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
            state.expensePerMonth.push({monthYear: stringCompare, expenses: [exp]})
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
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
