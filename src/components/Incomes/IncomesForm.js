import { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, firestore } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { incomesActions } from "../../store/incomes";
import "./IncomesForm.css";

const actualDate = new Date();

const IncomesForm = (props) => {
  const [enteredPerson, setEnteredPerson] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [enteredWork, setEnteredWork] = useState("");

  const selectPerson = [
    <option value="Emiliano" id={0} key={0}>
      Emiliano
    </option>,
    <option value="Wanda" id={1} key={1}>
      Wanda
    </option>,
  ];

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    let personId = 1;
    if (enteredPerson === "Emiliano") {
      personId = 0;
    }
    const incomeData = {
      person: enteredPerson[0],
      personId,
      amount: enteredAmount,
      type: enteredType,
      work: enteredWork,
      month: actualDate.getMonth(),
      year: actualDate.getFullYear(),
    };
    dispatch(incomesActions.addIncome(incomeData));

    const incomeRef = collection(
      firestore,
      `users/${auth.currentUser.uid}/income`
    );
    await addDoc(incomeRef, incomeData);

    // props.onSaveIncomeData(incomeData);
    setEnteredPerson("");
    setEnteredAmount("");
    setEnteredWork("");
    setEnteredType("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="incomes__controls">
        <div className="incomes__control">
          <label>Person</label>
          <select onChange={(e) => setEnteredPerson(e.target.value)}>
            <option value="">Select person</option>
            {selectPerson}
          </select>
        </div>
        <div className="incomes__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={(e) => setEnteredAmount(e.target.value)}
          />
        </div>
        <div className="incomes__control">
          <label>Type</label>
          <input
            type="text"
            value={enteredType}
            onChange={(e) => setEnteredType(e.target.value)}
          />
        </div>
        <div className="incomes__control">
          <label>Work</label>
          <input
            type="text"
            value={enteredWork}
            onChange={(e) => setEnteredWork(e.target.value)}
          />
        </div>
      </div>
      <div className="incomes__actions">
        <button type="button">Cancel</button>
        <button type="submit">Add Income</button>
      </div>
    </form>
  );
};

export default IncomesForm;
