import { useDispatch, useSelector } from "react-redux";

import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";
import { expenseActions } from "../../store/expenses";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

const ExpensesList = (props) => {
  const filterExp = useSelector((state) => state.expense.filterExp);
  const fixedExp = useSelector((state) => state.expense.fixedExp);
  const month = useSelector((state) => parseInt(state.expense.month));
  const year = useSelector((state) => parseInt(state.expense.year));
  const dispatch = useDispatch();

  let list = [];
  let content;
  let iteration = props.fixed ? fixedExp : filterExp;
  let amountChanges = [];

  const changeAmountHandler = (amount, id) => {
    amountChanges = amountChanges.filter((exp) => exp.id !== id);
    amountChanges.push({ amount, id });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newExp = iteration.map((expF) => {
      const temp = Object.assign({}, expF);
      for (const change of amountChanges) {
        if (change.id === expF.id) {
          temp.amount = change.amount;
        }
      }
      temp.month = month;
      temp.year = year;
      temp.day = 1;
      return temp;
    });
    dispatch(expenseActions.increment(newExp));
    newExp.forEach(async (exp) => {
      const expenseRef = collection(
        firestore,
        `users/${auth.currentUser.uid}/expense`
      );
      await addDoc(expenseRef, exp);
    });
  };

  for (const expense of iteration) {
    const expElement = (
      <ExpenseItem
        key={expense.id}
        id={expense.id}
        title={expense.title}
        amount={expense.amount}
        month={expense.month}
        year={expense.year}
        day={expense.day}
        onChange={changeAmountHandler}
      />
    );
    list.push(expElement);
  }

  content = list;

  if (list.length < 1) {
    content = "No expenses";
  }

  let finalRender = props.fixed ? (
    <form className="expenses-fixed__container" onSubmit={submitHandler}>
      <ul className="expenses-list">{content}</ul>
      <button onClick={() => props.Toggle()} className="expenses-list__actions">
        Close
      </button>
      <button type="submit" className="expenses-list__actions">
        Submit
      </button>
    </form>
  ) : (
    <ul className="expenses-list">{content}</ul>
  );

  return finalRender;
};

export default ExpensesList;
