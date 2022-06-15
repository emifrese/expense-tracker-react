import React from "react";

import "./TransactionsList.css";

import meat from "../../assets/meat.png";
import vegetable from "../../assets/vegetable.png";
import { useSelector } from "react-redux";
import TransactionsItem from "./TransactionsItem";

const actualDate = new Date();

const TransactionsList = ({ section, type, expenses, incomes }) => {
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);
  const category = useSelector((state) => state.expense.category);

  let iteration = [];
  console.log(expenses);
  if(type === 'Expenses'){
    for (const expense of expenses) {
      if (section !== "main") {
        if (expense.month === monthDate && expense.year === yearDate) {
          if (category === "All") {
            iteration.push(expense);
          } else if (expense.category === category) {
            iteration.push(expense);
          }
        }
      } else {
        if (
          expense.month === actualDate.getMonth() &&
          expense.year === actualDate.getFullYear() &&
          expense.day === actualDate.getDate()
        ) {
          iteration.push(expense);
        }
      }
    }
    iteration.sort((a, b) => {
      return a.day - b.day;
    });
  } else {
    for(const income of incomes) {
      if(income.month === monthDate && income.year === yearDate){
        iteration.push(income)
      }
    }
  }
  
  const list = [];

  for (const [i, element] of iteration.entries()) {
    const imgIcon = element.category === "Carniceria" ? meat : vegetable;
    const colorIcon = element.category === "Carniceria" ? "#FA8072" : "#28B463";
    const border = i < iteration.length - 1 ? "bottomBorder" : "";

    list.push(
      <TransactionsItem
        imgIcon={imgIcon}
        colorIcon={colorIcon}
        title={element.title}
        amount={element.amount}
        day={element.day}
        month={element.month}
        key={i}
        border={border}
      />
    );
  }
  return (
    <div className="transactions">
      <p className="transactions__title">Transactions</p>
      <ul className={section !== 'main' ? 'transactions__list fullList' : 'transactions__list'}>{list}</ul>
    </div>
  );
};

export default TransactionsList;
