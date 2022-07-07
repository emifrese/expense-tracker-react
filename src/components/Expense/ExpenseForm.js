import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, firestore } from "../../firebase";
import "./ExpenseForm.css";
import titleImg from "../../assets/informacion.svg";
import dateImg from "../../assets/tiempo-trimestrepasado.svg";
import categoryImg from "../../assets/marcador.svg";
import cardImg from "../../assets/tarjeta-de-credito.svg";
import { useNavigate } from "react-router-dom";
import SaveButton from "../UI/SaveButton";
import { categories } from "../../helpers/variables";

const actualDate = new Date();
const defaultValue = actualDate.toLocaleDateString("en-CA");

const ExpenseForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState(defaultValue);
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredCuotas, setEnteredCuotas] = useState("");
  const [fixedExp, setFixedExp] = useState(false);
  const [cuotas, setCuotas] = useState(false);
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

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
    if(e.target.value === ''){
      setEnteredAmount('')
    } else {
      setEnteredAmount(parseFloat(e.target.value));
    }
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

    let colorIcon;
    let borderColor;

    switch (enteredCategory) {
      case "Groceries":
        borderColor = "#1363DF";
        colorIcon = "#47B5FF";
        break;
      case "Food & Drink":
        borderColor = "#F76E11";
        colorIcon = "#FFBC80";
        break;
      case "Fuel":
        borderColor = "#14C38E";
        colorIcon = "#B8F1B0";
        break;
      case "Pharmacy":
        borderColor = "#FD5D5D";
        colorIcon = "#FF8080";
        break;
      case "Others":
        borderColor = "#810955";
        colorIcon = "#EE81B3";
        break;
      default:
    }

    const expenseRef = collection(
      firestore,
      `users/${auth.currentUser.uid}/expense`
    );

    let error = false;

    if (enteredAmount === "") {
      setValidation((state) => {
        if (!state.includes("amount")) {
          return [...state, "amount"];
        }
        return state;
      });
      error = true;
    }

    if (enteredTitle.trim() === "") {
      setValidation((state) => {
        if (!state.includes("title")) {
          return [...state, "title"];
        }
        return state;
      });
      error = true;
    }
    if (enteredCategory === "") {
      setValidation((state) => {
        if (!state.includes("category")) {
          return [...state, "category"];
        }
        return state;
      });
      error = true;
    }

    if (error === true) {
      return;
    }
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      category: enteredCategory,
      colors: { colorIcon, borderColor },
      fixedExp,
      cuotas,
      amountCuotas: enteredCuotas,
      payed: true,
    };

    if (!cuotas) {
      await addDoc(expenseRef, expenseData);
    } else {
      if (typeof enteredCuotas !== "number") {
        return alert("selecciona las cuotas");
      }
      const temp = Object.assign({}, expenseData);
      temp.amountCuotas = enteredCuotas;
      temp.amount = parseFloat((temp.amount / temp.amountCuotas).toFixed(2));
      for (let i = 0; i < temp.amountCuotas; i++) {
        temp.remainingCoutas = temp.amountCuotas - 1 - i;
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
        amount: enteredAmount,
        day: null,
        month: date.getMonth(),
        year: date.getFullYear(),
        category: enteredCategory,
        colors: { colorIcon, borderColor },
        fixedExp,
        skip: [],
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

    navigate("../", { replace: true });
  };
  console.log(enteredAmount);
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="new-expense__control_amount">
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder={0}
            value={enteredAmount}
            style={
              validation.includes("amount")
                ? { boxShadow: "0px 0px 5px 3px rgba(255,0,0,0.75)" }
                : { boxShadow: "none" }
            }
            onChange={amountChangeHandler}
            onBlur={() => {
              console.log(isNaN(enteredAmount))
              if (enteredAmount !== "" && enteredAmount !== 0) {
                setValidation((state) => state.filter((el) => el !== "amount"));
              }
            }}
          />
        </div>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <img src={titleImg} alt="title" />
            <input
              type="text"
              placeholder="Title"
              value={enteredTitle}
              onChange={titleChangeHandler}
              style={
                validation.includes("title")
                  ? { boxShadow: "0px 0px 5px 3px rgba(255,0,0,0.75)" }
                  : { boxShadow: "none" }
              }
              onBlur={() => {
                if (enteredTitle !== "") {
                  setValidation((state) => state.filter((el) => el !== "title"));
                }
              }}
            />
          </div>
          <div className="new-expense__control">
            <img src={dateImg} alt="date" />
            <input
              type="date"
              min="2019-01-01"
              max="2022-12-31"
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <img src={categoryImg} alt="category" />
            <select
              onChange={categoryChangeHandler}
              style={
                validation.includes("category")
                  ? { boxShadow: "0px 0px 5px 3px rgba(255,0,0,0.75)" }
                  : { boxShadow: "none" }
              }
              onBlur={() => {
                if (enteredCategory !== "") {
                  setValidation((state) => state.filter((el) => el !== "category"));
                }
              }}
            >
              <option value="">Select a category</option>
              {categoriesList}
            </select>
          </div>
          {cuotas && (
            <div className="new-expense__control">
              <img src={cardImg} alt="credit-card" />
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
        <SaveButton />
      </form>
    </>
  );
};

export default ExpenseForm;
