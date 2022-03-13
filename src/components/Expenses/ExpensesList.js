// import { useState } from "react";
import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = (props) => {
  // const [notErasedExpenses, setNotErasedExpenses] = useState("");

  // const erasedExpenseHandler = (erasedExpense) => {
  //   setNotErasedExpenses(erasedExpense);
  //   console.log(erasedExpense);
  // };

  // const newExpenseFiltered = props.items.filter((expense) => {
  //   return expense.date.getTime() !== notErasedExpenses;
  // });

  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }

  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          // onErasedExpense={erasedExpenseHandler} continuacion de la prueba
          key={expense.id}
          id={expense.id}
          title={expense.title}
          amount={expense.amount}
          month={expense.month}
          year={expense.year}
          day={expense.day}
          date={expense.date}
          onDeleteExpense3={props.onDeleteExpense2}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
