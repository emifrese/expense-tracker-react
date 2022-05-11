import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");

  let categoriesList = [];

  props.categories.forEach((category, i) => {
    if(category === "All"){
      return
    }
    categoriesList.push(<option value={category} key={i}>{category}</option>)
  });


  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };
  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
  };
  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };
  const categoryChangeHandler = (e) => {
    setEnteredCategory(e.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const date = new Date(enteredDate);
    date.setDate(date.getDate() + 1)
    
    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      category: enteredCategory
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
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
            value={enteredTitle}
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
        <div className="new-expense__control">
          <label>Category</label>
          <select onChange={categoryChangeHandler}>
            <option value="">
              Select a category
            </option>
            {categoriesList}
          </select>
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
