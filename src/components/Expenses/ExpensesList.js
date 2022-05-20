import { useDispatch, useSelector } from "react-redux";

import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";
import { expenseActions } from "../../store/expenses";

const ExpensesList = (props) => {
  
  const filterExp = useSelector((state) => state.expense.filterExp);
  const fixedExp = useSelector((state) => state.expense.fixedExp);
  const dispatch = useDispatch();

  let list = [];
  let content;
  let iteration = props.fixed ? fixedExp : filterExp;
  
  const submitHandler = e => {
    e.preventDefault();
    const actualDate = new Date();
    const fixedExp = iteration.map(expF => {
      const temp = Object.assign({}, expF)
      temp.day = 1;
      return temp
    })
    // dispatch(expenseActions.increment())
    console.log(fixedExp)
    
  }

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
      />
    );
    list.push(expElement);
  }

  content = list;

  if (list.length < 1) {
    content = "No expenses";
  }

  let finalRender = props.fixed ? (<form className="expenses-fixed__container" onSubmit={submitHandler}>
    <ul className="expenses-list">{content}</ul>
    <button type="submit" className="expenses-list__actions">Submit</button>
  </form>) : (<ul className="expenses-list">{content}</ul>);

  return finalRender;
};

export default ExpensesList;
