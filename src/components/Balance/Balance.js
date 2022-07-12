import React from "react";
import { useSelector } from "react-redux";
import BalanceCard from "./BalanceCard";

import { actualDate } from "../../helpers/variables";

const Balance = () => {
  const incomesArray = useSelector((state) => state.incomes.incomes);
  const newExpArray = useSelector(state => state.expense.expensePerMonth)

  const stringCompare = actualDate.getMonth().toString() + actualDate.getFullYear().toString()

  const index = newExpArray.map(exp => exp.monthYear).indexOf(stringCompare)


  let incomes = 0;
  let expenses = 0;

  for (const income of incomesArray) {
    if (income.year === actualDate.getFullYear() && income.month === actualDate.getMonth()) {
      incomes += income.amount;
    }
  }

  if(index !== -1){
    for (const expense of newExpArray[index].expenses) {
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
