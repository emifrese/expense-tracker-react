import { useSelector } from "react-redux";

import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = () => {
  const filterExp = useSelector((state) => state.expense.filterExp);
  
  let list = [];
  let content;
  for (const expense of filterExp) {
    const expElement = (
      <ExpenseItem
        key={expense.id}
        id={expense.id}
        title={expense.title}
        amount={expense.amount}
        month={expense.month}
        year={expense.year}
        day={expense.day}
      />
    );
    list.push(expElement);
  }

  content = list;

  if (list.length < 1) {
    content = "No expenses";
  }

  return <ul className="expenses-list">{content}</ul>;
};

export default ExpensesList;
