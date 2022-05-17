import { useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {

  const buttonExpense = <button onClick={addNewExpense}>Add New Expense</button>;

  const [state, setState] = useState(buttonExpense);

  const resetNewExpense = () => {setState(buttonExpense)}

  function addNewExpense() {
    setState(<ExpenseForm cancelButton={resetNewExpense} categories={props.categories}/>);
  }

  return (
    <div className="new-expense">
      {state}
    </div>
  );
};

export default NewExpense;
