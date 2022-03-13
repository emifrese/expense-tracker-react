import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  //Forma individualizada
  const [enteredTile, setEnteredTile] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  //   const [userInput, setUserInput] = useState({
  //     enteredTitle: "",
  //     enteredAmount: "",
  //     enteredDate: "",
  //   }); Usamos 1 useState para todos

  const titleChangeHandler = (e) => {
    //Forma individualizada
    setEnteredTile(e.target.value);
    // setUserInput({
    //     ...userInput,
    //     enteredTitle: e.target.value,
    // });
    // Esto para hacer con un useState de esta forma para asegurarse que usamos la ultima actualizacion del estado
    // setUserInput( (prevState) => {
    //     return { ...prevState, enteredTitle: e.target.value};
    // });
  };
  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
    // setUserInput({
    //     ...userInput,
    //     enteredAmount: e.target.value,
    // })
  };
  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
    // setUserInput({
    //     ...userInput,
    //     enteredDate: e.target.value,
    // })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const date = new Date(enteredDate);
    date.setDate(date.getDate() + 1)
    
    const expenseData = {
      title: enteredTile,
      amount: +enteredAmount,
      date: date,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    // const expenseRef = collection(
    //   firestore,
    //   `users/${auth.currentUser.uid}/expense`
    // );
    // await addDoc(expenseRef, expenseData);

    props.onSaveExpenseData(expenseData);
    setEnteredTile("");
    setEnteredAmount("");
    setEnteredDate("");

    props.cancelButton();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTile}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.cancelButton}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
