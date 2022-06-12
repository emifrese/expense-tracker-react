import React from "react";
import { useSelector } from "react-redux";
import BalanceCard from "./BalanceCard";

const Balance = () => {
  const incomesArray = useSelector((state) => state.incomes.incomes);
  const expensesArray = useSelector((state) => state.expense.expenses);
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);

  let incomes = 0;
  let expenses = 0;

  console.log(expensesArray)

  for (const income of incomesArray) {
    if (income.year === yearDate && income.month === monthDate) {
      incomes += income.amount;
    }
  }

  for (const expense of expensesArray) {
    if (expense.year === yearDate && expense.month === monthDate) {
      expenses += expense.amount;
    }
  }

  const remaining = incomes - expenses;

  return (
    <BalanceCard incomes={incomes} expenses={expenses} remaining={remaining} />
  );
};

export default Balance;
