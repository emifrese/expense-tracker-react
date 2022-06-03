import React from "react";

import "./Balance.css";
import arrowDown from "../../assets/arrow-down.png";
import arrowUp from "../../assets/arrow-up.png";
import { useSelector } from "react-redux";

const Balance = () => {
  const incomesArray = useSelector((state) => state.incomes.incomes);
  const expensesArray = useSelector((state) => state.expense.expenses);
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);

  let incomes = 0;
  let expenses = 0;

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
    <div className="balance-card">
      <div className="balance-card__title">
        <h2>Total Balance</h2>
        <p>$ {remaining}</p>
      </div>
      <div className="balance-card__info">
        <figure className="balance-card__info_inc">
          <img src={arrowDown} alt="arrow-down" />
          <figcaption>Income {incomes}</figcaption>
        </figure>
        <figure className="balance-card__info_exp">
          <img src={arrowUp} alt="arrow-up" />
          <figcaption>Expenses {expenses}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default Balance;
