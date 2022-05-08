import { useState } from "react";
import './IncomesForm.css'

const IncomesForm = (props) => {
  const [enteredPerson, setEnteredPerson] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [enteredWork, setEnteredWork] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const incomeData = {
      person: enteredPerson,
      amount: enteredAmount,
      type: enteredType,
      work: enteredWork,
    };

    props.onSaveIncomeData(incomeData);
    setEnteredPerson("");
    setEnteredAmount("");
    setEnteredWork("");

    props.cancelButton();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="incomes__controls">
        <div className="incomes__control">
          <label>Person</label>
          <input
            type="text"
            value={enteredPerson}
            onChange={e => setEnteredPerson(e.target.value)}
          />
        </div>
        <div className="incomes__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={e => setEnteredAmount(e.target.value)}
          />
        </div>
        <div className="incomes__control">
          <label>Type</label>
          <input
            type="text"
            value={enteredType}
            onChange={e => setEnteredType(e.target.value)}
          />
        </div>
        <div className="incomes__control">
          <label>Work</label>
          <input
            type="text"
            value={enteredWork}
            onChange={e => setEnteredWork(e.target.value)}
          />
        </div>
      </div>
      <div className="incomes__actions">
        <button type="button" onClick={props.cancelButton}>
          Cancel
        </button>
        <button type="submit">Add Income</button>
      </div>
    </form>
  );
};

export default IncomesForm;
