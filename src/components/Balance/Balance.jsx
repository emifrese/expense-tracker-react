import React from "react";
import { useSelector } from "react-redux";
import BalanceCard from "./BalanceCard";

import { actualDate } from "../../helpers/variables";

const Balance = () => {
  const newIncArray = useSelector(state => state.incomes.incomesPerMonth)
  const newExpArray = useSelector(state => state.expense.expensePerMonth)

  const stringCompare = actualDate.getMonth().toString() + actualDate.getFullYear().toString()

  const indexExp = newExpArray.map(exp => exp.monthYear).indexOf(stringCompare)

  const indexInc = newIncArray.map(inc => inc.monthYear).indexOf(stringCompare)


  let incomes = 0;
  let expenses = 0;

  if(indexInc !== -1){
    for (const income of newIncArray[indexInc].incomes) {
      if (income.year === actualDate.getFullYear() && income.month === actualDate.getMonth()) {
        incomes += income.amount;
      }
    }
  }

  if(indexExp !== -1){
    for (const expense of newExpArray[indexExp].expenses) {
      if (
        expense.year === actualDate.getFullYear() &&
        expense.month === actualDate.getMonth() &&
        expense.payed
      ) {
        expenses += expense.amount;
      }
    }
  }

  const remaining = incomes - expenses;

  return (
    <BalanceCard incomes={incomes} expenses={expenses} remaining={remaining} />
  );
};

export default Balance;
