import React from "react";

import "./TransactionsList.css";

import meat from "../../assets/meat.png";
import vegetable from "../../assets/vegetable.png";
import { useSelector } from "react-redux";
import TransactionsItem from "./TransactionsItem";

const Transactions = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);
  const category = useSelector((state) => state.expense.category);

  let iteration = [];

  for (const expense of expenses) {
    if (expense.month === monthDate && expense.year === yearDate) {
      if (category === "All") {
        iteration.push(expense);
      } else if (expense.category === category) {
        iteration.push(expense);
      }
    }
  }
  iteration.sort((a, b) => {
    return a.day - b.day;
  });

  const list = [];

  for (const [i, element] of iteration.entries()) {
    const imgIcon = element.category === "Carniceria" ? meat : vegetable;
    const colorIcon = element.category === "Carniceria" ? "#FA8072" : "#28B463";

    list.push(<TransactionsItem imgIcon={imgIcon} colorIcon={colorIcon} title={element.title} amount={element.amount} day={element.day} key={i}/>);
  }

  return (
    <div className="transactions">
      <p className="transactions__title">Transactions</p>
      <p className="transactions__all">View All</p>
      <ul className="transactions__list">{list}</ul>
    </div>
  );
};

export default Transactions;
