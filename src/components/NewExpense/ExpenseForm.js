import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, firestore } from "../../firebase";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredCuotas, setEnteredCuotas] = useState("");
  const [fixedExp, setFixedExp] = useState(false);
  const [cuotas, setCuotas] = useState(false);
  const [addType, setAddType] = useState(true);
  const categories = ["All", "Carniceria", "Verduleria"];

  let categoriesList = [];
  let cuotasList = [];

  categories.forEach((category, i) => {
    if (category === "All") {
      return;
    }
    categoriesList.push(
      <option value={category} key={i}>
        {category}
      </option>
    );
  });

  const cuotasValues = [3, 6, 9, 12, 18];

  cuotasValues.forEach((cuota, i) => {
    cuotasList.push(
      <option value={cuota} key={i}>
        {cuota}
      </option>
    );
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
    setEnteredCategory(e.target.value);
  };
  const cuotasChangeHandler = (e) => {
    setEnteredCuotas(parseInt(e.target.value));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const date = new Date(enteredDate);
    date.setDate(date.getDate() + 1);

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      category: enteredCategory,
      fixedExp,
      cuotas,
      amountCuotas: enteredCuotas,
      payed: true,
    };
    const expenseRef = collection(
      firestore,
      `users/${auth.currentUser.uid}/expense`
    );

    if (!cuotas) {
      await addDoc(expenseRef, expenseData);
    } else {
      if (typeof enteredCuotas !== "number") {
        console.log("selecciona las cuotas");
        return;
      }
      const temp = Object.assign({}, expenseData);
      temp.amount = parseFloat((temp.amount / temp.amountCuotas).toFixed(2));
      for (let i = 0; i < temp.amountCuotas; i++) {
        temp.month += 1;
        temp.payed = false;
        if (temp.month > 12) {
          temp.month = 0;
          temp.year += 1;
        }
        await addDoc(expenseRef, temp);
      }
    }

    if (fixedExp) {
      const expenseFixedData = {
        title: enteredTitle,
        amount: +enteredAmount,
        day: null,
        month: date.getMonth(),
        year: date.getFullYear(),
        category: enteredCategory,
        fixedExp,
        cuotas,
        amountCuotas: enteredCuotas,
      };

      const expenseFixedRef = collection(
        firestore,
        `users/${auth.currentUser.uid}/fixed-exp`
      );
      await addDoc(expenseFixedRef, expenseFixedData);
    }

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");

    props.cancelButton();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__type">
        <label className="switch">
          <input
            type="checkbox"
            defaultChecked={addType}
            onChange={(e) => setAddType(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div className="new-expense__control_amount">
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={enteredAmount}
          onChange={amountChangeHandler}
        />
      </div>
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
            <option value="">Select a category</option>
            {categoriesList}
          </select>
        </div>
        {cuotas && (
          <div className="new-expense__control">
            <label>Cuotas</label>
            <select onChange={cuotasChangeHandler}>
              <option value="">Select amount of cuotas</option>
              {cuotasList}
            </select>
          </div>
        )}
        {!cuotas && (
          <div className="new-expense__current">
            <label className="switch">
              Fixed Expenses
              <input
                type="checkbox"
                defaultChecked={fixedExp}
                onChange={(e) => setFixedExp(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        )}
        {!fixedExp && (
          <div className="new-expense__current">
            <label className="switch">
              Pago en cuotas
              <input
                type="checkbox"
                defaultChecked={cuotas}
                onChange={(e) => setCuotas(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        )}
      </div>
      <div className="new-expense__actions">
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
