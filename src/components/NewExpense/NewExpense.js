import { useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  const onSaveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      // id: Math.random().toString(), //suficientemente bueno para esta demo, puede replicar
    };
    props.onAddExpense(expenseData);
  };

  const buttonExpense = <button onClick={addNewExpense}>Add New Expense</button>;

  const [state, setState] = useState(buttonExpense);

  const resetNewExpense = () => {setState(buttonExpense)}

  function addNewExpense() {
    setState(<ExpenseForm onSaveExpenseData={onSaveExpenseDataHandler} cancelButton={resetNewExpense} categories={props.categories}/>);
  }

  return (
    <div className="new-expense">
      {/* Tarea 4 Seccion 5, yo trabaje con estados en los que lo que se va a renderizar lo manejaba dentro del mismo, el trabajo con true false y condicional dentro del return */}
      {state}
    </div>
  );
};

export default NewExpense;
