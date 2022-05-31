import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { expenseActions } from "../../store/expenses";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function ExpenseItem(props) {
  const dispatch = useDispatch();
  const [itemAmount, setItemAmount] = useState(props.amount);
  
  useEffect(() => {
    if(props.day === null) {
      props.onChange(itemAmount, props.id)
    }
  },[itemAmount, props])
  
  const deleteExpenseHandler = async (expenseId) => {
    await deleteDoc(
      doc(firestore, `users/${auth.currentUser.uid}/expense/${expenseId}`)
    );
    dispatch(expenseActions.delete(expenseId));
  };

  let amountContent = !props.day ? (
    <>
      <button onClick={() => setItemAmount(props.amount)}>Reset Amount</button>
      <input
        value={itemAmount}
        onChange={(e) => setItemAmount(parseFloat(e.target.value))}
        type="number"
        className={`expense-item__price ` + props.payed ? `payed`: `` }
      />
    </>
  ) : (
    <div className="expense-item__price">${props.amount}</div>
  );

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate month={props.month} year={props.year} day={props.day} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <button
            type="button"
            className="expense-item__erase"
            onClick={() => deleteExpenseHandler(props.id)}
          >
            Erase
          </button>
          {/* <div className="expense-item__price">${props.amount}</div> */}
          {/* <input value={props.amount} type="number" className="expense-item__price"/> */}
          {amountContent}
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;
